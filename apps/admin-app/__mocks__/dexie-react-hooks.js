import { useEffect, useState } from 'react';

export const useLiveQuery = (query, deps, defaultResult) => {
  const [result, setResult] = useState(defaultResult);

  useEffect(() => {
    let cancelled = false;

    query()
      .then(queryResult => {
        if (!cancelled) setResult(queryResult);
      })
    // eslint-disable-next-line no-console
      .catch(console.error);

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps]);

  return result;
};
