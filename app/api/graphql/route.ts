import { ApolloServer } from '@apollo/server'
import { startServerAndCreateNextHandler } from '@as-integrations/next'
import { resolvers } from './resolvers'
import { typeDefs } from './schema' // Import directly from your schema.ts
import { getAuth } from '@clerk/nextjs/server'

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

const startServer = server.start()

export const GET = startServerAndCreateNextHandler(server, {
  context: async (req: any) => {
    await startServer
    const { userId, sessionId, getToken } = getAuth(req)
    return { userId, sessionId, getToken }
  },
})

export const POST = startServerAndCreateNextHandler(server, {
  context: async (req: any) => {
    await startServer
    const { userId, sessionId, getToken } = getAuth(req)
    return { userId, sessionId, getToken }
  },
})
