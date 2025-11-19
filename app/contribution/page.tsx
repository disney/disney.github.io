'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

interface ContributorProfileConfig {
  username: string
  featuredRepo?: string | null
  role?: string
  description?: string
}

interface GitHubUser {
  login: string
  name: string | null
  bio: string | null
  avatar_url: string
  html_url: string
  company: string | null
  location: string | null
}

interface RepositorySummary {
  name: string
  html_url: string
  description: string | null
  language: string | null
  stargazers_count: number
  forks_count: number
  owner: string
}

interface ContributorProfile {
  user: GitHubUser
  repository: RepositorySummary | null
  config: ContributorProfileConfig
}

export default function ContributionPage() {
  const [contributors, setContributors] = useState<ContributorProfile[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchContributors() {
      try {
        // Try static data first (for production builds)
        let response = await fetch('/data/contributors.json')
        if (response.ok) {
          const data = await response.json()
          if (Array.isArray(data) && data.length > 0) {
            setContributors(data)
            setLoading(false)
            return
          }
        }

        // Fallback to API route (for local development)
        response = await fetch('/api/contributors')
        if (!response.ok) {
          throw new Error('Failed to fetch contributor profiles')
        }

        const data = await response.json()
        setContributors(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unexpected error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchContributors()
  }, [])

  return (
    <div className="bg-gradient-to-b from-disney-light dark:from-gray-900 to-white dark:to-gray-800 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-disney-navy dark:text-disney-blue mb-8">Contributing to Open Source</h1>
      
      <div className="prose prose-lg max-w-none">
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-disney-navy dark:text-disney-blue mb-4">Overview</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Contributing to open source projects is a valuable way to give back to the community, 
            learn new skills, and collaborate with developers worldwide. This guide outlines how 
            Disney employees can contribute to open source projects, both internal and external.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-disney-navy dark:text-disney-blue mb-4">Contributing to Disney Projects</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            When contributing to Disney open source projects:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
            <li>Follow the project's contribution guidelines (CONTRIBUTING.md)</li>
            <li>Adhere to the project's code of conduct</li>
            <li>Ensure your contributions align with Disney's values and brand guidelines</li>
            <li>Maintain professional communication in all interactions</li>
            <li>Respect intellectual property and licensing requirements</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-disney-navy dark:text-disney-blue mb-4">Contributing to External Projects</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Before contributing to external open source projects:
          </p>
          <ol className="list-decimal pl-6 space-y-3 text-gray-700 dark:text-gray-300">
            <li>
              <strong>Review Project Guidelines:</strong> Read the project's CONTRIBUTING.md, 
              code of conduct, and any contributor agreements.
            </li>
            <li>
              <strong>Understand License Terms:</strong> Ensure you understand the project's 
              license and any contributor license agreements (CLAs).
            </li>
            <li>
              <strong>Check Company Policies:</strong> Verify that your contribution complies 
              with Disney's policies and doesn't conflict with company interests.
            </li>
            <li>
              <strong>Get Approval if Needed:</strong> For significant contributions or contributions 
              made during work time, consult with your manager and the OSPO.
            </li>
            <li>
              <strong>Maintain Professionalism:</strong> Represent Disney professionally in all 
              interactions with the open source community.
            </li>
          </ol>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-disney-navy dark:text-disney-blue mb-4">Types of Contributions</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-disney-navy dark:text-disney-blue mb-2">Code Contributions</h3>
              <ul className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300 text-sm">
                <li>Bug fixes</li>
                <li>New features</li>
                <li>Performance improvements</li>
                <li>Refactoring</li>
              </ul>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-disney-navy dark:text-disney-blue mb-2">Non-Code Contributions</h3>
              <ul className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300 text-sm">
                <li>Documentation improvements</li>
                <li>Bug reports</li>
                <li>Feature requests</li>
                <li>Community support</li>
                <li>Design and UX feedback</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-disney-navy dark:text-disney-blue mb-4">Best Practices</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-semibold text-disney-navy dark:text-disney-blue mb-2">Before Contributing</h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                <li>Search existing issues and pull requests to avoid duplicates</li>
                <li>Start with small contributions to build trust and understanding</li>
                <li>Communicate your intentions before starting significant work</li>
                <li>Ensure your code follows the project's style guidelines</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-disney-navy dark:text-disney-blue mb-2">Making Contributions</h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                <li>Write clear, descriptive commit messages</li>
                <li>Include tests for new features and bug fixes</li>
                <li>Update documentation as needed</li>
                <li>Keep pull requests focused and reasonably sized</li>
                <li>Respond to feedback professionally and constructively</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-disney-navy dark:text-disney-blue mb-2">After Contributing</h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                <li>Be patient with maintainers' review timelines</li>
                <li>Engage in discussions about your contributions</li>
                <li>Continue to support and maintain your contributions</li>
                <li>Celebrate the collaborative success!</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-disney-navy dark:text-disney-blue mb-4">Legal Considerations</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            When contributing to open source:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
            <li>Ensure you have the right to contribute the code</li>
            <li>Understand and comply with contributor license agreements</li>
            <li>Don't include proprietary Disney code or trade secrets</li>
            <li>Respect third-party intellectual property rights</li>
            <li>When in doubt, consult with legal or the OSPO</li>
          </ul>
        </section>

        <section className="mb-12 bg-disney-light dark:bg-gray-800 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold text-disney-navy dark:text-disney-blue mb-4">Getting Started</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Ready to contribute? Here are some ways to get started:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
            <li>Browse Disney's open source repositories to find projects that interest you</li>
            <li>Look for "good first issue" labels in project issue trackers</li>
            <li>Join project communication channels (Discord, Slack, forums)</li>
            <li>Start with documentation improvements or small bug fixes</li>
            <li>Reach out to project maintainers with questions</li>
          </ul>
        </section>
      </div>

      {/* Disney Employee Contributions Section */}
      <section className="mt-16">
        <h2 className="text-3xl font-bold text-disney-navy dark:text-disney-blue mb-6">
          Disney Employee Contributions
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-8 text-lg max-w-3xl">
          Discover open source contributors across The Walt Disney Company. This curated list is managed
          by the Open Source Program Office and highlights individuals whose contributions have been
          approved for public recognition.
        </p>

        <div className="bg-disney-light dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-8 mb-10">
          <h3 className="text-2xl font-semibold text-disney-navy dark:text-disney-blue mb-4">
            How Contributors Are Selected
          </h3>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Profiles featured here are nominated by teams across Disney and reviewed for brand and
            privacy compliance. Once approved, they can be added to this list by updating a simple
            configuration file, making it easy to recognize additional contributors over time.
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            To add someone new, update the configuration in <code className="px-1 py-0.5 bg-white/70 dark:bg-gray-900 rounded text-sm">lib/contributors.ts</code>
            and deploy. For contributors with GitHub accounts, the site will automatically pull their GitHub profile 
            and highlight one of their public repositories. For contributors without GitHub accounts, provide their 
            name and email to create a profile.
          </p>
        </div>

        {loading ? (
          <div className="text-center py-16">
            <p className="text-gray-600 dark:text-gray-400">Loading contributor profiles...</p>
          </div>
        ) : error ? (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-red-800 dark:text-red-300 mb-2">Unable to load contributors</h3>
            <p className="text-red-700 dark:text-red-400">{error}</p>
          </div>
        ) : contributors.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-12 text-center">
            <h3 className="text-xl font-semibold text-disney-navy dark:text-disney-blue mb-4">
              No approved contributor profiles yet
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
              Once contributor profiles are added to <code className="px-1 py-0.5 bg-disney-light/80 dark:bg-gray-900 rounded text-sm">lib/contributors.ts</code>,
              they will appear here automatically with their GitHub profile information and highlighted
              projects.
            </p>
            <div className="bg-disney-light dark:bg-gray-900 rounded-lg p-6 max-w-2xl mx-auto text-left">
              <h4 className="font-semibold text-disney-navy dark:text-disney-blue mb-3">
                Tip for administrators
              </h4>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300 text-sm">
                <li>Ensure the nominee has approved being featured publicly.</li>
                <li>Optionally specify a <code className="px-1 py-0.5 bg-white/70 dark:bg-gray-800 rounded text-xs">featuredRepo</code> to highlight their favorite project.</li>
                <li>Provide a short description or role to contextualize their contributions.</li>
              </ul>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            {contributors.map(({ user, repository, config }) => {
              const displayName = user.name || user.login
              const profileDescription = config.description || user.bio
              const isMockProfile = user.html_url.startsWith('mailto:')
              const email = isMockProfile ? user.html_url.replace('mailto:', '') : null

              return (
                <div
                  key={user.login}
                  className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 md:p-8 shadow-sm"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                    <div className="flex items-start gap-4">
                      <Image
                        src={user.avatar_url}
                        alt={`${displayName} avatar`}
                        width={96}
                        height={96}
                        className="rounded-full border border-gray-200 dark:border-gray-700"
                      />
                      <div>
                        <h3 className="text-2xl font-semibold text-disney-navy dark:text-disney-blue">
                          {displayName}
                        </h3>
                        {!isMockProfile ? (
                          <a
                            href={user.html_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-disney-blue hover:underline"
                          >
                            @{user.login}
                          </a>
                        ) : email ? (
                          <a
                            href={`mailto:${email}`}
                            className="text-sm text-disney-blue hover:underline"
                          >
                            {email}
                          </a>
                        ) : (
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            {displayName}
                          </span>
                        )}
                        {config.role && (
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                            {config.role}
                          </p>
                        )}
                        {(user.company || user.location) && (
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                            {[user.company, user.location].filter(Boolean).join(' • ')}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      {!isMockProfile ? (
                        <a
                          href={user.html_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center px-4 py-2 border border-disney-blue text-disney-blue dark:text-disney-blue rounded-lg hover:bg-disney-blue hover:text-white transition-colors"
                        >
                          View GitHub Profile
                        </a>
                      ) : email ? (
                        <a
                          href={`mailto:${email}`}
                          className="inline-flex items-center justify-center px-4 py-2 border border-disney-blue text-disney-blue dark:text-disney-blue rounded-lg hover:bg-disney-blue hover:text-white transition-colors"
                        >
                          Contact
                        </a>
                      ) : null}
                    </div>
                  </div>

                  {profileDescription && (
                    <p className="mt-4 text-gray-700 dark:text-gray-300 leading-relaxed">
                      {profileDescription}
                    </p>
                  )}

                  {repository && (
                    <div className="mt-6 border-t border-gray-200 dark:border-gray-700 pt-6">
                      <h4 className="text-lg font-semibold text-disney-navy dark:text-disney-blue mb-3">
                        Highlighted Project
                      </h4>
                      <div>
                        <a
                          href={repository.html_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xl font-semibold text-disney-blue hover:underline"
                        >
                          {repository.owner}/{repository.name}
                        </a>
                        {repository.description && (
                          <p className="mt-2 text-gray-700 dark:text-gray-300">
                            {repository.description}
                          </p>
                        )}
                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mt-4">
                          {repository.language && (
                            <span className="flex items-center">
                              <span className="w-2.5 h-2.5 rounded-full bg-disney-blue mr-2"></span>
                              {repository.language}
                            </span>
                          )}
                          <span>⭐ {repository.stargazers_count.toLocaleString()}</span>
                          <span>🍴 {repository.forks_count.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </section>
      </div>
    </div>
  )
}

