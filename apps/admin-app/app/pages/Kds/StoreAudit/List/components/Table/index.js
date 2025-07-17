import { useTranslation } from 'react-i18next';

import AntTable from '@shared/components/UI/AntTable';
import { getTableColumns } from './config';

const Table = ({ isPending, handlePaginationChange, data, pagination, total }) => {
  const { t } = useTranslation('storeAuditPage');

  return (
    <AntTable
      totalBadge={{ total, label: t('STORE_AUDIT') }}
      data={data}
      total={total}
      columns={getTableColumns()}
      loading={isPending}
      pagination={pagination}
      rowKey="_id"
      onPaginationChange={handlePaginationChange}
    />
  );
};

export default Table;
