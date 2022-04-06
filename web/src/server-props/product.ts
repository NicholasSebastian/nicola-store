import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import sanity from '../lib/sanity';
import Sheets from '../lib/sheets';
import useCache from '../utils/useCache';
import { IProduct, Variants } from '../pages/product/[slug]';

const INVENTORY_ID = '1I-BCqr41Lzlf5XVJEgrDZF9yYHupBREOipbAHjdwwhk';
const HEADERS = ['id', 'name', 's', 'm', 'l'];
const CACHE_TIME = 30; // in Seconds.

export default async (context: GetServerSidePropsContext): Promise<Result> => {
  const { slug } = context.params;
  const product: IProduct = await sanity.fetch(query, { slug });
  
  if (!product) return { notFound: true };

  // Value is cached because google-sheets quota only allows up to 60 requests per minute.
  // Values are cached for 30 seconds, which means this can only cause up to 2 requests per minute.
  const inventory = await useCache(product.id, async () => {
    const { name, variants, category } = product;

    const sheets = await Sheets.getInstance(INVENTORY_ID);
    await addUnregisteredCategory(sheets, category);
    
    const rows = await sheets.getRows(category, 'A', 'E');
    await addUnregisteredVariants(sheets, rows, { productName: name, variants, category });
    return getInventoryData(rows, variants);

  }, CACHE_TIME);

  return { 
    props: { 
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

interface ISimpleProductData {
  productName: string
  variants: Variants, 
  category: string
}
