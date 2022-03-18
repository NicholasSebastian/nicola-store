import React, { FC, useRef } from 'react';
import Link from "next/link";
import styled, { useTheme } from "styled-components";
import { FaInstagramSquare, FaLine, FaWhatsappSquare } from "react-icons/fa";
import { SiGmail } from "react-icons/si";
import { fgFromBg } from '../utils/lightOrDark';

const copyright = "lanica";
const email = "lanicathelabel@gmail.com";
const instagram = "nicolabaharyy"; // TODO: Change these.
const line = "";
const whatsapp = "6282111602465";

const emailUrl = `mailto:${email}`;
const instagramUrl = `https://www.instagram.com/${instagram}/`;
const lineUrl = `https://line.me/ti/p/${line}`;
const whatsappUrl = `https://api.whatsapp.com/send?phone=${whatsapp}`;

const Footer: FC = () => {
  const theme: any = useTheme();
  const foregroundColor = fgFromBg(theme.accent);
  const currentYear = useRef(new Date().getFullYear()).current;
  return (
    <Container>
      <div>
        <Link href="/returns-policy">Returns Policy</Link>
        <Link href="/privacy-policy">Privacy Policy</Link>
        <Link href="/shipping-policy">Shipping Policy</Link>
        <Link href="/terms-and-conditions">Terms and Conditions</Link>
      </div>
      <div>
        <h4>Contact Us</h4>
        <a href={emailUrl}><SiGmail size={30} color={foregroundColor} /></a>
        <a href={instagramUrl}><FaInstagramSquare size={30} color={foregroundColor} /></a>
        <a href={lineUrl}><FaLine size={30} color={foregroundColor} /></a>
        <a href={whatsappUrl}><FaWhatsappSquare size={30} color={foregroundColor} /></a>
      </div>
      <span>{`Copyright © ${currentYear} ${copyright}`}</span>
    </Container>
  );
}

export default Footer;

const Container = styled.footer`
  --foregroundColor: ${props => fgFromBg(props.theme.accent)};

  background-color: ${props => props.theme.accent};
  color: var(--foregroundColor);
  padding-top: 40px;
  padding-bottom: 50px;
  padding-left: 24px;

  > div:nth-child(1) {
    display: flex;
    flex-direction: column;
    align-items: start;
    margin-bottom: 20px;

    > a {
      color: var(--foregroundColor);
      font-size: 13px;
      text-decoration: none;
      margin-bottom: 10px;
    }
  }

  > div:nth-child(2) {
    margin-bottom: 15px;

    > h4 {
      margin-top: 0;
      margin-bottom: 10px;
    }

    > a > svg {
      margin-right: 16px;
    }
  }

  > span {
    font-size: 10px;
  }

  @media only screen and (min-width: 700px) {
    padding-top: 50px;
    padding-left: 0;
    text-align: center;

    > div:nth-child(1) {
      flex-direction: row !important;
      justify-content: center;

      > a {
        font-size: 14px;
        margin: 0 12px;
      }
    }

    > div:nth-child(2) > a > svg {
      margin: 0 8px;
    }
  }

  @media only screen and (min-width: 1100px) {
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