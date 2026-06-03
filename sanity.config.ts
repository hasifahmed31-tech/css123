'use client'

import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { dataset, projectId, studioUrl } from './sanity/env'
import { schemaTypes } from './sanity/schemaTypes'
import { structure } from './sanity/structure'

export default defineConfig({
  name: 'hasif_online',
  title: 'Hasif Online',
  projectId,
  dataset,
  basePath: studioUrl,
  plugins: [structureTool({ structure })],
  schema: { types: schemaTypes },
})
