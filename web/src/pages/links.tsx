import React, { FC } from 'react';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import Link from 'next/link';
import styled from 'styled-components';
import GenerateProps from '../server-props/links';
import SEO from '../components/SEO';

const Links: FC = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
  const links = props.links as ILinks;
  return (
    <Container>
      <SEO pageTitle='Links' />
      <Link href='/'><button>Website</button></Link>
      {links.email && <a href={`mailto:${links.email}`}><button>Email</button></a>}
      {links.instagram && <a href={links.instagram}><button>Instagram</button></a>}
      {links.tiktok && <a href={links.tiktok}><button>TikTok</button></a>}
      {links.shopee && <a href={links.shopee}><button>Shopee</button></a>}
      {links.tokopedia && <a href={links.tokopedia}><button>Tokopedia</button></a>}
      {links.whatsapp && <a href={links.whatsapp}><button>WhatsApp</button></a>}
      {links.line && <a href={links.line}><button>Line</button></a>}
      {links.telegram && <a href={links.telegram}><button>Telegram</button></a>}
    </Container>
  );
}

export default Links;
export const getStaticProps: GetStaticProps = GenerateProps;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px 0;

  > *:not(:last-child) {
    margin-bottom: 20px;
  }

  button {
    background-color: ${props => props.theme.accent};
    color: ${props => props.theme.lightFont};
    border: 1px solid transparent;
    width: 180px;
    padding: 16px 0;
    transition: all 100ms linear;

    :hover {
      cursor: pointer;
      background-color: ${props => props.theme.bg};
      color: ${props => props.theme.darkFont};
      border-color: ${props => props.theme.accent};
    }
  }
`;

interface ILinks {
  email: string
  instagram: string
  tiktok: string
  shopee: string
  tokopedia: string
  whatsapp: string
  line: string
  telegram: string
}