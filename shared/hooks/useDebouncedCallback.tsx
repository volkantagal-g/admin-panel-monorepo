import { debounce } from 'lodash';
import { useEffect, useMemo } from 'react';

type UseDebouncedCallbackOptions = {
  callback: (..._args: any[]) => void;
  delay?: number;
  lodashOptions?: {
    leading?: boolean;
    trailing?: boolean;
    maxWait?: number;
  };
};

export default function useDebouncedCallback({ callback, delay = 500, lodashOptions } : UseDebouncedCallbackOptions): {
  debouncedCallback: () => void;
  cancel: () => void;
} {
  if (typeof callback !== 'function') {
    throw new Error('useDebouncedCallback: callback must be a function');
  }
  const debouncedCallback = useMemo(
    () => debounce(callback, delay, lodashOptions),
    [callback, delay, lodashOptions],
  );

  useEffect(() => {
    return () => {
      // if a new debounce is created, the old one can still be waiting to be called
      // cancel on unmount or after different debounce created
      debouncedCallback.cancel();
    };
  }, [debouncedCallback]);

  // use cancel if you have custom logic to cancel, this hook takes care of unmount canceling
  return { debouncedCallback, cancel: debouncedCallback.cancel };
}
