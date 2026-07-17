'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { organizationNames } from '@/lib/organizations'

interface Repository {
  id: number
  name: string
  full_name: string
  description: string | null
  html_url: string
  language: string | null
  stargazers_count: number
  forks_count: number
  updated_at: string
  topics: string[]
  owner: string
}

const disneyBrands = [
  { name: 'Walt Disney Studios', category: 'Studios' },
  { name: 'Marvel Studios', category: 'Studios' },
  { name: 'Lucasfilm', category: 'Studios' },
  { name: 'Pixar Animation Studios', category: 'Studios' },
  { name: '20th Century Studios', category: 'Studios' },
  { name: 'Searchlight Pictures', category: 'Studios' },
  { name: 'Disney Parks, Experiences and Products', category: 'Business Units' },
  { name: 'Disney Media Networks', category: 'Business Units' },
  { name: 'ESPN', category: 'Business Units' },
  { name: 'ABC', category: 'Business Units' },
  { name: 'National Geographic', category: 'Business Units' },
  { name: 'Hulu', category: 'Business Units' },
  { name: 'Disney+', category: 'Business Units' },
  { name: 'Disney Consumer Products', category: 'Business Units' },
]

export default function Home() {
  const [repositories, setRepositories] = useState<Repository[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filter, setFilter] = useState('')
  const [sortBy, setSortBy] = useState<'updated' | 'stars' | 'name'>('updated')

  useEffect(() => {
    async function fetchRepositories() {
      try {
        // Try static data first (for production builds)
        let response = await fetch('/data/repositories.json')
        if (response.ok) {
          const data = await response.json()
          if (Array.isArray(data) && data.length > 0) {
            setRepositories(data)
            setLoading(false)
            return
          }
        }

        // Fallback to API route (for local development)
        response = await fetch('/api/repositories')
        if (!response.ok) {
          throw new Error('Failed to fetch repositories')
        }
        const data = await response.json()
        setRepositories(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchRepositories()
  }, [])

  const filteredAndSorted = repositories
    .filter((repo) =>
      repo.name.toLowerCase().includes(filter.toLowerCase()) ||
      repo.description?.toLowerCase().includes(filter.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'stars':
          return b.stargazers_count - a.stargazers_count
        case 'name':
          return a.name.localeCompare(b.name)
        case 'updated':
        default:
          return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
      }
    })

  const studios = disneyBrands.filter(b => b.category === 'Studios')
  const businessUnits = disneyBrands.filter(b => b.category === 'Business Units')

  return (
    <div className="bg-gradient-to-b from-disney-light dark:from-gray-900 to-white dark:to-gray-800 min-h-screen">
      {/* Hero Section with Image */}
      <div className="relative w-full h-[60vh] min-h-[500px] max-h-[700px] overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/disney-hero.jpg"
            alt="The Walt Disney Company Brands and Studios"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60 dark:from-black/60 dark:via-black/40 dark:to-black/80"></div>
        </div>
        <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 drop-shadow-2xl">
            Disney Open Source Program Office
          </h1>
          <p className="text-xl md:text-2xl text-white/95 max-w-3xl mx-auto drop-shadow-lg">
            Welcome to The Walt Disney Company's Open Source Program Office. 
            Discover our policies, learn how to contribute, and explore our open source projects.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Introduction Section */}
        <section className="mb-12 text-center max-w-4xl mx-auto">
          <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
            Open Source Software is important to The Walt Disney Company. Disney has established an Open Source Program to encourage our developers to utilize Open Source, contribute to Open Source projects, and to release software as Open Source. We've created this site to highlight Disney's Open Source projects. We encourage you to explore our projects and we welcome your collaboration and contributions. This is just the beginning; there's more to come, so stay tuned! 
          </p> <br></br>
          <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
            Interested in working with us on projects like this and more? Check out our current job opportunities at{' '}
            <a
              href="http://disneytech.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-disney-blue dark:text-disney-blue hover:underline font-semibold"
            >
              disneytech.com
            </a>
            .
          </p>
        </section>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          <Link 
            href="/policies"
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200 dark:border-gray-700"
          >
            <h2 className="text-2xl font-semibold text-disney-navy dark:text-disney-blue mb-3">Policies</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Learn about our open source policies and guidelines for using, distributing, and releasing open source software.
            </p>
            <span className="text-disney-blue font-medium inline-flex items-center">
              Learn more →
            </span>
          </Link>
        </div>

        {/* Disney Brands and Studios Section */}
        <section className="mt-16 mb-12">
          <h2 className="text-3xl font-bold text-disney-navy dark:text-disney-blue mb-8 text-center">
            The Walt Disney Company Brands & Studios
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-8 text-center max-w-3xl mx-auto">
            The Walt Disney Company encompasses a diverse portfolio of brands, studios, and business units, 
            each contributing to our commitment to innovation and open source collaboration.
          </p>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-semibold text-disney-navy dark:text-disney-blue mb-4">Studios</h3>
              <ul className="space-y-2">
                {studios.map((studio, index) => (
                  <li key={index} className="text-gray-700 dark:text-gray-300">
                    {studio.name}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-semibold text-disney-navy dark:text-disney-blue mb-4">Business Units</h3>
              <ul className="space-y-2">
                {businessUnits.map((unit, index) => (
                  <li key={index} className="text-gray-700 dark:text-gray-300">
                    {unit.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Disney Open Source Repositories Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-disney-navy dark:text-disney-blue mb-4 text-center">
            Disney Open Source Repositories
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-8 text-center text-lg max-w-3xl mx-auto">
            Explore public repositories that have been released by Disney teams. These projects 
            have gone through the release process and are available for the open source community.
          </p>

          {loading ? (
            <div className="text-center py-12">
              <p className="text-gray-600 dark:text-gray-400">Loading repositories...</p>
            </div>
          ) : error ? (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 max-w-2xl mx-auto">
              <h3 className="text-xl font-semibold text-red-800 dark:text-red-300 mb-2">Error</h3>
              <p className="text-red-700 dark:text-red-400">{error}</p>
            </div>
          ) : (
            <>
              {/* Filters and Search */}
              <div className="mb-8 space-y-4 md:flex md:items-center md:space-y-0 md:space-x-4 max-w-4xl mx-auto">
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="Search repositories..."
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-disney-blue focus:border-transparent"
                  />
                </div>
                <div>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as 'updated' | 'stars' | 'name')}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-disney-blue focus:border-transparent"
                  >
                    <option value="updated">Recently Updated</option>
                    <option value="stars">Most Stars</option>
                    <option value="name">Name (A-Z)</option>
                  </select>
                </div>
              </div>

              {/* Repository List */}
              {filteredAndSorted.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-600 dark:text-gray-400">No repositories found matching your search.</p>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredAndSorted.map((repo) => (
                    <div
                      key={repo.id}
                      className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-lg transition-shadow"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold text-disney-navy dark:text-disney-blue">
                            <Link
                              href={repo.html_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="hover:text-disney-blue transition-colors"
                            >
                              {repo.name}
                            </Link>
                          </h3>
                          <span className="text-xs text-gray-500 dark:text-gray-400 mt-1 block">
                            {organizationNames[repo.owner] || repo.owner}
                          </span>
                        </div>
                      </div>
                      
                      {repo.description && (
                        <p className="text-gray-700 dark:text-gray-300 text-sm mb-4 line-clamp-2">
                          {repo.description}
                        </p>
                      )}

                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
                        {repo.language && (
                          <span className="flex items-center">
                            <span className="w-3 h-3 rounded-full bg-disney-blue mr-2"></span>
                            {repo.language}
                          </span>
                        )}
                        <span className="flex items-center">
                          ⭐ {repo.stargazers_count.toLocaleString()}
                        </span>
                        <span className="flex items-center">
                          🍴 {repo.forks_count.toLocaleString()}
                        </span>
                      </div>

                      {repo.topics.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {repo.topics.slice(0, 3).map((topic) => (
                            <span
                              key={topic}
                              className="px-2 py-1 bg-disney-light dark:bg-gray-700 text-disney-navy dark:text-disney-blue text-xs rounded"
                            >
                              {topic}
                            </span>
                          ))}
                          {repo.topics.length > 3 && (
                            <span className="px-2 py-1 text-gray-500 dark:text-gray-400 text-xs">
                              +{repo.topics.length - 3} more
                            </span>
                          )}
                        </div>
                      )}

                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        Updated {new Date(repo.updated_at).toLocaleDateString()}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-8 text-center text-gray-600 dark:text-gray-400">
                <p>
                  Showing {filteredAndSorted.length} of {repositories.length} repositories
                </p>
              </div>
            </>
          )}
        </section>
      </div>
    </div>
  )
}
