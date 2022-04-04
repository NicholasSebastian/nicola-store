import React, { FC, useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { CgShapeCircle } from 'react-icons/cg';
import styled, { useTheme } from 'styled-components'
import Banner from './Banner';

const INTERVAL = 8000;

const Carousel: FC<ICarouselProps> = ({ banners }) => {
  const theme: any = useTheme();
  const containerRef = useRef<HTMLDivElement>();
  const windowWidth = useRef<number>();
  const [index, setIndex] = useState(0);

  const increment = () => {
    setIndex(prevIndex => {
      const hasNext = (prevIndex < banners.length - 1);
      return hasNext ? (prevIndex + 1) : 0;
    });
  }

  const onResize = () => {
    if (window.innerWidth !== windowWidth.current) {
      windowWidth.current = window.innerWidth;
      setIndex(0);
    }
  }

  useEffect(() => {
    windowWidth.current = window.innerWidth;
    window.addEventListener('resize', onResize);
    const interval = setInterval(increment, INTERVAL);
    return () => {
      window.removeEventListener('resize', onResize);
      clearInterval(interval);
    }
  }, []);

  return (
    <Container ref={containerRef} 
      displacement={containerRef.current ? (containerRef.current.offsetWidth * index * -1) : 0}>
      {banners.map((banner, i) => (
        <Banner key={i} src={banner.image} href={banner.path} text={banner.text} />
      ))}
      <div>
        {banners.map((_, i) => (
          <CgShapeCircle key={i} size={24} onClick={() => setIndex(i)}
            color={index === i ? theme.accent : theme.highlight} />
        ))}
      </div>
    </Container>
  );
}

export default Carousel;

const Container = styled.div<IStyleArguments>`
  display: flex;
  overflow: hidden;
  position: relative;

  > *:not(:last-child) {
    min-width: 100%;
    transition: all 400ms ease-in-out;

    :first-child {
      margin-left: ${({ displacement }) => displacement}px;
    }
  }

  > div:last-child {
    display: flex;
    justify-content: center;
    position: absolute;
    bottom: 12px;
    left: 0;
    right: 0;

    > svg {
      cursor: pointer;
    }
  }
`;

interface ICarouselProps {
  banners: Array<IBannerData>
}

export interface IBannerData {
  image: string
  path: string
  text?: string
}

interface IStyleArguments {
  displacement: number
}