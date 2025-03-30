// import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
// import { registerApolloClient } from "@apollo/experimental-nextjs-app-support/rsc";

// export const { getClient } = registerApolloClient(() => {
//   return new ApolloClient({
//     cache: new InMemoryCache(),
//     link: new HttpLink({
//       uri: "https://aurallybackend-production.up.railway.app/graphql",
//     }),
//   });
// });

import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

const API_BASE_URL =
  process.env.NODE_ENV === "development"
    // ? "https://devapi.aurally.xyz/graphql"
    ? "http://localhost:8000/graphql"
    : "https://aurallybackend-production.up.railway.app/graphql";

const client = new ApolloClient({
  link: new HttpLink({
    uri: API_BASE_URL,
    credentials: "include", // Ensures cookies and authentication work
  }),
  cache: new InMemoryCache(),
});

export default client;
