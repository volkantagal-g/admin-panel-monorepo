import { useState, useEffect } from "react";
import copy from "copy-to-clipboard";

const useClipboard = (text, { successDuration = 2000 }) => {
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    if (isCopied && successDuration) {
      const id = setTimeout(() => {
        setIsCopied(false);
      }, successDuration);

      return () => {
        clearTimeout(id);
      };
    }
    return () => {};
  }, [isCopied, successDuration]);

  return [
    isCopied,
    () => {
      const didCopy = copy(text);
      setIsCopied(didCopy);
    },
  ];
};

export default useClipboard;
