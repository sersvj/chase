'use client'

import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3'

export default function ReCaptchaWrapper({ children }: { children: React.ReactNode }) {
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY

  if (!siteKey) {
    // If no site key is provided, we just render children. 
    // The form will handle the missing executeRecaptcha gracefully.
    return <>{children}</>
  }

  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={siteKey}
      scriptProps={{
        async: false,
        defer: false,
        appendTo: 'head',
        nonce: undefined,
      }}
    >
      {children}
    </GoogleReCaptchaProvider>
  )
}
