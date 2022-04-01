import { NextApiRequest, NextApiResponse } from 'next';
import sanity from '../../lib/sanity';

const query = (`
  *[_id == $product][0] {
    'productId': _id,
    name,
    price,
    discount,
    ...colors[_key == $variant][0] {
      'variantKey': _key,
      'variant': name,
      ...images[0] { ...asset { 'image': _ref } }
    }
  }
`);

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { product, variant } = req.query;
  const result = await sanity.fetch(query, { product, variant })
  res.status(200).json(result);
}