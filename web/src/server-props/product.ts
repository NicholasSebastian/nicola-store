import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import sanity from '../lib/sanity';
import Sheets from '../lib/sheets';
import useCache from '../utils/useCache';
import { IProduct } from '../pages/product/[slug]';

const INVENTORY_ID = '1I-BCqr41Lzlf5XVJEgrDZF9yYHupBREOipbAHjdwwhk';
const HEADERS = ['id', 'name', 's', 'm', 'l'];

const CACHE_TIME = 30; // in Seconds.

// Value is cached because google-sheets quota only allows up to 60 requests per minute.
// Values are cached for 30 seconds, which means this can only cause up to 2 requests per minute.

export default async (context: GetServerSidePropsContext): Promise<Result> => {
  const { slug } = context.params;
  const product: IProduct = await sanity.fetch(query, { slug });
  
  if (!product) return { notFound: true };

  const inventory = await useCache(product.id, () => fetchInventory(product), CACHE_TIME);

  return { 
    props: { 
      // Merge the inventory data onto the product data.
      product: { 
        ...product, 
        variants: product.variants.map(variant => ({
          ...variant,
          ...(inventory.find(item => item.key === variant.key))
        })) 
      } 
    } 
  };
}

async function fetchInventory(product: IProduct) {
  const { name, variants, category } = product;
  const sheets = await Sheets.getInstance(INVENTORY_ID);

  // Fetch the category's sheet. In the case that it does not exist yet, create it.
  let sheet = await sheets.getSheet(category);
  if (!sheet) {
    sheet = await sheets.addSheet(category);
    await sheets.addRow(category, HEADERS);
  }

  // Fetch all entries inside the sheet.
  const rows = await sheets.getRows(category, 'A', 'E');
  
  // In the case that the product's variant does not exist yet, create it.
  const unregisteredVariants = variants.filter(variant => !(rows?.some(row => row[0] === variant.key)));
  if (unregisteredVariants.length > 0) {
    const newValues = unregisteredVariants.map(variant => [variant.key, `${name} (${variant.name})`, 0, 0, 0]);
    await sheets.addRows(category, newValues);

    // Make sure to also add the new rows into consideration before the next steps.
    rows.push(...newValues);

    // Format the new entry's size cells to hold only numbers.
    await sheets.formatRangeAsNumber({
      sheetId: sheet.properties.sheetId,
      startRowIndex: rows.length - newValues.length,
      endRowIndex: rows.length,
      startColumnIndex: 2,
      endColumnIndex: 5
    });
  }
  
  // Format the data appropriately before returning.
  return rows
    .filter(row => variants.some(variant => variant.key === row[0]))
    .map(item => ({ 
      key: item[0],
      s: parseInt(item[2]), 
      m: parseInt(item[3]), 
      l: parseInt(item[4]) 
    }));
}

const query = (`
  *[_type == 'product' && slug.current == $slug] {
    'id': _id,
    name,
    'variants': colors[] {
      'key': _key,
      name,
      images[] { ...asset { 'image': _ref } }
    },
    price,
    discount,
    shopee,
    ...category-> { ...slug { 'category': current } },
    collection-> {
      name,
      ...slug { 'slug': current }
    },
    description { en, id },
    moreInfo { en, id },
    'createdAt': _createdAt
  }[0]
`);

type Result = GetServerSidePropsResult<{ [key: string]: any }>
