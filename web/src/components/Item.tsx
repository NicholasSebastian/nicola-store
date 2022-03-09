import React, { FC, Fragment } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import imageUrlFor from '../utils/imageUrlFor';
import formatWithCommas from '../utils/formatWithCommas';
import { fgFromBg } from '../utils/lightOrDark';

// TODO: Have 2 images for each component. Show the other one on hover.

const imageWidth = 420;

const Item: FC<IItemProps> = ({ item }) => {
  const toPrice = (price: number) => 'Rp. ' + formatWithCommas(price);

  return (
    <Link href={`/product/${item.slug}`}>
      <Container>
        <img src={imageUrlFor(item.image).width(imageWidth).url()} />
        <h4>{item.name}</h4>
        <span>{item.discount ? <s>{toPrice(item.price)}</s> : toPrice(item.price)}</span>
        {item.discount > 0 && (
          <Fragment>
            <span>{toPrice((item.price / 100) * (100 - item.discount))}</span>
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

  > h4, > span {
    color: ${props => fgFromBg(props.theme.bg)};
  }

  > span:not(:last-of-type) > s {
    color: #f44;
    font-size: 13px;
    margin-right: 10px;
  }

  > span:nth-of-type(3) {
    background-color: rgba(255, 0, 0, 0.3);
    padding: 0 5px;
    font-size: 14px;
    position: absolute;
    bottom: 0;
    right: 0;
  }

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