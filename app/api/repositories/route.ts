import { NextResponse } from 'next/server'
import { getDisneyRepositories } from '@/lib/github'

export async function GET() {
  try {
    const repositories = await getDisneyRepositories()
    return NextResponse.json(repositories)
  } catch (error) {
    console.error('Error in repositories API route:', error)
    return NextResponse.json(
      { error: 'Failed to fetch repositories' },
      { status: 500 }
    )
  }
}

// Revalidate every hour
export const revalidate = 3600

