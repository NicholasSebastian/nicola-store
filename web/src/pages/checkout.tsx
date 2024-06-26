import React, { FC, Fragment, useEffect, useRef, useState } from 'react';
import { GetStaticProps } from 'next';
import styled from 'styled-components';
import { BagConsumer, IItemData } from '../hooks/useBag';
import useLanguage, { ILocalization } from '../hooks/useLanguage';
import formatCurrency from '../utils/formatCurrency';
import imageUrlFor from '../utils/imageUrlFor';
import withLayout, { generateLayoutProps } from '../components/layout/Layout';
import SEO from '../components/SEO';
import Button from '../components/Button';
import FormInput from '../components/FormInput';
import PriceLabel from '../components/PriceLabel';

const BREAKPOINT = 900;

const localization: ILocalization = {
  'orderSummary': { en: 'Order Summary', id: 'Ringkasan Pesanan' },
  'customerDetails': { en: 'Customer Details', id: 'Detail Pelanggan' },
  'shippingDetails': { en: 'Delivery Details', id: 'Rincian Pengiriman' }
};

const CustomerForm: FC<IPageProps> = props => {
  const { setTitle, setData } = props;
  const [language] = useLanguage();
  useEffect(() => setTitle(localization.customerDetails[language]), []);
  return (
    // TODO
    <div>Customer form</div>
  );
}

const DeliveryForm: FC<IPageProps> = props => {
  const { setTitle, setData } = props;
  const [language] = useLanguage();
  useEffect(() => setTitle(localization.shippingDetails[language]), []);
  return (
    // TODO
    <div>Delivery form</div>
  );
}

const Checkout: FC = () => {
  const [language] = useLanguage();
  const { discount, promoCode, setPromoCode } = usePromo();
  const [proceed, setProceed] = useState<Page>(0);
  const [pageTitle, setPageTitle] = useState(localization.orderSummary[language]);
  const customerDetails = useRef();
  const deliveryDetails = useRef();

  const nextPage = () => {
    if (proceed < 2) {
      // This looks retarded because of TypeScript constraints.
      setProceed(i => i === 0 ? 1 : 2);
    }
    else {
      // TODO:
      // - Prompt the user to finalize their details.
      // - On ok, send post request while showing a loading screen.
      // - On finish, display a message and a button that would lead them to the confirm payment page.
    }
  }

  return (
    <Container>
      <SEO pageTitle='Checkout' noFollow />
      <div>
        <h1>{pageTitle}</h1>
      </div>
      <BagConsumer>
        {bag => {
          // Calculate the subtotal from the item prices, discounts and amounts.
          const subtotal = bag.reduce((sum, val) => {
            const withDiscount = (val.price / 100) * (100 - val.discount);
            const withAmount = withDiscount * val.amount;
            return sum + withAmount;
          }, 0);
          
          // To be added with shipping cost, etc. in the future.
          const total = subtotal - (typeof discount === 'number' ? discount : 0);

          return (
            <Fragment>
              <div>
                {(proceed === 0) && ((bag.length > 0) ? 
                  bag.map((item, i) => <OrderItem key={i} {...item} />) : 
                  <span>Your cart is empty.</span>
                )}
                {(proceed === 1) && (
                  <CustomerForm setTitle={setPageTitle} 
                    setData={data => customerDetails.current = data} />
                )}
                {(proceed === 2) && (
                  <DeliveryForm setTitle={setPageTitle} 
                    setData={data => deliveryDetails.current = data} />
                )}
              </div>
              <div>
                <div>
                  <SummaryItem label='Subtotal' value={subtotal} />
                  <SummaryItem label='Shipping' value='FREE' />
                  {discount && <SummaryItem label='Promo Code Discount' value={discount} />}
                  <SummaryItem label='Total' value={total} />
                  <FormInput label='Promo Code' placeholder='Promo Code (Optional)'
                    value={promoCode} onChange={setPromoCode} />
                  <Button primary onClick={nextPage} disabled={bag.length === 0}>
                    {proceed < 2 ? 'Continue' : 'To Payment'}
                  </Button>
                </div>
              </div>
            </Fragment>
          );
        }}
      </BagConsumer>
    </Container>
  );
}

const OrderItem: FC<IItemData> = props => {
  const { name, variant, image, price, discount, amount, size } = props;
  return (
    <OrderItemContainer>
      <div><img src={imageUrlFor(image).height(100).url()} /></div>
      <div>
        <div>{name}</div>
        <div>{variant} ({size.toUpperCase()})</div>
        <PriceLabel price={price} discount={discount} size={13} />
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

export default withLayout(Checkout);
export const getStaticProps: GetStaticProps = generateLayoutProps;

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
      color: ${props => props.theme.darkFont};
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
  user-select: none;

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
    
    > div {
      margin-bottom: 5px;

      :first-child {
        font-weight: 600;
      }
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

interface IPageProps {
  setTitle: React.Dispatch<React.SetStateAction<string>>
  setData: (data: any) => void
}

interface SummaryItemProps {
  label: string
  value: number | string
}

type Page = 0 | 1 | 2;