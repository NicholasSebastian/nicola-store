import getClient from '../lib/googleapi';

async function getDocument(documentId: string) {
  const { docs } = await getClient();
  const { data } = await docs.documents.get({ documentId });
  return data.body.content
    .map(element => {
      const para = element?.paragraph;
      if (!para) return undefined;

      let text = para.elements[0].textRun.content;
      const type = para.paragraphStyle.namedStyleType;
      
      const isHeading = type.includes('HEADING');
      const isBullet = para.bullet !== undefined;

      if (isHeading) text = `<h2>${text.replaceAll('\n', '')}</h2>`;
      if (isBullet) text = `<li>${text.replaceAll('\n', '')}</li>`;
      return text;
    })
    .join('')
    .replaceAll('\n', '<br/>');
}

export default getDocument;