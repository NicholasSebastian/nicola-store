import React, { FC, useState, useContext, createContext } from 'react';

type Bag = Array<IItem>
type BagState = [Bag, React.Dispatch<React.SetStateAction<Bag>>]

interface IItem {
  productId: string
  variantKey: string
}

const BagContext = createContext<BagState>(undefined);

// TODO: UseEffect to keep the database in sync if logged in.

const BagProvider: FC = ({ children }) => {
  const bagState = useState<Bag>([]);
  return (
    <BagContext.Provider value={bagState}>
      {children}
    </BagContext.Provider>
  );
}

const useBag = () => useContext(BagContext);

export { BagProvider };
export default useBag;