export default {
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  __experimental_actions: [/*'create',*/ 'update', /*'delete',*/ 'publish'], 
  fields: [
    {
      name: 'headerMessage',
      title: 'Header Message',
      type: 'string'
    },
    {
      name: 'banners',
      title: 'Banners',
      type: 'array',
      of: [
        {
          title: 'Banner',
          type: 'banner'
        }
      ],
      validation: Rule => Rule.min(1).required()
    },
    {
      name: 'grid',
      title: 'Categories',
      type: 'array',
      of: [
        {
          title: 'Banner',
          type: 'banner'
        }
      ],
      validation: Rule => Rule.length(4).required(),
      options: { layout: 'grid' }
    },
    {
      name: 'bannerMiddle',
      title: 'Middle Banner',
      type: 'image'
    }
  ]
};