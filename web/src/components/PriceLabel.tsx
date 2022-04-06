import React, { FC } from 'react';
import styled from 'styled-components';
import formatCurrency from '../utils/formatCurrency';

const PriceLabel: FC<IPriceLabelProps> = props => {
  const { price, discount, size } = props;
  return (
    <Container size={size ?? 14}>
      <span>
        {(discount > 0) ? 
          <s>{formatCurrency(price)}</s> : 
          formatCurrency(price)
        }
      </span>
      {(discount > 0) && (
        <span>{formatCurrency((price / 100) * (100 - discount))}</span>
      )}
      {(discount > 0) && (
        <span>{discount + '%'}</span>
      )}
    </Container>
  );
}

export default PriceLabel;

const Container = styled.div<IStyleArguments>`
  > span:nth-child(1) > s {
    color: #f44;
    font-size: ${props => props.size}px;
  }

  > span:nth-child(2) {
    margin-left: 6px;
  }

  > span:nth-child(3) {
    background-color: rgba(255, 0, 0, 0.3);
    padding: 0 5px;
    margin-left: 10px;
    font-size: ${props => props.size}px;
  }
`;

interface IPriceLabelProps {
  price: number
  discount: number | undefined
  size?: number
}

interface IStyleArguments {
  size: number
}