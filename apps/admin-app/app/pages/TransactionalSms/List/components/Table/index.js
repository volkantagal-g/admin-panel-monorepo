import { memo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Table } from 'antd';

import { Creators } from '@app/pages/TransactionalSms/List/redux/actions';
import { resultsSelector, filtersSelector } from '@app/pages/TransactionalSms/List/redux/selectors';
import { generateSmsColumns } from '@app/pages/TransactionalSms/List/components/Table/config';
import { mapPaginationForTable, manipulateFiltersBeforeSubmit, mapDataForTable } from '@app/pages/TransactionalSms/List/components/Table/utils';

const TransactionalSmsListTable = ({ config }) => {
  const { t } = useTranslation('transactionalSmsPage');
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
      columns={generateSmsColumns({ t, dispatch, filters, config })}
    />
  );
};

export default memo(TransactionalSmsListTable);
