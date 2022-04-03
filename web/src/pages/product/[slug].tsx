import React, { FC, useState, useRef, useEffect, Fragment } from 'react';
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import styled from 'styled-components';
import PortableText from 'react-portable-text';
import sanity from '../../lib/sanity';
import imageUrlFor from '../../utils/imageUrlFor';
import formatCurrency from '../../utils/formatCurrency';
import { fgFromBg } from '../../utils/lightOrDark';
import useBag from '../../hooks/useBag';
import useLanguage, { ILocalization, Language } from '../../hooks/useLanguage';
import SEO from '../../components/SEO';
import Gallery from '../../components/Gallery';

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

const useVariant = (_variants: Variants): StateReturnType<IVariant> => {
  const [index, setIndex] = useState(0);
  const variants = useRef<Variants>(_variants).current;
  const currentVariant = variants[index];
  return [currentVariant, index, setIndex];
}

const useInventory = (product: IProduct, variantIndex: number): QuantityPerSize => {
  const [inventory, setInventory] = useState<Quantities>();
  useEffect(() => {
    fetch('/api/inventory', { 
      method: 'POST', 
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(product) 
    })
    .then(res => res.json())
    .then(data => setInventory(data));
  }, []);

  return inventory ? inventory[variantIndex] : undefined;
}

const Product: FC = ({ product }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const [language] = useLanguage();
  const { addToBag } = useBag();

  const [variant, variantIndex, setVariantIndex] = useVariant(product.variants);
  const [size, setSize] = useState<Size>();
  const quantities = useInventory(product, variantIndex);
  useEffect(() => setSize(undefined), [variantIndex]);
  
  const [amount, setAmount] = useState<number>(1);
  useEffect(() => setAmount(1), [variantIndex, size]);

  // UI state only.
  const [sizeMsg, setSizeMsg] = useState<string>();
  useEffect(() => setSizeMsg(undefined), [size, language]);

  const soldOut = quantities && Object.values(quantities).every(qty => qty === 0);

  const handleAddToBag: React.MouseEventHandler = () => {
    if (!size) {
      setSizeMsg(soldOut ? localization.sorry[language] : localization.pick[language]);
    }
    else {
      const success = addToBag({ 
        productId: product.id, 
        variantKey: variant.key,
        size,
        amount
      });

      if (!success) setSizeMsg(localization.already[language]);
    }
  }

  return (
    <Container>
      <SEO pageTitle={product.name} />
      <section>
        <Gallery imageUrls={variant.images.map(e => imageUrlFor(e.image).width(1000).url())} />
        <div>
          <h3>{product.name}</h3>
          <div>{variant.name}</div>
          <div>
            <span>{(product.discount > 0) ? <s>{formatCurrency(product.price)}</s> : formatCurrency(product.price)}</span>
            {(product.discount > 0) && <span>{formatCurrency((product.price / 100) * (100 - product.discount))}</span>}
            {(product.discount > 0) && <span>{product.discount + '%'}</span>}
          </div>
          <div>
            {soldOut && <b>{localization.sold[language].toUpperCase()}</b>}
            {quantities && size && (
              <span><b>{localization.stock[language]}:</b> {`${quantities[size]} (Size: ${size.toUpperCase()})`}</span>
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
            <div>{localization.size[language]}:<span>{sizeMsg}</span></div>
            {(['s', 'm', 'l'] as Array<Size>).map((name, i) => (
              <Fragment key={i}>
                <input type='radio' name='size' id={name} disabled={!quantities || quantities[name] === 0}
                  checked={size === name} onChange={() => setSize(name)} />
                <label htmlFor={name}>{name.toUpperCase()}</label>
              </Fragment>
            ))}
          </div>
          <div>
            {quantities && size && (
              <Fragment>
                <button onClick={() => { if (amount > 1) setAmount(amount - 1) }}>-</button>
                <div>{amount}</div>
                <button onClick={() => { if (amount < quantities[size]) setAmount(amount + 1) }}>+</button>
              </Fragment>
            )}
          </div>
          <div>
            <button onClick={handleAddToBag}>{localization.bag[language]}</button>
            <a href={product.shopee}><button disabled={!product.shopee}>Shopee</button></a>
            <a href={product.tokopedia}><button disabled={!product.tokopedia}>Tokopedia</button></a>
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

const query = "*[_type == 'product'] { ...slug { 'slug': current } }";

const contentQuery = (`
  *[_type == 'product' && slug.current == $slug] {
    'id': _id,
    name,
    'variants': colors[] {
      'key': _key,
      name,
      images[] { ...asset { 'image': _ref } }
    },
    price,
    discount,
    shopee,
    ...category-> { ...slug { 'category': current } },
    collection-> {
      name,
      ...slug { 'slug': current }
    },
    description { en, id },
    moreInfo { en, id },
    'createdAt': _createdAt
  }[0]
`);

export const getStaticPaths: GetStaticPaths = async () => {
  const results = await sanity.fetch(query);
  const paths = results.map(({ slug }) => ({ params: { slug } }));

  return { paths, fallback: false };
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { slug } = context.params;
  const product: IProduct = await sanity.fetch(contentQuery, { slug });

  return { props: { product } };
}

const Container = styled.div`
  --foregroundColor: ${props => fgFromBg(props.theme.bg)};
  padding-bottom: 70px;

  > section:first-of-type > div:nth-of-type(2) {
    padding-top: 20px;
    
    // Product name
    > h3 {
      color: var(--foregroundColor);
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

      > span:nth-child(1) > s {
        color: #f44;
        font-size: 14px;
      }

      > span:nth-child(2) {
        margin-left: 6px;
      }

      > span:nth-child(3) {
        background-color: rgba(255, 0, 0, 0.3);
        padding: 0 5px;
        margin-left: 10px;
        font-size: 14px;
      }
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
          color: var(--foregroundColor);
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
          color: ${props => fgFromBg(props.theme.accent)};
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
        background-color: transparent;
        color: var(--foregroundColor);
        border: 1px solid ${props => props.theme.accent};
        display: block;
        width: 100%;
        padding: 8px 0;
        font-size: 14px;
        transition: all 100ms linear;

        :first-of-type {
          grid-column: 1 / 3;
        }

        :disabled {
          background-color: ${props => props.theme.shadow};
        }

        :hover:not([disabled]) {
          cursor: pointer;
          background-color: ${props => props.theme.accent};
          color: ${props => fgFromBg(props.theme.accent)};
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

type QuantityPerSize = {
  [size in Size]: number
}

export type Variants = Array<IVariant>
export type Size = 's' | 'm' | 'l';
type Quantities = Array<QuantityPerSize>
type StateReturnType<T> = [T, number, React.Dispatch<React.SetStateAction<number>>];