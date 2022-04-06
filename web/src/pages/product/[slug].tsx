import React, { FC, useState, useEffect, Fragment } from 'react';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import styled from 'styled-components';
import PortableText from 'react-portable-text';
import FetchProps from '../../server-props/product';
import imageUrlFor from '../../utils/imageUrlFor';
import useBag from '../../hooks/useBag';
import useLanguage, { ILocalization, Language } from '../../hooks/useLanguage';
import SEO from '../../components/SEO';
import Gallery from '../../components/Gallery';
import Button from '../../components/Button';
import PriceLabel from '../../components/PriceLabel';

const localization: ILocalization = {
  'sold': { en: 'Sold Out', id: 'Stok Habis' },
  'stock': { en: 'In Stock', id: 'Tersedia' },
  'variant': { en: 'Variants', id: 'Variasi' },
  'size': { en: 'Sizes', id: 'Ukuran' },
  'bag': { en: 'Add to Bag', id: 'Tambah ke Keranjang' },
  'info': { en: 'More Info', id: 'Info Tambahan' },
  'pick': { en: 'Pick a Size!', id: 'Pilih Ukuran!' },
  'sorry': {
    en: 'Sorry, this item is currently not available.',
    id: 'Maaf, barang ini sedang tidak tersedia.'
  },
  'already': {
    en: 'This item is already in your bag.',
    id: 'Barang ini sudah di dalam keranjang.'
  }
};

const Product: FC = ({ product }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [language] = useLanguage();
  const { addToBag } = useBag();

  // State
  const [variantIndex, setVariantIndex] = useState(0);
  const [size, setSize] = useState<Size>();
  const [amount, setAmount] = useState<number>(1);
  const [message, setMessage] = useState<string>();

  // State reset conditions
  useEffect(() => setSize(undefined), [variantIndex]);
  useEffect(() => setAmount(1), [variantIndex, size]);
  useEffect(() => setMessage(undefined), [size, language]);
  
  const variant = product.variants[variantIndex];
  
  const soldOut = (variant.s === 0) && (variant.m === 0) && (variant.l === 0);
  const imageUrls = variant.images.map(e => imageUrlFor(e.image).width(1000).url());

  const handleAddToBag: React.MouseEventHandler = () => {
    if (!size) {
      setMessage(soldOut ? localization.sorry[language] : localization.pick[language]);
    }
    else {
      const success = addToBag({ 
        productId: product.id, 
        variantKey: variant.key,
        size,
        amount
      });

      if (!success) setMessage(localization.already[language]);
    }
  }

  return (
    <Container>
      <SEO pageTitle={product.name} imageUrl={imageUrls[0]} />
      <section>
        <Gallery imageUrls={imageUrls} />
        <div>
          <h3>{product.name}</h3>
          <div>{variant.name}</div>
          <PriceLabel price={product.price} discount={product.discount} />
          <div>
            {soldOut && <b>{localization.sold[language].toUpperCase()}</b>}
            {size && (
              <span>
                <b>{localization.stock[language]}:</b> 
                {`${variant[size]} (Size: ${size.toUpperCase()})`}
              </span>
            )}
          </div>
          <div>
            <div>{localization.variant[language]}:</div>
            {product.variants.map(({ key, name }: IVariant, i: number) => (
              <Fragment key={i}>
                <input type='radio' name='variant' id={key}
                  checked={variantIndex === i} onChange={() => setVariantIndex(i)} />
                <label htmlFor={key}>{name}</label>
              </Fragment>
            ))}
          </div>
          <div>
            <div>{localization.size[language]}:<span>{message}</span></div>
            {(['s', 'm', 'l'] as Array<Size>).map((name, i) => (
              <Fragment key={i}>
                <input type='radio' name='size' id={name} disabled={variant[name] === 0}
                  checked={size === name} onChange={() => setSize(name)} />
                <label htmlFor={name}>{name.toUpperCase()}</label>
              </Fragment>
            ))}
          </div>
          <div>
            {size && (
              <Fragment>
                <button onClick={() => { if (amount > 1) setAmount(amount - 1) }}>-</button>
                <div>{amount}</div>
                <button onClick={() => { if (amount < variant[size]) setAmount(amount + 1) }}>+</button>
              </Fragment>
            )}
          </div>
          <div>
            <Button onClick={handleAddToBag}>{localization.bag[language]}</Button>
            <a href={product.shopee}><Button disabled={!product.shopee}>Shopee</Button></a>
            <a href={product.tokopedia}><Button disabled={!product.tokopedia}>Tokopedia</Button></a>
          </div>
          <PortableText content={product.description[language]} />
          {product.moreInfo && (
            <div>
              <h4>{localization.info[language]}</h4>
              <PortableText content={product.moreInfo[language]} />
            </div>
          )}
        </div>
      </section>
      {/* TODO: Complete the Collection */}
      {/* TODO: Related Pieces */}
    </Container>
  );
}

export default Product;
export const getServerSideProps: GetServerSideProps = FetchProps;

const Container = styled.div`
  padding-bottom: 70px;

  > section:first-of-type > div:nth-of-type(2) {
    padding-top: 20px;
    
    // Product name
    > h3 {
      color: ${props => props.theme.darkFont};
      font-size: 20px;
      margin: 0;
    }

    // Variant name
    > div:nth-child(2) {
      color: ${props => props.theme.accent};
      margin-top: 2px;
    }

    // Price
    > div:nth-child(3) {
      margin-top: 10px;
    }

    // Inventory amount
    > div:nth-child(4) {
      margin-top: 16px;
      
      > span > b {
        font-size: 13px;
        margin-right: 4px;
      }
    }

    // Variants and Sizes
    > div:nth-child(5), > div:nth-child(6) {
      margin-top: 10px;
      line-height: 40px;

      > div:first-child {
        font-size: 13px;
        font-weight: 600;
        height: 30px;

        > span {
          color: #f44;
          font-weight: 400;
          margin-left: 10px;
        }
      }

      > input[type='radio'] {
        display: none;

        + label {
          color: ${props => props.theme.darkFont};
          font-size: 13px;
          user-select: none;
          padding: 8px 16px;
          border: 1px solid ${props => props.theme.accent};
          margin-right: 10px;
          white-space: nowrap;
        }

        :not([disabled]) + label:hover {
          cursor: pointer;
        }

        :disabled + label {
          background-color: ${props => props.theme.shadow};
        }

        :checked + label {
          background-color: ${props => props.theme.accent};
          color: ${props => props.theme.lightFont};
        }
      }
    }

    // Amount
    > div:nth-child(7) {
      margin-top: 30px;
      display: grid;
      grid-template-columns: 40px 1fr 40px;

      > div {
        height: 40px;
        border-top: 1px solid ${props => props.theme.accent};
        border-bottom: 1px solid ${props => props.theme.accent};
        display: flex;
        justify-content: center;
        align-items: center;
      }

      > button {
        background: none;
        border: 1px solid ${props => props.theme.accent};
        font-size: 18px;

        :hover {
          cursor: pointer;
          background-color: ${props => props.theme.highlight};
        }
      }
    }

    // Buttons
    > div:nth-child(8) {
      margin-top: 5px;
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-gap: 5px;
      
      button {
        width: 100%;
        padding: 8px 0;

        :first-of-type {
          grid-column: 1 / 3;
        }
      }
    }

    // Description
    > div:nth-child(9) {
      margin-top: 30px;
      font-size: 15px;
    }

    // More Info
    > div:nth-child(10) {
      margin-top: 40px;

      > h4 {
        margin-top: 0;
        margin-bottom: 12px;
      }

      > div p {
        margin: 2px 0;
        font-size: 15px;
      }
    }

    @media only screen and (max-width: 640px) {
      width: 90%;
      margin: 0 auto;
    }
  }

  @media only screen and (min-width: 640px) {
    width: 90%;
    margin: 0 auto;
    max-width: 600px;
    padding-top: 30px;
    padding-bottom: 120px;
  }

  @media only screen and (min-width: 800px) {
    > section:first-of-type {
      display: grid;
      grid-template-columns: 3fr 2fr;
      grid-gap: 40px;

      > div:nth-of-type(2) {
        padding-top: 0;
      }
    }
  }

  @media only screen and (min-width: 1024px) {
    max-width: 900px;

    > section:first-of-type {
      grid-gap: 60px;
    }
  }

  @media only screen and (min-width: 1366px) {
    max-width: 1300px;

    > section:first-of-type {
      grid-gap: 80px;
    }
  }
`;

export interface IProduct {
  category: string,
  collection: {
    name: string,
    slug: string
  },
  createdAt: string,
  description: { [key in Language]: any },
  discount: number,
  id: string,
  name: string,
  price: number,
  variants: Array<IVariant>
}

interface IVariant {
  images: Array<{ image: string }>,
  key: string,
  name: string
}

export type Variants = Array<IVariant>
export type Size = 's' | 'm' | 'l';