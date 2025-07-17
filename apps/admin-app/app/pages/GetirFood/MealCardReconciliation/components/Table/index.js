import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import AntTable from '@shared/components/UI/AntTable';
import { tableColumns } from './config';
import { getMealCardReconciliation } from '../../redux/selectors';

const Table = ({ pagination, onPaginationChange }) => {
  const { t } = useTranslation('foodMealCardReconciliation');
  const tableData = useSelector(getMealCardReconciliation.getTableData);
  const isPending = useSelector(getMealCardReconciliation.getIsPending);
  return (
    <AntTable
      columns={tableColumns(t)}
      data={tableData.data}
      scroll={{ x: true, y: 460 }}
      loading={isPending}
      total={tableData.total}
      pagination={pagination}
      onPaginationChange={onPaginationChange}
    />
  );
};

export default Table;
