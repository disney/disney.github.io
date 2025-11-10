import { NextResponse } from 'next/server'
import { getUserProfile, getUserMostStarredRepo, getRepository } from '@/lib/github'
import { featuredConfig } from '@/lib/featured'

export async function GET() {
  try {
    const { username, featuredRepo } = featuredConfig

    // Fetch user profile
    const user = await getUserProfile(username)
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    // Fetch featured repository
    let repo = null
    if (featuredRepo) {
      repo = await getRepository(username, featuredRepo)
    } else {
      // If no specific repo is configured, get the most starred one
      repo = await getUserMostStarredRepo(username)
    }

    return NextResponse.json({
      user,
      repository: repo,
      config: featuredConfig,
    })
  } catch (error) {
    console.error('Error in featured API route:', error)
    return NextResponse.json(
      { error: 'Failed to fetch featured profile' },
      { status: 500 }
    )
  }
}

// Revalidate every hour
export const revalidate = 3600

