/**
 * Contributor Profiles Configuration
 *
 * This file controls which community members appear on the
 * "Disney Employee Contributions" page. To add a new profile,
 * append a new object to the `contributorProfiles` array.
 *
 * Required fields (one of):
 * - username: GitHub username of the contributor (for GitHub profiles)
 * - name: Full name of the contributor (for non-GitHub profiles)
 *
 * Optional fields:
 * - email: Email address of the contributor (for non-GitHub profiles)
 * - featuredRepo: Specific repository to highlight (defaults to most starred repo, GitHub only)
 * - role: Contributor's role/title within Disney or the project
 * - description: Short blurb to display in the UI
 */
export interface ContributorProfileConfig {
  username?: string
  name?: string
  email?: string
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
  // Example: Non-GitHub contributor profile
  {   
    name: 'Kyle Johnston',
    email: 'kyle.johnston@disney.com',
    role: 'Senior Software Engineer, Disney Streaming',
    description: 'Championing open source culture at Disney Streaming and leading by example through public contributions.',
  },
]
