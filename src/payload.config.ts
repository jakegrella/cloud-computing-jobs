import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import { seed } from './seed'
import Users from './collections/Users'
import Companies from './collections/Companies'
import Jobs from './collections/Jobs'
import Locations from './collections/Locations'
import Logos from './collections/Logos'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
  },
  collections: [Companies, Jobs, Locations, Logos, Users],
  plugins: [
    vercelBlobStorage({
      enabled: true,
      collections: {
        [Logos.slug]: true
      },
      token: process.env.BLOB_READ_WRITE_TOKEN || ''
    })
  ],
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
  }),
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  sharp,
  async onInit(payload)  {
		// If the `env` var `PAYLOAD_SEED` is set, seed the db
		if (process.env.PAYLOAD_SEED) {
			await seed(payload)
		}
	},
})
