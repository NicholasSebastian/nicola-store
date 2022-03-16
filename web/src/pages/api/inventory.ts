import { NextApiRequest, NextApiResponse } from 'next';
import { GoogleSpreadsheet, GoogleSpreadsheetWorksheet, GoogleSpreadsheetRow } from 'google-spreadsheet';
import credentials from '../../../google-sheets.json';
import { IProduct } from '../product/[slug]';

const INVENTORY_ID = '1I-BCqr41Lzlf5XVJEgrDZF9yYHupBREOipbAHjdwwhk';
const HEADERS = ['id', 'name', 's', 'm', 'l'];

const inventory = new GoogleSpreadsheet(INVENTORY_ID);
inventory.useServiceAccountAuth(credentials);

function getSheet(category: string): Promise<GoogleSpreadsheetWorksheet> {
  return new Promise(async resolve => {
    const sheet = inventory.sheetsByIndex.find(sheet => sheet.title === category);
    if (sheet) {
      resolve(sheet);
    }
    else {
      const newSheet = await inventory.addSheet({ title: category });
      await newSheet.setHeaderRow(HEADERS);
      await inventory.loadInfo();
      resolve(newSheet);
    }
  });
}

async function getRows(sheet: GoogleSpreadsheetWorksheet, query: Query): Promise<GoogleSpreadsheetRows> {
  const rows = await sheet.getRows();
  const isInQuery = (key: string) => query.some(q => (q.key === key));
  const isInRows = (id: string) => rows.some(row => (row.id === id));

  // Add the variants that don't exist in the sheet yet.
  const notFound = query.filter(q => !isInRows(q.key));
  const newValues = notFound.map(q => [q.key, q.name, 0, 0, 0]);
  await sheet.addRows(newValues);

  return new Promise(async resolve => {
    // Get the corresponding rows of the variants.
    const rows = await sheet.getRows();
    const results = rows.filter(row => isInQuery(row.id));
    resolve(results);
  });
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { name, variants, category }: IProduct = req.body;
  const query = variants.map(variant => ({ key: variant.key, name: `${name} (${variant.name})` }));

  await inventory.loadInfo();
  const sheet = await getSheet(category);
  const items = await getRows(sheet, query);
  
  const results = items.map(result => ({ 
    s: parseInt(result.s), 
    m: parseInt(result.m), 
    l: parseInt(result.l) 
  }));

  res.status(200).json(results);
};

interface IQueryItem {
  key: string,
  name: string
}

type Query = Array<IQueryItem>
type GoogleSpreadsheetRows = Array<GoogleSpreadsheetRow>