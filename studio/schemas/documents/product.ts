import { GiTShirt } from 'react-icons/gi';

export default {
  name: 'product',
  title: 'Products',
  type: 'document',
  icon: GiTShirt,
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'price',
      title: 'Price (Rp)',
      type: 'number',
      initialValue: 0,
      validation: Rule => Rule.required()
    },
    {
      name: 'discount',
      title: 'Discount (%)',
      type: 'number',
      initialValue: 0,
      validation: Rule => Rule.required().positive().max(100)
    },
    {
      name: 'shopee',
      title: 'Shopee Link',
      type: 'string'
    },
    {
      name: 'tokopedia',
      title: 'Tokopedia Link',
      type: 'string'
    },
    {
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: { type: 'category' },
      validation: Rule => Rule.required(),
      options: { disableNew: true }
    },
    {
      name: 'collection',
      title: 'Collection',
      type: 'reference',
      to: { type: 'collection' }
    },
    {
      name: 'colors',
      title: 'Variants',
      type: 'array',
      of: [
        {
          title: 'Variant',
          type: 'variant'
        }
      ],
      validation: Rule => Rule.required().min(1),
      options: { layout: 'grid' }
    },
    {
      name: 'description',
      title: 'Description',
      type: 'localeBlockContent'
    },
    {
      name: 'moreInfo',
      title: 'More Information',
      type: 'localeBlockContent',
      options: {
        collapsible: true,
        collapsed: true
      }
    }
  ],

  preview: {
    select: {
      title: 'name',
      subtitle: 'category.name.en',
      media: 'colors.0.images.0.asset'
    }
  }
}
