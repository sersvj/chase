import { createClient } from '@sanity/client'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

dotenv.config({ path: resolve(__dirname, '../.env.local') })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
})

const MAPPING = {
  'Web Copy': ['website-content'],
  'Email Campaigns': ['brand-messaging'],
  'Display Ads': ['verbal-brand'],
  'Advertorials': ['article-content'],
  'Press Releases': ['article-content'],
  'Brand Messaging': ['brand-messaging'],
}

async function migrate() {
  console.log('🚀 Starting Service mapping migration...')

  try {
    const services = await client.fetch(`*[_type == "service"]`)
    console.log(`🔍 Found ${services.length} services to update.`)

    for (const service of services) {
      const newCats = MAPPING[service.title] || []
      
      if (newCats.length > 0) {
        await client
          .patch(service._id)
          .set({ categories: newCats })
          .commit()
        console.log(`✅ Updated "${service.title}" with categories: ${newCats.join(', ')}`)
      } else {
        console.warn(`⚠️ No mapping found for service: "${service.title}"`)
      }
    }

    console.log('✨ Migration complete!')
  } catch (err) {
    console.error('❌ Migration failed:', err.message)
  }
}

migrate()
