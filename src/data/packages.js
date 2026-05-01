export const packages = [
  {
    slug: 'starter',
    tier: '01 — Starter',
    name: 'Starter Website',
    price: '$180',
    priceRange: [180, 180],
    deposit: '$90',
    turnaround: '2 weeks',
    who: 'A streamlined one-page website for businesses that need a polished online presence with a professional launch process.',
    includes: [
      '1 page custom website',
      'Design mockup in Figma before any code is written',
      'Mobile responsive on every device',
      'Contact form',
      'Hosting and deployment',
      '3 months free minor support after launch',
      'Social media icons',
      '2 revisions',
    ],
    addons: [
      { id: 'logo-design', label: 'Logo design', price: '$120' },
      { id: 'extra-page', label: 'Extra page', price: '$80' },
      { id: 'extra-revision-round', label: 'Extra revision round', price: '$40' },
      { id: 'content-upload', label: 'Content upload', price: '$50' },
      { id: 'starter-rush-delivery', label: 'Rush delivery - Starter (5 days)', price: '$90' },
      { id: 'monthly-maintenance', label: 'Monthly maintenance', price: '$80' },
    ],
  },
  {
    slug: 'business',
    tier: '02 — Business',
    name: 'Business Website',
    price: '$450',
    priceRange: [450, 450],
    deposit: '$225',
    turnaround: '3 weeks',
    who: 'A multi-page business website built to present your services clearly, build trust, and convert visitors with confidence.',
    includes: [
      '3 to 5 page custom website',
      'Design mockup in Figma before any code is written',
      'Mobile responsive on every device',
      'Contact form',
      'Hosting and deployment',
      '3 months free minor support after launch',
      'Social media icons',
      '3 revisions',
    ],
    addons: [
      { id: 'logo-design', label: 'Logo design', price: '$120' },
      { id: 'extra-page', label: 'Extra page', price: '$80' },
      { id: 'extra-revision-round', label: 'Extra revision round', price: '$40' },
      { id: 'content-upload', label: 'Content upload', price: '$50' },
      { id: 'business-rush-delivery', label: 'Rush delivery - Business (10 days)', price: '$225' },
      { id: 'monthly-maintenance', label: 'Monthly maintenance', price: '$80' },
    ],
    featured: true,
  },
  {
    slug: 'professional',
    tier: '03 — Professional',
    name: 'Professional Website',
    price: '$900',
    priceRange: [900, 900],
    deposit: '$450',
    turnaround: '4 to 5 weeks',
    who: 'A premium multi-page website for established businesses that need a broader, more refined online experience.',
    includes: [
      '6 to 10 page custom website',
      'Design mockup in Figma before any code is written',
      'Mobile responsive on every device',
      'Contact form',
      'Hosting and deployment',
      '3 months free minor support after launch',
      'Social media icons',
      '5 revisions',
    ],
    addons: [
      { id: 'logo-design', label: 'Logo design', price: '$120' },
      { id: 'extra-page', label: 'Extra page', price: '$80' },
      { id: 'extra-revision-round', label: 'Extra revision round', price: '$40' },
      { id: 'content-upload', label: 'Content upload', price: '$50' },
      { id: 'professional-rush-delivery', label: 'Rush delivery - Professional (15 days)', price: '$450' },
      { id: 'monthly-maintenance', label: 'Monthly maintenance', price: '$80' },
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
