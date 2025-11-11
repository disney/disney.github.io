import { NextResponse } from 'next/server'
import { getUserProfile, getUserMostStarredRepo, getRepository } from '@/lib/github'
import { featuredProfiles } from '@/lib/featured'

export async function GET() {
  try {
    const data = await Promise.all(
      featuredProfiles.map(async (profile) => {
        try {
          const user = await getUserProfile(profile.username)
          if (!user) {
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
          console.error(`Error fetching featured profile for ${profile.username}:`, error)
          return null
        }
      })
    )

    const validProfiles = data.filter(Boolean)

    return NextResponse.json(validProfiles)
  } catch (error) {
    console.error('Error in featured API route:', error)
    return NextResponse.json(
      { error: 'Failed to fetch featured profiles' },
      { status: 500 }
    )
  }
}

// Revalidate every hour
export const revalidate = 3600

