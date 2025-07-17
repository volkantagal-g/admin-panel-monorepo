import { useTranslation } from 'react-i18next';

import AntTable from '@shared/components/UI/AntTable';
import { _getTableColumns } from './config';

const Table = ({ data, total, isPending, handlePaginationChange }) => {
  const { t } = useTranslation('kdsQuestionGroupPage');
  const tableColumns = _getTableColumns(t);

  return (
    <AntTable
      totalBadge={{ total, label: t('QUESTION_GROUP') }}
      data={data}
      total={total}
      loading={isPending}
      columns={tableColumns}
      rowKey="_id"
      onPaginationChange={handlePaginationChange}
    />
  );
};

export default Table;
