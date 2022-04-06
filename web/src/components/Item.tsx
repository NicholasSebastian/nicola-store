import React, { FC, Fragment, useState, useMemo } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import imageUrlFor from '../utils/imageUrlFor';
import formatCurrency from '../utils/formatCurrency';

const IMAGE_RES = 600;

const Item: FC<IItemProps> = ({ item }) => {
  const [hover, setHover] = useState(false);
  const mainImg = useMemo(() => imageUrlFor(item.image1).height(IMAGE_RES).url(), [item.slug]);
  const hoverImg = useMemo(() => imageUrlFor(item.image2 ?? item.image3).height(IMAGE_RES).url(), [item.slug]);

  return (
    <Link href={`/product/${item.slug}`}>
      <Container onMouseOver={() => setHover(true)} onMouseOut={() => setHover(false)}>
        <Image src={hover ? hoverImg : mainImg} />
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

const Image = styled.div<IImageProps>`
  background: url(${props => props.src});
  background-size: cover;
  background-position: center;
  aspect-ratio: 3 / 4;
  transition: all 300ms ease-in-out;
`;

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
    color: ${props => props.theme.darkFont};
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
    image1: string
    image2: string
    image3: string
    slug: string
    price: number
    discount?: number
    createdAt?: string
  }
}

interface IImageProps {
  src: string
}