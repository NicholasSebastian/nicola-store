import React, { FC, useState } from 'react';
import styled from 'styled-components';
import { fgFromBg } from '../utils/lightOrDark';
import Item from '../components/Item';

// TODO: Sort by (collection, lowest price, highest price).
// TODO: Pagination.

const sortOrders = [
  { key: 'collection', title: 'Collection' },
  { key: 'lowest', title: 'Lowest Price' },
  { key: 'price', title: 'Highest Price' }
];

const GridLayout: FC<IGridLayoutProps> = ({ title, items }) => {
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState(sortOrders[0].key);
  const results = items.filter(item => new RegExp(search, 'i').test(item.name));

  return (
    <Container>
      <nav>
        <h2>{title}</h2>
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
        {results.length > 0 ? results.map((item, i) => <Item key={i} item={item} />) : <div>No items found.</div>}
      </section>
    </Container>
  );
}

export default GridLayout;

const Container = styled.div`
  --foregroundColor: ${props => fgFromBg(props.theme.bg)};

  width: 90%;
  max-width: 600px;
  margin: 0px auto;
  padding-top: 30px;
  padding-bottom: 110px;

  > nav:first-child {
    > h2 {
      color: var(--foregroundColor);
      font-size: 30px;
      margin-bottom: 20px;
    }

    > div {
      display: flex;
      justify-content: start;
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
          color: var(--foregroundColor);
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
          background-color: ${props => props.theme.accent};
          color: ${props => fgFromBg(props.theme.accent)};
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
      justify-content: end;
      border: 1px solid ${props => props.theme.shadow};
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
  }
`;

interface IGridLayoutProps {
  title: string
  items: Array<any>
}
