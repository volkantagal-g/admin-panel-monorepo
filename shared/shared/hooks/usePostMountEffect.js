import { useEffect, useRef } from 'react';

/**
 * same as useEffect, except it won't run on the initial render
 * @param fn effect to run
 * @param deps dependencies
 */
const usePostMountEffect = (fn, deps) => {
  const didMount = useRef(false);

  useEffect(() => {
    if (!didMount.current) {
      didMount.current = true;
      return;
    }
    fn();

    // can't be verified statically
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
};

export default usePostMountEffect;
