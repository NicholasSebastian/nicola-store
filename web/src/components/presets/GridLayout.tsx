import React, { FC, useState } from 'react';
import styled from 'styled-components';
import useLanguage, { ILocalization } from '../../hooks/useLanguage';
import Item from '../../components/Item';

// TODO: Pagination.

const sortOrders: ILocalization = {
  'relevance': { en: 'Relevance', id: 'Paling Sesuai' },
  'lowest': { en: 'Lowest Price', id: 'Harga Terendah' },
  'highest': { en: 'Highest Price', id: 'Harga Termahal' }
};

const calcFinalPrice = (price: number, discount: number) => (price / 100) * (100 - discount);

const GridLayout: FC<IGridLayoutProps> = ({ title, items }) => {
  const [language] = useLanguage();

  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('relevance');
  const results = items.filter(item => new RegExp(search, 'i').test(item.name));

  const sorter = (a: any, b: any): number => {
    const priceA = calcFinalPrice(a.price, a.discount);
    const priceB = calcFinalPrice(b.price, b.discount);

    switch (sort) {
      case 'relevance':
        return Date.parse(b.createdAt) - Date.parse(a.createdAt);
      case 'lowest': 
        return priceA - priceB;
      case 'highest': 
        return priceB - priceA;
      default:
        return 0;
    }
  }

  const overBar = (
    <div>
      <input type='search' placeholder='Search' value={search} onChange={e => setSearch(e.target.value)} />
      {Object.entries(sortOrders).map(([key, text]) => (
        <div key={key}>
          <input type='radio' name='sort' id={key} value={key} checked={sort === key} onChange={e => setSort(e.target.value)} />
          <label htmlFor={key}>{text[language]}</label>
        </div>
      ))}
    </div>
  );

  return (
    <Container>
      <nav>
        <h2>{title}</h2>
        {overBar}
      </nav>
      <section>
        {(results.length > 0) ? 
          results.sort(sorter).map((item, i) => <Item key={i} item={item} />) : 
          <div>No items found.</div>
        }
      </section>
    </Container>
  );
}

export default GridLayout;

const Container = styled.div`
  width: 90%;
  max-width: 600px;
  margin: 0px auto;
  padding-top: 30px;
  padding-bottom: 130px;

  > nav:first-child {
    > h2 {
      color: ${props => props.theme.darkFont};
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
          color: ${props => props.theme.darkFont};
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
          color: ${props => props.theme.lightFont};
        }
      }
    }
  }

  > section {
    display: grid;
    grid-template-columns: repeat(2, minmax(100px, 1fr));
    grid-gap: 50px 20px;
  }

  @media only screen and (min-width: 1024px) {
    max-width: 900px;

    > nav:first-child > div {
      justify-content: end;
      border: 1px solid ${props => props.theme.accent};
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
      grid-template-columns: repeat(4, minmax(100px, 1fr));
    }
  }
`;

interface IGridLayoutProps {
  title: string
  items: Array<any>
}
