import { InMemoryCache, HttpLink, ApolloClient, NormalizedCacheObject } from '@apollo/react-hooks';
import { WebSocketLink } from '@apollo/client/link/ws';
import { SubscriptionClient, } from 'subscriptions-transport-ws'

let accessToken = "";
export const requestAccessToken = async () => {
    if (accessToken) return

    const res = await fetch('/api/auth/session')
    if (res.ok) {
        const json = await res.json()
        accessToken = json.token
    } else {
        accessToken = 'public'
    }
}

const createHttpLink = (headers: String | { Authorization: string; } | null) => {
    const httpLink = new HttpLink({
        uri: "https://blogapp.hasura.app/v1/graphql",
        credentials: 'include',
        headers, // auth token is fetched on the server side
        fetch,
    })
    return httpLink;
}

const createWSLink = () => {
    try {
        return new WebSocketLink(
            new SubscriptionClient("wss://blogapp.hasura.app/v1/graphql", {
                lazy: true,
                reconnect: true,
                timeout: 30000,
                connectionParams: async () => {
                    await requestAccessToken() // happens on the client
                    return {
                        headers: {
                            authorization: accessToken ? `Bearer ${accessToken}` : '',
                        },
                    }
                },
            })
        )
    } catch (error) {
        console.error(error);
    }
}

export default function createApolloClient(initialState: {} | NormalizedCacheObject,
    headers: String | { Authorization: string; } | null) {
    const ssrMode = typeof window === 'undefined'
    let link;
    if (ssrMode) {
        link = createHttpLink(headers) // executed on server
    } else {
        link = createWSLink() // executed on client
    }
    return new ApolloClient({
        ssrMode,
        link,
        cache: new InMemoryCache().restore(initialState)
    })
}
