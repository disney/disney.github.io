/**
 * Generate static data files for GitHub Pages deployment
 * This script runs at build time to fetch data from GitHub API
 * and save it as static JSON files that can be served from GitHub Pages
 * 
 * Note: This script uses tsx to run TypeScript files directly
 * Install tsx if needed: npm install --save-dev tsx
 */

const fs = require('fs')
const path = require('path')
const { Octokit } = require('@octokit/rest')

// Initialize Octokit
const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN || undefined,
})

// Load config files
const featuredConfigPath = path.join(__dirname, '../lib/featured.ts')
const contributorsConfigPath = path.join(__dirname, '../lib/contributors.ts')
const organizationsPath = path.join(__dirname, '../lib/organizations.ts')

// Helper to read and parse TypeScript config files (simple approach)
function loadConfig(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8')
  // Simple extraction - for production, consider using ts-node or tsx
  if (filePath.includes('featured.ts')) {
    const usernameMatch = content.match(/username:\s*['"]([^'"]+)['"]/)
    const repoMatch = content.match(/featuredRepo:\s*(null|[^,}]+)/)
    const descMatch = content.match(/description:\s*['"]([^'"]+)['"]/)
    return {
      username: usernameMatch ? usernameMatch[1] : 'kylifornication-code',
      featuredRepo: repoMatch && repoMatch[1] !== 'null' ? repoMatch[1].trim().replace(/['"]/g, '') : null,
      description: descMatch ? descMatch[1] : 'Highlighting Disney employees who are making significant contributions to open source.',
    }
  }
  return null
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

// Load contributor profiles from file
function loadContributorProfiles() {
  try {
    const content = fs.readFileSync(contributorsConfigPath, 'utf-8')
    // Extract contributor profiles array - this is a simplified parser
    // For production, consider using a proper TypeScript parser
    const profiles = []
    const profileMatches = content.matchAll(/username:\s*['"]([^'"]+)['"]/g)
    const roleMatches = content.matchAll(/role:\s*['"]([^'"]+)['"]/g)
    const descMatches = content.matchAll(/description:\s*['"]([^'"]+)['"]/g)
    
    // This is a simplified approach - in production, use tsx or proper parsing
    const usernames = Array.from(profileMatches, m => m[1])
    const roles = Array.from(roleMatches, m => m[1])
    const descriptions = Array.from(descMatches, m => m[1])
    
    for (let i = 0; i < usernames.length; i++) {
      profiles.push({
        username: usernames[i],
        role: roles[i] || undefined,
        description: descriptions[i] || undefined,
        featuredRepo: null,
      })
    }
    return profiles
  } catch (error) {
    console.error('Error loading contributor profiles:', error)
    return []
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
    const featuredConfig = loadConfig(featuredConfigPath)
    const { username, featuredRepo } = featuredConfig
    
    const user = await getUserProfile(username)
    if (!user) {
      throw new Error(`User ${username} not found`)
    }

    let repo = null
    if (featuredRepo) {
      repo = await getRepository(username, featuredRepo)
    } else {
      repo = await getUserMostStarredRepo(username)
    }

    const data = {
      user,
      repository: repo,
      config: featuredConfig,
    }
    
    const outputPath = path.join(__dirname, '../public/data/featured.json')
    const outputDir = path.dirname(outputPath)
    
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true })
    }
    
    fs.writeFileSync(outputPath, JSON.stringify(data, null, 2))
    console.log('✓ Generated featured contributor data')
  } catch (error) {
    console.error('Error generating featured data:', error)
    // Write empty object on error
    const outputPath = path.join(__dirname, '../public/data/featured.json')
    const outputDir = path.dirname(outputPath)
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true })
    }
    fs.writeFileSync(outputPath, JSON.stringify({ user: null, repository: null, config: featuredConfig }, null, 2))
  }
}

async function generateContributors() {
  console.log('Generating contributors data...')
  try {
    const contributorProfiles = loadContributorProfiles()
    const contributors = await Promise.all(
      contributorProfiles.map(async (profile) => {
        try {
          const user = await getUserProfile(profile.username)
          if (!user) {
            console.warn(`Contributor profile skipped: user ${profile.username} not found`)
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
          console.error(`Contributor profile skipped for ${profile.username}:`, error)
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

