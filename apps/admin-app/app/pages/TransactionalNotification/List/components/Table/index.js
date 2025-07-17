import { memo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Table } from 'antd';

import { Creators } from '@app/pages/TransactionalNotification/List/redux/actions';
import { resultsSelector, filtersSelector } from '@app/pages/TransactionalNotification/List/redux/selectors';
import { generateNotificationColumns } from '@app/pages/TransactionalNotification/List/components/Table/config';
import { mapPaginationForTable, manipulateFiltersBeforeSubmit, mapDataForTable } from '@app/pages/TransactionalNotification/List/components/Table/utils';

const TransactionalNotificationListTable = ({ config }) => {
  const { t } = useTranslation('transactionalNotificationPage');
  const dispatch = useDispatch();
  const isPending = useSelector(resultsSelector.isPending);
  const filters = useSelector(filtersSelector.getFilters);
  const { content, number, size, totalElements } = useSelector(resultsSelector.getResults);
  const handleTableChange = (pagination, tableFilters, sorter) => {
    const tableConfigs = manipulateFiltersBeforeSubmit({ pagination, tableFilters, sorter });
    dispatch(Creators.setTableFilters({ filters: tableConfigs }));
  };

  return (
    <Table
      scroll={{ x: 'max-content' }}
      loading={isPending}
      onChange={handleTableChange}
      pagination={mapPaginationForTable({ totalElements, size, number })}
      dataSource={mapDataForTable(content)}
      columns={generateNotificationColumns({ t, dispatch, filters, config })}
    />
  );
};

export default memo(TransactionalNotificationListTable);
