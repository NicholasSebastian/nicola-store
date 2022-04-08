import S from '@sanity/desk-tool/structure-builder';
import { IconType } from 'react-icons';
import { AiFillHome } from 'react-icons/ai';
import { IoMdShare } from 'react-icons/io';

interface ISingleton {
  title: string,
  schema: string,
  icon: IconType
}

const singletons: Array<ISingleton> = [
  { title: 'Home Page', schema: 'homePage', icon: AiFillHome },
  { title: 'Social Links', schema: 'socials', icon: IoMdShare }
];

export default () =>
  S.list()
    .title('Content')
    .items([
      ...singletons.map(item => S.listItem().title(item.title).icon(item.icon).child(S.document().schemaType(item.schema).documentId(item.schema))),
      S.divider(),
      ...S.documentTypeListItems().filter(item => !singletons.some(({ schema }) => item.getId() === schema))
    ]);

// https://www.sanity.io/plugins/sanity-plugin-dashboard-widget-netlify
// https://www.sanity.io/plugins/sanity-plugin-google-analytics