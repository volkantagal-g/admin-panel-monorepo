import { useTranslation } from 'react-i18next';

import AntTableV2 from '@shared/components/UI/AntTableV2';
import { getTableColumns } from './config';

const Table = ({ data, isPending, count, handleExport, handlePaginationChange, pagination }) => {
  const { t } = useTranslation('marketFranchisePage');
  const tableColumns = getTableColumns(t);

  return (
    <AntTableV2
      title={t('LOGS_TABLE')}
      data={data}
      loading={isPending}
      columns={tableColumns}
      pagination={pagination}
      onPaginationChange={handlePaginationChange}
      total={count}
      onExport={handleExport}
      isScrollableToTop={false}
    />
  );
};

export default Table;
