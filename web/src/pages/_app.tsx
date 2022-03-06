import React, { Fragment } from 'react';
import { createGlobalStyle } from 'styled-components';
import Layout from '../components/Layout';

// TODO: Authentication Provider.
// TODO: Language Provider.
// TODO: Currency Provider.
// TODO: Shopping Cart Provider.

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
    color: #2c3e50;
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
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Fragment>
  );
};