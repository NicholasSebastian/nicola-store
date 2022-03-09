import React, { FC, Fragment } from "react";
import Image from "next/image";
import Link from "next/link";
import styled, { useTheme } from "styled-components";
import { GiHamburgerMenu, GiShoppingBag } from "react-icons/gi";

import { fgFromBg } from "../utils/lightOrDark";
import useBag from "../hooks/useBag";
import useCurrency from "../hooks/useCurrency";
import useLanguage, { Language } from "../hooks/useLanguage";
import logo from '../../public/logo.png';

const navigationPaths = [
  { name: 'Shirts', path: '/category/shirts' },
  { name: 'Outerwear', path: '/category/outerwear' },
  { name: 'Pants', path: '/category/pants' },
  { name: 'Skirts', path: '/category/skirts' },
  { name: 'Dresses', path: '/category/dresses' },
  { name: 'Sale', path: '/sale' }
];

const languageNames: ILanguageMap = {
  'en': "English",
  'id': "Bahasa Indonesia"
};

const Header: FC<IHeaderProps> = ({ message }) => {
  const theme: any = useTheme();
  const foregroundColor = fgFromBg(theme.bg);
  
  const [bag] = useBag();
  const [currency, setCurrency] = useCurrency();
  const [language, setLanguage] = useLanguage();

  const toggleCurrency = () => setCurrency(c => c === 'IDR' ? 'USD' : 'IDR');
  const toggleLanguage = () => setLanguage(l => l === 'en' ? 'id' : 'en');

  const leftExtras = (
    <Fragment>
      <button onClick={toggleCurrency}>{currency.toUpperCase()}</button>
      <button onClick={toggleLanguage}>{languageNames[language]}</button>
    </Fragment>
  );

  // TODO: 'Account / Login' or 'Account / Log Out'.
  const rightExtras = (
    <Fragment>
      <Link href="/account">Account / Login</Link>
      <Link href="/bag">{`Shopping Bag (${bag.length})`}</Link>
    </Fragment>
  );

  return (
    <Container>
      <div style={{ display: message ? 'block' : 'none' }}>{message}</div>
      <div>
        <Link href='/'>
          <Image src={logo} alt="Logo" />
        </Link>
        <input type='checkbox' id="nav-drawer-toggle" />
        <label htmlFor="nav-drawer-toggle">
          <GiHamburgerMenu size={30} color={foregroundColor} />
        </label>
        <div>
          {navigationPaths.map((path, i) => (
            <Link key={i} href={path.path}>{path.name}</Link>
          ))}
          {rightExtras}
        </div>
        <Link href='/bag'>
          <GiShoppingBag size={30} color={foregroundColor} />
        </Link>
        <div>{leftExtras}</div>
        <div>{rightExtras}</div>
      </div>
    </Container>
  );
}

export default Header;

const breakpoint = 900;

const Container = styled.nav`
  --foregroundColor: ${props => fgFromBg(props.theme.bg)};

  position: sticky;
  top: 0;
  z-index: 1;

  // Message Bar
  > div:first-child {
    padding: 5px 0;
    background-color: ${props => props.theme.accent};
    color: ${props => fgFromBg(props.theme.accent)};
    font-size: 10px;
    text-transform: uppercase;
    text-align: center;
  }

  // Header
  > div:nth-child(2) {
    background-color:  ${props => props.theme.bg};
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 16px 0;
    border-bottom: 1px solid ${props => props.theme.shadow};
    position: relative;

    // Logo
    > *:first-child {
      height: 40px !important;
      aspect-ratio: 5 / 2;

      :hover {
        cursor: pointer;
      }
    }

    // Navigation Links
    > div:first-of-type > a {
      color: var(--foregroundColor);
      font-size: 14px;
      font-family: 'Oswald', sans-serif;
      text-transform: uppercase;
      letter-spacing: 0.1rem;
      text-decoration: none;
      border-bottom: 1px solid transparent;

      // Extras (These two refer to 'Accounts' and 'Shopping Bag')
      :last-child, :nth-last-of-type(2) {
        display: none;
      }
    }

    // Navigation Drawer Toggle
    #nav-drawer-toggle {
      display: none;
      
      + label {
        display: none;
        user-select: none;
      }
    }

    #nav-drawer-toggle, #nav-drawer-toggle + label {
      position: absolute;
      top: 20px;
      left: 12px;
    }

    // Shopping Bag Icon
    > svg:last-of-type {
      display: none;
    }

    // Extras (These two refer to the Currency and Language toggles)
    > div:nth-last-of-type(2) {
      display: none;
      position: absolute;
      top: 10px;
      left: 50px;

      > button {
        background: none;
        border: none;
        font-size: 13px;
        font-family: 'Poppins', sans-serif;
        margin-right: 15px;
        padding: 6px 10px;

        :hover {
          background-color: ${props => props.theme.highlight};
          cursor: pointer;
        }
      }
    }

    // Extras (These two refer to 'Accounts' and 'Shopping Bag')
    > div:last-of-type {
      display: none;
      position: absolute;
      top: 10px;
      right: 50px;

      > a {
        color: var(--foregroundColor);
        font-size: 13px;
        text-decoration: none;
        margin-left: 15px;
        padding: 6px 10px;

        :hover {
          background-color: ${props => props.theme.highlight};
        }
      }
    }

    @media only screen and (max-width: ${breakpoint}px) {
      // Navigation Links
      > div:first-of-type {
        background-color: ${props => props.theme.bg};
        border-right: 1px solid ${props => props.theme.shadow};
        width: 75%;
        padding: 40px 0;
        display: flex;
        flex-direction: column;
        position: fixed;
        top: 0;
        left: -75%;
        bottom: 0;
        z-index: 1;
        transition: 0.25s ease-in-out;

        > a {
          margin-bottom: 20px;
          margin-left: 30px;

          // Extras (These two refer to 'Accounts' and 'Shopping Bag')
          :last-child, :nth-last-of-type(2) {
            display: block;
            position: absolute;
          }

          :last-child {
            bottom: 20px;
          }

          :nth-last-of-type(2) {
            bottom: 60px;
          }
        }
      }

      // Shopping Bag Icon
      > svg:last-of-type {
        display: block;
        position: absolute;
        top: 20px;
        right: 12px;
      }

      // Navigation Drawer Toggle
      #nav-drawer-toggle {
        display: block;
        visibility: hidden;

        // The Actual Toggle
        + label {
          display: block;
        }

        :checked + label {
          position: fixed;
          top: 0;
          bottom: 0;
          right: 0;
          left: 75%;
          opacity: 0;
        }

        :checked ~ div:first-of-type {
          left: 0px;
          box-shadow: 20px 0 40px rgba(0, 0, 0, 0.4);
        }
      }
    }
  }

  @media only screen and (min-width: ${breakpoint}px) {
    // Message Bar
    > div:first-child {
      font-size: 13px;
    }

    // Header
    > div:nth-child(2) {

      // Logo
      > *:first-child {
        height: 64px !important;
      }

      // Navigation Container
      > div:first-of-type {
        width: 800px;
        display: flex;
        justify-content: space-evenly;
        margin-top: 30px;

        > a:hover {
          border-color: ${props => props.theme.accent};
        }
      }

      // Extras (These two refer to 'Accounts' and 'Shopping Bag')
      > div:last-of-type, > div:nth-last-of-type(2) {
        display: block;
      }
    }
  }
`;

interface IHeaderProps {
  message?: string
}

type ILanguageMap = { 
  [Property in Language]: string 
}