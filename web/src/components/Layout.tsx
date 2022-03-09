import React, { FC } from "react";
import styled from "styled-components";
import Header from "./Header";
import Footer from "./Footer";

const headerMessage = "Just in: Our Winter/Spring Collection";

const Layout: FC = ({ children }) => {
  return (
    <Container>
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
