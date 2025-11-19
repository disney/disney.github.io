export interface FeaturedProfileConfig {
  username: string
  featuredRepo: string | null
  description: string
}

export const featuredProfiles: FeaturedProfileConfig[] = [
  {
    username: 'kylifornication-code',
    featuredRepo: 'disney/disney.github.io',
    description: 'Highlighting Disney employees who are making significant contributions to open source.',
  },
  {
    username: 'iancward',
    featuredRepo: 'open-telemetry/opentelemetry-js-contrib',
    description: 'Contributing to open-telemetry/opentelemetry-js-contrib.',
  },
]

