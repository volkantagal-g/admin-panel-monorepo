import React, { createContext, useContext, ReactNode } from 'react';

interface SAPReferenceContextValue {
  SAPReferenceCode: string | null;
  hasSAPReferenceCode: boolean;
}

interface SAPReferenceProviderProps {
  children: ReactNode;
  SAPReferenceCode: string | null;
}

const SAPReferenceContext = createContext<SAPReferenceContextValue | undefined>(undefined);

export const useSAPReference = (): SAPReferenceContextValue => {
  const context = useContext(SAPReferenceContext);
  if (!context) {
    throw new Error('useSAPReference must be used within a SAPReferenceProvider');
  }
  return context;
};

export const SAPReferenceProvider: React.FC<SAPReferenceProviderProps> = ({ children, SAPReferenceCode }) => {
  const hasSAPReferenceCode = !!SAPReferenceCode;
  const value = React.useMemo(() => ({
    SAPReferenceCode,
    hasSAPReferenceCode,
  }), [SAPReferenceCode, hasSAPReferenceCode]);

  return (
    <SAPReferenceContext.Provider value={value}>
      {children}
    </SAPReferenceContext.Provider>
  );
};
