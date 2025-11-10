import { NextResponse } from 'next/server'
import { getRepository, getUserMostStarredRepo, getUserProfile } from '@/lib/github'
import { contributorProfiles } from '@/lib/contributors'

export async function GET() {
  try {
    const contributors = (await Promise.all(
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
