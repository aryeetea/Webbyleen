export const faqItemType = {
  name: 'faqItem',
  title: 'FAQ Item',
  type: 'document',
  fields: [
    {
      name: 'sortOrder',
      title: 'Sort Order',
      type: 'number',
      validation: Rule => Rule.required().integer().min(1),
    },
    {
      name: 'question',
      title: 'Question',
      type: 'string',
      validation: Rule => Rule.required(),
    },
    {
      name: 'answer',
      title: 'Answer',
      type: 'text',
      rows: 5,
      validation: Rule => Rule.required(),
    },
  ],
  preview: {
    select: {
      title: 'question',
    },
  },
}
