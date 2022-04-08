import { docs_v1 } from '@googleapis/docs';
import getClient from './googleapi';

class Document {
  private instance: docs_v1.Docs;
  private documentId: string;

  private constructor(client: docs_v1.Docs, docId: string) {
    this.instance = client;
    this.documentId = docId;
  }

  public static async getInstance(sheetId: string) {
    const { docs } = await getClient();
    return new Document(docs, sheetId);
  }

  public async getContent() {
    const { data } = await this.instance.documents.get({ documentId: this.documentId });
    return data.body.content
      .map(element => {
        const para = element?.paragraph;
        return para ? this.parseContent(para) : undefined;
      })
      .join('')
      .replaceAll('\n', '<br/>');
  }

  private parseContent(para: docs_v1.Schema$Paragraph) {
    let text = para.elements[0].textRun.content;
    const type = para.paragraphStyle.namedStyleType;
    
    const isHeading = type.includes('HEADING');
    const isBullet = para.bullet !== undefined;

    if (isHeading) text = `<h2>${text.replaceAll('\n', '')}</h2>`;
    if (isBullet) text = `<li>${text.replaceAll('\n', '')}</li>`;
    return text;
  }
}

export default Document;
