import React, { FC, useState } from 'react';
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import styled from 'styled-components';
import sanity from '../../utils/sanity';

const Product: FC = ({ product }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <Container>
      <h2>{product.name}</h2>
      {/* TODO */}
    </Container>
  );
}

export default Product;

const query = "*[_type == 'product'] { ...slug { 'slug': current } }";

const contentQuery = (`
  *[_type == 'product' && slug.current == $slug] {
    'id': _id,
    name,
    'variants': colors[] {
      'key': _key,
      name,
      one_size, quantity, sizes,
      images[] { ...asset { 'image': _ref } }
    },
    price,
    discount,
    description { en, id },
    'createdAt': _createdAt
  }[0]
`);

export const getStaticPaths: GetStaticPaths = async () => {
  const results = await sanity.fetch(query);
  const paths = results.map(({ slug }) => ({ params: { slug } }));

  return { paths, fallback: false };
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { slug } = context.params;
  const product = await sanity.fetch(contentQuery, { slug });

  console.log(product);
  return { props: { product } };
}

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