import React, { FC, Fragment } from 'react';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import GenerateProps from '../server-props/new-arrivals';
import useLanguage, { ILocalization } from '../hooks/useLanguage';
import withLayout, { withLayoutProps } from '../components/layout/Layout';
import GridLayout from '../components/presets/GridLayout';
import SEO from '../components/SEO';

const localization: ILocalization = {
  'title': {
    en: "New Arrivals",
    id: "Terbaru"
  }
}

const NewArrivals: FC = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
  const [language] = useLanguage();
  return (
    <Fragment>
      <SEO pageTitle="New Arrivals" />
      <GridLayout title={localization.title[language]} items={props.items} />
    </Fragment>
  );
}

export default withLayout(NewArrivals);
export const getStaticProps: GetStaticProps = withLayoutProps(GenerateProps);
