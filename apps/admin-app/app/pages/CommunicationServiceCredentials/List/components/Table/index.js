import { memo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Table } from 'antd';

import { Creators } from '@app/pages/CommunicationServiceCredentials/List/redux/actions';
import { resultsSelector } from '@app/pages/CommunicationServiceCredentials/List/redux/selectors';
import { generateColumns } from '@app/pages/CommunicationServiceCredentials/List/components/Table/config';
import { mapPaginationForTable, manipulateFiltersBeforeSubmit, mapDataForTable } from '@app/pages/CommunicationServiceCredentials/List/components/Table/utils';

const CommunicationServiceCredentialsTable = ({ serviceType }) => {
  const { t } = useTranslation('communicationServiceCredentialsPage');
  const dispatch = useDispatch();
  const isPending = useSelector(resultsSelector.isPending);
  const { content, number, size, totalElements } = useSelector(resultsSelector.getResults);
  const handleTableChange = (pagination, tableFilters, sorter) => {
    const tableConfigs = manipulateFiltersBeforeSubmit({ pagination, tableFilters, sorter });
    dispatch(Creators.setTableFilters({ filters: tableConfigs, serviceType }));
  };

  return (
    <Table
      scroll={{ x: 'max-content' }}
      loading={isPending}
      onChange={handleTableChange}
      pagination={mapPaginationForTable({ totalElements, size, number })}
      dataSource={mapDataForTable(content, serviceType)}
      columns={generateColumns({ t, serviceType })}
    />
  );
};

export default memo(CommunicationServiceCredentialsTable);
