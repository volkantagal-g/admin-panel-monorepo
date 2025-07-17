import { useState, useEffect } from 'react';
import { throttle } from 'lodash';

const WINDOW_RESIZE_THROTTLE_IN_MS = 250;

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    const handleResizeThrottled = throttle(handleResize, WINDOW_RESIZE_THROTTLE_IN_MS);
    window.addEventListener('resize', handleResizeThrottled);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
};

export default useWindowSize;
