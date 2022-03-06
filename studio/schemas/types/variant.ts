export default {
  title: 'Product Variant',
  name: 'variant',
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
    },
    {
      name: 'one_size',
      title: 'One Size',
      type: 'boolean',
      initialValue: false
    },
    {
      name: 'sizes',
      title: 'Sizes In Stock',
      type: 'object',
      fields: ['S', 'M', 'L'].map(size => ({
        name: size.toLowerCase(),
        title: size,
        type: 'number',
        initialValue: 0,
        validation: Rule => Rule.integer().positive()
      })),
      hidden: ({ parent }) => parent.one_size
    },
    {
      name: 'quantity',
      title: 'In Stock',
      type: 'number',
      initialValue: 0,
      validation: Rule => Rule.integer().positive(),
      hidden: ({ parent }) => !parent.one_size
    }
  ],

  preview: {
    select: {
      title: 'name',
      isOneSize: 'one_size',
      sizeS: 'sizes.s',
      sizeM: 'sizes.m',
      sizeL: 'sizes.l',
      oneSize: 'quantity',
      media: 'images[0].asset'
    },
    prepare: ({ title, isOneSize, sizeS, sizeM, sizeL, oneSize, media }) => {
      const subtitle = isOneSize ? `${oneSize}pcs` : `S: ${sizeS}pcs - M: ${sizeM}pcs - L: ${sizeL}pcs`;
      return { title, subtitle, media };
    }
  }
}
