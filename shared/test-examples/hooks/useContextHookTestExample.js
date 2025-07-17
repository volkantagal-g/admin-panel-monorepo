import { createContext, useContext } from 'react';
import { useParams } from 'react-router-dom';

export const FakeContext = createContext(1);

// when we test this hook, we need to provide the context provider
export default function useContextHookTestExample() {
  // needs FakeContext.Provider
  const fakeContextValue = useContext(FakeContext);
  // needs react-router-dom provider
  const { fakeParamValue } = useParams();

  return Number(fakeParamValue) + fakeContextValue;
}
