import React, { FC, ComponentType } from 'react';
import { GetStaticProps, GetServerSideProps } from 'next';
import styled from 'styled-components';
import sanity from '../../lib/sanity';
import mergeDeep from '../../utils/deepMerge';
import Header, { IHeaderProps } from './Header';
import Footer, { IFooterProps } from './Footer';
import Floaty from './Floaty';

function withLayout<P extends object>(Component: ComponentType<P>): FC<P & LayoutProps> {
  return ({ message, categories, socials, ...props }) => (
    <Container>
      <Header message={message} categories={categories} />
      <main><Component {...props as P} /></main>
      <Footer socials={socials} />
      <Floaty whatsapp={socials.whatsapp} />
    </Container>
  );
}

function withLayoutProps(other: GetStaticProps | GetServerSideProps): any {
  return async (context) => {
    const otherProps = await other(context);
    if (('props' in otherProps) === false) return otherProps;

    const layoutProps = await generateLayoutProps(context);
    return mergeDeep(otherProps, layoutProps);
  };
}

const generateLayoutProps: GetStaticProps<LayoutProps> = async () => {
  const { headerMessage } = await sanity.fetch(messageQuery);
  const categories = await sanity.fetch(categoriesQuery);
  const socials = await sanity.fetch(footerQuery);

  return {
    props: {
      message: headerMessage,
      categories,
      socials
    }
  };
}

export { withLayoutProps, generateLayoutProps };
export default withLayout;

const messageQuery = "*[_id == 'homePage'][0] { headerMessage }";

const categoriesQuery = (`
  *[_type == 'category'] {
    name { en, id },
    ...slug { 'slug': current }
  }
`);

const footerQuery = (`
  *[_id == 'socials'][0] {
    copyright,
    email,
    instagram, 
    line,
    whatsapp
  }
`);

const Container = styled.div`
  position: relative;

  > main {
    min-height: calc(100vh - 250px);
  }
`;

type LayoutProps = IHeaderProps & IFooterProps;
