import { GetStaticPropsResult } from 'next';
import sanity from '../lib/sanity';

export default async (): Promise<Result> => {
  const data = await sanity.fetch(query);
  const items = await sanity.fetch(itemsQuery);
  return { 
    props: { 
      ...data, 
      items 
    } 
  };
}

const query = (`
  *[_id == 'homePage'] {
    banners[] { ...image { ...asset { 'image': _ref } }, path, text },
    grid[] { ...image { ...asset { 'image': _ref } }, path, text },
    ...bannerMiddle { ...asset { 'bannerMiddle': _ref } }
  }[0]
`);

const itemsQuery = (`
  *[_type == 'product'] | order(_createdAt desc) {
    name,
    ...slug { 'slug': current },
    price,
    discount,
    ...colors[0] { 
      ...images[0] { ...asset { 'image1': _ref }},
      ...images[1] { ...asset { 'image2': _ref }}
    },
    ...colors[1] { ...images[0] { ...asset { 'image3': _ref }} },
    'createdAt': _createdAt,
  }[0...4]
`);

type Result = GetStaticPropsResult<{ [key: string]: any }>