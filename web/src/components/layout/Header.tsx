import React, { FC, Fragment, useState, useEffect } from "react";
import { GiHamburgerMenu, GiShoppingBag } from "react-icons/gi";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSession, signIn } from "next-auth/react";
import styled, { useTheme } from "styled-components";
import useBag from "../../hooks/useBag";
import useCurrency from "../../hooks/useCurrency";
import useLanguage, { Language } from "../../hooks/useLanguage";
import logo from '../../../public/logo.png';

const navigationPaths = [
  { name: 'New Arrivals', path: '/new-arrivals' },
  { name: 'Shirts', path: '/category/shirts' },
  { name: 'Outerwear', path: '/category/outerwear' },
  { name: 'Pants', path: '/category/pants' },
  { name: 'Skirts', path: '/category/skirts' },
  { name: 'Dresses', path: '/category/dresses' },
  { name: 'On Sale', path: '/sale' }
];

const languageNames: ILanguageMap = {
  'en': "English",
  'id': "Bahasa Indonesia"
};

const Header: FC<IHeaderProps> = ({ message }) => {
  const theme: any = useTheme();
  const { status, data } = useSession();
  const router = useRouter();
  
  const { bag, openBag } = useBag();
  const [currency, setCurrency] = useCurrency();
  const [language, setLanguage] = useLanguage();
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    router.events.on('routeChangeStart', closeDrawer);
    return () => router.events.off('routeChangeStart', closeDrawer);
  }, []);

  const closeDrawer = () => setDrawerOpen(false);
  const toggleCurrency = () => setCurrency(c => c === 'IDR' ? 'USD' : 'IDR');
  const toggleLanguage = () => setLanguage(l => l === 'en' ? 'id' : 'en');

  const extra = (
    <Link href="/confirm-payment">Confirm Payment</Link>
  );

  const leftExtras = (
    <Fragment>
      <button onClick={toggleCurrency}>{currency.toUpperCase()}</button>
      <button onClick={toggleLanguage}>{languageNames[language]}</button>
      {extra}
    </Fragment>
  );

  const rightExtras = (
    <Fragment>
      {status === 'authenticated' ? (
        <Link href='/profile'>
          <button>
            Account / Logout
            <div>Logged in as {data.user.name}</div>
          </button>
        </Link>
      ) : 
        <button onClick={() => signIn()}>Account / Login</button>
      }
      <button onClick={openBag}>{`Shopping Bag (${bag.length})`}</button>
    </Fragment>
  );

  return (
    <Container exception={router.pathname === '/checkout'}>
      <div style={{ display: message ? 'block' : 'none' }}>{message}</div>
      <div>
        <Link href='/'>
          <Image src={logo} alt="Logo" />
        </Link>
        <input type='checkbox' id="nav-drawer-toggle" 
          checked={drawerOpen} onChange={() => setDrawerOpen(!drawerOpen)} />
        <label htmlFor="nav-drawer-toggle">
          <GiHamburgerMenu size={30} color={theme.darkFont} />
        </label>
        <div>
          {navigationPaths.map((path, i) => (
            <Link key={i} href={path.path}>{path.name}</Link>
          ))}
          {extra}
          {rightExtras}
        </div>
        <GiShoppingBag onClick={openBag} size={30} color={theme.darkFont} />
        <div>{leftExtras}</div>
        <div>{rightExtras}</div>
      </div>
    </Container>
  );
}

export default Header;

const breakpoint = 900;

const Container = styled.nav<IStyleArguments>`
  position: sticky;
  top: 0;
  z-index: 1;

  // Message Bar
  > div:first-child {
    padding: 5px 0;
    background-color: ${props => props.theme.accent};
    color: ${props => props.theme.lightFont};
    font-size: 10px;
    text-transform: uppercase;
    text-align: center;
    user-select: none;
  }

  // Header
  > div:nth-child(2) {
    background-color:  ${props => props.theme.bg};
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 16px 0;
    border-bottom: 1px solid ${props => props.theme.highlight};
    position: relative;

    // Logo
    > *:first-child {
      height: 40px !important;
      aspect-ratio: 7 / 2;

      :hover {
        cursor: pointer;
      }
    }

    // Navigation Links
    > div:first-of-type > a, 
    > div:first-of-type > button {
      background: none;
      color: ${props => props.theme.darkFont};
      font-size: 14px;
      font-family: 'Oswald', sans-serif;
      text-transform: uppercase;
      letter-spacing: 0.1rem;
      text-decoration: none;
      border: none;
      border-bottom: 1px solid transparent;

      // Extras (These two refer to 'Accounts', 'Shopping Bag', and 'Confirm Payment')
      :last-child, :nth-last-child(2), :nth-last-child(3) {
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

    // Extras (These two refer to the 'Currency', 'Language', and 'Confirm Payment')
    > div:nth-last-of-type(2) {
      display: none;
      position: absolute;
      top: 10px;
      left: 50px;

      > button, a {
        background: none;
        color: ${props => props.theme.darkFont};
        border: none;
        font-size: 13px;
        text-decoration: none;
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

      > a, 
      > button {
        background: none;
        color: ${props => props.theme.darkFont};
        border: none;
        font-size: 13px;
        text-decoration: none;
        margin-left: 15px;
        padding: 6px 10px;
        position: relative;

        :hover {
          background-color: ${props => props.theme.highlight};
          cursor: pointer;

          > div {
            display: block;
          }
        }

        > div {
          display: none;
          background-color: ${props => props.theme.accent};
          color: ${props => props.theme.lightFont};
          font-size: 12px;
          padding: 12px 10px 6px 10px;
          white-space: nowrap;
          clip-path: polygon(0 15%, 90% 15%, 92.5% 0, 95% 15%, 100% 15%, 100% 100%, 0 100%);
          
          position: absolute;
          top: 32px;
          right: 0;
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

        > a,
        > button {
          margin-bottom: 20px;
          margin-left: 30px;
          padding: 0;

          // Extras (These two refer to 'Accounts', 'Shopping Bag', and 'Confirm Payment')
          :last-child, :nth-last-child(2), :nth-last-child(3) {
            display: block;
            position: absolute;
          }

          :last-child {
            bottom: 20px;
          }

          :nth-last-child(2) {
            bottom: 60px;

            > div {
              display: none;
            }
          }

          :nth-last-child(3) {
            bottom: 100px;
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
          z-index: 2;
          opacity: 0;
        }

        :checked ~ div:first-of-type {
          left: 0px;
          box-shadow: 20px 0 30px ${props => `${props.theme.accent}88`};
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
        width: 920px;
        display: ${props => props.exception ? 'none' : 'flex'};
        justify-content: space-evenly;
        margin-top: 30px;

        > a:hover {
          border-color: ${props => props.theme.accent};
        }
      }

      // Left and Right Extras.
      > div:last-of-type, > div:nth-last-of-type(2) {
        display: block;
      }
    }
  }
`;

interface IHeaderProps {
  message?: string
}

interface IStyleArguments {
  exception: boolean
}

type ILanguageMap = { 
  [Property in Language]: string 
}