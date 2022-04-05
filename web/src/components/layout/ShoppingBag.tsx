import React, { FC, useMemo } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import useBag, { BagConsumer, IItemData } from '../../hooks/useBag';
import { fgFromBg } from '../../utils/lightOrDark';
import imageUrlFor from '../../utils/imageUrlFor';
import formatCurrency from '../../utils/formatCurrency';
import Button from '../Button';

const IMAGE_WIDTH = 60;

const ItemEntry: FC<IItemProps> = props => {
  const { setBag } = useBag();
  const { item } = props;
  const image = useMemo(() => imageUrlFor(item.image).width(IMAGE_WIDTH).url(), [item.image]);

  const updateAmount = (increment: Incrementor) => setBag(bag => {
    const index = bag.findIndex(i => i.variantKey === item.variantKey);
    const prevItem = bag[index];
    const newItem = { ...prevItem, amount: increment(prevItem.amount) };
    const before = bag.slice(0, index);
    const after = bag.slice(index + 1);
    return [...before, newItem, ...after];
  });

  const removeItem = () => setBag(bag => bag.filter(i => i.variantKey !== item.variantKey));

  return (
    <ItemContainer>
      <div><img src={image} alt="Product Image" /></div>
      <div>
        <span>{item.name}</span>
        <div>{`${item.variant} (${item.size.toUpperCase()})`}</div>
        <div>{formatCurrency(item.price)}</div>
        {/* TODO: Show Discounts here */}
      </div>
      <div><button onClick={removeItem}>Remove</button></div>
      <div>
        <button onClick={() => updateAmount(i => (i > 1) ? (i - 1) : i)}>-</button>
        <div>{item.amount}</div>
        <button onClick={() => updateAmount(i => i + 1)}>+</button>
      </div>
    </ItemContainer>
  );
}

const ShoppingBag: FC = () => {
  const { closeBag } = useBag();
  return (
    <Container>
      <h2>Your Bag</h2>
      <BagConsumer>
        {bag => (bag.length > 0) ? 
          bag.map((item, i) => <ItemEntry key={i} item={item} />) : 
          <span>Your cart is empty.</span>
        }
      </BagConsumer>
      <div>
        <Link href='/checkout'>
          <Button primary onClick={closeBag}>Checkout</Button>
        </Link>
      </div>
    </Container>
  );
}

export default ShoppingBag;

const Container = styled.div`
  > h2 {
    margin: 30px 0 20px 14px;
  }

  > span:first-of-type {
    display: block;
    text-align: center;
    margin-top: 36vh;
  }

  > div:last-child {
    background-color: ${props => props.theme.bg};
    padding: 10px 14px 30px 14px;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;

    > button {
      width: 100%;
    }
  }
`;

const ItemContainer = styled.div`
  margin: 0 14px;
  padding: 10px 0;
  border-top: 1px solid ${props => props.theme.shadow};
  display: grid;
  grid-template-columns: ${IMAGE_WIDTH}px 1fr;
  grid-gap: 0 10px;

  > div:first-child > img {
    border: 1px solid ${props => props.theme.highlight};
    user-select: none;
    user-drag: none;
  }

  > div:nth-child(2) {
    font-size: 13px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    > span:first-child {
      font-weight: 600;
    }
  }

  > div:nth-child(3) > button {
    background: none;
    color: ${props => fgFromBg(props.theme.bg)};
    border: none;
    padding: 0;
    font-size: 11px;

    :hover {
      cursor: pointer;
    }
  }

  > div:last-child {
    display: flex;
    justify-content: right;

    > button {
      background-color: ${props => props.theme.accent};
      color: ${props => fgFromBg(props.theme.accent)};
      border: none;
      width: 24px;

      :hover {
        cursor: pointer;
      }
    }

    > div {
      background-color: #fff;
      border-top: 1px solid ${props => props.theme.accent};
      border-bottom: 1px solid ${props => props.theme.accent};
      width: 50px;
      font-size: 14px;
      text-align: center;
    }
  }
`;

type Incrementor = (prevAmount: number) => number;

interface IItemProps {
  item: IItemData
}