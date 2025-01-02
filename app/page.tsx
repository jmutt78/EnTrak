import { auth } from '@clerk/nextjs/server'
import { ChoosePath } from './(home)/ChoosePath'
import { Landing } from './(home)/Landing'

export default async function Home() {
  const { userId } = await auth()

  if (userId) {
    return <ChoosePath />
  }

  return <Landing />
}
