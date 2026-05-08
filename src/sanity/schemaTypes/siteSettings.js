export const siteSettingsType = {
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    {
      name: 'homeHero',
      title: 'Home Hero',
      type: 'object',
      fields: [
        { name: 'eyebrow', title: 'Eyebrow', type: 'string' },
        { name: 'title', title: 'Title', type: 'string' },
        { name: 'highlight', title: 'Highlighted Phrase', type: 'string' },
        { name: 'description', title: 'Description', type: 'text', rows: 4 },
        { name: 'primaryCtaLabel', title: 'Primary CTA Label', type: 'string' },
        { name: 'primaryCtaUrl', title: 'Primary CTA URL', type: 'string' },
        { name: 'secondaryCtaLabel', title: 'Secondary CTA Label', type: 'string' },
        { name: 'secondaryCtaUrl', title: 'Secondary CTA URL', type: 'string' },
      ],
    },
    {
      name: 'servicesIntro',
      title: 'Services Intro',
      type: 'object',
      fields: [
        { name: 'title', title: 'Title', type: 'string' },
        { name: 'copy', title: 'Copy', type: 'text', rows: 4 },
      ],
    },
    {
      name: 'faqPageIntro',
      title: 'FAQ Page Intro',
      type: 'object',
      fields: [
        { name: 'title', title: 'Title', type: 'string' },
        { name: 'copy', title: 'Copy', type: 'text', rows: 4 },
      ],
    },
    {
      name: 'contactIntro',
      title: 'Contact Intro',
      type: 'object',
      fields: [
        { name: 'title', title: 'Title', type: 'string' },
        { name: 'copy', title: 'Copy', type: 'text', rows: 4 },
      ],
    },
    {
      name: 'portfolioIntro',
      title: 'Portfolio Intro',
      type: 'object',
      fields: [
        { name: 'title', title: 'Title', type: 'string' },
        { name: 'copy', title: 'Copy', type: 'text', rows: 4 },
      ],
    },
  ],
  preview: {
    prepare() {
      return {
        title: 'Site Settings',
      }
    },
  },
}
