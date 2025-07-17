import { memo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Col, Row, Select, Table } from 'antd';

import { Creators } from '@app/pages/NotificationCenter/List/redux/actions';
import { resultsSelector, filtersSelector } from '@app/pages/NotificationCenter/List/redux/selectors';
import { generateTableColumns, getTableColumns } from '@app/pages/NotificationCenter/List/components/Table/config';
import { mapPaginationForTable, manipulateFiltersBeforeSubmit, mapDataForTable } from '@app/pages/NotificationCenter/List/components/Table/utils';
import { getItemFromLocalStorage, setItemToLocalStorage } from '@shared/utils/localStorage';
import { REDUX_KEY } from '@shared/shared/constants';
import { convertSelectOptions } from '@shared/utils/common';
import useStyles from '@app/pages/NotificationCenter/List/components/Table/styles';

const NotificationCenterListTable = () => {
  const { t } = useTranslation('marketing');
  const dispatch = useDispatch();
  const isPending = useSelector(resultsSelector.isPending);
  const filters = useSelector(filtersSelector.getFilters);
  const classes = useStyles();

  const { content, number, size, totalElements } = useSelector(resultsSelector.getResults);
  const [tableColumns, setTableColumns] = useState(
    generateTableColumns({
      t,
      dispatch,
      filters,
      selectedHeaders: getItemFromLocalStorage(`${REDUX_KEY.NOTIFICATION_CENTER.LIST}_selectedTableHeaders`),
      classes,
    }),
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
            value={getItemFromLocalStorage(`${REDUX_KEY.NOTIFICATION_CENTER.LIST}_selectedTableHeaders`)}
            options={convertSelectOptions(getTableColumns(t), { valueKey: 'key', labelKey: 'title' })}
            mode="multiple"
            onChange={selectedHeaders => {
              const tableHeaders = generateTableColumns({ t, dispatch, filters, selectedHeaders, classes });
              setTableColumns(tableHeaders);
              setItemToLocalStorage(`${REDUX_KEY.NOTIFICATION_CENTER.LIST}_selectedTableHeaders`, selectedHeaders);
            }}
          />
        </Col>
      </Row>
      <Table
        scroll={{ x: 'max-content' }}
        loading={isPending}
        rowKey="id"
        onChange={handleTableChange}
        pagination={mapPaginationForTable({ totalElements, size, number })}
        dataSource={mapDataForTable(content)}
        columns={tableColumns}
      />
    </>
  );
};

export default memo(NotificationCenterListTable);
