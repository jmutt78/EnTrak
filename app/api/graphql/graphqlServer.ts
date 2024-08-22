import { ApolloServer } from '@apollo/server'
import { startServerAndCreateNextHandler } from '@as-integrations/next'
import { getAuth } from '@clerk/nextjs/server'
import { PrismaClient } from '@prisma/client'
import { resolvers } from './resolvers'
import { typeDefs } from './schema'

const prisma = new PrismaClient()

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }: { req: any }) => {
    const { userId } = getAuth(req)
    const user = userId
      ? await prisma.user.findUnique({ where: { clerkId: userId } })
      : null
    return { user, prisma }
  },
}) as any

export const handler = startServerAndCreateNextHandler(apolloServer)
