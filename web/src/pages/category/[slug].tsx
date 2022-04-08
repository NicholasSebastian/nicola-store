import React, { FC, Fragment } from 'react';
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import GenerateProps, { GeneratePaths } from '../../server-props/category';
import useLanguage from '../../hooks/useLanguage';
import withLayout, { withLayoutProps } from '../../components/layout/Layout';
import GridLayout from '../../components/presets/GridLayout';
import SEO from '../../components/SEO';

const Category: FC = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { categoryName, items } = props;
  const [language] = useLanguage();
  return (
    <Fragment>
      <SEO pageTitle={categoryName.en} />
      <GridLayout title={categoryName[language]} items={items} />
    </Fragment>
  );
}

export default withLayout(Category);

export const getStaticPaths: GetStaticPaths = GeneratePaths;
export const getStaticProps: GetStaticProps = withLayoutProps(GenerateProps);
