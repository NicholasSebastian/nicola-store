import React, { FC, Fragment } from 'react';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import sanity from '../lib/sanity';
import GridLayout from '../components/presets/GridLayout';
import SEO from '../components/SEO';

const OnSale: FC = (props: InferGetStaticPropsType<typeof getStaticProps>) => (
  <Fragment>
    <SEO pageTitle="On Sale" />
    <GridLayout title="On Sale" items={props.items} />
  </Fragment>
);

export default OnSale;

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

export const getStaticProps: GetStaticProps = async () => {
  const items = await sanity.fetch(query);
  return { props: { items } };
}