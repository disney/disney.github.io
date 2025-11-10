'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
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

export default function ReleasePage() {
  const [repositories, setRepositories] = useState<Repository[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filter, setFilter] = useState('')
  const [orgFilter, setOrgFilter] = useState<string>('all')
  const [sortBy, setSortBy] = useState<'updated' | 'stars' | 'name'>('updated')

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

    fetchRepositories()
  }, [])

  // Get unique organizations for filter dropdown
  const uniqueOrgs = Array.from(new Set(repositories.map(r => r.owner))).sort()

  const filteredAndSorted = repositories
    .filter((repo) => {
      const matchesSearch = repo.name.toLowerCase().includes(filter.toLowerCase()) ||
        repo.description?.toLowerCase().includes(filter.toLowerCase())
      const matchesOrg = orgFilter === 'all' || repo.owner === orgFilter
      return matchesSearch && matchesOrg
    })
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

  return (
    <div className="bg-gradient-to-b from-disney-light dark:from-gray-900 to-white dark:to-gray-800 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-disney-navy dark:text-disney-blue mb-8">Releasing Open Source at Disney</h1>
        
        <div className="prose prose-lg max-w-none mb-12">
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-disney-navy dark:text-disney-blue mb-4">Overview</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Releasing code as open source requires careful planning, legal review, and adherence 
              to Disney's policies. This guide walks you through the process of open sourcing 
              your project at Disney.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-disney-navy dark:text-disney-blue mb-4">Pre-Release Checklist</h2>
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-disney-blue mr-3 font-bold">1.</span>
                  <div>
                    <strong className="text-disney-navy dark:text-disney-blue">Legal Review:</strong>
                    <p className="text-gray-700 dark:text-gray-300 text-sm mt-1">
                      Ensure all code is cleared for open source release. Remove any proprietary 
                      code, trade secrets, or third-party code without proper licensing.
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-disney-blue mr-3 font-bold">2.</span>
                  <div>
                    <strong className="text-disney-navy dark:text-disney-blue">License Selection:</strong>
                    <p className="text-gray-700 dark:text-gray-300 text-sm mt-1">
                      Choose an appropriate open source license. Common choices include MIT, Apache 2.0, 
                      or GPL. Consult with legal and the OSPO for guidance.
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-disney-blue mr-3 font-bold">3.</span>
                  <div>
                    <strong className="text-disney-navy dark:text-disney-blue">Code Quality:</strong>
                    <p className="text-gray-700 dark:text-gray-300 text-sm mt-1">
                      Ensure code meets quality standards, includes documentation, and follows 
                      best practices for open source projects.
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-disney-blue mr-3 font-bold">4.</span>
                  <div>
                    <strong className="text-disney-navy dark:text-disney-blue">Brand Compliance:</strong>
                    <p className="text-gray-700 dark:text-gray-300 text-sm mt-1">
                      Review all content for compliance with Disney brand guidelines. Ensure 
                      proper use of trademarks and brand assets.
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-disney-blue mr-3 font-bold">5.</span>
                  <div>
                    <strong className="text-disney-navy dark:text-disney-blue">Documentation:</strong>
                    <p className="text-gray-700 dark:text-gray-300 text-sm mt-1">
                      Create comprehensive README, contribution guidelines, code of conduct, 
                      and other necessary documentation.
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-disney-blue mr-3 font-bold">6.</span>
                  <div>
                    <strong className="text-disney-navy dark:text-disney-blue">Approval:</strong>
                    <p className="text-gray-700 dark:text-gray-300 text-sm mt-1">
                      Obtain necessary approvals from your team, legal, security, and the 
                      Open Source Program Office.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-disney-navy dark:text-disney-blue mb-4">Release Process</h2>
            <ol className="list-decimal pl-6 space-y-4 text-gray-700 dark:text-gray-300">
              <li>
                <strong>Submit Release Request:</strong> Contact the Open Source Program Office 
                with details about your project, including purpose, license choice, and intended 
                repository location.
              </li>
              <li>
                <strong>Legal and Security Review:</strong> Your project will undergo review to 
                ensure compliance with legal requirements and security standards.
              </li>
              <li>
                <strong>Brand Review:</strong> All public-facing content will be reviewed for 
                brand guideline compliance.
              </li>
              <li>
                <strong>Repository Setup:</strong> Once approved, the repository will be set up 
                under the Disney GitHub organization with appropriate access controls.
              </li>
              <li>
                <strong>Initial Release:</strong> Create your first release with proper versioning, 
                release notes, and documentation.
              </li>
              <li>
                <strong>Announcement:</strong> Coordinate with the OSPO for appropriate announcement 
                and promotion of your open source project.
              </li>
            </ol>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-disney-navy dark:text-disney-blue mb-4">Required Files</h2>
            <div className="space-y-3">
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                <h3 className="font-semibold text-disney-navy dark:text-disney-blue mb-2">LICENSE</h3>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  Include the full text of your chosen open source license.
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                <h3 className="font-semibold text-disney-navy dark:text-disney-blue mb-2">README.md</h3>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  Comprehensive project documentation including description, installation, usage, 
                  and contribution guidelines.
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                <h3 className="font-semibold text-disney-navy dark:text-disney-blue mb-2">CONTRIBUTING.md</h3>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  Guidelines for external contributors, including code style, testing requirements, 
                  and pull request process.
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                <h3 className="font-semibold text-disney-navy dark:text-disney-blue mb-2">CODE_OF_CONDUCT.md</h3>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  Community standards and expectations for contributors and maintainers.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-disney-navy dark:text-disney-blue mb-4">Ongoing Maintenance</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Once released, open source projects require ongoing maintenance:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
              <li>Respond to issues and pull requests in a timely manner</li>
              <li>Maintain code quality and security</li>
              <li>Keep dependencies up to date</li>
              <li>Engage with the community professionally</li>
              <li>Regularly review and update documentation</li>
            </ul>
          </section>
        </div>

        {/* Disney Open Source Repositories Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-disney-navy dark:text-disney-blue mb-4">Disney Open Source Repositories</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-8 text-lg">
            Explore public repositories that have been released by Disney teams. These projects 
            have gone through the release process and are available for the open source community.
          </p>

          {loading ? (
            <div className="text-center py-12">
              <p className="text-gray-600 dark:text-gray-400">Loading repositories...</p>
            </div>
          ) : error ? (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-red-800 dark:text-red-300 mb-2">Error</h3>
              <p className="text-red-700 dark:text-red-400">{error}</p>
            </div>
          ) : (
            <>
              {/* Filters and Search */}
              <div className="mb-8 space-y-4 md:flex md:items-center md:space-y-0 md:space-x-4">
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
                    value={orgFilter}
                    onChange={(e) => setOrgFilter(e.target.value)}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-disney-blue focus:border-transparent"
                  >
                    <option value="all">All Organizations</option>
                    {uniqueOrgs.map((org) => (
                      <option key={org} value={org}>
                        {organizationNames[org] || org}
                      </option>
                    ))}
                  </select>
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

        <section className="mb-12 bg-disney-light dark:bg-gray-800 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold text-disney-navy dark:text-disney-blue mb-4">Get Started</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Ready to open source your project? Contact the Open Source Program Office to begin 
            the release process.
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            We're here to help guide you through each step and ensure a successful open source release.
          </p>
        </section>
      </div>
    </div>
  )
}
