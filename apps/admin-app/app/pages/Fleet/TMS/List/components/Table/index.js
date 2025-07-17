import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import AntTableV2 from '@shared/components/UI/AntTableV2';

import { tableColumns } from './config';

const Table = ({ data, loading, total, handlePagination }) => {
  const { t } = useTranslation(['marketVehicle']);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    rowsPerPage: 10,
  });

  const handlePaginationChange = ({ currentPage, rowsPerPage }) => {
    setPagination({ currentPage, rowsPerPage }, () => {
      handlePagination(pagination);
    });
  };

  return (
    <AntTableV2
      loading={loading}
      data={data}
      columns={tableColumns({ t })}
      pagination={pagination}
      onPaginationChange={handlePaginationChange}
      total={total}
    />
  );
};

export default Table;
