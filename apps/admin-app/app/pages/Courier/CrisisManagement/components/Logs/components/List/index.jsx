import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { courierCrisesLogsSelector } from '../../redux/selectors';
import AntTableV2 from '@shared/components/UI/AntTableV2';
import { tableColumns } from './config';

export default function List({ disabled, pagination, handlePaginationChange }) {
  const { t } = useTranslation(['courierPage']);

  const data = useSelector(courierCrisesLogsSelector.getData);
  const count = useSelector(courierCrisesLogsSelector.getCount);

  const columns = useMemo(() => tableColumns(t), [t]);

  return (
    <AntTableV2
      data={data}
      total={count}
      columns={columns}
      loading={disabled}
      pagination={pagination}
      isScrollableToTop={false}
      onPaginationChange={handlePaginationChange}
    />
  );
}
