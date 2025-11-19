import { NextResponse } from 'next/server'
import { getRepository, getUserMostStarredRepo, getUserProfile, createMockGitHubUser } from '@/lib/github'
import { contributorProfiles } from '@/lib/contributors'

export async function GET() {
  try {
    const contributors = (await Promise.all(
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
              } else if (repoParts.length === 1) {
                // Just repo name - we can't fetch without owner, so leave as null
                // The frontend will handle displaying it from config
                repository = null
              }
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
          console.error('Contributor profile skipped for', identifier, ':', error)
          return null
        }
      })
    )).filter(Boolean)

    return NextResponse.json(contributors)
  } catch (error) {
    console.error('Error in contributors API route:', error)
    return NextResponse.json(
      { error: 'Failed to fetch contributor profiles' },
      { status: 500 }
    )
  }
}

// Revalidate every hour
export const revalidate = 3600
