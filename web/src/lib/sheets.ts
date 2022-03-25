import { GoogleSpreadsheet } from 'google-spreadsheet';
import credentials from '../../google-credentials.json';

export default (sheetsId: string) => {
  const sheets = new GoogleSpreadsheet(sheetsId);
  sheets.useServiceAccountAuth(credentials);
  return sheets;
};