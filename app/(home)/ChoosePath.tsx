import Link from 'next/link'

export const ChoosePath = () => {
  const tvPath = '/tv'
  const moviePath = '/movie'
  const bookPath = '/book'

  return (
    <div className="w-screen h-screen bg-white dark:bg-black flex justify-center items-center text-black dark:text-white">
      <div className="w-full max-w-[600px] mx-auto">
        <h1 className="text-4xl mb-4">Choose Your Path</h1>
        <p className="text-xl text-gray-600 dark:text-white/60 mb-6">
          Select the tool that best fits your needs.
        </p>
        <div className="flex space-x-4">
          <Link href={tvPath}>
            <button className="bg-blue-500 dark:bg-blue-600 px-4 py-2 rounded-lg text-xl text-white">
              TV Shows
            </button>
          </Link>
          <Link href={moviePath}>
            <button className="bg-green-500 dark:bg-green-600 px-4 py-2 rounded-lg text-xl text-white">
              Movies
            </button>
          </Link>
          <Link href={bookPath}>
            <button className="bg-yellow-500 dark:bg-yellow-600 px-4 py-2 rounded-lg text-xl text-white">
              Books
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}
