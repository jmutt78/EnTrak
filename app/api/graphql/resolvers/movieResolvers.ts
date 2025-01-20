import { searchMovies, getMoviesByFilter } from '@/app/services/movies'

export const movieResolvers = {
  Query: {
    searchMovies: async (_: any, args: { query: string }) => {
      try {
        const movies = await searchMovies(args.query)
        return movies.map((movie: any) => ({
          title: movie.title,
          year: movie.year,
          ids: movie.ids,
        }))
      } catch (error) {
        throw new Error('Failed to search movies')
      }
    },
    filterMovies: async (_: any, args: { genre?: string; year?: number }) => {
      try {
        const movies = await getMoviesByFilter(args.genre, args.year)
        return movies.map((movie: any) => ({
          title: movie.title,
          year: movie.year,
          ids: movie.ids,
        }))
      } catch (error) {
        throw new Error('Failed to fetch movies by filter')
      }
    },
  },
}
