import React, { FC, Fragment } from 'react';
import styled from 'styled-components';
import { BagConsumer } from '../hooks/useBag';

const Checkout: FC = () => {
  return (
    <Container>
      <h1>Checkout</h1>
      <BagConsumer>
        {bag => (
          <Fragment>
            {(bag.length > 0) ? 
              bag.map((item, i) => <div key={i}>{item.name}</div>) : 
              <span>Your cart is empty.</span>
            }
            <button disabled={bag.length === 0}>Proceed to Payment</button>
          </Fragment>
        )}
      </BagConsumer>
      {/* TODO */}
    </Container>
  );
}

export default Checkout;

const Container = styled.div`
  width: 90%;
  max-width: 700px;
  margin: 0 auto;
  padding-top: 30px;
  padding-bottom: 110px;
  
  > h1 {
    margin-bottom: 30px;
  }

  > button {
    display: block;
  }
`;