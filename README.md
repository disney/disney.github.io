# Disney Open Source Program Office Documentation Site

A documentation site for The Walt Disney Company's Open Source Program Office, built with Next.js.

> **Scope note:** This is a reduced-scope launch. The site currently ships with only the **Home** and **Policies** pages while additional requirements are being finalized. The Usage, Distribution, Release, and Contribution pages, along with the featured-contributor and contributor-profile features, have been removed for now and can be reintroduced later.

## Features

- **Home Page**: Overview of the Disney Open Source Program Office, plus a browser for public repositories released by Disney teams
- **Policies Page**: Open source policies and guidelines
- **Repository Browser**: Browse and search public repositories from multiple Disney GitHub organizations
- **Brand Compliant**: Designed to align with Disney brand guidelines and accessibility standards

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd site
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables (optional, for higher GitHub API rate limits):
```bash
# Create .env.local file in the project root
echo "GH_TOKEN=your_github_personal_access_token_here" > .env.local
# Edit .env.local and replace with your actual GitHub token
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
site/
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes (repositories)
│   └── policies/          # Policies documentation
├── components/            # React components
├── lib/                   # Utility functions
└── public/               # Static assets
```

## Environment Variables

- `GH_TOKEN` (optional): GitHub personal access token for higher API rate limits (5,000 requests/hour instead of 60)
  - Create a token at: https://github.com/settings/tokens
  - Token needs `public_repo` scope (read-only is sufficient)
  - For local development: Add to `.env.local` file
  - For GitHub Pages: Add as `GH_TOKEN` secret in repository settings

## Building for Production

### Static Export (GitHub Pages)

The site is configured for static export to GitHub Pages:

```bash
npm run build
```

This will:
1. Generate static data files from the GitHub API (`/public/data/*.json`)
2. Build the Next.js static export to the `/out` directory

The `/out` directory contains all static files ready for deployment to GitHub Pages.

### Local Development Server

For local development with hot reloading:

```bash
npm run dev
```

## GitHub Pages Deployment

This site is configured for automatic deployment to GitHub Pages using GitHub Actions.

### Setup Instructions

1. **Enable GitHub Pages in your repository:**
   - Go to your repository on GitHub
   - Navigate to **Settings** → **Pages**
   - Under **"Source"**, select **"GitHub Actions"** (NOT "Deploy from a branch")
   - This is critical - if you select a branch, it will only show the README
   - Save the settings

2. **Configure GitHub API Token (Recommended for higher API rate limits when fetching repositories):**
   - Go to **Settings** → **Secrets and variables** → **Actions**
   - Click **"New repository secret"**
   - Name: `GH_TOKEN`
   - Value: Your GitHub personal access token
   - This increases API rate limits from 60 to 5,000 requests/hour and allows fetching user profiles
   - Token needs `public_repo` scope (read-only is sufficient)
   - You can create a token at: https://github.com/settings/tokens
   - **Note:** Without this token, the site may fail to fetch GitHub user profiles during build

3. **Deploy:**
   - Push your code to the `main` branch (or trigger the workflow manually)
   - Go to **Actions** tab to see the workflow running
   - Once complete, your site will be live at `https://[username].github.io/[repository-name]`
   - The workflow is defined in `.github/workflows/deploy.yml`

### Troubleshooting

**If you only see the README instead of the site:**
- Make sure GitHub Pages is set to use **"GitHub Actions"** as the source, not a branch
- Check the **Actions** tab to ensure the workflow completed successfully
- Verify the workflow uploaded the artifact from the `./out` directory
- The `.nojekyll` file in `public/` ensures GitHub Pages doesn't use Jekyll

### Manual Deployment

If you prefer to deploy manually:

```bash
# Generate static data
npm run generate-data

# Build static export
npm run build

# The /out directory contains all files for GitHub Pages
# You can commit and push the /out directory to the gh-pages branch
```

### Custom Domain or Subdirectory

If deploying to a subdirectory (e.g., `https://username.github.io/repository-name`):

1. Uncomment and update `basePath` in `next.config.js`:
   ```javascript
   basePath: '/repository-name',
   trailingSlash: true,
   ```

2. Rebuild and redeploy

### Data Refresh

Static data files are generated at build time. To refresh the data:
- Push a new commit to trigger a rebuild
- Or manually run `npm run generate-data` and commit the updated files

## Technology Stack

- **Next.js 14**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework
- **Octokit**: GitHub API client

## Brand Guidelines Compliance

This site adheres to The Walt Disney Company's brand guidelines:
- Professional color palette aligned with Disney brand standards
- Accessible design following WCAG guidelines
- Consistent typography and spacing
- Brand-appropriate tone and messaging

## Configuring GitHub Organizations

The site fetches repositories from multiple Disney GitHub organizations. To add or remove organizations:

1. Open `lib/organizations.ts`
2. Update the `disneyOrganizations` array with the GitHub organization names
3. Optionally update `organizationNames` to provide display names for each organization

Example:
```typescript
export const disneyOrganizations = [
  'disney',
  'wdas',           // Walt Disney Animation Studios
  'hulu',
  'fxnetworks',
  'espn',
  'disneystreaming',
]

export const organizationNames: Record<string, string> = {
  'disney': 'Disney',
  'wdas': 'Walt Disney Animation Studios',
  'hulu': 'Hulu',
  'fxnetworks': 'FX Networks',
  'espn': 'ESPN',
  'disneystreaming': 'Disney Streaming',
}
```

The repository listings on the homepage will automatically include repositories from all configured organizations.

## Contributing

This is an internal Disney project. For questions or contributions, contact the Open Source Program Office.

## License

Copyright © The Walt Disney Company. All rights reserved.
