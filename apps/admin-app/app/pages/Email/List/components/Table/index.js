import { memo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Col, Row, Select, Table } from 'antd';

import { Creators } from '@app/pages/Email/List/redux/actions';
import { resultsSelector } from '@app/pages/Email/List/redux/selectors';
import { generateTableColumns, getTableColumns } from '@app/pages/Email/List/components/Table/config';
import { mapPaginationForTable, manipulateFiltersBeforeSubmit, mapDataForTable } from '@app/pages/Email/List/components/Table/utils';
import { getItemFromLocalStorage, setItemToLocalStorage } from '@shared/utils/localStorage';
import { REDUX_KEY } from '@shared/shared/constants';
import { convertSelectOptions } from '@shared/utils/common';

const EmailListTable = () => {
  const { t } = useTranslation('marketing');
  const dispatch = useDispatch();
  const isPending = useSelector(resultsSelector.isPending);

  const [configs, setConfigs] = useState({});

  const [tableColumns, setTableColumns] = useState(
    generateTableColumns({ t, dispatch, configs, selectedHeaders: getItemFromLocalStorage(`${REDUX_KEY.EMAIL.LIST}_selectedTableHeaders`) }),
  );

  const { content, number, size, totalElements } = useSelector(resultsSelector.getResults);

  const handleTableChange = (pagination, filters, sorter) => {
    const tableConfigs = manipulateFiltersBeforeSubmit({ pagination, filters, sorter });
    setConfigs(tableConfigs);
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
            value={getItemFromLocalStorage(`${REDUX_KEY.EMAIL.LIST}_selectedTableHeaders`)}
            options={convertSelectOptions(getTableColumns(t), { valueKey: 'key', labelKey: 'title' })}
            mode="multiple"
            onChange={selectedHeaders => {
              const tableHeaders = generateTableColumns({ t, dispatch, configs, selectedHeaders });
              setTableColumns(tableHeaders);
              setItemToLocalStorage(`${REDUX_KEY.EMAIL.LIST}_selectedTableHeaders`, selectedHeaders);
            }}
          />
        </Col>
      </Row>
      <Table
        rowKey="emailId"
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

export default memo(EmailListTable);
