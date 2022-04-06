import { GetStaticPropsResult } from 'next';
import sanity from '../lib/sanity';

export default async (): Promise<Result> => {
  const items = await sanity.fetch(query);
  return { props: { items } };
}

const query = (`
  *[_type == 'product' && discount != 0] {
    name,
    ...slug { 'slug': current },
    price,
    discount,
    ...colors[0] { 
      ...images[0] { ...asset { 'image1': _ref }},
      ...images[1] { ...asset { 'image2': _ref }}
    },
    ...colors[1] { ...images[0] { ...asset { 'image3': _ref }} },
    'createdAt': _createdAt
  }
`);

type Result = GetStaticPropsResult<{ [key: string]: any }>