import { ApolloServer } from '@apollo/server'
import { startServerAndCreateNextHandler } from '@as-integrations/next'
import { getAuth } from '@clerk/nextjs/server'
import { PrismaClient, User } from '@prisma/client'
import { resolvers } from './resolvers'
import { typeDefs } from './schema'

import { NextApiRequest } from 'next'

declare global {
  var prisma: PrismaClient | undefined
}

const prisma = global.prisma || new PrismaClient()
if (process.env.NODE_ENV !== 'production') global.prisma = prisma

interface Context {
  prisma: PrismaClient
  user?: User
}

const createContext = async (req: NextApiRequest): Promise<Context> => {
  if (process.env.NODE_ENV === 'development') {
    console.log('Bypassing auth for codegen')
    return { prisma }
  }

  const { userId } = getAuth(req)
  if (!userId) {
    console.error('Authentication error: Missing user ID')
    throw new Error('Not authenticated')
  }

  const user = await prisma.user.findUnique({ where: { clerkId: userId } })
  if (!user) {
    console.error(`User not found in database for ID: ${userId}`)
    throw new Error('User not found in database')
  }

  return { user, prisma }
}

const createApolloServer = () => {
  return new ApolloServer({ typeDefs, resolvers })
}

const server = createApolloServer()

export const handler = startServerAndCreateNextHandler(server, {
  context: createContext,
})

if (process.env.NODE_ENV === 'production') {
  process.on('SIGINT', async () => {
    await prisma.$disconnect()
  })
  process.on('SIGTERM', async () => {
    await prisma.$disconnect()
  })
}
