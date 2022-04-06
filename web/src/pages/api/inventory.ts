import { NextApiRequest, NextApiResponse } from 'next';
import Sheets from '../../lib/sheets';
import useCache from '../../utils/useCache';
import { IProduct, Variants } from '../product/[slug]';

const INVENTORY_ID = '1I-BCqr41Lzlf5XVJEgrDZF9yYHupBREOipbAHjdwwhk';
const HEADERS = ['id', 'name', 's', 'm', 'l'];
const CACHE_TIME = 30; // in Seconds.

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { id, name, variants, category }: IProduct = req.body;

  // Value is cached because google-sheets quota only allows up to 60 requests per minute.
  const results = await useCache(id, async () => {

    const sheets = await Sheets.getInstance(INVENTORY_ID);
    await addUnregisteredCategory(sheets, category);
    
    const rows = await sheets.getRows(category, 'A', 'E');
    await addUnregisteredVariants(sheets, rows, { productName: name, variants, category });
    return getInventoryData(rows, variants);

  }, CACHE_TIME);

  res.status(200).json(results);
};

async function addUnregisteredCategory(client: Sheets, category: string) {
  const categoryExists = await client.hasSheet(category);
  if (!categoryExists) {
    await client.addSheet(category);
    await client.addRow(category, HEADERS);
  }
}

async function addUnregisteredVariants(client: Sheets, rows: any[][], product: ISimpleProductData) {
  const { productName, variants, category } = product;
  const unregisteredVariants = variants.filter(variant => !(rows?.some(row => (row[0] === variant.key))));

  if (unregisteredVariants.length > 0) {
    const newValues = unregisteredVariants.map(({ key, name }) => [key, `${productName} (${name})`, 0, 0, 0]);
    await client.addRows(category, newValues);
  }
}

function getInventoryData(rows: any[][], variants: Variants) {
  return rows
    .filter(row => variants.some(variant => variant.key === row[0]))
    .map(item => ({ 
      s: parseInt(item[2]), 
      m: parseInt(item[3]), 
      l: parseInt(item[4]) 
    }));
}

interface ISimpleProductData {
  productName: string
  variants: Variants, 
  category: string
}
