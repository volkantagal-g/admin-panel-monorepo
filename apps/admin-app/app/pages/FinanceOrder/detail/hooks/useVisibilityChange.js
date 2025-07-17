import { useEffect, useState } from 'react';

const useVisibilityChange = () => {
  const [visibilityState, setVisibilityState] = useState(true);

  function onFocus() {
    setVisibilityState(true);
  }
  function onBlur() {
    setVisibilityState(false);
  }

  useEffect(() => {
    window.addEventListener('focus', onFocus);
    window.addEventListener('blur', onBlur);
    return () => {
      window.removeEventListener('focus', onFocus);
      window.removeEventListener('blur', onBlur);
    };
  }, []);

  return visibilityState;
};

export default useVisibilityChange;
