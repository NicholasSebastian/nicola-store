import { MdCategory } from 'react-icons/md';

export default {
  name: 'category',
  title: 'Category',
  type: 'document',
  icon: MdCategory,
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
        maxLength: 96
      },
      validation: Rule => Rule.required()
    }
  ]
}