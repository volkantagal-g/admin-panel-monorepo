import { useState } from 'react';

import { INIT_FILTERS_TRANSACTION } from '../../constants';

import { Filter, Table } from './components';

const TransactionTab = () => {
  const [filters, setFilters] = useState(INIT_FILTERS_TRANSACTION);
  const [pagination, setPagination] = useState({
    currentPage: INIT_FILTERS_TRANSACTION.page,
    rowsPerPage: INIT_FILTERS_TRANSACTION.pageSize,
    isPaginationActive: false,
  });
  // isPaginationActive state using for API call in Table component
  const handleSubmit = updatedFilters => {
    setFilters(updatedFilters);
    setPagination({ currentPage: updatedFilters.page, rowsPerPage: updatedFilters.pageSize, isPaginationActive: true });
  };

  return (
    <>
      <Filter pagination={pagination} filters={filters} handleSubmit={handleSubmit} />
      <Table pagination={pagination} filters={filters} handleSubmit={handleSubmit} setPagination={setPagination} />
    </>

  );
};

export default TransactionTab;
