import React, { FC, useRef } from 'react';
import Link from "next/link";
import styled from "styled-components";
import { FaInstagramSquare, FaWhatsappSquare, FaShopify } from "react-icons/fa"

// TODO: Change these.
const copyright = "Nicola";
const instagram = "nicolabaharyy";
const whatsapp = "6282111602465";
const shopee = "hanafashion.shop";

const instagramUrl = `https://www.instagram.com/${instagram}/`;
const whatsappUrl = `https://api.whatsapp.com/send?phone=${whatsapp}`;
const shopeeUrl = `https://shopee.co.id/${shopee}`;
const footnote = (year: number) => `Copyright © ${year} ${copyright}. All Rights Reserved.`;

const Footer: FC = () => {
  const currentYear = useRef(new Date().getFullYear()).current;
  return (
    <Container>
      <div>
        <Link href="/returns">Returns Policy</Link>
        <Link href="/privacy">Privacy Policy</Link>
        <Link href="/shipping">Shipping Policy</Link>
        <Link href="/terms">Terms and Conditions</Link>
      </div>
      <div>
        <h4>Follow Us</h4>
        <a href={instagramUrl}><FaInstagramSquare size={30} color='#fff' /></a>
        <a href={whatsappUrl}><FaWhatsappSquare size={30} color='#fff' /></a>
        <a href={shopeeUrl}><FaShopify size={30} color='#fff' /></a>
      </div>
      <span>{footnote(currentYear)}</span>
    </Container>
  );
}

export default Footer;

const Container = styled.footer`
  background-color: #000;
  color: #fff;
  text-align: center;
  padding: 50px 0;

  > div:nth-child(1) {
    display: flex;
    flex-direction: column;
      margin-bottom: 20px;

    > a {
      color: #fff;
      font-size: 13px;
      text-decoration: none;
      margin: 0 12px;
      margin-bottom: 5px;
    }
  }

  > div:nth-child(2) {
    margin-bottom: 15px;

    > h4 {
      margin-top: 0;
      margin-bottom: 10px;
    }

    > a > svg {
      margin: 0 8px;
    }
  }

  > span {
    font-size: 10px;
  }

  @media only screen and (min-width: 600px) {
    > div:nth-child(1) {
      flex-direction: row !important;
      justify-content: center;

      > a {
        font-size: 14px;
      }
    }
  }

  @media only screen and (min-width: 1000px) {
    position: relative;

    > div:nth-child(2) {
      position: absolute;
      top: 20px;
      right: 50px;
    }

    > span {
      font-size: 14px;
    }
  }
`;