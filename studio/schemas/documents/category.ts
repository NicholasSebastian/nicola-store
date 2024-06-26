import { MdCategory } from 'react-icons/md';

export default {
  name: 'category',
  title: 'Categories',
  type: 'document',
  icon: MdCategory,
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'localeString',
      validation: Rule => Rule.required()
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96
      },
      validation: Rule => Rule.required()
    }
  ],

  preview: {
    select: {
      title: 'name.en'
    }
  }
}