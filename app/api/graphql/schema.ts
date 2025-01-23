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
    genres: String
  }

  type MovieIDs {
    trakt: Int
    slug: String
    imdb: String
    tmdb: Int
  }

  type PaginatedMovies {
    movies: [Movie!]!
    metadata: PaginationMetadata!
  }

  type PaginationMetadata {
    page: Int!
    limit: Int!
    total: Int!
    totalPages: Int!
  }

  type Query {
    currentUser: User
    searchMovies(query: String!): [Movie!]!
    filterMovies(
      genre: String
      year: Int
      rating: String
      runtime: String
      sortBy: String
      page: Int
      limit: Int
    ): PaginatedMovies!
  }

  type Mutation {
    createUser(clerkId: String!, email: String!): User!
    updateUser(id: ID!, email: String, profileImage: String): User!
    deleteUser(id: ID!): User!
  }
`
