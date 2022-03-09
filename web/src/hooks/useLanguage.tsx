import React, { FC, useState, useContext, createContext } from 'react';

type Language = 'en' | 'id';
type LanguageState = [Language, React.Dispatch<React.SetStateAction<Language>>]

const LanguageContext = createContext<LanguageState>(undefined);

const LanguageProvider: FC = ({ children }) => {
  const languageState = useState<Language>('en');
  return (
    <LanguageContext.Provider value={languageState}>
      {children}
    </LanguageContext.Provider>
  );
}

const useLanguage = () => useContext(LanguageContext);

export { LanguageProvider };
export type { Language };
export default useLanguage;