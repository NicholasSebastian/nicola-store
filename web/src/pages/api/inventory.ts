import { NextApiRequest, NextApiResponse } from 'next';
import { sheets_v4 } from '@googleapis/sheets';
import getClient from '../../lib/googleapi';
import useCache from '../../utils/useCache';
import { IProduct, Variants } from '../product/[slug]';

const INVENTORY_ID = '1I-BCqr41Lzlf5XVJEgrDZF9yYHupBREOipbAHjdwwhk';
const HEADERS = ['id', 'name', 's', 'm', 'l'];
const CACHE_TIME = 30; // in Seconds.

async function addUnregisteredCategory(client: sheets_v4.Sheets, category: string) {
  const { data } = await client.spreadsheets.get({ spreadsheetId: INVENTORY_ID });
  if (!data.sheets.some(sheet => sheet.properties.title === category)) {
    await client.spreadsheets.batchUpdate({ 
      spreadsheetId: INVENTORY_ID,
      requestBody: {
        requests: [
          { 
            addSheet: { properties: { title: category } } 
          },
          // TODO: Add quantity columns data validation.
        ]
      } 
    });

    // Add header row.
    await client.spreadsheets.values.append({
      spreadsheetId: INVENTORY_ID, 
      range: `${category}!A:E`,
      valueInputOption: "RAW",
      requestBody: { values: [HEADERS] }
    });
  }
}

async function addUnregisteredVariants(client: sheets_v4.Sheets, product: ISimpleProductDataWithName) {
  const { productName, variants, category } = product;
  const params = { spreadsheetId: INVENTORY_ID, range: `${category}!A:E` };

  const { data } = await client.spreadsheets.values.get(params);
  const rows = data.values;

  const rowExists = (id: string) => rows?.some(row => (row[0] === id));
  const newVariants = variants.filter(variant => !rowExists(variant.key));

  if (newVariants.length > 0) {
    const newValues = newVariants.map(({ key, name }) => [key, `${productName} (${name})`, 0, 0, 0]);
    await client.spreadsheets.values.append({
      ...params,
      valueInputOption: "USER_ENTERED",
      requestBody: { values: newValues }
    });
  }
}

async function getInventoryData(client: sheets_v4.Sheets, product: ISimpleProductData) {
  const { variants, category } = product;
  const params = { spreadsheetId: INVENTORY_ID, range: `${category}!A:E` };

  const { data } = await client.spreadsheets.values.get(params);
  const rows = data.values;

  const isRequested = (id: string) => variants.some(variant => variant.key === id);
  const requestedItems = rows.filter(row => isRequested(row[0]));
  
  return requestedItems.map(item => ({ s: parseInt(item[2]), m: parseInt(item[3]), l: parseInt(item[4]) }));
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { id, name, variants, category }: IProduct = req.body;

  // Value is cached because google-sheets quota only allows up to 60 requests per minute.
  const results = await useCache(id, async () => {
    const { sheets } = await getClient();
    await addUnregisteredCategory(sheets, category);
    await addUnregisteredVariants(sheets, { productName: name, variants, category });
    return await getInventoryData(sheets, { variants, category });
  }, CACHE_TIME);

  res.status(200).json(results);
};

interface ISimpleProductData {
  variants: Variants, 
  category: string
}

interface ISimpleProductDataWithName extends ISimpleProductData {
  productName: string
}
