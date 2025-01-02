import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const userResolvers = {
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
      {
        clerkId,
        email,
        profileImage,
      }: { clerkId: string; email: string; profileImage?: string }
    ) => {
      return await prisma.user.create({
        data: { clerkId, email, profileImage },
      })
    },
    updateUser: async (
      _: any,
      {
        id,
        email,
        profileImage,
      }: { id: string; email: string; profileImage?: string }
    ) => {
      return await prisma.user.update({
        where: { clerkId: id },
        data: { email, profileImage },
      })
    },
    deleteUser: async (_: any, { id }: { id: string }) => {
      return await prisma.user.delete({
        where: { clerkId: id },
      })
    },
  },
}
