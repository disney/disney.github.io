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
    console.error('Error fetching repositories for %s:', org, error)
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

async function generateRepositories() {
  console.log('Generating repositories data...')
  const outputPath = path.join(__dirname, '../public/data/repositories.json')
  const outputDir = path.dirname(outputPath)

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true })
  }

  try {
    const repositories = await getDisneyRepositories()
    fs.writeFileSync(outputPath, JSON.stringify(repositories, null, 2))
    console.log(`✓ Generated ${repositories.length} repositories`)
  } catch (error) {
    console.error('Error generating repositories:', error)
    // Write empty array on error to prevent build failure
    fs.writeFileSync(outputPath, JSON.stringify([], null, 2))
  }
}

async function main() {
  console.log('Starting static data generation...\n')

  await generateRepositories()

  console.log('\n✓ Static data generation complete!')
}

if (require.main === module) {
  main().catch((error) => {
    console.error('Fatal error:', error)
    process.exit(1)
  })
}

module.exports = { generateRepositories }
