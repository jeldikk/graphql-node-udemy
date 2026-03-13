import { GraphQLClient } from "graphql-request";
import { getAccessToken } from "../auth";
import {
  ApolloClient,
  ApolloLink,
  concat,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";

export const client = new GraphQLClient("http://localhost:9000/graphql", {
  headers: {
    Authorization: `Bearer ${getAccessToken()}`,
  },
});

const httpLink = new HttpLink({ uri: "http://localhost:9000/graphql" });

const authLink = new ApolloLink((operation, forward) => {
  console.log("[Operation is] :", operation);
  const accessToken = getAccessToken();
  if (accessToken) {
    operation.setContext({
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }
  return forward(operation);
});

export const apolloClient = new ApolloClient({
  link: concat(authLink, httpLink),
  cache: new InMemoryCache(),
});
