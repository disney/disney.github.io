import { Octokit } from '@octokit/rest'

// Initialize Octokit - in production, use environment variables for auth
// If no token is provided, API calls will use unauthenticated rate limits (60 requests/hour)
const octokit = new Octokit({
  auth: process.env.GH_TOKEN || undefined, // Optional: for higher rate limits
})

export interface Repository {
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
  owner: string // Organization name
}

/**
 * Fetch all public repositories for a single organization
 */
export async function getOrgRepositories(org: string): Promise<Repository[]> {
  try {
    const { data } = await octokit.repos.listForOrg({
      org,
      type: 'public',
      sort: 'updated',
      per_page: 100,
    })

    return data.map((repo: any) => ({
      id: repo.id,
      name: repo.name,
      full_name: repo.full_name,
      description: repo.description,
      html_url: repo.html_url,
      language: repo.language,
      stargazers_count: repo.stargazers_count,
      forks_count: repo.forks_count,
      updated_at: repo.updated_at,
      topics: repo.topics || [],
      owner: org,
    }))
  } catch (error) {
    console.error(`Error fetching repositories for ${org}:`, error)
    // Return empty array on error to prevent site breakage
    return []
  }
}

/**
 * Fetch all public repositories for all Disney organizations
 */
export async function getDisneyRepositories(): Promise<Repository[]> {
  const { disneyOrganizations } = await import('./organizations')

  try {
    // Fetch repositories from all organizations in parallel
    const repositoryPromises = disneyOrganizations.map(org => getOrgRepositories(org))
    const results = await Promise.all(repositoryPromises)

    // Flatten and combine all repositories
    const allRepositories = results.flat()

    // Sort by updated date (most recent first)
    return allRepositories.sort((a, b) =>
      new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
    )
  } catch (error) {
    console.error('Error fetching Disney repositories:', error)
    // Return empty array on error to prevent site breakage
    return []
  }
}
