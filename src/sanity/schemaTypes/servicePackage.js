export const servicePackageType = {
  name: 'servicePackage',
  title: 'Service Package',
  type: 'document',
  fields: [
    {
      name: 'sortOrder',
      title: 'Sort Order',
      type: 'number',
      validation: Rule => Rule.required().integer().min(1),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
      },
      validation: Rule => Rule.required(),
    },
    {
      name: 'tier',
      title: 'Tier Label',
      type: 'string',
      validation: Rule => Rule.required(),
    },
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: Rule => Rule.required(),
    },
    {
      name: 'priceLabel',
      title: 'Price Label',
      type: 'string',
      validation: Rule => Rule.required(),
    },
    {
      name: 'priceMin',
      title: 'Price Minimum',
      type: 'number',
      validation: Rule => Rule.required().min(0),
    },
    {
      name: 'priceMax',
      title: 'Price Maximum',
      type: 'number',
      validation: Rule => Rule.required().min(0),
    },
    {
      name: 'depositLabel',
      title: 'Deposit Label',
      type: 'string',
      validation: Rule => Rule.required(),
    },
    {
      name: 'turnaround',
      title: 'Turnaround',
      type: 'string',
      validation: Rule => Rule.required(),
    },
    {
      name: 'who',
      title: 'Description',
      type: 'text',
      rows: 4,
      validation: Rule => Rule.required(),
    },
    {
      name: 'includes',
      title: 'Included Items',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'addons',
      title: 'Add-ons',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'id', title: 'ID', type: 'string', validation: Rule => Rule.required() },
            { name: 'label', title: 'Label', type: 'string', validation: Rule => Rule.required() },
            { name: 'price', title: 'Price', type: 'string', validation: Rule => Rule.required() },
          ],
          preview: {
            select: {
              title: 'label',
              subtitle: 'price',
            },
          },
        },
      ],
    },
    {
      name: 'featured',
      title: 'Featured Package',
      type: 'boolean',
      initialValue: false,
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'priceLabel',
    },
  },
}
