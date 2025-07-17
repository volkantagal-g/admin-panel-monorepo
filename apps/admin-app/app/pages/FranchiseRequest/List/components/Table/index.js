import { useTranslation } from 'react-i18next';

import AntTable from '@shared/components/UI/AntTable';
import { getTableColumns } from './config';
import { _getRowClassName } from './utils';

const Table = ({ columns, total, isPending, handlePaginationChange, ...rest }) => {
  const { t } = useTranslation('franchiseRequestPage');

  const tableColumns = getTableColumns({ columns });

  return (
    <>
      <AntTable
        rowClassName={_getRowClassName}
        totalBadge={{ total, label: t('LIST.FRANCHISE_REQUESTS') }}
        total={total}
        loading={isPending}
        columns={tableColumns}
        rowKey="_id"
        onPaginationChange={handlePaginationChange}
        {...rest}
      />
    </>
  );
};

export default Table;
