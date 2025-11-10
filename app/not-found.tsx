import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="bg-gradient-to-b from-disney-light dark:from-gray-900 to-white dark:to-gray-800 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
      <h1 className="text-6xl font-bold text-disney-navy dark:text-disney-blue mb-4">404</h1>
      <h2 className="text-3xl font-semibold text-gray-700 dark:text-gray-300 mb-6">Page Not Found</h2>
      <p className="text-gray-600 dark:text-gray-300 mb-8">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link
        href="/"
        className="inline-block bg-disney-blue text-white px-6 py-3 rounded-lg font-semibold hover:bg-disney-navy transition-colors"
      >
        Return Home
      </Link>
      </div>
    </div>
  )
}

