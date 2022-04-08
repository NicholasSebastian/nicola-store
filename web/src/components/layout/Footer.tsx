import React, { FC, useRef } from 'react';
import { FaInstagramSquare, FaLine, FaWhatsappSquare } from "react-icons/fa";
import { SiGmail } from "react-icons/si";
import { useRouter } from 'next/router';
import Link from "next/link";
import styled, { useTheme } from "styled-components";
import useLanguage, { ILocalization } from '../../hooks/useLanguage';

const localization: ILocalization = {
  'contact': { en: "Contact Us", id: "Hubungi Kami" },
  'returns': { en: "Returns Policy", id: "Kebijakan pengembalian" },
  'privacy': { en: "Privacy Policy", id: "Kebijakan pribadi" },
  'shipping': { en: "Shipping Policy", id: "Kebijakan Pengiriman" },
  'terms': { en: "Terms and Conditions", id: "Syarat dan Ketentuan" }
}

const Footer: FC<IFooterProps> = ({ socials }) => {
  const theme: any = useTheme();
  const { pathname } = useRouter();
  const [language] = useLanguage();
  const { copyright, email, instagram, line, whatsapp } = socials;
  const currentYear = useRef(new Date().getFullYear()).current;

  return (
    <Container exception={pathname === '/checkout'}>
      <div>
        <Link href="/legal/returns-policy">{localization.returns[language]}</Link>
        <Link href="/legal/privacy-policy">{localization.privacy[language]}</Link>
        <Link href="/legal/shipping-policy">{localization.shipping[language]}</Link>
        <Link href="/legal/terms-and-conditions">{localization.terms[language]}</Link>
      </div>
      <div>
        <h4>{localization.contact[language]}</h4>
        <a href={`mailto:${email}`}><SiGmail size={30} color={theme.lightFont} /></a>
        <a href={instagram}><FaInstagramSquare size={30} color={theme.lightFont} /></a>
        <a href={line}><FaLine size={30} color={theme.lightFont} /></a>
        <a href={whatsapp}><FaWhatsappSquare size={30} color={theme.lightFont} /></a>
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

export interface IFooterProps {
  socials: {
    copyright: string
    email: string
    instagram: string
    line: string
    whatsapp: string
  }
} 

interface IStyleArguments {
  exception: boolean
}