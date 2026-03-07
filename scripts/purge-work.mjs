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

if (!process.env.SANITY_API_TOKEN) {
  console.error('❌ SANITY_API_TOKEN is missing in .env.local')
  process.exit(1)
}

async function purgeWork() {
  console.log('🚀 Starting Sanity Work Sample purge...')

  try {
    const query = '*[_type == "workSample"]'
    const docs = await client.fetch(query)
    
    if (docs.length === 0) {
      console.log('ℹ️ No Work Samples found to purge.')
      return
    }

    console.log(`🧹 Found ${docs.length} documents. Purging...`)
    await client.delete({ query })
    
    console.log('✨ All Work Samples cleared successfully!')
  } catch (err) {
    console.error('❌ Purge failed:', err.message)
  }
}

purgeWork()
