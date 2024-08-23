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
    deleteUser: async (_: any, { id }: { id: string }) => {
      return await prisma.user.delete({
        where: { clerkId: id },
      })
    },
    updateUser: async (
      _: any,
      { id, email }: { id: string; email: string }
    ) => {
      return await prisma.user.update({
        where: { clerkId: id },
        data: {
          email,
        },
      })
    },
  },
}
