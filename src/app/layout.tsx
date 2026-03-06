import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import { getBaseUrl } from '@/lib/site'
import './globals.css'

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
})

const playfair = Playfair_Display({
  variable: '--font-playfair',
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '600', '700', '800'],
})

export const metadata: Metadata = {
  title: {
    default: 'Chase Creative Co. | Copywriter & Brand Strategist',
    template: '%s | Chase Creative Co.',
  },
  description:
    'Chase Creative Co. offers versatile copywriting and digital marketing services, specializing in brand messaging, SEO content, and high-conversion copy for growing brands.',
  metadataBase: new URL(getBaseUrl()),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Chase Creative Co.',
  },
  twitter: {
    card: 'summary_large_image',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="antialiased">
        {/* Skip to main content — accessibility requirement */}
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  )
}
