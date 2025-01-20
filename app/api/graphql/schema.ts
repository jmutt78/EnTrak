import { gql } from 'graphql-tag'

export const typeDefs = gql`
  type User {
    id: ID!
    clerkId: String!
    email: String!
  }

  type Movie {
    title: String!
    year: Int
    ids: MovieIDs
  }

  type MovieIDs {
    trakt: Int
    slug: String
    imdb: String
    tmdb: Int
  }

  type Query {
    currentUser: User
    trendingMovies: [Movie!]!
  }

  type Mutation {
    createUser(clerkId: String!, email: String!): User!
    updateUser(id: ID!, email: String, profileImage: String): User!
    deleteUser(id: ID!): User!
  }
`
