export default {
  name: 'socials',
  title: 'Social Links',
  type: 'document',
  __experimental_actions: [/*'create',*/ 'update', /*'delete',*/ 'publish'], 
  fields: [
    {
      name: 'copyright',
      title: 'Copyright',
      type: 'string'
    },
    {
      name: 'email',
      title: 'Email',
      type: 'string'
    },
    {
      name: 'instagram',
      title: 'Instagram URL',
      type: 'string'
    },
    {
      name: 'tiktok',
      title: 'TikTok URL',
      type: 'string'
    },
    {
      name: 'shopee',
      title: 'Shopee URL',
      type: 'string'
    },
    {
      name: 'tokopedia',
      title: 'Tokopedia URL',
      type: 'string'
    },
    {
      name: 'whatsapp',
      title: 'Whatsapp URL',
      type: 'string'
    },
    {
      name: 'line',
      title: 'Line URL',
      type: 'string'
    },
    {
      name: 'telegram',
      title: 'Telegram URL',
      type: 'string'
    }
  ]
};