import { createClient } from '@sanity/client'
import { packages as fallbackPackages } from '../../src/data/packages.js'

const SANITY_PROJECT_ID = process.env.VITE_SANITY_PROJECT_ID?.trim() || ''
const SANITY_DATASET = process.env.VITE_SANITY_DATASET?.trim() || ''
const SANITY_API_VERSION = process.env.VITE_SANITY_API_VERSION?.trim() || '2025-05-08'

const isSanityConfigured = Boolean(SANITY_PROJECT_ID && SANITY_DATASET)

const sanityClient = isSanityConfigured
  ? createClient({
      projectId: SANITY_PROJECT_ID,
      dataset: SANITY_DATASET,
      apiVersion: SANITY_API_VERSION,
      useCdn: false,
    })
  : null

const packagesQuery = `*[_type == "servicePackage"] | order(sortOrder asc){
  "slug": slug.current,
  tier,
  name,
  "price": priceLabel,
  "priceRange": [coalesce(priceMin, 0), coalesce(priceMax, 0)],
  "deposit": depositLabel,
  turnaround,
  who,
  includes,
  addons[]{
    id,
    label,
    price
  },
  featured
}`

let packageCache = {
  expiresAt: 0,
  value: fallbackPackages,
}

function normalizePackages(value) {
  if (!Array.isArray(value) || value.length === 0) {
    return fallbackPackages
  }

  const normalized = value
    .filter(item => item?.slug && item?.name)
    .map(item => ({
      slug: item.slug,
      tier: item.tier || '',
      name: item.name,
      price: item.price || '$0',
      priceRange: Array.isArray(item.priceRange) && item.priceRange.length === 2 ? item.priceRange : [0, 0],
      deposit: item.deposit || '$0',
      turnaround: item.turnaround || '',
      who: item.who || '',
      includes: Array.isArray(item.includes) ? item.includes.filter(Boolean) : [],
      addons: Array.isArray(item.addons)
        ? item.addons
            .filter(addon => addon?.id && addon?.label)
            .map(addon => ({
              id: addon.id,
              label: addon.label,
              price: addon.price || '$0',
            }))
        : [],
      featured: Boolean(item.featured),
    }))

  return normalized.length > 0 ? normalized : fallbackPackages
}

export async function getPackages() {
  if (!isSanityConfigured || !sanityClient) {
    return fallbackPackages
  }

  const now = Date.now()
  if (packageCache.expiresAt > now) {
    return packageCache.value
  }

  try {
    const result = await sanityClient.fetch(packagesQuery)
    const normalized = normalizePackages(result)
    packageCache = {
      value: normalized,
      expiresAt: now + 60_000,
    }
    return normalized
  } catch {
    packageCache = {
      value: fallbackPackages,
      expiresAt: now + 15_000,
    }
    return fallbackPackages
  }
}

export async function getPackageMap() {
  const packages = await getPackages()
  return Object.fromEntries(packages.map(pkg => [pkg.slug, pkg]))
}

export async function getPackageTypeOptions() {
  const packages = await getPackages()
  return [...packages.map(pkg => pkg.name), 'Custom']
}
