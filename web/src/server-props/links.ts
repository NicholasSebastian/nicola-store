import { GetStaticPropsResult } from 'next';
import sanity from '../lib/sanity';

const query = "*[_id == 'socials'][0]";

export default async (): Promise<Result> => {
  const links = await sanity.fetch(query);
  return { props: { links } };
}

type Result = GetStaticPropsResult<{ [key: string]: any }>