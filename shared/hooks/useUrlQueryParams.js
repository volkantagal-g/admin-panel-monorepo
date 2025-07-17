import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';

export default function useUrlQueryParams() {
  const { search } = useLocation();
  const queryParsed = useMemo(() => new URLSearchParams(search), [search]);
  return queryParsed;
}
