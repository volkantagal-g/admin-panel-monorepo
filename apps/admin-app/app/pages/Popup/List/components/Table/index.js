import { memo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Col, Row, Select, Table } from 'antd';

import { filtersSelector, resultsSelector } from '@app/pages/Popup/List/redux/selectors';
import { generatePopupColumns, getTableColumns } from '@app/pages/Popup/List/components/Table/config';
import { manipulateFiltersBeforeSubmit, mapDataForTable, mapPaginationForTable } from '@app/pages/Popup/List/components/Table/utils';
import { Creators } from '@app/pages/Popup/List/redux/actions';
import { getItemFromLocalStorage, setItemToLocalStorage } from '@shared/utils/localStorage';
import { REDUX_KEY } from '@shared/shared/constants';
import { convertSelectOptions } from '@shared/utils/common';
import useStyles from '@app/pages/Popup/List/components/Table/styles';

const PopupListTable = () => {
  const { t } = useTranslation('marketing');
  const dispatch = useDispatch();
  const isPending = useSelector(resultsSelector.isPending);
  const filters = useSelector(filtersSelector.getFilters);
  const classes = useStyles();
  const { content, number, size, totalElements } = useSelector(resultsSelector.getResults);

  const [tableColumns, setTableColumns] = useState(
    generatePopupColumns({ t, dispatch, selectedHeaders: getItemFromLocalStorage(`${REDUX_KEY.POPUP.LIST}_selectedTableHeaders`), classes }),
  );

  const handleTableChange = (pagination, tableFilters, sorter) => {
    const tableConfigs = manipulateFiltersBeforeSubmit({ pagination, filters: tableFilters, sorter });
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
            value={getItemFromLocalStorage(`${REDUX_KEY.POPUP.LIST}_selectedTableHeaders`)}
            options={convertSelectOptions(getTableColumns(t), { valueKey: 'key', labelKey: 'title' })}
            mode="multiple"
            onChange={selectedHeaders => {
              const tableHeaders = generatePopupColumns({ t, dispatch, filters, selectedHeaders });
              setTableColumns(tableHeaders);
              setItemToLocalStorage(`${REDUX_KEY.POPUP.LIST}_selectedTableHeaders`, selectedHeaders);
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

export default memo(PopupListTable);
