import React, { FC } from "react";
import Head from 'next/head';
import styled from "styled-components";
import Header from "./Header";
import Footer from "./Footer";

const headerMessage = "Original Brand by Gilbert - Country wide delivery";

const SEO = (
  <Head>
    <meta charSet="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Nicola</title>
  </Head>
);

const Layout: FC = ({ children }) => {
  return (
    <Container>
      {SEO}
      <Header message={headerMessage} />
      <main>{children}</main>
      <Footer />
    </Container>
  );
}

export default Layout;

const Container = styled.div`
  position: relative;

  > main {
    min-height: calc(100vh - 300px);
  }
`;
