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

interface GitHubUser {
  login: string
  name: string | null
  bio: string | null
  avatar_url: string
  html_url: string
  public_repos: number
  followers: number
  following: number
  company: string | null
  location: string | null
}

interface FeaturedProfile {
  user: GitHubUser
  repository: Repository | null
  config: {
    username: string
    featuredRepo: string | null
    description: string
  }
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
  const [featured, setFeatured] = useState<FeaturedProfile[]>([])
  const [featuredLoading, setFeaturedLoading] = useState(true)

  useEffect(() => {
    async function fetchRepositories() {
      try {
        const response = await fetch('/data/repositories.json')
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

    async function fetchFeatured() {
      try {
        const response = await fetch('/data/featured.json')
        if (response.ok) {
          const data = await response.json()
          if (Array.isArray(data) && data.length > 0) {
            setFeatured(data)
            return
          }
        }

        // Fallback to API route if static data is unavailable
        const apiResponse = await fetch('/api/featured')
        if (apiResponse.ok) {
          const apiData = await apiResponse.json()
          if (Array.isArray(apiData)) {
            setFeatured(apiData)
          }
        }
      } catch (err) {
        console.error('Failed to fetch featured profiles:', err)
      } finally {
        setFeaturedLoading(false)
      }
    }

    fetchRepositories()
    fetchFeatured()
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

          <Link 
            href="/usage"
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200 dark:border-gray-700"
          >
            <h2 className="text-2xl font-semibold text-disney-navy dark:text-disney-blue mb-3">Using Open Source</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Guidelines and best practices for using open source software in your projects at Disney.
            </p>
            <span className="text-disney-blue font-medium inline-flex items-center">
              Learn more →
            </span>
          </Link>

          <Link 
            href="/distribution"
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200 dark:border-gray-700"
          >
            <h2 className="text-2xl font-semibold text-disney-navy dark:text-disney-blue mb-3">Distribution</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Understand how to properly distribute open source software and comply with licensing requirements.
            </p>
            <span className="text-disney-blue font-medium inline-flex items-center">
              Learn more →
            </span>
          </Link>

          <Link 
            href="/release"
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200 dark:border-gray-700"
          >
            <h2 className="text-2xl font-semibold text-disney-navy dark:text-disney-blue mb-3">Releasing Open Source</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Step-by-step process for releasing your code as open source at Disney, plus explore our released repositories.
            </p>
            <span className="text-disney-blue font-medium inline-flex items-center">
              Learn more →
            </span>
          </Link>

          <Link 
            href="/contribution"
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200 dark:border-gray-700"
          >
            <h2 className="text-2xl font-semibold text-disney-navy dark:text-disney-blue mb-3">Contributing</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              How to contribute to open source projects, both internal and external, as a Disney employee.
            </p>
            <span className="text-disney-blue font-medium inline-flex items-center">
              Learn more →
            </span>
          </Link>
        </div>

        {/* Featured Profiles Section */}
        {featuredLoading ? (
          <div className="mt-16 text-center py-8">
            <p className="text-gray-600 dark:text-gray-400">Loading featured contributors...</p>
          </div>
        ) : featured.length > 0 ? (
          <section className="mt-16 mb-12">
            <div className="bg-gradient-to-r from-disney-blue to-disney-navy dark:from-disney-navy dark:to-gray-900 rounded-2xl p-8 md:p-12 text-white shadow-xl">
              <div className="text-center mb-8">
                <h2 className="text-3xl md:text-4xl font-bold mb-3">Featured Contributors</h2>
                <p className="text-blue-100 dark:text-gray-300 text-lg max-w-3xl mx-auto">
                  Celebrating Disney employees who are championing open source collaboration across the company.
                </p>
              </div>

              <div className={`grid gap-8 ${featured.length > 1 ? 'md:grid-cols-2' : ''}`}>
                {featured.map((profile) => {
                  const displayName = profile.user.name || profile.user.login
                  return (
                    <article
                      key={profile.user.login}
                      className="bg-white/10 dark:bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 flex flex-col h-full"
                    >
                      <div className="flex items-start gap-4 mb-4">
                        <Image
                          src={profile.user.avatar_url}
                          alt={`${displayName} avatar`}
                          width={80}
                          height={80}
                          className="w-20 h-20 rounded-full border-4 border-white/20 object-cover"
                          sizes="80px"
                        />
                        <div className="flex-1">
                          <h3 className="text-2xl font-bold mb-1">
                            <Link
                              href={profile.user.html_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="hover:underline"
                            >
                              {displayName}
                            </Link>
                          </h3>
                          <p className="text-blue-100 dark:text-gray-300 mb-2">
                            @{profile.user.login}
                          </p>
                          {profile.user.bio && (
                            <p className="text-white/90 dark:text-gray-200 text-sm mb-3">
                              {profile.user.bio}
                            </p>
                          )}
                          <div className="flex flex-wrap gap-4 text-sm text-blue-100 dark:text-gray-300">
                            {profile.user.location && <span>📍 {profile.user.location}</span>}
                            {profile.user.company && <span>🏢 {profile.user.company}</span>}
                          </div>
                        </div>
                      </div>

                      {profile.config.description && (
                        <p className="text-blue-100 dark:text-gray-300 text-sm mb-4">
                          {profile.config.description}
                        </p>
                      )}

                      <div className="flex gap-6 pt-4 border-t border-white/20">
                        <div className="text-center">
                          <div className="text-2xl font-bold">{profile.user.public_repos}</div>
                          <div className="text-sm text-blue-100 dark:text-gray-300">Repositories</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold">{profile.user.followers}</div>
                          <div className="text-sm text-blue-100 dark:text-gray-300">Followers</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold">{profile.user.following}</div>
                          <div className="text-sm text-blue-100 dark:text-gray-300">Following</div>
                        </div>
                      </div>

                      <div className="mt-4">
                        <Link
                          href={profile.user.html_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block bg-white text-disney-blue px-6 py-2 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
                        >
                          View GitHub Profile →
                        </Link>
                      </div>

                      {profile.repository ? (
                        <div className="mt-6 border-t border-white/20 pt-6">
                          <h3 className="text-lg font-semibold mb-3">Highlighted Project</h3>
                          <h4 className="text-xl font-semibold mb-2">
                            <Link
                              href={profile.repository.html_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="hover:underline"
                            >
                              {profile.repository.name}
                            </Link>
                          </h4>
                          {profile.repository.description && (
                            <p className="text-white/90 dark:text-gray-200 mb-4">
                              {profile.repository.description}
                            </p>
                          )}
                          <div className="flex flex-wrap items-center gap-4 mb-4 text-sm">
                            {profile.repository.language && (
                              <span className="flex items-center">
                                <span className="w-3 h-3 rounded-full bg-white mr-2"></span>
                                {profile.repository.language}
                              </span>
                            )}
                            <span className="flex items-center">
                              ⭐ {profile.repository.stargazers_count.toLocaleString()} stars
                            </span>
                            <span className="flex items-center">
                              🍴 {profile.repository.forks_count.toLocaleString()} forks
                            </span>
                          </div>
                          {profile.repository.topics.length > 0 && (
                            <div className="flex flex-wrap gap-2 mb-4">
                              {profile.repository.topics.slice(0, 5).map((topic) => (
                                <span
                                  key={`${profile.user.login}-${topic}`}
                                  className="px-2 py-1 bg-white/20 text-white text-xs rounded"
                                >
                                  {topic}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      ) : (
                        <p className="mt-6 text-blue-100 dark:text-gray-300 text-sm border-t border-white/20 pt-6">
                          No highlighted project selected yet. Check back for updates.
                        </p>
                      )}
                    </article>
                  )
                })}
              </div>
            </div>
          </section>
        ) : (
          <div className="mt-16 text-center py-8">
            <p className="text-gray-600 dark:text-gray-400">No featured contributors at this time. Check back soon!</p>
          </div>
        )}

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

        <div className="mt-16 text-center">
          <Link 
            href="/contribution"
            className="inline-block bg-disney-blue dark:bg-disney-blue text-white dark:text-white px-8 py-4 rounded-lg font-semibold hover:bg-disney-navy dark:hover:bg-disney-navy transition-colors"
          >
            View Disney Employee Contributions
          </Link>
        </div>
      </div>
    </div>
  )
}
