import axios from 'axios'
import NodeCache from 'node-cache'

const cache = new NodeCache({ stdTTL: 300 }) // Cache TTL of 5 minutes

const traktClient = axios.create({
  baseURL: process.env.TRAKT_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'trakt-api-version': '2',
    'trakt-api-key': process.env.TRAKT_CLIENT_ID,
  },
})

// Wrapper to handle caching
export const cachedRequest = async (
  url: string,
  params: Record<string, any> = {},
  retries = 3
) => {
  const cacheKey = `${url}:${JSON.stringify(params)}`
  const cachedData = cache.get(cacheKey)

  if (cachedData) {
    console.log(`Cache hit for ${cacheKey}`)
    return cachedData
  }

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      console.log(`Attempt ${attempt} for ${url}`)
      const response = await traktClient.get(url, { params })
      cache.set(cacheKey, response.data)
      return response.data
    } catch (error) {
      if (attempt === retries) {
        console.error(
          `Failed after ${retries} attempts:`,
          (axios.isAxiosError(error) && error.response?.data) ||
            (error as Error).message
        )
        throw error
      }
    }
  }
}

export default traktClient
