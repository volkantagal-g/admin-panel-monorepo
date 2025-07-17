import { useTranslation } from 'react-i18next';

import AntTableV2 from '@shared/components/UI/AntTableV2';
import { getTableColumns } from './config';
import { getLangKey } from '@shared/i18n';

const LoyaltyTable = ({ pagination, handlePagination, data, totalRows, isLoading }) => {
  const { t } = useTranslation(['global', 'courierLoyalty']);
  const langKey = getLangKey();

  const handlePaginationChange = ({ currentPage, rowsPerPage }) => {
    handlePagination({ currentPage, rowsPerPage });
  };

  return (
    <AntTableV2
      data={data}
      columns={getTableColumns({ t, langKey })}
      pagination={pagination}
      onPaginationChange={handlePaginationChange}
      loading={isLoading}
      total={totalRows}
    />
  );
};

export default LoyaltyTable;
