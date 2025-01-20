import { movieResolvers } from './movieResolvers'
import { userResolvers } from './userResolvers'

export const resolvers = {
  Query: {
    ...userResolvers.Query,
    ...movieResolvers.Query,
  },
  Mutation: {
    ...userResolvers.Mutation,
  },
}
