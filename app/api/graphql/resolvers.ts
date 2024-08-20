import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const resolvers = {
  Query: {
    currentUser: async (_: any, __: any, { user }: any) => {
      if (!user) return null
      return await prisma.user.findUnique({
        where: { clerkId: user.id },
      })
    },
  },
  Mutation: {
    createUser: async (
      _: any,
      { clerkId, email }: { clerkId: string; email: string }
    ) => {
      return await prisma.user.create({
        data: {
          clerkId,
          email,
        },
      })
    },
  },
}
