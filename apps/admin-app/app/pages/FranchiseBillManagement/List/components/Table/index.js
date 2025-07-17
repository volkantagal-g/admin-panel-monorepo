import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import AntTableV2 from '@shared/components/UI/AntTableV2';
import { tableColumns } from './config';
import { usePermission } from '@shared/hooks';

const Table = ({ data, total, isPending, pagination, handlePaginationChange }) => {
  const { t } = useTranslation('franchiseBillManagementPage');
  const { Can } = usePermission();

  const columns = useMemo(() => tableColumns(t, Can), [
    t,
    Can,
  ]);

  return (
    <AntTableV2
      data={data}
      total={total}
      columns={columns}
      loading={isPending}
      pagination={pagination}
      onPaginationChange={handlePaginationChange}
      isScrollableToTop={false}
    />
  );
};

export default Table;
