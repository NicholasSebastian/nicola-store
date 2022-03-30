import { auth, sheets, sheets_v4 } from '@googleapis/sheets';
import { docs, docs_v1 } from '@googleapis/docs';
import credentials from '../../google-credentials.json';

const scopes = [
  "https://www.googleapis.com/auth/spreadsheets",
  "https://www.googleapis.com/auth/documents.readonly"
];

// Singletons.
let clientInstance = null;
let sheetsInstance: sheets_v4.Sheets = null;
let docsInstance: docs_v1.Docs = null;

export default async () => {
  if (!clientInstance) {
    const _auth = new auth.GoogleAuth({ credentials, scopes });
    clientInstance = await _auth.getClient();
  }
  if (!sheetsInstance) {
    sheetsInstance = sheets({ version: 'v4', auth: clientInstance });
  }
  if (!docsInstance) {
    docsInstance = docs({ version: 'v1', auth: clientInstance });
  }
  
  return { 
    sheets: sheetsInstance, 
    docs: docsInstance 
  };
}
