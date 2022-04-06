import React, { FC, useRef } from 'react';
import { useRouter } from 'next/router';
import Link from "next/link";
import styled, { useTheme } from "styled-components";
import { FaInstagramSquare, FaLine, FaWhatsappSquare } from "react-icons/fa";
import { SiGmail } from "react-icons/si";

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
  const { pathname } = useRouter();
  const currentYear = useRef(new Date().getFullYear()).current;
  return (
    <Container exception={pathname === '/checkout'}>
      <div>
        <Link href="/legal/returns-policy">Returns Policy</Link>
        <Link href="/legal/privacy-policy">Privacy Policy</Link>
        <Link href="/legal/shipping-policy">Shipping Policy</Link>
        <Link href="/legal/terms-and-conditions">Terms and Conditions</Link>
      </div>
      <div>
        <h4>Contact Us</h4>
        <a href={emailUrl}><SiGmail size={30} color={theme.lightFont} /></a>
        <a href={instagramUrl}><FaInstagramSquare size={30} color={theme.lightFont} /></a>
        <a href={lineUrl}><FaLine size={30} color={theme.lightFont} /></a>
        <a href={whatsappUrl}><FaWhatsappSquare size={30} color={theme.lightFont} /></a>
      </div>
      <span>{`Copyright © ${currentYear} ${copyright}`}</span>
    </Container>
  );
}

export default Footer;

const Container = styled.footer<IStyleArguments>`
  background-color: ${props => props.theme.accent};
  color: ${props => props.theme.lightFont};
  padding-top: 40px;
  padding-bottom: 50px;
  padding-left: 24px;

  > div:nth-child(1) {
    display: flex;
    flex-direction: column;
    align-items: start;
    margin-bottom: 20px;

    > a {
      color: ${props => props.theme.lightFont};
      font-size: 13px;
      text-decoration: none;
      margin-bottom: 10px;
    }
  }

  > div:nth-child(2) {
    margin-bottom: 15px;

    > h4 {
      color: ${props => props.theme.lightFont};
      margin-top: 0;
      margin-bottom: 10px;
    }

    > a > svg {
      margin-right: 16px;
    }
  }

  > span {
    color: ${props => props.theme.lightFont};
    font-size: 10px;
  }

  @media only screen and (max-width: 900px) {
    display: ${props => props.exception ? 'none' : 'block'};
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

interface IStyleArguments {
  exception: boolean
}