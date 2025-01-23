import axios from 'axios'
import traktClient from './traktClient'

// Search movies by title
import { cachedRequest } from './traktClient'
import { log } from 'console'

export const searchMovies = async (query: string) => {
  const results = await cachedRequest('/search/movie', { query })
  console.log('Search Movies Response:', results)
  return results
}

// Fetch movies by filters (e.g., genre, year)
export const getMoviesByFilter = async (
  genre?: string,
  year?: number,
  rating?: string, // Example: "80-100" (percent range)
  runtime?: string, // Example: "90-120" (minutes range)
  sortBy: string = 'title', // Default sorting by title
  page: number = 1,
  limit: number = 10
) => {
  try {
    const params: Record<string, string | number> = {
      page,
      limit,
      sort_by: sortBy,
    }
    if (genre) params.genres = genre
    if (year) params.years = year
    if (rating) params.ratings = rating
    if (runtime) params.runtimes = runtime

    console.log('Filter Movies Params:', params)

    const response = await traktClient.get('/movies/popular', { params })
    console.log('Filter Movies Response:', response.data)
    return {
      movies: response.data.map((movie: any) => ({
        title: movie.title,
        year: movie.year,
        ids: movie.ids,
      })),
      metadata: {
        page,
        limit,
        total: parseInt(response.headers['x-pagination-item-count'], 10),
      },
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        'Error fetching movies by filter:',
        error.response?.data || error.message
      )
    } else {
      console.error('Error fetching movies by filter:', error)
    }
    throw new Error('Failed to fetch movies by filter')
  }
}
