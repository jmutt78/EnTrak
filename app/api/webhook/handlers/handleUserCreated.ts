import { resolvers } from '../../graphql/resolvers'

export async function handleUserCreated(data: any) {
  const { id, email_addresses } = data

  try {
    const user = await resolvers.Mutation.createUser(null, {
      clerkId: id,
      email: email_addresses[0].email_address,
    })
    console.log(`User with ID ${user.clerkId} created successfully`)
  } catch (error) {
    console.error(`Error creating user with ID ${id}:`, error)
  }
}
