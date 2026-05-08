import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schemaTypes } from './schemaTypes'

export const studioConfig = defineConfig({
  name: 'default',
  title: 'ACE Web Studio CMS',
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID || '',
  dataset: import.meta.env.VITE_SANITY_DATASET || '',
  plugins: [structureTool()],
  schema: {
    types: schemaTypes,
  },
})
