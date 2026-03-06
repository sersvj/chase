/**
 * Dynamically determines the base URL of the site based on the environment.
 * 
 * 1. Returns NEXT_PUBLIC_SITE_URL if defined (Production/Local override).
 * 2. Returns VERCEL_URL if running in a Vercel preview deployment.
 * 3. Defaults to http://localhost:3000 for local development.
 */
export function getBaseUrl() {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, '')
  }

  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`
  }

  return 'http://localhost:3000'
}
