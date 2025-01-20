import traktClient from './traktApi'

// Search movies by title
export const searchMovies = async (query: string) => {
  try {
    const response = await traktClient.get('/search/movie', {
      params: { query },
    })
    return response.data.map((result: any) => result.movie)
  } catch (error) {
    console.error(
      'Error searching movies:',
      error.response?.data || error.message
    )
    throw new Error('Failed to search movies')
  }
}

// Fetch movies by filters (e.g., genre, year)
export const getMoviesByFilter = async (genre?: string, year?: number) => {
  try {
    const params: Record<string, string | number> = {}
    if (genre) params.genres = genre
    if (year) params.years = year

    const response = await traktClient.get('/movies/popular', { params })
    return response.data
  } catch (error) {
    console.error(
      'Error fetching movies by filter:',
      error.response?.data || error.message
    )
    throw new Error('Failed to fetch movies by filter')
  }
}
