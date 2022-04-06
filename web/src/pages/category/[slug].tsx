import React, { FC, Fragment } from 'react';
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import GenerateProps, { GeneratePaths } from '../../server-props/category';
import GridLayout from '../../components/presets/GridLayout';
import SEO from '../../components/SEO';

const Category: FC = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { categoryName, items } = props;
  return (
    <Fragment>
      <SEO pageTitle={categoryName} />
      <GridLayout title={categoryName} items={items} />
    </Fragment>
  );
}

export default Category;

export const getStaticPaths: GetStaticPaths = GeneratePaths;
export const getStaticProps: GetStaticProps = GenerateProps;
