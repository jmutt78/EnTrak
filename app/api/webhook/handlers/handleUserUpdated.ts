import { resolvers } from '../../graphql/resolvers'

export async function handleUserUpdated(data: any) {
  const { id, email_addresses } = data

  try {
    const user = await resolvers.Mutation.updateUser(null, {
      id,
      email: email_addresses[0].email_address,
    })
    console.log(`User with ID ${user.clerkId} updated successfully`)
  } catch (error) {
    console.error(`Error updating user with ID ${id}:`, error)
  }
}
