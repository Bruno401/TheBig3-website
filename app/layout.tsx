import type { Metadata } from 'next'
import './globals.css'
import { SITE_URL, SITE_NAME } from '@/lib/constants'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import SmoothScrollProvider from '@/components/layout/SmoothScrollProvider'

/*
 * ──────────────────────────────────────────────────────────────
 * TODO: Restore localFont once .woff2 files are placed in app/fonts/
 *
 * import localFont from 'next/font/local'
 *
 * const nhGrotesk = localFont({
 *   src: [
 *     { path: './fonts/NHaasGroteskTXPro-55Rg.woff2', weight: '400', style: 'normal' },
 *     { path: './fonts/NHaasGroteskTXPro-65Md.woff2', weight: '500', style: 'normal' },
 *     { path: './fonts/NHaasGroteskTXPro-75Bd.woff2', weight: '700', style: 'normal' },
 *   ],
 *   variable: '--font-primary',
 *   display: 'swap',
 *   preload: true,
 *   fallback: ['system-ui', 'sans-serif'],
 * })
 *
 * const teknaf = localFont({
 *   src: './fonts/Teknaf-Regular.woff2',
 *   variable: '--font-display',
 *   display: 'swap',
 *   preload: false,
 *   fallback: ['system-ui', 'sans-serif'],
 * })
 *
 * Then update <html> className to: `${nhGrotesk.variable} ${teknaf.variable}`
 * ──────────────────────────────────────────────────────────────
 */

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Web, App & AI Automation Development`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    'The Big 3 is a full-service digital agency in India specialising in website development, app development, software development, and AI automation.',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} — Web, App & AI Automation Development`,
    description:
      'Full-service digital agency. Websites, apps, software, and AI automation built to your exact requirements.',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: `${SITE_NAME} — Digital Agency` }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE_NAME} — Web, App & AI Automation Development`,
    description: 'Full-service digital agency in India.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-video-preview': -1 },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <a href="#main" className="skip-to-content">
          Skip to main content
        </a>
        <SmoothScrollProvider>
          <Navbar />
          <main id="main">{children}</main>
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  )
}
