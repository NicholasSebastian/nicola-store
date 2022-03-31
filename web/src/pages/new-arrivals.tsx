import React, { FC, Fragment } from 'react';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import sanity from '../lib/sanity';
import GridLayout from '../components/GridLayout';
import SEO from '../components/SEO';

const NewArrivals: FC = (props: InferGetStaticPropsType<typeof getStaticProps>) => (
  <Fragment>
    <SEO pageTitle="New Arrivals" />
    <GridLayout title="New Arrivals" items={props.items} />
  </Fragment>
);

export default NewArrivals;

const query = (`
  *[_type == 'product'] | order(_createdAt) {
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