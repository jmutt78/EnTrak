import { gql } from 'graphql-tag'

export const typeDefs = gql`
  type User {
    id: ID!
    clerkId: String!
    email: String!
  }

  type Query {
    currentUser: User
  }

  type Mutation {
    createUser(clerkId: String!, email: String!): User!
  }
`
