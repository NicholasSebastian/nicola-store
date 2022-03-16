import React, { FC, useState, useContext, createContext } from 'react';

type Currency = 'IDR' | 'USD';
type CurrencyState = [Currency, React.Dispatch<React.SetStateAction<Currency>>]
type Symbols = { [key in Currency]: string };

const symbols: Symbols = {
  IDR: 'Rp. ',
  USD: '$'
};

const CurrencyContext = createContext<CurrencyState>(undefined);

const CurrencyProvider: FC = ({ children }) => {
  const currencyState = useState<Currency>('IDR');
  return (
    <CurrencyContext.Provider value={currencyState}>
      {children}
    </CurrencyContext.Provider>
  );
}

const useCurrency = () => useContext(CurrencyContext);

export { CurrencyProvider, symbols };
export default useCurrency;