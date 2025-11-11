export interface FeaturedProfileConfig {
  username: string
  featuredRepo: string | null
  description: string
}

export const featuredProfiles: FeaturedProfileConfig[] = [
  {
    username: 'kylifornication-code',
    featuredRepo: 'astro-career-walking-site',
    description: 'Highlighting Disney employees who are making significant contributions to open source.',
  },
  {
    username: 'disney',
    featuredRepo: 'disney.github.io',
    description: 'Sharing open source programs, case studies, and developer resources across the Disney ecosystem.',
  },
]

