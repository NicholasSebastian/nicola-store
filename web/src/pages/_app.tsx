import React, { Fragment } from 'react';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { SessionProvider } from 'next-auth/react';
import { BagProvider } from '../hooks/useBag';
import { CurrencyProvider } from '../hooks/useCurrency';
import { LanguageProvider } from '../hooks/useLanguage';
import Layout from '../components/layout/Layout';

const theme = {
  bg: '#f9f2ee',
  accent: '#97645a',
  shadow: '#ffd4c2',
  highlight: '#fffbf8',
  lightFont: '#f9f2ee',
  darkFont: '#6b4942'
};

export default ({ Component, pageProps: { session, ...pageProps } }) => {
  return (
    <Fragment>
      <GlobalStyles />
      <SessionProvider session={session}>
        <CurrencyProvider>
          <LanguageProvider>
            <ThemeProvider theme={theme}>
              <BagProvider>
                <Layout>
                  <Component {...pageProps} />
                </Layout>
              </BagProvider>
            </ThemeProvider>
          </LanguageProvider>
        </CurrencyProvider>
      </SessionProvider>
    </Fragment>
  );
};

const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    padding: 0;
    font-family: 'Poppins', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  button, a, input, textarea {
    font-family: 'Poppins', sans-serif;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: 'Oswald', sans-serif;
    text-transform: uppercase;
    letter-spacing: 0.1rem;
  }

  div, span, p {
    color: ${theme.darkFont};
  }
`;