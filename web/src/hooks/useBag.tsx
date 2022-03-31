import React, { FC, useState, useEffect, useContext, createContext, useRef } from 'react';
import { GrClose } from 'react-icons/gr';
import styled from 'styled-components';
import ShoppingBag from '../components/ShoppingBag';

const DRAWER_SPEED = 250; // in milliseconds.

const BagContext = createContext<IBagContext>(undefined);

const BagProvider: FC = ({ children }) => {
  const [bag, setBag] = useState<Bag>([]);
  const containerRef = useRef<HTMLDivElement>();
  const drawerRef = useRef<HTMLDivElement>();
  
  const openBag = () => {
    containerRef.current.style.display = 'block';
    setTimeout(() => {
      drawerRef.current.style.right = '0';
    });
  }

  const closeBag = () => {
    drawerRef.current.style.removeProperty('right');
    setTimeout(() => {
      containerRef.current.style.removeProperty('display');
    }, DRAWER_SPEED);
  }

  useEffect(() => {
    // TODO: Keep the database in sync if logged in.
  }, [bag]);
  
  return (
    <BagContext.Provider value={{ bag, setBag, openBag }}>
      <Container ref={containerRef} onClick={closeBag} >
        <div ref={drawerRef} onClick={e => e.stopPropagation()}>
          <GrClose onClick={closeBag} size={24} />
          <ShoppingBag />
        </div>
      </Container>
      {children}
    </BagContext.Provider>
  );
}

const useBag = () => useContext(BagContext);

export { BagProvider };
export default useBag;

const Container = styled.div`
  display: none;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 2;

  > div:first-child {
    background-color: ${props => props.theme.bg};
    border-left: 1px solid ${props => props.theme.shadow};
    width: 75%;
    max-width: 300px;
    transition: all ${`${DRAWER_SPEED}ms`} ease-in-out;

    position: absolute;
    top: 0;
    bottom: 0;
    right: -300px;

    > svg:first-child {
      position: absolute;
      top: 16px;
      right: 16px;

      :hover {
        cursor: pointer;
      }
    }
  }
`;

type Bag = Array<IItem>

interface IBagContext {
  bag: Bag
  setBag: React.Dispatch<React.SetStateAction<Bag>>
  openBag: () => void
}

interface IItem {
  productId: string
  variantKey: string
}