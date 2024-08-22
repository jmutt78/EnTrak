import { handler } from './graphqlServer'

export const config = {
  api: {
    bodyParser: false,
  },
}

export { handler as GET, handler as POST }
