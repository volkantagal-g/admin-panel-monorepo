import { useState } from 'react';

import Stats from '../Stats';
import Filter from '../Filter';
import Table from '../Table';
import { INIT_FILTERS } from '../../constants';

const Main = () => {
  const [filters, setFilters] = useState(INIT_FILTERS);
  const [pagination, setPagination] = useState({
    currentPage: INIT_FILTERS.pageNo,
    rowsPerPage: INIT_FILTERS.pageSize,
  });

  const handleSubmit = updatedFilters => {
    setFilters(updatedFilters);
    setPagination({ currentPage: updatedFilters.currentPage, rowsPerPage: updatedFilters.rowsPerPage });
  };

  return (
    <>
      <Filter pagination={pagination} filters={filters} handleSubmit={handleSubmit} />
      <Stats />
      <Table pagination={pagination} setPagination={setPagination} filters={filters} />

    </>

  );
};

export default Main;
