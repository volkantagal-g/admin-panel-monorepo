import { useEffect, useRef } from 'react';

/*
  EXAMPLE USAGE:
  ---------------
  useInterval(callback, delay);
*/

const useInterval = (callback, delay) => {
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    const  tick = () =>  {
      savedCallback.current();
    };
    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
    return () => {};
  }, [delay]);
};

export default useInterval;
