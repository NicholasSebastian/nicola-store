import React, { FC, Fragment, useMemo, useState } from 'react';
import { GetStaticProps } from 'next';
import Link from 'next/link';
import styled from 'styled-components';
import GenerateProps from '../server-props/index';
import useLanguage, { ILocalization } from '../hooks/useLanguage';
import imageUrlFor from '../utils/imageUrlFor';
import withLayout, { withLayoutProps } from '../components/layout/Layout';
import SEO from '../components/SEO';
import Button from '../components/Button';
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
            text={item.text} height={[110, 205, 300]} fontScaling={5} zoom />
        ))}
      </section>
      <section>
        <h2>{localization.header[language]}</h2>
        <div>
          {props.items.map((item, i) => (
            <Item key={i} item={item} />
          ))}
        </div>
        <Link href='/new-arrivals'><Button primary>See More</Button></Link>
      </section>
      <Banner src={bannerMiddle} height={[250, 375, 500]} />
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
            <Button primary onClick={subscribeNewsletter}>{localization.subscribe[language]}</Button>
          </Fragment>
        )}
      </div>
    </Container>
  );
}

export default withLayout(Index);
export const getStaticProps: GetStaticProps = withLayoutProps(GenerateProps);

const Container = styled.div`
  h2 {
    color: ${props => props.theme.darkFont};
    font-size: 23px;
    margin-top: 0;

    @media only screen and (min-width: 1024px) {
      font-size: 32px;
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