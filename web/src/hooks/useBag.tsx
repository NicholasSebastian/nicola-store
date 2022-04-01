import React, { FC, useState, useEffect, useContext, createContext, useRef } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import styled from 'styled-components';
import ShoppingBag from '../components/ShoppingBag';

const DRAWER_SPEED = 250; // in milliseconds.

const BagContext = createContext<IBagContext>(undefined);
const useBag = () => useContext(BagContext);

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

  const addToBag = (item: IItem) => {
    if (bag.find(i => i.variantKey === item.variantKey)) {
      // TODO: Display message.
    }
    else {
      setBag(prevState => [...prevState, item]);
      // TODO: Display message.
    }
  }

  useEffect(() => {
    // TODO: Keep the database in sync if logged in.
  }, [bag]);
  
  return (
    <BagContext.Provider value={{ bag, setBag, openBag, addToBag }}>
      <Container ref={containerRef} onClick={closeBag} >
        <div ref={drawerRef} onClick={e => e.stopPropagation()}>
          <AiOutlineClose onClick={closeBag} size={26} />
          <ShoppingBag />
        </div>
      </Container>
      {children}
    </BagContext.Provider>
  );
}

const BagConsumer: FC<IBagConsumerProps> = ({ children }) => {
  const { bag } = useBag();
  const [items, setItems] = useState<Items>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    Promise.allSettled(
      // Fetches or recycles item data.
      bag.map(item => {
        const itemData = items.find(itemData => itemData.productId === item.productId);
        return itemData ?? fetch(`/api/item?product=${item.productId}&variant=${item.variantKey}`);
      })
    )
    .then(results => results
      // Filter out all failed responses.
      .filter(result => result.status === 'fulfilled')
      
      // Get promises out of the responses, return the non-response values, and ignore the rest.
      .reduce((array, { value }: PromiseFulfilledResult<IItemData | Response>) => {
        const isResponse = typeof value['json'] === 'function';
        if (isResponse && (value as Response).ok) 
          array.push((value as Response).json());
        else
          array.push(value as IItemData);
        return array;
      }, [])
    )
    // Resolve all the promises and values.
    .then(values => Promise.all(values))

    // Finally set the new state.
    .then(items => setItems(items))
    .finally(() => setLoading(false));
  }, [bag]);

  return loading ? <div>Loading</div> : children(items);
}

export { BagProvider, BagConsumer };
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
    box-shadow: -20px 0 30px ${props => `${props.theme.accent}88`};
    width: 75%;
    max-width: 300px;
    transition: all ${`${DRAWER_SPEED}ms`} ease-in-out;

    position: absolute;
    top: 0;
    bottom: 0;
    right: -300px;

    > svg:first-child {
      color: ${props => props.theme.accent};
      position: absolute;
      top: 14px;
      right: 14px;

      :hover {
        cursor: pointer;
      }
    }
  }
`;

type Bag = Array<IItem>
type Items = Array<IItemData>

interface IBagContext {
  bag: Bag
  setBag: React.Dispatch<React.SetStateAction<Bag>>
  openBag: () => void
  addToBag: (item: IItem) => void
}

interface IBagConsumerProps {
  children: (props: Items) => any
}

interface IItem {
  productId: string
  variantKey: string
  amount: number
}

export interface IItemData {
  productId: string
  name: string
  price: number
  discount: number
  variantKey: string
  variant: string
  image: string
}