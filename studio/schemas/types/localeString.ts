const languages = [
  { id: 'en', title: 'English' },
  { id: 'id', title: 'Bahasa Indonesia' }
];

export default {
  name: 'localeString',
  title: 'Locale String',
  type: 'object',
  fields: languages.map((lang, i) => ({
    title: lang.title,
    name: lang.id,
    type: 'string',
    validation: Rule => (i === 0) ? Rule.required() : Rule
  }))
}
