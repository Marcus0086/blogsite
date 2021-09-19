import { ApolloClient, NormalizedCacheObject } from '@apollo/react-hooks';
import createApolloClient from './apolloClient';
import { getSession, GetSessionOptions } from 'next-auth/client';

interface CTXTYPES {
    ctx:
    {
        headers: String | { Authorization: string; } | null;
        apolloClient: any;
    };
    apolloClient: ApolloClient<NormalizedCacheObject>;
    apolloState: any;
    headers: String | { Authorization: string; } | null;
};


let globalApolloClient: ApolloClient<NormalizedCacheObject>;
export const initOnContext = (ctx: CTXTYPES) => {
    const inAppContext = Boolean(ctx.ctx);

    if (process.env.NODE_ENV === 'development') {
        if (inAppContext) {
            console.warn(
                'Warning: You have opted-out of Automatic Static Optimization due to `withApollo` in `pages/_app`.\n' +
                'Read more: https://err.sh/next.js/opt-out-auto-static-optimization\n'
            );
        }
    }

    const apolloClient =
        ctx.apolloClient ||
        initApolloClient(ctx.apolloState || {}, inAppContext ? ctx.ctx.headers : ctx.headers);
    ctx.apolloClient = apolloClient;
    if (inAppContext) {
        ctx.ctx.apolloClient = apolloClient;
    }

    return ctx;
};

export async function getHeaders(ctx: GetSessionOptions | undefined) {
    if (typeof window !== 'undefined') return null
    if (typeof ctx?.req === 'undefined') return null

    const s = await getSession(ctx);
    if (s && s.token == null) return null
    return {
        Authorization: `Bearer ${s ? s.token : ''}`
    }
}

export const initApolloClient = (initialState: {} | NormalizedCacheObject, headers: String | { Authorization: string; } | null) => {
    if (typeof window === 'undefined') {
        return createApolloClient(initialState, headers);
    }
    if (!globalApolloClient) {
        globalApolloClient = createApolloClient(initialState, headers);
    }
    return globalApolloClient;
};

