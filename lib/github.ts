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

export interface Contribution {
  repo: string
  repoUrl: string
  contributions: number
  avatar?: string
}

export interface GitHubUser {
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

/**
 * Get repository details by name
 */
export async function getRepository(owner: string, repo: string): Promise<Repository | null> {
  try {
    const { data } = await octokit.repos.get({
      owner,
      repo,
    })

    return {
      id: data.id,
      name: data.name,
      full_name: data.full_name,
      description: data.description,
      html_url: data.html_url,
      language: data.language,
      stargazers_count: data.stargazers_count,
      forks_count: data.forks_count,
      updated_at: data.updated_at,
      topics: data.topics || [],
      owner: owner,
    }
  } catch (error) {
    console.error(`Error fetching repository ${owner}/${repo}:`, error)
    return null
  }
}

/**
 * Note: GitHub API doesn't provide a direct way to list contributions by organization members.
 * This would typically require:
 * 1. Maintaining a list of Disney employee GitHub usernames
 * 2. Using GitHub's GraphQL API to query contributions
 * 3. Or using a third-party service
 * 
 * For now, this is a placeholder that would need to be implemented based on specific requirements.
 */
/**
 * Get GitHub user profile information
 */
export async function getUserProfile(username: string): Promise<GitHubUser | null> {
  try {
    const { data } = await octokit.users.getByUsername({
      username,
    })

    return {
      login: data.login,
      name: data.name,
      bio: data.bio,
      avatar_url: data.avatar_url,
      html_url: data.html_url,
      public_repos: data.public_repos,
      followers: data.followers,
      following: data.following,
      company: data.company,
      location: data.location,
    }
  } catch (error: any) {
    if (error?.status === 404) {
      console.error(`GitHub user ${username} not found (404)`)
    } else if (error?.status === 403) {
      console.error(`GitHub API rate limit exceeded or forbidden for ${username} (403)`)
    } else {
      console.error(`Error fetching user profile for ${username}:`, error?.message || error)
    }
    return null
  }
}

/**
 * Get a user's most starred repository
 */
export async function getUserMostStarredRepo(username: string): Promise<Repository | null> {
  try {
    const { data } = await octokit.repos.listForUser({
      username,
      type: 'all',
      sort: 'updated',
      per_page: 100,
    })

    if (data.length === 0) {
      return null
    }

    // Find the repository with the most stars
    const mostStarred = data.reduce((prev, current) => {
      const prevStars = prev.stargazers_count || 0
      const currentStars = current.stargazers_count || 0
      return currentStars > prevStars ? current : prev
    })

    return {
      id: mostStarred.id,
      name: mostStarred.name,
      full_name: mostStarred.full_name,
      description: mostStarred.description || null,
      html_url: mostStarred.html_url,
      language: mostStarred.language || null,
      stargazers_count: mostStarred.stargazers_count || 0,
      forks_count: mostStarred.forks_count || 0,
      updated_at: mostStarred.updated_at || new Date().toISOString(),
      topics: mostStarred.topics || [],
      owner: mostStarred.owner?.login || username,
    }
  } catch (error) {
    console.error(`Error fetching repositories for user ${username}:`, error)
    return null
  }
}

export async function getDisneyContributions(): Promise<Contribution[]> {
  // This is a placeholder implementation
  // In a real scenario, you would:
  // 1. Query GitHub's GraphQL API for contributions
  // 2. Filter by Disney employee usernames
  // 3. Aggregate contributions by repository
  
  // Example structure - would need actual implementation
  return []
}

/**
 * Generate a mock GitHub user profile for contributors without GitHub accounts
 * Uses initials from name or email to create a consistent avatar placeholder
 */
export function createMockGitHubUser(
  name: string,
  email?: string
): GitHubUser {
  // Generate initials from name or email
  const getInitials = (str: string): string => {
    const parts = str.trim().split(/\s+/)
    if (parts.length >= 2) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
    }
    return str.substring(0, 2).toUpperCase()
  }

  const initials = getInitials(name || email || 'U')
  
  // Create a consistent avatar URL using a service that generates avatars from initials
  // Using UI Avatars service which generates nice colored avatars from initials
  const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(initials)}&background=003d82&color=fff&size=256&bold=true`

  // Create a display username from name or email
  const displayUsername = name
    ? name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
    : email
    ? email.split('@')[0]
    : 'contributor'

  return {
    login: displayUsername,
    name: name || email?.split('@')[0] || 'Contributor',
    bio: null,
    avatar_url: avatarUrl,
    html_url: `mailto:${email || ''}`, // Use mailto link instead of GitHub URL
    public_repos: 0,
    followers: 0,
    following: 0,
    company: null,
    location: null,
  }
}

