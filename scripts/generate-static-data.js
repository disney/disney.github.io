/**
 * Generate static data files for GitHub Pages deployment
 * This script runs at build time to fetch data from GitHub API
 * and save it as static JSON files that can be served from GitHub Pages
 */

const fs = require('fs')
const path = require('path')
const { Octokit } = require('@octokit/rest')

// Initialize Octokit
const octokit = new Octokit({
  auth: process.env.GH_TOKEN || undefined,
})

// Load config files
const featuredConfigPath = path.join(__dirname, '../lib/featured.ts')
const contributorsConfigPath = path.join(__dirname, '../lib/contributors.ts')

// Helper to read and parse TypeScript config files (simple approach)
function loadFeaturedProfiles() {
  try {
    const content = fs.readFileSync(featuredConfigPath, 'utf-8')
    const entryRegex = /{\s*username:\s*['"]([^'"]+)['"]\s*,\s*featuredRepo:\s*([^,\n]+)\s*,\s*description:\s*['"]([^'"]+)['"]/g
    const profiles = []
    let match

    while ((match = entryRegex.exec(content)) !== null) {
      const username = match[1]
      const rawRepo = match[2].trim()
      const featuredRepo = rawRepo === 'null' ? null : rawRepo.replace(/['"]/g, '')
      const description = match[3]

      profiles.push({ username, featuredRepo, description })
    }

    return profiles
  } catch (error) {
    console.error('Error loading featured profiles:', error)
    return []
  }
}

// Load contributor profiles from file
function loadContributorProfiles() {
  try {
    const content = fs.readFileSync(contributorsConfigPath, 'utf-8')
    // Extract contributor profiles array - this is a simplified parser
    // For production, consider using a proper TypeScript parser
    const profiles = []
    
    // Match complete profile objects (handles both GitHub and non-GitHub profiles)
    const profileBlockRegex = /{\s*([^}]+)\s*}/g
    let match
    
    while ((match = profileBlockRegex.exec(content)) !== null) {
      const block = match[1]
      
      // Extract username (optional)
      const usernameMatch = block.match(/username:\s*['"]([^'"]+)['"]/)
      const username = usernameMatch ? usernameMatch[1] : undefined
      
      // Extract name (optional)
      const nameMatch = block.match(/name:\s*['"]([^'"]+)['"]/)
      const name = nameMatch ? nameMatch[1] : undefined
      
      // Extract email (optional)
      const emailMatch = block.match(/email:\s*['"]([^'"]+)['"]/)
      const email = emailMatch ? emailMatch[1] : undefined
      
      // Extract role (optional)
      const roleMatch = block.match(/role:\s*['"]([^'"]+)['"]/)
      const role = roleMatch ? roleMatch[1] : undefined
      
      // Extract description (optional, handles multi-line)
      const descMatch = block.match(/description:\s*['"]([^'"]+)['"]/)
      const description = descMatch ? descMatch[1] : undefined
      
      // Extract featuredRepo (optional)
      const repoMatch = block.match(/featuredRepo:\s*(null|['"]([^'"]+)['"])/)
      let featuredRepo = repoMatch && repoMatch[1] !== 'null' ? repoMatch[2] : null
      
      // Also try to extract from description if not found
      if (!featuredRepo) {
        const descMatch = block.match(/description:\s*['"]([^'"]+)['"]/)
        if (descMatch) {
          const desc = descMatch[1]
          // Try to extract repo from description like "Contributing to owner/repo."
          const repoInDesc = desc.match(/Contributing to ([a-zA-Z0-9._/-]+)\./)
          if (repoInDesc && repoInDesc[1].includes('/')) {
            featuredRepo = repoInDesc[1]
          }
        }
      }
      
      // Only add if we have either username or name
      if (username || name) {
        profiles.push({
          username,
          name,
          email,
          role,
          description,
          featuredRepo,
        })
      }
    }
    
    return profiles
  } catch (error) {
    console.error('Error loading contributor profiles:', error)
    return []
  }
}

// GitHub API functions (replicated here to avoid module issues)
async function getOrgRepositories(org) {
  try {
    const { data } = await octokit.repos.listForOrg({
      org,
      type: 'public',
      sort: 'updated',
      per_page: 100,
    })
    return data.map((repo) => ({
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
    return []
  }
}

async function getDisneyRepositories() {
  const organizations = ['disney', 'wdas', 'hulu', 'fxnetworks', 'espn', 'disneystreaming']
  try {
    const repositoryPromises = organizations.map(org => getOrgRepositories(org))
    const results = await Promise.all(repositoryPromises)
    const allRepositories = results.flat()
    return allRepositories.sort((a, b) => 
      new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
    )
  } catch (error) {
    console.error('Error fetching Disney repositories:', error)
    return []
  }
}

async function getUserProfile(username) {
  try {
    const { data } = await octokit.users.getByUsername({ username })
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
  } catch (error) {
    console.error(`Error fetching user profile for ${username}:`, error)
    return null
  }
}

async function getRepository(owner, repo) {
  try {
    const { data } = await octokit.repos.get({ owner, repo })
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

async function getUserMostStarredRepo(username) {
  try {
    const { data } = await octokit.repos.listForUser({
      username,
      type: 'all',
      sort: 'updated',
      per_page: 100,
    })
    if (data.length === 0) return null
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

async function generateRepositories() {
  console.log('Generating repositories data...')
  try {
    const repositories = await getDisneyRepositories()
    const outputPath = path.join(__dirname, '../public/data/repositories.json')
    const outputDir = path.dirname(outputPath)
    
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true })
    }
    
    fs.writeFileSync(outputPath, JSON.stringify(repositories, null, 2))
    console.log(`✓ Generated ${repositories.length} repositories`)
  } catch (error) {
    console.error('Error generating repositories:', error)
    // Write empty array on error to prevent build failure
    const outputPath = path.join(__dirname, '../public/data/repositories.json')
    const outputDir = path.dirname(outputPath)
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true })
    }
    fs.writeFileSync(outputPath, JSON.stringify([], null, 2))
  }
}

async function generateFeatured() {
  console.log('Generating featured contributor data...')
  try {
    const featuredProfiles = loadFeaturedProfiles()

    const featuredData = await Promise.all(
      featuredProfiles.map(async (profile) => {
        try {
          const user = await getUserProfile(profile.username)
          if (!user) {
            console.warn(`Featured profile skipped: user ${profile.username} not found`)
            return null
          }

          let repository = null
          if (profile.featuredRepo) {
            repository = await getRepository(profile.username, profile.featuredRepo)
          }

          if (!repository) {
            repository = await getUserMostStarredRepo(profile.username)
          }

          return {
            user,
            repository,
            config: profile,
          }
        } catch (error) {
          console.error(`Featured profile skipped for ${profile.username}:`, error)
          return null
        }
      })
    )

    const validFeatured = featuredData.filter(Boolean)

    const outputPath = path.join(__dirname, '../public/data/featured.json')
    const outputDir = path.dirname(outputPath)

    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true })
    }

    fs.writeFileSync(outputPath, JSON.stringify(validFeatured, null, 2))
    console.log(`✓ Generated ${validFeatured.length} featured profiles`)
  } catch (error) {
    console.error('Error generating featured data:', error)
    // Write empty array on error
    const outputPath = path.join(__dirname, '../public/data/featured.json')
    const outputDir = path.dirname(outputPath)
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true })
    }
    fs.writeFileSync(outputPath, JSON.stringify([], null, 2))
  }
}

// Create mock GitHub user for non-GitHub contributors
function createMockGitHubUser(name, email) {
  // Generate initials from name or email
  const getInitials = (str) => {
    const parts = str.trim().split(/\s+/)
    if (parts.length >= 2) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
    }
    return str.substring(0, 2).toUpperCase()
  }

  const initials = getInitials(name || email || 'U')
  
  // Create a consistent avatar URL using UI Avatars service
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
    html_url: `mailto:${email || ''}`,
    public_repos: 0,
    followers: 0,
    following: 0,
    company: null,
    location: null,
  }
}

async function generateContributors() {
  console.log('Generating contributors data...')
  try {
    const contributorProfiles = loadContributorProfiles()
    const contributors = await Promise.all(
      contributorProfiles.map(async (profile) => {
        try {
          let user
          let repository = null

          // Check if this is a GitHub profile or a non-GitHub profile
          if (profile.username) {
            // GitHub profile - fetch from GitHub API
            user = await getUserProfile(profile.username)
            if (!user) {
              console.warn(`Contributor profile skipped: user ${profile.username} not found`)
              return null
            }

            // Try to get featured repository or most starred repo
            if (profile.featuredRepo) {
              repository = await getRepository(profile.username, profile.featuredRepo)
            }

            if (!repository) {
              repository = await getUserMostStarredRepo(profile.username)
            }
          } else if (profile.name) {
            // Non-GitHub profile - create mock profile
            user = createMockGitHubUser(profile.name, profile.email)
            
            // Try to fetch repository if featuredRepo is provided
            if (profile.featuredRepo) {
              // featuredRepo might be in format "owner/repo" or just "repo"
              const repoParts = profile.featuredRepo.split('/')
              if (repoParts.length === 2) {
                // Format: owner/repo
                repository = await getRepository(repoParts[0], repoParts[1])
              }
              // If just repo name or fetch failed, leave as null - frontend will handle from config
            }
          } else {
            console.warn('Contributor profile skipped: must have either username or name')
            return null
          }

          return {
            user,
            repository,
            config: profile,
          }
        } catch (error) {
          const identifier = profile.username || profile.name || 'unknown'
          console.error(`Contributor profile skipped for ${identifier}:`, error)
          return null
        }
      })
    )

    const validContributors = contributors.filter(Boolean)
    
    const outputPath = path.join(__dirname, '../public/data/contributors.json')
    const outputDir = path.dirname(outputPath)
    
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true })
    }
    
    fs.writeFileSync(outputPath, JSON.stringify(validContributors, null, 2))
    console.log(`✓ Generated ${validContributors.length} contributor profiles`)
  } catch (error) {
    console.error('Error generating contributors:', error)
    // Write empty array on error
    const outputPath = path.join(__dirname, '../public/data/contributors.json')
    const outputDir = path.dirname(outputPath)
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true })
    }
    fs.writeFileSync(outputPath, JSON.stringify([], null, 2))
  }
}

async function main() {
  console.log('Starting static data generation...\n')
  
  await generateRepositories()
  await generateFeatured()
  await generateContributors()
  
  console.log('\n✓ Static data generation complete!')
}

if (require.main === module) {
  main().catch((error) => {
    console.error('Fatal error:', error)
    process.exit(1)
  })
}

module.exports = { generateRepositories, generateFeatured, generateContributors }

