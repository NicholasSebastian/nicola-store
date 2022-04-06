import React, { FC, Fragment } from 'react';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import GenerateProps from '../server-props/sale';
import GridLayout from '../components/presets/GridLayout';
import SEO from '../components/SEO';

const OnSale: FC = (props: InferGetStaticPropsType<typeof getStaticProps>) => (
  <Fragment>
    <SEO pageTitle="On Sale" />
    <GridLayout title="On Sale" items={props.items} />
  </Fragment>
);

export default OnSale;
export const getStaticProps: GetStaticProps = GenerateProps;
