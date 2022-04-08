export default {
  name: 'variant',
  title: 'Product Variant',
  type: 'object',
  fields: [
    {
      name: 'name',
      title: 'Variant Name',
      type: 'string'
    },
    {
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true }
        }
      ],
      options: { layout: 'grid' }
    }
  ],

  preview: {
    select: {
      title: 'name',
      media: 'images[0].asset'
    },
    prepare: ({ title, media }) => {
      return { title, media };
    }
  }
}
