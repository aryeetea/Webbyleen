export const packages = [
  {
    slug: 'basic',
    tier: '01 — Basic',
    name: 'Basic',
    price: '$150',
    priceRange: [150, 150],
    deposit: '$75',
    turnaround: '2 weeks',
    who: 'Get online fast. One fully custom page built from scratch, designed first and coded to match your brand perfectly.',
    includes: [
      '1 custom page',
      'Design mockup before development',
      'Mobile responsive',
      'Contact form',
      'Content upload',
      'Social media icons',
      'Speed optimization',
      'Hosting and deployment',
      '2 revisions',
      '2 week delivery',
      '3 months free support',
    ],
    addons: [
      { id: 'extra-pages', label: 'Additional pages', price: '$50 per page' },
      { id: 'ecommerce', label: 'E-commerce functionality', price: '$150' },
      { id: 'logo-design', label: 'Logo design', price: '$120' },
      { id: 'rush-delivery', label: 'Rush delivery', price: '$40' },
      { id: 'monthly-maintenance', label: 'Monthly maintenance', price: '$60/mo' },
    ],
  },
  {
    slug: 'standard',
    tier: '02 — Standard',
    name: 'Standard',
    price: '$300',
    priceRange: [300, 300],
    deposit: '$150',
    turnaround: '3 weeks',
    who: 'Tell your full story. A 3 to 5 page custom website designed and built to represent your business properly across multiple pages.',
    includes: [
      '3 to 5 custom pages',
      'Design mockups for every page',
      'Mobile responsive',
      'Contact form',
      'Content upload',
      'Social media icons',
      'Speed optimization',
      '3 revisions',
      '3 week delivery',
      '3 months free support',
    ],
    addons: [
      { id: 'extra-pages', label: 'Additional pages', price: '$50 per page' },
      { id: 'ecommerce', label: 'E-commerce functionality', price: '$150' },
      { id: 'logo-design', label: 'Logo design', price: '$120' },
      { id: 'rush-delivery', label: 'Rush delivery', price: '$60' },
      { id: 'monthly-maintenance', label: 'Monthly maintenance', price: '$60/mo' },
    ],
    featured: true,
  },
  {
    slug: 'premium',
    tier: '03 — Premium',
    name: 'Premium',
    price: '$550',
    priceRange: [550, 550],
    deposit: '$275',
    turnaround: '4 to 5 weeks',
    who: 'The complete experience. A full 6 to 10 page website built to the highest standard we offer. Every detail intentional, every page crafted.',
    includes: [
      '6 to 10 custom pages',
      'Full design system and mockups',
      'Mobile responsive',
      'Advanced contact forms',
      'Content upload',
      'Social media icons',
      'Speed optimization',
      '5 revisions',
      '4 to 5 week delivery',
      '3 months free support',
    ],
    addons: [
      { id: 'extra-pages', label: 'Additional pages', price: '$50 per page' },
      { id: 'ecommerce', label: 'E-commerce functionality', price: '$150' },
      { id: 'logo-design', label: 'Logo design', price: '$120' },
      { id: 'rush-delivery', label: 'Rush delivery', price: '$100' },
      { id: 'monthly-maintenance', label: 'Monthly maintenance', price: '$60/mo' },
    ],
  },
]

export const packageOptions = packages.map(pkg => ({
  value: pkg.slug,
  label: `${pkg.name} — ${pkg.price}`,
}))

export const packageMap = Object.fromEntries(packages.map(pkg => [pkg.slug, pkg]))

function parsePricePart(value) {
  const amount = Number.parseInt(value.replace(/[^\d]/g, ''), 10)
  return Number.isFinite(amount) ? amount : 0
}

export function getPriceRangeFromLabel(label) {
  if (typeof label !== 'string') {
    return [0, 0]
  }

  const normalized = label.replace(/\s+/g, ' ').trim()
  const parts = normalized.match(/\$[\d,]+/g) || []

  if (parts.length >= 2) {
    return [parsePricePart(parts[0]), parsePricePart(parts[1])]
  }

  if (parts.length === 1) {
    const value = parsePricePart(parts[0])
    return /\+$/.test(normalized) ? [value, value] : [value, value]
  }

  return [0, 0]
}
