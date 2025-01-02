import { gql } from 'graphql-tag'

export const typeDefs = gql`
  type User {
    id: ID!
    clerkId: String!
    email: String!
    clerkId: String!
  }

  type Query {
    currentUser: User
  }

  type Mutation {
    createUser(clerkId: String!, email: String!): User!
    updateUser(id: ID!, email: String, profileImage: String): User!
    deleteUser(id: ID!): User!
  }
`
