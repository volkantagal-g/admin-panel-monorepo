import { memo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Col, Row, Select, Table } from 'antd';

import { Creators } from '@app/pages/CommunicationBulkSms/List/redux/actions';
import { resultsSelector, filtersSelector } from '@app/pages/CommunicationBulkSms/List/redux/selectors';
import { generateTableColumns, getTableColumns } from '@app/pages/CommunicationBulkSms/List/components/Table/config';
import { mapPaginationForTable, manipulateFiltersBeforeSubmit, mapDataForTable } from '@app/pages/CommunicationBulkSms/List/components/Table/utils';
import { getItemFromLocalStorage, setItemToLocalStorage } from '@shared/utils/localStorage';
import { REDUX_KEY } from '@shared/shared/constants';
import { convertSelectOptions } from '@shared/utils/common';

const BulkSmsTable = () => {
  const { t } = useTranslation('communicationBulkSmsPage');
  const dispatch = useDispatch();
  const isPending = useSelector(resultsSelector.isPending);
  const filters = useSelector(filtersSelector.getFilters);
  const selectedTableHeaders = getItemFromLocalStorage(`${REDUX_KEY.COMMUNICATION_BULK_SMS.LIST}_selectedTableHeaders`);

  const { content, number, size, totalElements } = useSelector(resultsSelector.getResults);
  const [tableColumns, setTableColumns] = useState(
    generateTableColumns({ t, dispatch, filters, selectedHeaders: getItemFromLocalStorage(`${REDUX_KEY.COMMUNICATION_BULK_SMS.LIST}_selectedTableHeaders`) }),
  );

  const handleTableChange = (pagination, tableFilters, sorter) => {
    const tableConfigs = manipulateFiltersBeforeSubmit({ pagination, tableFilters, sorter });
    dispatch(Creators.setTableFilters({ filters: tableConfigs }));
  };

  return (
    <>
      <Row justify="end" className="mb-2">
        <Col lg={8}>
          <Select
            placeholder={t('COLUMN_FILTER')}
            maxTagCount={3}
            className="w-100"
            value={selectedTableHeaders.length > 0 ? selectedTableHeaders : getTableColumns(t).map(column => column.key)}
            options={convertSelectOptions(getTableColumns(t), { valueKey: 'key', labelKey: 'title' })}
            mode="multiple"
            onChange={selectedHeaders => {
              const tableHeaders = generateTableColumns({ t, dispatch, filters, selectedHeaders });
              setTableColumns(tableHeaders);
              setItemToLocalStorage(`${REDUX_KEY.COMMUNICATION_BULK_SMS.LIST}_selectedTableHeaders`, selectedHeaders);
            }}
          />
        </Col>
      </Row>
      <Table
        scroll={{ x: 'max-content' }}
        loading={isPending}
        onChange={handleTableChange}
        pagination={mapPaginationForTable({ totalElements, size, number })}
        dataSource={mapDataForTable(content)}
        columns={tableColumns}
      />
    </>
  );
};

export default memo(BulkSmsTable);
