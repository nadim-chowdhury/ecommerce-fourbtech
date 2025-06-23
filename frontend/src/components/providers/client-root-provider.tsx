"use client";

import { ApolloProvider } from "@apollo/client";
import { client } from "@/lib/apollo-client";
import StoreProvider from "./store-provider";
import AuthProvider from "./auth-provider";

export default function ClientRootProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ApolloProvider client={client}>
      <StoreProvider>
        <AuthProvider>{children}</AuthProvider>
      </StoreProvider>
    </ApolloProvider>
  );
}
