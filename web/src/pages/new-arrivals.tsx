import React, { FC, Fragment } from 'react';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import GenerateProps from '../server-props/new-arrivals';
import GridLayout from '../components/presets/GridLayout';
import SEO from '../components/SEO';

const NewArrivals: FC = (props: InferGetStaticPropsType<typeof getStaticProps>) => (
  <Fragment>
    <SEO pageTitle="New Arrivals" />
    <GridLayout title="New Arrivals" items={props.items} />
  </Fragment>
);

export default NewArrivals;
export const getStaticProps: GetStaticProps = GenerateProps;
