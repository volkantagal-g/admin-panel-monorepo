import { useTranslation } from 'react-i18next';

import AntTable from '@shared/components/UI/AntTable';
import { tableColumns } from './config';

const Table = ({ isPending, handlePaginationChange, data, pagination, total }) => {
  const { t } = useTranslation('marketFranchiseUserRolePage');

  return (
    <AntTable
      totalBadge={{ total, label: t('MARKET_FRANCHISE_USER_ROLE') }}
      data={data}
      total={total}
      columns={tableColumns()}
      loading={isPending}
      pagination={pagination}
      rowKey="_id"
      onPaginationChange={handlePaginationChange}
    />
  );
};

export default Table;
