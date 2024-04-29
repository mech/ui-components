"use client";

import {
  createClient,
  fetchExchange,
  errorExchange,
  // cacheExchange,
  Provider,
} from "urql";

export default function UrqlProvider({ children }) {
  const client = createClient({
    url: "http://192.168.1.235:3000/api/graphql",
    maskTypename: true,
    exchanges: [
      // cacheExchange,
      errorExchange({
        onError: (error) => {
          console.error(error);
        },
      }),
      fetchExchange,
    ],
  });

  return <Provider value={client}>{children}</Provider>;
}
