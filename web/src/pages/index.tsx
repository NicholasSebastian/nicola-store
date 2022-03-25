import React, { FC } from 'react';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import Link from 'next/link';
import styled from 'styled-components';
import sanity from '../lib/sanity';
import imageUrlFor from '../utils/imageUrlFor';
import SEO from '../components/SEO';

// TODO: Add pop up.

const Index: FC = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <Container>
      <SEO />
      <h1>Testing 123</h1>
      <h2>Empty Page</h2>
      <h3>Still waiting for content...</h3>
    </Container>
  );
}

export default Index;

export const getStaticProps: GetStaticProps = async () => {
  // TODO
  return {
    props: {
      // TODO
    }
  };
};

const Container = styled.div`
  width: 90%;
  max-width: 600px;
  margin: 0 auto;

  @media only screen and (min-width: 1024px) {
    max-width: 900px;
  }

  @media only screen and (min-width: 1366px) {
    max-width: 1300px;
  }
`;