import React, { FC } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import useBag from '../hooks/useBag';

const ShoppingBag: FC = () => {
  const { bag, setBag } = useBag();
  return (
    <Container>
      <div>test</div>
    </Container>
  );
}

export default ShoppingBag;

const Container = styled.div`
  // TODO
`;