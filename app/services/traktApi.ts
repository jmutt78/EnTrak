import axios from 'axios'

const traktClient = axios.create({
  baseURL: process.env.TRAKT_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'trakt-api-version': '2',
    'trakt-api-key': process.env.TRAKT_CLIENT_ID,
  },
})

export default traktClient

export const getTrendingMovies = async () => {
  try {
    const response = await traktClient.get('/movies/trending')
    console.log('Trending Movies Response:', response.data)
    return response.data
  } catch (error) {
    console.error(
      'Error fetching trending movies:',
      error.response?.data || error.message
    )
    throw error
  }
}
