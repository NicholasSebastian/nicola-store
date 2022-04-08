import { HiCollection } from 'react-icons/hi';

export default {
  name: 'collection',
  title: 'Collections',
  type: 'document',
  icon: HiCollection,
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
};