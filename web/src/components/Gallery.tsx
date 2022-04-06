import React, { FC, useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

const BREAKPOINT = 1024;
const SWIPE_DISTANCE = 50;

const Gallery: FC<IGalleryProps> = ({ imageUrls }) => {
  const [index, setIndex] = useState(0);
  const touchPos = useRef<number>();
  const touchPos2 = useRef<number>();
  const imgRef = useRef<HTMLImageElement>();
  const windowWidth = useRef<number>();

  useEffect(() => {
    windowWidth.current = window.innerWidth;
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => { setIndex(0) }, [imageUrls]);

  const onResize = () => {
    if (window.innerWidth !== windowWidth.current) {
      windowWidth.current = window.innerWidth;
      setIndex(0);
    }
  }

  const handleSelect = (i: number) => {
    if (window.innerWidth > BREAKPOINT) setIndex(i);
  }

  const handleTouch: React.TouchEventHandler = e => {
    if (window.innerWidth < BREAKPOINT) {
      touchPos2.current = e.targetTouches[0]?.clientX;
    }
  }

  const handleSwipeStart = (posX: number) => {
    if (window.innerWidth < BREAKPOINT) {
      touchPos.current = posX;
    }
  }

  const handleSwipeEnd = (posX: number) => {
    if (window.innerWidth > BREAKPOINT) return;

    const vector = touchPos.current - posX;
    if (vector > SWIPE_DISTANCE) {
      setIndex(prevIndex => {
        const hasNext = (prevIndex < imageUrls.length - 1);
        return hasNext ? (prevIndex + 1) : prevIndex;
      });
    }
    if (vector < -SWIPE_DISTANCE) {
      setIndex(prevIndex => {
        const hasBefore = (prevIndex > 0);
        return hasBefore ? (prevIndex - 1) : prevIndex;
      });
    }

    touchPos.current = undefined;
  }

  return (
    <Container displacement={imgRef.current ? (imgRef.current.width * index * -1) : 0}>
      <div>{imageUrls.map((url, i) => (
        <img key={i} ref={imgRef} src={url} alt='Product Image' 
          className={(index === i) ? 'selected' : ''}
          onClick={() => handleSelect(i)} onTouchMove={handleTouch}
          onTouchStart={e => handleSwipeStart(e.targetTouches[0].clientX)} 
          onTouchEnd={e => handleSwipeEnd(touchPos2.current)}
          onMouseDown={e => handleSwipeStart(e.clientX)} 
          onMouseUp={e => handleSwipeEnd(e.clientX)} />
      ))}</div>
      <img src={imageUrls[index]} alt='Product Image' />
      <div>{index + 1}/{imageUrls.length}</div>
    </Container>
  );
}

export default Gallery;

const Container = styled.div<IStyleArguments>`
  display: block;

  > div:first-child > img {
    width: 100%;
    user-select: none;
    user-drag: none;
  }

  > div:last-child {
    display: none;
  }

  @media only screen and (max-width: ${BREAKPOINT}px) {
    position: relative;

    > img {
      display: none;
    }

    > div:first-child {
      display: flex;
      overflow: hidden;

      > img {
        transition: all 300ms ease-in-out;

        :first-child {
          margin-left: ${({ displacement }) => displacement}px;
        }
      }
    }

    > div:last-child {
      display: block;
      position: absolute;
      top: 8px;
      right: 8px;
      background-color: ${props => props.theme.shadow};
      color: ${props => props.theme.darkFont};
      font-size: 13px;
      padding: 2px 10px;
      border-radius: 30px;
    }
  }

  @media only screen and (min-width: ${BREAKPOINT}px) {
    display: grid;
    grid-template-columns: 120px 1fr;
    grid-gap: 10px;

    > img {
      width: 100%;
      user-select: none;
      user-drag: none;
    }

    > div:first-child {
      > img:hover {
        cursor: pointer;
      }

      > img.selected {
        opacity: 0.5;
      }
    }
  }
`;

interface IGalleryProps {
  imageUrls: Array<string>
}

interface IStyleArguments { 
  displacement: number 
}