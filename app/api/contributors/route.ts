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
            // Non-GitHub profiles don't have repositories
            repository = null
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
