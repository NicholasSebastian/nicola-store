import React, { FC, useMemo } from 'react';
import styled from 'styled-components';
import imageUrlFor from '../utils/imageUrlFor';
import useBag, { IItemData } from '../hooks/useBag';
import PriceLabel from './PriceLabel';

const IMAGE_WIDTH = 60;

const BagItem: FC<IItemProps> = props => {
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
        <PriceLabel price={item.price} discount={item.discount} size={11} />
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

export default BagItem;

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
    color: ${props => props.theme.darkFont};
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
      color: ${props => props.theme.lightFont};
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