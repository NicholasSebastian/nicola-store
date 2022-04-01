import React, { FC } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import useBag, { BagConsumer, IItemData } from '../hooks/useBag';
import { fgFromBg } from '../utils/lightOrDark';

const ItemEntry: FC<IItemProps> = props => {
  const { item } = props;
  const { bag, setBag } = useBag();
  const { amount } = bag.find(i => i.variantKey === item.variantKey);

  const updateAmount = (increment: Incrementor) => setBag(bag => {
    const index = bag.findIndex(i => i.variantKey === item.variantKey);
    const prevItem = bag[index];
    const newItem = { ...prevItem, amount: increment(prevItem.amount) };
    const before = bag.slice(0, index);
    const after = bag.slice(index + 1);
    return [...before, newItem, ...after];
  });

  return (
    <ItemContainer>
      <div>{item.name}</div>
      <div>{item.variant}</div>
      <div>{item.price}</div>
      <div>
        <button onClick={() => updateAmount(i => (i > 1) ? (i - 1) : i)}>-</button>
        <div>{amount}</div>
        <button onClick={() => updateAmount(i => i + 1)}>+</button>
      </div>
    </ItemContainer>
  );
}

const ShoppingBag: FC = () => {
  return (
    <Container>
      <h2>Your Bag</h2>
      <BagConsumer>
        {bag => (bag.length > 0) ? 
          bag.map((item, i) => <ItemEntry key={i} item={item} />) : 
          <span>Your cart is empty.</span>
        }
      </BagConsumer>
      <div><Link href='/checkout'><button>Checkout</button></Link></div>
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
      display: block;
      width: 100%;
      padding: 12px 0;
      background-color: ${props => props.theme.accent};
      color: ${props => fgFromBg(props.theme.accent)};
      border: 1px solid transparent;
      font-size: 14px;
      font-weight: 600;
      transition: all 100ms linear;

      :hover {
        cursor: pointer;
        background-color: ${props => props.theme.bg};
        color: ${props => fgFromBg(props.theme.bg)};
        border-color: ${props => props.theme.accent};
      }
    }
  }
`;

const ItemContainer = styled.div`
  margin: 0 14px;
  padding: 10px 0;
  border-top: 1px solid ${props => props.theme.shadow};
  border-bottom: 1px solid ${props => props.theme.shadow};
`;

type Incrementor = (prevAmount: number) => number;

interface IItemProps {
  item: IItemData
}