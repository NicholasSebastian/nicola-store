import { GetStaticProps } from 'next';
import getDocument from '../utils/getDocument';

export default (docId_en: string, docId_id: string): GetStaticProps => {
  return async () => ({
    props: {
      en: await getDocument(docId_en),
      id: await getDocument(docId_id)
    }
  });
}
