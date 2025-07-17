import { useEffect } from 'react';

const useHideBodyScroll = isScrollWantedToBeHidden => {
  useEffect(() => {
    if (isScrollWantedToBeHidden) {
      document.body.style.overflow = 'hidden';
    }
    else {
      document.body.style.overflow = 'unset';
    }
  }, [isScrollWantedToBeHidden]);
};

export default useHideBodyScroll;
