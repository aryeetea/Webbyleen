import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

const projectId = import.meta.env.VITE_SANITY_PROJECT_ID || ''
const dataset = import.meta.env.VITE_SANITY_DATASET || ''
const apiVersion = import.meta.env.VITE_SANITY_API_VERSION || '2025-05-08'

export const sanityConfig = {
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
}

export const isSanityConfigured = Boolean(projectId && dataset)

export const sanityClient = isSanityConfigured ? createClient(sanityConfig) : null

const imageBuilder = sanityClient ? imageUrlBuilder(sanityClient) : null

export function urlForSanityImage(source) {
  if (!imageBuilder || !source) {
    return ''
  }

  return imageBuilder.image(source)
}
