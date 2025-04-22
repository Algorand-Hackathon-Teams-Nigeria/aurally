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

// import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

// const API_BASE_URL =
//   process.env.NODE_ENV === "development"
//     // ? "https://devapi.aurally.xyz/graphql"
//     ? "http://localhost:8000/graphql"
//     : "https://aurallybackend-production.up.railway.app/graphql";

// const client = new ApolloClient({
//   link: new HttpLink({
//     uri: "https://aurallybackend-production.up.railway.app/graphql",
//     credentials: "include", // Ensures cookies and authentication work
//   }),
//   cache: new InMemoryCache(),
// });

// export default client;




//Connecting directly yo localhost
// import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

// const client = new ApolloClient({
//   link: new HttpLink({
//     uri: "http://localhost:8000/graphql", // Directly pointing to localhost
//     credentials: "include", // Ensures cookies and authentication work
//   }),
//   cache: new InMemoryCache(),
// });

// export default client;

// src/app/lib/apolloClient.ts (client-safe version)
import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  link: new HttpLink({
    uri: "https://aurallybackend-production.up.railway.app/graphql",
    credentials: "include",
  }),
  cache: new InMemoryCache(),
});

export default client;


