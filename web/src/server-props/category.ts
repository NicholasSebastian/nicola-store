import { GetStaticPropsContext, GetStaticPropsResult, GetStaticPathsResult } from 'next';
import sanity from '../lib/sanity';

export const GeneratePaths = async (): Promise<PathResult> => {
  const results = await sanity.fetch(query);
  return { 
    paths: results.map(({ slug }) => ({ params: { slug } })), 
    fallback: false 
  };
}

export default async (context: GetStaticPropsContext): Promise<Result> => {
  const { slug } = context.params;
  const { name } = await sanity.fetch(nameQuery, { slug });
  const items = await sanity.fetch(itemsQuery, { slug });
  return { 
    props: { 
      categoryName: name, 
      items
    } 
  };
}

const query = "*[_type == 'category'] { ...slug { 'slug': current } }";
const nameQuery = "*[_type == 'category' && slug.current == $slug] { name }[0]";

const itemsQuery = (`
  *[_type == 'product' && category->.slug.current == $slug] {
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
  }
`);

type Result = GetStaticPropsResult<{ [key: string]: any }>
type PathResult = GetStaticPathsResult<{ [key: string]: any }>