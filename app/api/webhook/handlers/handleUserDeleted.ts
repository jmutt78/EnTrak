import { resolvers } from '../../graphql/resolvers'

export async function handleUserDeleted(id: string) {
  try {
    const user = await resolvers.Mutation.deleteUser(null, { id })
    console.log(`User with ID ${user.clerkId} deleted successfully`)
  } catch (error) {
    console.error(`Error deleting user with ID ${id}:`, error)
  }
}
