import { memo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Col, Row, Select, Table } from 'antd';

import { Creators } from '@app/pages/Sms/List/redux/actions';
import { resultsSelector, filtersSelector } from '@app/pages/Sms/List/redux/selectors';
import { generateColumns, getTableColumns } from '@app/pages/Sms/List/components/Table/config';
import { mapPaginationForTable, manipulateFiltersBeforeSubmit, mapDataForTable } from '@app/pages/Sms/List/components/Table/utils';
import { getItemFromLocalStorage, setItemToLocalStorage } from '@shared/utils/localStorage';
import { REDUX_KEY } from '@shared/shared/constants';
import { convertSelectOptions } from '@shared/utils/common';

const SmsListTable = () => {
  const { t } = useTranslation('marketing');
  const dispatch = useDispatch();
  const isPending = useSelector(resultsSelector.isPending);
  const filters = useSelector(filtersSelector.getFilters);
  const [tableColumns, setTableColumns] = useState(
    generateColumns({ t, dispatch, filters, selectedHeaders: getItemFromLocalStorage(`${REDUX_KEY.SMS.LIST}_selectedTableHeaders`) }),
  );
  const { content, number, size, totalElements } = useSelector(resultsSelector.getResults);

  const handleTableChange = (pagination, tableFilters, sorter) => {
    const tableConfigs = manipulateFiltersBeforeSubmit({ pagination, tableFilters, sorter });
    dispatch(Creators.setTableFilters({ filters: tableConfigs }));
  };

  return (
    <>
      <hr />
      <Row justify="end" className="mb-2">
        <Col lg={8}>
          <Select
            placeholder={t('COLUMN_FILTER')}
            maxTagCount={3}
            className="w-100"
            value={getItemFromLocalStorage(`${REDUX_KEY.SMS.LIST}_selectedTableHeaders`)}
            options={convertSelectOptions(getTableColumns(t), { valueKey: 'key', labelKey: 'title' })}
            mode="multiple"
            onChange={selectedHeaders => {
              const tableHeaders = generateColumns({ t, dispatch, filters, selectedHeaders });
              setTableColumns(tableHeaders);
              setItemToLocalStorage(`${REDUX_KEY.SMS.LIST}_selectedTableHeaders`, selectedHeaders);
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
        rowKey="id"
        columns={tableColumns}
      />
    </>
  );
};

export default memo(SmsListTable);
