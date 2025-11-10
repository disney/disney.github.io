/**
 * Contributor Profiles Configuration
 *
 * This file controls which community members appear on the
 * "Disney Employee Contributions" page. To add a new profile,
 * append a new object to the `contributorProfiles` array.
 *
 * Required fields:
 * - username: GitHub username of the contributor
 *
 * Optional fields:
 * - featuredRepo: Specific repository to highlight (defaults to most starred repo)
 * - role: Contributor's role/title within Disney or the project
 * - description: Short blurb to display in the UI
 */
export interface ContributorProfileConfig {
  username: string
  featuredRepo?: string | null
  role?: string
  description?: string
}

export const contributorProfiles: ContributorProfileConfig[] = [
  {
    username: 'kylifornication-code',
    featuredRepo: null,
    role: 'Senior Software Engineer, Disney Streaming',
    description:
      'Championing open source culture at Disney Streaming and leading by example through public contributions.',
  },
  {
    username: 'disney',
    featuredRepo: 'disney.github.io',
    role: 'The Walt Disney Company',
    description:
      "Showcasing Disney's open source programs, case studies, and resources for developers and partners.",
  },
  {
    username: 'wdas',
    featuredRepo: 'ptex',
    role: 'Walt Disney Animation Studios',
    description:
      'Maintainers of industry-leading animation tools that power the stories and characters we all love.',
  },
]
