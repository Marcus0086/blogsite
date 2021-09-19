import { ApolloProvider, ApolloClient, NormalizedCacheObject } from "@apollo/react-hooks";
import { NextPage } from "next";
import { initApolloClient } from "./withApollo";

interface PageTypes {
    apolloState: NormalizedCacheObject | {};
    apolloClient: ApolloClient<NormalizedCacheObject>;
}

const ApolloCLientProvider = () => (PageComponent: any) => {
    const page = ({ apolloState, apolloClient, ...pageProps }: PageTypes) => {
        let client;
        if (apolloClient) {
            client = apolloClient;
        } else {
            client = initApolloClient(apolloState, null);
        }
        return (
            <ApolloProvider client={client}>
                <PageComponent {...pageProps} />
            </ApolloProvider>
        );
    }
    return page;
};

export default ApolloCLientProvider;