import React, { FC, Fragment } from 'react';
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import sanity from '../../lib/sanity';
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

const query = "*[_type == 'category'] { ...slug { 'slug': current } }";
const pageQuery = "*[_type == 'category' && slug.current == $slug] { name }[0]";

const contentQuery = (`
  *[_type == 'product' && category->.slug.current == $slug] {
    name,
    ...slug { 'slug': current },
    price,
    discount,
    ...colors[0] { 
      ...images[0] { ...asset { 'image1': _ref }},
      ...images[1] { ...asset { 'image2': _ref }}
    },
    ...colors[1] { ...images[0] { ...asset { 'image3': _ref }} },
    'createdAt': _createdAt,
  }
`);

export const getStaticPaths: GetStaticPaths = async () => {
  const results = await sanity.fetch(query);
  const paths = results.map(({ slug }) => ({ params: { slug } }));

  return { paths, fallback: false };
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { slug } = context.params;
  const { name } = await sanity.fetch(pageQuery, { slug });
  const items = await sanity.fetch(contentQuery, { slug });

  return { props: { categoryName: name, items } };
}