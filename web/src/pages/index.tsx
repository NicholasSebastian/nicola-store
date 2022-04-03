import React, { FC, Fragment, useMemo, useState } from 'react';
import { GetStaticProps } from 'next';
import Link from 'next/link';
import styled from 'styled-components';
import sanity from '../lib/sanity';
import useLanguage, { ILocalization } from '../hooks/useLanguage';
import imageUrlFor from '../utils/imageUrlFor';
import { fgFromBg } from '../utils/lightOrDark';
import SEO from '../components/SEO';
import Carousel, { IBannerData } from '../components/Carousel';
import Banner from '../components/Banner';
import Item from '../components/Item';

const BANNER_RES = 700;

const localization: ILocalization = {
  'header': { en: 'New Arrivals', id: 'Koleksi Terbaru' },
  'newsletter': { en: 'Subscribe to our Newsletter', id: 'Berlangganan newsletter kami' },
  'subscribe': { en: 'Subscribe', id: 'Daftar' }
};

function generateImageUrls(banners: Array<IBannerData>) {
  return banners.map(banner => ({ 
    ...banner, 
    image: imageUrlFor(banner.image).height(BANNER_RES).url() 
  }));
}

const Index: FC<IHomeContent> = (props) => {
  const [language] = useLanguage();
  const banners = useMemo(() => generateImageUrls(props.banners), [props.banners]);
  const grid = useMemo(() => generateImageUrls(props.grid), [props.grid]);
  const bannerMiddle = useMemo(() => imageUrlFor(props.bannerMiddle).height(BANNER_RES).url(), [props.bannerMiddle]);
  
  const [newsletter, setNewsletter] = useState('');
  const [subscribed, setSubscribed] = useState<boolean | 'invalid'>(false);
  const subscribeNewsletter = async () => {
    if ((/\S+@\S+\.\S+/).test(newsletter)) {
      await fetch(`/api/newsletter?email=${newsletter}`);
      setSubscribed(true);
    }
    else {
      setSubscribed('invalid');
      setTimeout(() => setSubscribed(false), 3000);
    }
  }
  
  return (
    <Container>
      <SEO />
      <Carousel banners={banners} />
      <section>
        {grid.map((item, i) => (
          <Banner key={i} src={item.image} href={item.path} 
            text={item.text} height='20vw' fontScaling={5} zoom />
        ))}
      </section>
      <section>
        <h2>{localization.header[language]}</h2>
        <div>
          {props.items.map((item, i) => (
            <Item key={i} item={item} />
          ))}
        </div>
        <Link href='/new-arrivals'><button>See More</button></Link>
      </section>
      <Banner src={bannerMiddle} height='20vw' />
      {/* TODO: Instagram posts here; make an API route to get the images with phantomJS.
        <section>
          <h2>Check out our Instagram</h2>
        </section> 
      */}
      <div>
        <h2>{localization.newsletter[language]}</h2>
        {subscribed ? (
          <div>
            {subscribed === 'invalid' ? 
              "You entered an invalid email address." : 
              "You have added to our mailing list! Look forward to it!"
            }
          </div>
        ) : (
          <Fragment>
            <input value={newsletter} onChange={e => setNewsletter(e.target.value)} placeholder="your@email.com" />
            <button onClick={subscribeNewsletter}>{localization.subscribe[language]}</button>
          </Fragment>
        )}
      </div>
    </Container>
  );
}

export default Index;

const query = (`
  *[_id == 'homePage'] {
    banners[] { ...image { ...asset { 'image': _ref } }, path, text },
    grid[] { ...image { ...asset { 'image': _ref } }, path, text },
    ...bannerMiddle { ...asset { 'bannerMiddle': _ref } }
  }[0]
`);

const itemsQuery = (`
  *[_type == 'product'] | order(_createdAt desc) {
    name,
    ...slug { 'slug': current },
    price,
    discount,
    ...colors[0] { 
      ...images[0] { ...asset { 'image1': _ref }},
      ...images[1] { ...asset { 'image2': _ref }}
    },
    ...colors[1] { ...images[0] { ...asset { 'image3': _ref }} },
    'createdAt': _createdAt,
  }[0...4]
`);

export const getStaticProps: GetStaticProps = async () => {
  const data: IHomeContent = await sanity.fetch(query);
  const items = await sanity.fetch(itemsQuery);
  return { props: { ...data, items } };
};

const Container = styled.div`
  --foregroundColor: ${props => fgFromBg(props.theme.bg)};

  h2 {
    color: var(--foregroundColor);
    font-size: 23px;
    margin-top: 0;

    @media only screen and (min-width: 1024px) {
      font-size: 32px;
    }
  }

  button {
    padding: 12px 30px;
    background-color: ${props => props.theme.accent};
    color: ${props => fgFromBg(props.theme.accent)};
    border: 1px solid transparent;
    font-size: 14px;
    font-weight: 600;
    transition: all 100ms linear;

    :hover {
      cursor: pointer;
      background-color: ${props => props.theme.bg};
      color: var(--foregroundColor);
      border-color: ${props => props.theme.accent};
    }
  }

  > section {
    width: 90%;
    max-width: 600px;
    margin: 30px auto;

    @media only screen and (min-width: 1024px) {
      max-width: 900px;
      margin: 40px auto;
    }

    @media only screen and (min-width: 1366px) {
      max-width: 1300px;
      margin: 50px auto;
    }
  }

  > section:first-of-type {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 20px;
  }

  > section:nth-of-type(2) {
    margin-top: 60px;
    margin-bottom: 80px;

    > div {
      display: grid;
      grid-template-columns: repeat(2, minmax(100px, 1fr));
      grid-gap: 20px;

      > *:nth-last-child(2), 
      > *:last-child {
        display: none;
      }
    }

    > button {
      display: block;
      margin: 30px auto 0 auto;
    }

    @media only screen and (min-width: 1024px) {
      margin-top: 80px;
      margin-bottom: 100px;
      
      > div {
        grid-template-columns: repeat(3, minmax(200px, 1fr));

        > *:nth-last-child(2) {
          display: block;
        }
      }
    }

    @media only screen and (min-width: 1366px) {
      margin-top: 100px;
      margin-bottom: 120px;

      > div {
        grid-template-columns: repeat(4, minmax(100px, 1fr));

        > *:nth-last-child(2), 
        > *:last-child {
          display: block;
        }
      }
    }
  }

  > div:last-of-type {
    background-color: ${props => props.theme.highlight};
    padding: 70px 0;
    display: flex;
    flex-direction: column;
    align-items: center;

    > input {
      background: none;
      border: none;
      border-bottom: 2px solid ${props => props.theme.accent};
      font-size: 15px;
      width: 300px;

      :focus {
        outline: none;
      }
    }

    > button {
      margin-top: 20px;
    }

    @media only screen and (max-width: 500px) {
      > div {
        font-size: 12px;
      }
    }
  }
`;

interface IHomeContent {
  banners: Array<IBannerData>
  grid: Array<IBannerData>
  bannerMiddle: string
  items: Array<any>
}