import type { Metadata } from 'next'
import Script from 'next/script'
import './globals.css'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { ThemeProvider } from '@/components/ThemeProvider'

// Umami analytics website ID (Studioshare Launch analytics hub)
const UMAMI_WEBSITE_ID = '151c3d0d-7b5e-4a2e-934e-d55d6ec47bb7'
const UMAMI_HOST = 'https://analytics-hub.internal.launch.studioshare.wds.io'

export const metadata: Metadata = {
  title: 'Disney Open Source Program Office',
  description: 'Learn about open source policies at The Walt Disney Company',
  keywords: ['Disney', 'Open Source', 'OSS', 'GitHub', 'Contributions'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Umami analytics - stats tracking */}
        <Script
          defer
          src={`${UMAMI_HOST}/script.js`}
          data-website-id={UMAMI_WEBSITE_ID}
          strategy="afterInteractive"
        />
        {/* Umami analytics - session replays & heatmaps recorder */}
        <Script
          defer
          src={`${UMAMI_HOST}/recorder.js`}
          data-website-id={UMAMI_WEBSITE_ID}
          strategy="afterInteractive"
        />
      </head>
      <body>
        <ThemeProvider>
          <Navigation />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}

