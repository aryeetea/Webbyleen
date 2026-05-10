import { faqs as fallbackFaqs } from '../data/faqs'
import { packages as fallbackPackages } from '../data/packages'
import { isSanityConfigured, sanityClient } from './sanity'

export const defaultSiteContent = {
  settings: {
    homeHero: {
      eyebrow: 'Web Design & Development',
      title: 'Aesthetic, professional websites for small businesses with ambition.',
      highlight: 'small businesses',
      description:
        'ACE Web Studio designs and develops custom business websites with thoughtful structure, polished visuals, and a calm premium presentation that still feels clear, trustworthy, and ready to convert.',
      primaryCtaLabel: 'View Services',
      primaryCtaUrl: '/services',
      secondaryCtaLabel: 'View Work',
      secondaryCtaUrl: '/portfolio',
    },
    servicesIntro: {
      title: 'Professional website packages with clear pricing and clear delivery.',
      copy: 'Each package is built around a structured process, professional presentation, and a clear scope that makes booking straightforward.',
    },
    faqPageIntro: {
      title: 'Everything clients tend to ask before they book.',
      copy: 'A clear overview of how the process works, what the timeline looks like, and what to expect once we begin.',
    },
    contactIntro: {
      title: 'Get in touch with ACE Web Studio.',
      copy: 'Reach out for questions, collaborations, or anything you want to discuss before booking. Orders and payments now happen in the separate checkout flow.',
    },
    portfolioIntro: {
      title: 'Custom websites built for real businesses.',
      copy: 'Every project below is designed and developed from scratch — built to help a business look established, intentional, and worth remembering online.',
    },
  },
  packages: fallbackPackages,
  faqs: fallbackFaqs,
}

const siteContentQuery = `{
  "settings": *[_type == "siteSettings"][0]{
    homeHero {
      eyebrow,
      title,
      highlight,
      description,
      primaryCtaLabel,
      primaryCtaUrl,
      secondaryCtaLabel,
      secondaryCtaUrl
    },
    servicesIntro {
      title,
      copy
    },
    faqPageIntro {
      title,
      copy
    },
    contactIntro {
      title,
      copy
    },
    portfolioIntro {
      title,
      copy
    }
  },
  "packages": *[_type == "servicePackage"] | order(sortOrder asc){
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
  },
  "faqs": *[_type == "faqItem"] | order(sortOrder asc){
    "q": question,
    "a": answer
  }
}`

function mergeSectionContent(fallbackSection, value) {
  if (!value || typeof value !== 'object') {
    return fallbackSection
  }

  return {
    ...fallbackSection,
    ...Object.fromEntries(Object.entries(value).filter(([, entry]) => entry)),
  }
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

function normalizeFaqs(value) {
  if (!Array.isArray(value) || value.length === 0) {
    return fallbackFaqs
  }

  const normalized = value
    .filter(item => item?.q && item?.a)
    .map(item => ({
      q: item.q,
      a: item.a,
    }))

  return normalized.length > 0 ? normalized : fallbackFaqs
}

export async function fetchSiteContent() {
  if (!isSanityConfigured || !sanityClient) {
    return defaultSiteContent
  }

  const result = await sanityClient.fetch(siteContentQuery)
  const fallbackSettings = defaultSiteContent.settings
  const settings = result?.settings || {}

  return {
    settings: {
      homeHero: mergeSectionContent(fallbackSettings.homeHero, settings.homeHero),
      servicesIntro: mergeSectionContent(fallbackSettings.servicesIntro, settings.servicesIntro),
      faqPageIntro: mergeSectionContent(fallbackSettings.faqPageIntro, settings.faqPageIntro),
      contactIntro: mergeSectionContent(fallbackSettings.contactIntro, settings.contactIntro),
      portfolioIntro: mergeSectionContent(fallbackSettings.portfolioIntro, settings.portfolioIntro),
    },
    packages: normalizePackages(result?.packages),
    faqs: normalizeFaqs(result?.faqs),
  }
}
