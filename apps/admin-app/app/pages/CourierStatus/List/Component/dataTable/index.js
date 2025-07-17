import { useTranslation } from 'react-i18next';

import AntTableV2 from '@shared/components/UI/AntTableV2';

import { tableColumns } from './config';

const Table = ({ data, loading, handlePagination, pagination }) => {
  const { t } = useTranslation(['courierStatusAndBusy']);

  const handlePaginationChange = ({ currentPage, rowsPerPage }) => {
    handlePagination({ currentPage, rowsPerPage });
  };

  return (
    <AntTableV2
      loading={loading}
      data={data?.couriers}
      columns={tableColumns({ t })}
      pagination={pagination}
      onPaginationChange={handlePaginationChange}
      total={data?.totalCount}
    />
  );
};

export default Table;
