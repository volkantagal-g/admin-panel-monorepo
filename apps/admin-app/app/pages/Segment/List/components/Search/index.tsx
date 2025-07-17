import { Input } from 'antd';
import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';

import useDebounce from '@shared/shared/hooks/useDebounce';
import { DEFAULT_DEBOUNCE_MS } from '@shared/shared/constants';
import { usePrevious } from '@shared/hooks';

const MIN_SEARCH_TERM_LENGTH = 3;
const isSearchTermValid = (searchTerm = '') => {
  if (searchTerm.trim().length < MIN_SEARCH_TERM_LENGTH) return false;
  return true;
};

const RoleSearch = ({ onSearch }: { onSearch: (searchInput: string) => void }) => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, DEFAULT_DEBOUNCE_MS);
  const prevDebouncedSearchTerm = usePrevious(debouncedSearchTerm);

  const handleSearchTermChange = (value = '') => {
    setSearchTerm(value);
  };

  useEffect(() => {
    if (debouncedSearchTerm === prevDebouncedSearchTerm) return;
    if (isSearchTermValid(debouncedSearchTerm)) {
      onSearch(debouncedSearchTerm);
    }
    // if the search text is cleared we should search again without a text for the first time
    if (debouncedSearchTerm.trim().length === 0) {
      onSearch('');
    }
  }, [debouncedSearchTerm, onSearch, prevDebouncedSearchTerm]);

  return (
    <Input
      size="large"
      className="mb-2"
      placeholder={t('global:SEARCH')}
      onChange={event => {
        return handleSearchTermChange(event.target.value as string);
      }}
    />
  );
};

export default RoleSearch;
