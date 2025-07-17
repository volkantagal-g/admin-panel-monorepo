import { useCallback, useEffect, useState } from 'react';
import copy from 'copy-to-clipboard';

const THRESHOLD_COPY_TIMEOUT_IN_MS = 3000;

const useCopy = text => {
  const [isCoppied, setIsCoppied] = useState(false);

  useEffect(() => {
    let timeOut;

    if (isCoppied) {
      timeOut = setTimeout(() => setIsCoppied(false), THRESHOLD_COPY_TIMEOUT_IN_MS);
    }

    return () => clearTimeout(timeOut);
  }, [isCoppied]);

  const handleCopy = useCallback(() => {
    copy(text);
    setIsCoppied(true);
  }, [text]);

  return [isCoppied, handleCopy];
};

export default useCopy;
