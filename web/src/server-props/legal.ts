import { GetStaticProps } from 'next';
import Document from '../lib/docs';

export default (docId_en: string, docId_id: string): GetStaticProps => {
  return async () => {
    const document_en = await Document.getInstance(docId_en);
    const document_id = await Document.getInstance(docId_id);
    
    return {
      props: {
        en: await document_en.getContent(),
        id: await document_id.getContent()
      }
    }
  };
}
