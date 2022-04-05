import React, { FC, Fragment, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import useBag, { BagConsumer, IItemData } from '../hooks/useBag';
import { fgFromBg } from '../utils/lightOrDark';
import formatCurrency from '../utils/formatCurrency';
import imageUrlFor from '../utils/imageUrlFor';
import Button from '../components/Button';
import FormInput from '../components/FormInput';

const BREAKPOINT = 900;

// TODO: Display and calculate with regards to discounts.

const OrderItem: FC<IItemData> = props => {
  const { name, variant, image, price, discount, amount, size } = props;
  return (
    <OrderItemContainer>
      <div><img src={imageUrlFor(image).height(100).url()} /></div>
      <div>
        <div>{name}</div>
        <div>{variant} ({size.toUpperCase()})</div>
        <div>{formatCurrency(price)}</div>
        <div>x{amount}</div>
      </div>
    </OrderItemContainer>
  );
}

const SummaryItem: FC<SummaryItemProps> = props => (
  <SummaryItemContainer>
    <span>{props.label}</span>
    <span>
      {typeof props.value === 'number' ? 
        formatCurrency(props.value) : 
        props.value
      }
    </span>
  </SummaryItemContainer>
);

const usePromo = () => {
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState<string | number>();
  const timeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    if (promoCode.length > 0) {
      setDiscount('Checking');
      // For future implementation.
      timeoutRef.current = setTimeout(() => setDiscount('Invalid'), 800);
    }
    else {
      setDiscount(undefined);
    }
  }, [promoCode]);

  return { discount, promoCode, setPromoCode };
}

const Checkout: FC = () => {
  const { discount, promoCode, setPromoCode } = usePromo();
  return (
    <Container>
      <div>
        <h1>Order Summary</h1>
      </div>
      <BagConsumer>
        {bag => {
          const subtotal = bag.reduce((acc, val) => acc + (val.price * val.amount), 0);
          const total = subtotal; // To be added with shipping cost, etc. in the future.
          return (
            <Fragment>
              <div>
                {/* TODO: Make this like a carousel to show multiple pages? */}
                {(bag.length > 0) ? 
                  bag.map((item, i) => <OrderItem key={i} {...item} />) : 
                  <span>Your cart is empty.</span>
                }
              </div>
              <div>
                <div>
                  <SummaryItem label='Subtotal' value={subtotal} />
                  <SummaryItem label='Shipping' value='FREE' />
                  {discount && <SummaryItem label='Promo Code Discount' value={discount} />}
                  <SummaryItem label='Total' value={total} />
                  <FormInput label='Promo Code' placeholder='Promo Code (Optional)'
                    value={promoCode} onChange={setPromoCode} />
                  <Button primary disabled={bag.length === 0}>Checkout</Button>
                </div>
              </div>
            </Fragment>
          );
        }}
      </BagConsumer>
    </Container>
  );
}

export default Checkout;

const Container = styled.div`
  width: 90%;
  max-width: 1000px;
  margin: 0 auto;
  padding-top: 30px;
  
  > div:first-child {
    > h1 {
      font-size: 28px;
      margin-bottom: 30px;
    }
  }

  > div:last-child > div {
    background-color: ${props => props.theme.bg};
    padding: 20px;

    > div {
      color: ${props => fgFromBg(props.theme.bg)};
      font-size: 14px;
      margin-bottom: 5px;

      :last-of-type {
        margin-bottom: 20px;
      }
    }

    > button {
      width: 100%;
    }
  }

  @media only screen and (max-width: ${BREAKPOINT}px) {
    padding-bottom: 300px;

    > div:last-child {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
    }
  }

  @media only screen and (min-width: ${BREAKPOINT}px) {
    display: grid;
    grid-template-columns: 1fr 320px;
    grid-gap: 0 30px;
    padding-bottom: 110px;

    > div:first-child {
      grid-column: 1 / 3;
    }
  }
`;

const OrderItemContainer = styled.div`
  display: flex;
  padding: 10px 0;
  border: 1px solid transparent;
  transition: all 100ms linear;

  :hover {
    border-top: 1px solid ${props => props.theme.shadow};
    border-bottom: 1px solid ${props => props.theme.shadow};
  }

  > div:first-child {
    display: flex;
  }
  
  > div:last-child {
    margin-left: 20px;
    font-size: 14px;
    
    > div:first-child {
      font-weight: 600;
    }
  }
`;

const SummaryItemContainer = styled.div`
  display: flex;
  justify-content: space-between;

  > span:first-child {
    font-weight: 600;
  }
`;

interface SummaryItemProps {
  label: string
  value: number | string
}