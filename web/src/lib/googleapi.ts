import { auth, sheets, sheets_v4 } from '@googleapis/sheets';
import { docs, docs_v1 } from '@googleapis/docs';
import credentials from '../../google-credentials.json';

const scopes = [
  "https://www.googleapis.com/auth/spreadsheets",
  "https://www.googleapis.com/auth/documents.readonly"
];

// Singletons.
let authClient = null;
let sheetsClient: sheets_v4.Sheets = null;
let docsClient: docs_v1.Docs = null;

export default async () => {
  if (!authClient) {
    const _auth = new auth.GoogleAuth({ credentials, scopes });
    authClient = await _auth.getClient();
  }
  if (!sheetsClient) {
    sheetsClient = sheets({ version: 'v4', auth: authClient });
  }
  if (!docsClient) {
    docsClient = docs({ version: 'v1', auth: authClient });
  }
  
  return { 
    sheets: sheetsClient, 
    docs: docsClient 
  };
}
