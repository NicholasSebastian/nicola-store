import Link from 'next/link';
import React, { FC } from 'react';
import styled from 'styled-components';

const BannerWithLink: FC<IBannerProps> = props => {
  if (props.href) 
  return (
    <Link href={props.href}>
      <Banner {...props}><div /></Banner>
    </Link>
  );
  return <Banner {...props}><div /></Banner>
}

const Banner = styled.div<IBannerProps>`
  overflow: hidden;
  position: relative;

  > div {
    background: url(${props => props.src});
    background-size: cover;
    background-position: center;
    height: ${props => props.height ?? '60vh'};
    transition: all 500ms ease-in-out;
  }

  ::after {
    content: ${props => props.text ? `'${props.text}'` : `''`};
    color: ${props => props.theme.bg};
    font-size: ${props => props.fontScaling ? `${(props.fontScaling * 10) + 2}px` : '82px'};
    font-family: 'Oswald', sans-serif;
    text-transform: uppercase;
    letter-spacing: 0.1rem;

    display: flex;
    justify-content: center;
    align-items: center;

    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;

    @media only screen and (max-width: 1024px) {
      font-size: ${props => props.fontScaling ? `${props.fontScaling}vw` : '8vw'};
    }
  }

  :hover {
    cursor: ${props => props.href ? 'pointer' : 'auto' };
    
    > div {
      transform: scale(${props => props.zoom && props.href ? 1.2 : 1});
      filter: brightness(${props => props.zoom && props.href ? 0.5 : 1});
    }
  }
`;

export default BannerWithLink;

interface IBannerProps {
  href?: string
  src: string
  text?: string
  height?: string
  fontScaling?: number
  zoom?: boolean
}