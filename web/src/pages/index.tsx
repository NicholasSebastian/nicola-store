import React, { FC } from 'react';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import Link from 'next/link';
import Layout from '../components/Layout';
import sanity from '../utils/sanity';
import imageUrlFor from '../utils/imageUrlFor';

const Index = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <Layout>
      <h1>Hello World</h1>
    </Layout>
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