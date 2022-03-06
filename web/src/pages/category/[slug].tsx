import React, { FC, useState } from 'react';
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import styled from 'styled-components';
import sanity from '../../utils/sanity';
import Item from '../../components/Item';

// TODO: Sort by (collection, lowest price, highest price).
// TODO: If sorting by collection, group by collection (headers like 'spring-summer 2022 collection').
// TODO: Pagination.

const sortOrders = [
  { key: 'collection', title: 'Collection' },
  { key: 'lowest', title: 'Lowest Price' },
  { key: 'price', title: 'Highest Price' }
];

const Category: FC = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { categoryName, items } = props;
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState(sortOrders[0].key);

  return (
    <Container>
      <nav>
        <h2>{categoryName}</h2>
        <div>
          <input type='input' placeholder='Search' value={search} onChange={e => setSearch(e.target.value)} />
          {sortOrders.map(({ key, title }) => (
            <div key={key}>
              <input type='radio' id={key} value={key} checked={sort === key} onChange={e => setSort(e.target.value)} />
              <label htmlFor={key}>{title}</label>
            </div>
          ))}
        </div>
      </nav>
      <section>
        {items
          .filter(item => new RegExp(search, 'i').test(item.name))
          .map((item, i) => <Item key={i} item={item} />)
        }
      </section>
    </Container>
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
    ...colors[0]{ ...images[0] { ...asset { 'image': _ref }}},
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

const Container = styled.div`
  width: 90%;
  max-width: 600px;
  margin: 0px auto;

  > nav:first-child {
    > h2 {
      font-size: 30px;
      margin-bottom: 20px;
    }

    > div {
      display: flex;
      justify-content: end;
      margin-bottom: 50px;

      // Search Bar.
      > input {
        display: none;
      }

      // Sort Button.
      > div > input[type='radio'] {
        visibility: hidden;
        position: absolute;

        + label {
          user-select: none;
          font-size: 12px;
          padding: 8px 16px;

          :hover {
            cursor: pointer;
          }

          @media only screen and (min-width: 800px) {
            font-size: 13px;
          }
        }

        :checked + label {
          background-color: #000;
          color: #fff;
        }
      }
    }
  }

  > section {
    display: grid;
    grid-template-columns: repeat(2, minmax(100px, 1fr));
    grid-gap: 20px;
  }

  @media only screen and (min-width: 1024px) {
    max-width: 900px;

    > nav:first-child > div {
      border: 1px solid #ccc;
      position: relative;
      padding: 12px;

      // Search Bar.
      > input {
        display: block;
        background: none;
        border: none;
        width: 50%;
        padding-left: 20px;
        position: absolute;
        left: 0px;
        top: 0;
        bottom: 0;

        :focus {
          outline: none;
        }
      }

      > div > input[type='radio'] + label {
        font-size: 14px;
      }
    }
    
    > section {
      grid-template-columns: repeat(3, minmax(200px, 1fr));
    }
  }

  @media only screen and (min-width: 1366px) {
    max-width: 1300px;
    
    > section {
      grid-template-columns: repeat(4, minmax(200px, 1fr));
    }
  }
`;
