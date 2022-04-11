import React, { FC, useState, useEffect } from 'react';
import { ImWhatsapp } from 'react-icons/im';
import styled from 'styled-components';
import useScroll from '../../hooks/useScroll';

const FLOATY_OFFSET = 150;
const ANIMATION_DURATION = 200;

const Floaty: FC<IFloatyProps> = ({ whatsapp }) => {
  const [show, setShow] = useState(true);
  const [visibility, setVisibility] = useState<Visibility>('hidden');
  const [opacity, setOpacity] = useState(0);

  useScroll((scrollPos, documentHeight) => {
    setShow(scrollPos + window.innerHeight < documentHeight - FLOATY_OFFSET);
  });
  
  useEffect(() => {
    if (show) {
      setVisibility('visible');
      setTimeout(() => setOpacity(1), ANIMATION_DURATION);
    }
    else {
      setOpacity(0);
      setTimeout(() => setVisibility('hidden'), ANIMATION_DURATION);
    }
  }, [show]);

  return (
    <Container href={whatsapp} style={{ visibility, opacity }}>
      <div><ImWhatsapp size={30} /></div>
    </Container>
  );
}

export default Floaty;

const Container = styled.a`
  position: fixed;
  bottom: 50px;
  right: 60px;
  z-index: 2;
  transition: all ${`${ANIMATION_DURATION}ms`} linear;
  
  > div {
    background-color: #fff;
    padding: 15px;
    display: flex;
    border-radius: 50px;
    box-shadow: 0 0 10px #00000088;
  }

  @media only screen and (max-width: 700px) {
    display: none;
  }
`;

type Visibility = 'hidden' | 'visible';

interface IFloatyProps {
  whatsapp: string
}
