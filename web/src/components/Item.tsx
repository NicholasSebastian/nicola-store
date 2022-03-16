import React, { FC, Fragment } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import imageUrlFor from '../utils/imageUrlFor';
import formatCurrency from '../utils/formatCurrency';
import { fgFromBg } from '../utils/lightOrDark';

// TODO: Have 2 images for each component. Show the other one on hover.

const imageWidth = 420;

const Item: FC<IItemProps> = ({ item }) => {
  return (
    <Link href={`/product/${item.slug}`}>
      <Container>
        <img src={imageUrlFor(item.image).width(imageWidth).url()} />
        <h4>{item.name}</h4>
        <span>{item.discount ? <s>{formatCurrency(item.price)}</s> : formatCurrency(item.price)}</span>
        {item.discount > 0 && (
          <Fragment>
            <span>{formatCurrency((item.price / 100) * (100 - item.discount))}</span>
            <span>{item.discount + '% off'}</span>
          </Fragment>
        )}
      </Container>
    </Link>
  );
}

export default Item;

const Container = styled.div`
  position: relative;

  > img:first-of-type {
    width: 100%
  }

  > h4 {
    margin: 10px 0;
  }

  > span {
    font-size: 15px;
  }

  > h4, > span {
    color: ${props => fgFromBg(props.theme.bg)};
  }

  @media only screen and (min-width: 600px) {
    > h4 {
      font-size: 19px;
    }

    > span {
      font-size: 16px;
    }
  }

  // Discrount Price
  > span:not(:last-of-type) > s {
    color: #f44;
    font-size: 13px;
    margin-right: 10px;

    @media only screen and (max-width: 600px) {
      display: block;
    }
  }

  // Discount Percentage
  > span:nth-of-type(3) {
    background-color: rgba(255, 0, 0, 0.3);
    padding: 0 5px;
    font-size: 14px;
    position: absolute;
    bottom: 0;
    right: 0;
  }

  // Hover Effects
  :hover {
    cursor: pointer;

    > h4 {
      text-decoration: underline;
    }
  }
`;

interface IItemProps {
  item: {
    name: string
    image: string
    slug: string
    price: number
    discount?: number
    createdAt?: string
  }
}