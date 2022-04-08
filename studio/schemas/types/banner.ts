export default {
  name: 'banner',
  title: 'Banner',
  type: 'object',
  fields: [
    {
      name: 'image',
      title: 'Banner Art',
      type: 'image',
      validation: Rule => Rule.required()
    },
    {
      name: 'path',
      title: 'Link',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'text',
      title: 'Overlay Text',
      type: 'string'
    }
  ],

  preview: {
    select: {
      text: 'text',
      path: 'path',
      media: 'image'
    },
    prepare: ({ text, path, media }) => {
      return { 
        title: text ?? path, 
        media 
      };
    }
  }
}

// https://unsplash.com/@tamarabellis