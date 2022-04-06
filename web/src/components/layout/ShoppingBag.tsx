import React, { FC } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import useBag, { BagConsumer } from '../../hooks/useBag';
import Button from '../Button';
import BagItem from '../BagItem';

const ShoppingBag: FC = () => {
  const { closeBag } = useBag();
  return (
    <Container>
      <h2>Your Bag</h2>
      <BagConsumer>
        {bag => (bag.length > 0) ? 
          bag.map((item, i) => <BagItem key={i} item={item} />) : 
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