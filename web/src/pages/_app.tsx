import React, { Fragment } from 'react';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { BagProvider } from '../hooks/useBag';
import { CurrencyProvider } from '../hooks/useCurrency';
import { LanguageProvider } from '../hooks/useLanguage';
import Layout from '../components/Layout';

// TODO: Authentication Provider.

const theme = {
  bg: '#fff',
  accent: '#000',
  shadow: '#ccc',
  highlight: '#eee'
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

  button {
    font-family: 'Poppins', sans-serif;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: 'Oswald', sans-serif;
    text-transform: uppercase;
    letter-spacing: 0.1rem;
  }
`;

export default ({ Component, pageProps }) => {
  return (
    <Fragment>
      <GlobalStyles />
      <BagProvider>
        <CurrencyProvider>
          <LanguageProvider>
            <ThemeProvider theme={theme}>
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </ThemeProvider>
          </LanguageProvider>
        </CurrencyProvider>
      </BagProvider>
    </Fragment>
  );
};