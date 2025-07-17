import { useState, useRef, useMemo } from 'react';
import debounce from 'lodash/debounce';

const useDebounceFetcher = ({
  fetchOptions,
  debounceTimeout = 800,
}) => {
  const [fetching, setFetching] = useState(false);
  const [options, setOptions] = useState([]);
  const fetchRef = useRef(0);
  const debounceFetcher = useMemo(() => {
    const loadOptions = value => {
      fetchRef.current += 1;
      const fetchId = fetchRef.current;
      setOptions([]);
      setFetching(true);
      fetchOptions(value).then(newOptions => {
        if (fetchId !== fetchRef.current) {
          // for fetch callback order
          return;
        }

        setOptions(newOptions);
        setFetching(false);
      })
        .catch(() => setFetching(false));
    };

    return debounce(loadOptions, debounceTimeout);
  }, [fetchOptions, debounceTimeout]);

  return {
    fetching,
    options,
    debounceFetcher,
  };
};

export default useDebounceFetcher;