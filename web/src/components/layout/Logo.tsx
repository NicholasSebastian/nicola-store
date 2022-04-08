import React, { FC, useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from "next/image";
import styled from 'styled-components';
import useScroll from '../../hooks/useScroll';
import logo from '../../../public/logo.png';

// Logo sizes
const BIG = 64;
const SMALL = 40;

// Other constants
const LOGO_OFFSET = 100;
const ANIMATION_DURATION = 200;

const Logo: FC = () => {
  const [big, setBig] = useState(true);
  const [height, setHeight] = useState(BIG);
  const inTransition = useRef(false);

  useScroll(scrollPos => {
    if (!inTransition.current) setBig(big => {
      const heightDiff = BIG - SMALL;
      const offset = big ? LOGO_OFFSET : (LOGO_OFFSET - heightDiff);
      return scrollPos < offset;
    });
  });

  useEffect(() => {
    inTransition.current = true;
    setHeight(big ? BIG : SMALL);
    setTimeout(() => inTransition.current = false, ANIMATION_DURATION);
  }, [big]);
  
  return (
    <Container height={height}>
      <Link href='/'>
        <Image src={logo} alt="Logo" />
      </Link>
    </Container>
  );
}

const Container = styled.span<IStyleArguments>`
  height: ${SMALL}px !important;
  aspect-ratio: 7 / 2;

  :hover {
    cursor: pointer;
  }

  @media only screen and (min-width: 900px) {
    height: ${props => props.height}px !important;
    transition: all ${ANIMATION_DURATION}ms linear;
  }
`;

export default Logo;

interface IStyleArguments {
  height: number
}
