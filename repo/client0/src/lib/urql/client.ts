import { useMemo } from "react";
import { cacheExchange, Client, fetchExchange, ssrExchange, errorExchange } from "urql";


let client: Client | null = null;

let ssrCache: ReturnType<typeof ssrExchange> | null = null;

const isServer = typeof window === "undefined";
export function initUrqlClient(initialState?: any) {
    if (!client) {
        ssrCache = ssrExchange({ initialState, isClient: !isServer });
        client = new Client({
            url: 'https://37a855e9-cbad-47b1-aaee-e725b592ee4b-00-25qsdfa2j9uuc.spock.replit.dev/graphql',
            exchanges: [
                errorExchange({
                    onError: (error) => {
                        console.error("GraphQL Error:", error);
                        error.message = error.message.replace(/^\[.*\]\s*/, "");
                    }
                }),
                cacheExchange,
                ssrCache,
                fetchExchange
            ],
            fetchOptions: {
                credentials: "include",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                },
                method: "POST",
            },
        });
    } else {
        ssrCache?.restoreData(initialState);
    }
    return { client, ssrCache };
}


export const useClient = (pageProps?: any) => {
    const urqlData = pageProps.urqlState;
    const { client } = useMemo(() => {
        return initUrqlClient(urqlData);
    }, [urqlData]);
    return client;
};