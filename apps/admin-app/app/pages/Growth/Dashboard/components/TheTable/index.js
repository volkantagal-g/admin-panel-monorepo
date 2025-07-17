import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import AntTable from '@shared/components/UI/AntTableV2';
import { getColumns } from './config';
import { getRowClassName } from '../utils';
import useParentStyles from '../styles';

const TheTable = ({ data, isPending, showSorters, tableClassName }) => {
  const { t } = useTranslation('growthDashboard');

  const parentClasses = useParentStyles();

  const columns = useMemo(() => getColumns({
    classes: parentClasses,
    t,
    showSorters,
  }), [parentClasses, t, showSorters]);

  return (
    <AntTable
      data={data}
      columns={columns}
      className={`${parentClasses.table} ${tableClassName}`}
      containerClassName={parentClasses.antTableContainer}
      scroll={{ y: 610 }}
      loading={isPending}
      rowClassName={(record, index) => getRowClassName(parentClasses, index)}
      showFooter={false}
      bordered
    />
  );
};

export default TheTable;
