'use client'

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider as Provider,
} from '@apollo/client'

// apolloClient.ts
const client = new ApolloClient({
  uri:
    process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT ||
    'http://localhost:3000/api/graphql',
  cache: new InMemoryCache({
    typePolicies: {
      Architect: {
        keyFields: ['id'], // Identify stories by id
        fields: {
          sections: {
            merge(existing = [], incoming = []) {
              return incoming
            },
          },
        },
      },
      Section: {
        keyFields: ['id'], // Identify sections by id
        fields: {
          chapters: {
            merge(existing = [], incoming = []) {
              return incoming
            },
          },
        },
      },
      Chapter: { keyFields: ['id'] }, // Identify chapters by id
    },
  }),
})

export function ApolloProvider({ children }: { children: React.ReactNode }) {
  return <Provider client={client}>{children}</Provider>
}
