import getClient from '../lib/googleapi';

// TODO: Improve this. Formatting is not being read this way.

async function getDocument(documentId: string) {
  const { docs } = await getClient();
  const { data } = await docs.documents.get({ documentId });
  const content = data.body.content.map(c => c?.paragraph?.elements[0].textRun?.content);
  return content.join('').replaceAll('\n', '<br/>');
}

export default getDocument;