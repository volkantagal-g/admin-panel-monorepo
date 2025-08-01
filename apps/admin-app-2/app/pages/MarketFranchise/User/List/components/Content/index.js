import { useState } from 'react';

import { usePermission } from '@shared/hooks';
import { DEFAULT_PAGINATION_VALUES } from '@shared/shared/constants';
import permKey from '@shared/shared/permKey.json';
import Filter from '../Filter';
import Table from '../Table';

const FranchiseUserListPageContent = () => {
  const { Can } = usePermission();

  const [pagination, setPagination] = useState(DEFAULT_PAGINATION_VALUES);
  const [filters, setFilters] = useState({
    searchValue: '',
    isActivated: undefined,
  });

  const handleSearch = values => {
    setFilters(values);
    setPagination(DEFAULT_PAGINATION_VALUES);
  };

  return (
    <Can key="FranchiseUserList" permKey={permKey.PAGE_MARKET_FRANCHISE_USER_LIST}>
      <Filter
        filters={filters}
        handleSearch={handleSearch}
      />
      <Table filters={filters} pagination={pagination} setPagination={setPagination} />
    </Can>
  );
};

export default FranchiseUserListPageContent;
