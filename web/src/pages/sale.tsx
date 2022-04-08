import React, { FC, Fragment } from 'react';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import GenerateProps from '../server-props/sale';
import useLanguage, { ILocalization } from '../hooks/useLanguage';
import withLayout, { withLayoutProps } from '../components/layout/Layout';
import GridLayout from '../components/presets/GridLayout';
import SEO from '../components/SEO';

const localization: ILocalization = {
  'title': {
    en: "On Sale",
    id: "Sale"
  }
}

const OnSale: FC = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
  const [language] = useLanguage();
  return (
    <Fragment>
      <SEO pageTitle="On Sale" />
      <GridLayout title={localization.title[language]} items={props.items} />
    </Fragment>
  );
}

export default withLayout(OnSale);
export const getStaticProps: GetStaticProps = withLayoutProps(GenerateProps);
