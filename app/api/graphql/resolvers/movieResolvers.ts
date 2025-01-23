import { searchMovies, getMoviesByFilter } from '@/app/services/movies'

export const movieResolvers = {
  Query: {
    searchMovies: async (_: any, args: { query: string }) => {
      try {
        const results = await searchMovies(args.query)

        // Map results to the schema and log output
        const mappedResults = results.map((result: any) => ({
          title: result.movie.title,
          year: result.movie.year,
          ids: result.movie.ids,
        }))

        console.log('Mapped Results for GraphQL:', mappedResults)
        return mappedResults
      } catch (error) {
        console.error(
          'Error in searchMovies resolver:',
          (error as Error).message
        )
        throw new Error('Failed to search movies')
      }
    },

    filterMovies: async (
      _: any,
      args: {
        genre?: string
        year?: number
        rating?: string
        runtime?: string
        sortBy?: string
        page?: number
        limit?: number
      }
    ) => {
      try {
        const { movies, metadata } = await getMoviesByFilter(
          args.genre,
          args.year,
          args.rating,
          args.runtime,
          args.sortBy || 'title',
          args.page || 1,
          args.limit || 10
        )

        return { movies, metadata }
      } catch (error) {
        console.error(
          'Error in filterMovies resolver:',
          (error as Error).message
        )
        throw new Error('Failed to fetch movies by filter')
      }
    },
  },
}
