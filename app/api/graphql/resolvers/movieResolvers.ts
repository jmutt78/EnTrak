import { getTrendingMovies } from '@/app/services/traktApi'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const movieResolvers = {
  Query: {
    trendingMovies: async () => {
      try {
        const movies = await getTrendingMovies()
        return movies
          .map((item: any) => item.movie) // Extract the `movie` object
          .filter((movie: any) => movie.title) // Ensure the `movie` object has a `title`
          .map((movie: any) => ({
            title: movie.title,
            year: movie.year,
            ids: movie.ids,
          }))
      } catch (error) {
        throw new Error('Failed to fetch trending movies')
      }
    },
  },
}
