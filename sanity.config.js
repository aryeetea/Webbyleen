import { schemaTypes } from './src/sanity/schemaTypes'
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'

const projectId = process.env.VITE_SANITY_PROJECT_ID || ''
const dataset = process.env.VITE_SANITY_DATASET || ''

export default defineConfig({
  name: 'default',
  title: 'ACE Web Studio CMS',
  projectId,
  dataset,
  plugins: [structureTool()],
  schema: {
    types: schemaTypes,
  },
})
