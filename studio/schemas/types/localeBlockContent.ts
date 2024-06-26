const languages = [
  { id: 'en', title: 'English' },
  { id: 'id', title: 'Bahasa Indonesia' }
];

export default {
  name: 'localeBlockContent',
  title: 'Locale Block Content',
  type: 'object',
  fields: languages.map(lang => ({
    title: lang.title,
    name: lang.id,
    type: 'blockContent'
  }))
}
