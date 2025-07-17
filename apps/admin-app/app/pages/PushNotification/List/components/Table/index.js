import { memo, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { Col, Row, Select } from 'antd';

import { generateNotificationColumns, getHeaders } from '@app/pages/PushNotification/List/components/Table/config';
import AntTable from '@shared/components/UI/AntTable';
import { Creators as CommonCreators } from '@shared/redux/actions/common';
import { Creators } from '@app/pages/PushNotification/List/redux/actions';
import {
  resultsSelector,
  filtersSelector,
  PushNotificationRootSelector,
} from '@app/pages/PushNotification/List/redux/selectors';
import { mapDataForTable } from '@app/pages/PushNotification/List/utils';
import { getItemFromLocalStorage, setItemToLocalStorage } from '@shared/utils/localStorage';
import { REDUX_KEY } from '@shared/shared/constants';
import { convertSelectOptions } from '@shared/utils/common';

const PushNotificationListTabe = () => {
  const { t } = useTranslation('marketing');
  const dispatch = useDispatch();
  const isPending = useSelector(resultsSelector.isPending);
  const data = useSelector(resultsSelector.getResults);
  const filters = useSelector(filtersSelector.getFilters);
  const cities = useSelector(PushNotificationRootSelector.getCities);

  const [tableColumns, setTableColumns] = useState(
    generateNotificationColumns({
      t,
      dispatch,
      filters,
      selectedHeaders: getItemFromLocalStorage(`${REDUX_KEY.PUSH_NOTIFICATION.LIST}_selectedTableHeaders`),
    }),
  );
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    dispatch(CommonCreators.getOperationalCountriesRequest());
  }, [dispatch]);

  useEffect(() => {
    dispatch(Creators.getResultsRequest({ data: filters }));
  }, [dispatch, filters]);

  useEffect(() => {
    if (!isPending) {
      setTableData(mapDataForTable(data?.data?.content, cities));
    }
  }, [data, cities, isPending, t, dispatch, filters]);

  const handlePaginationChange = meta => {
    dispatch(Creators.setFilters({ data: { ...filters, page: meta.currentPage - 1, size: meta.rowsPerPage } }));
  };

  return (
    <>
      <hr />
      <Row justify="end" className="mb-1">
        <Col lg={8}>
          <Select
            placeholder={t('COLUMNS_FILTER')}
            maxTagCount={3}
            className="w-100"
            value={getItemFromLocalStorage(`${REDUX_KEY.PUSH_NOTIFICATION.LIST}_selectedTableHeaders`)}
            options={convertSelectOptions(getHeaders(t), { valueKey: 'key', labelKey: 'title' })}
            mode="multiple"
            onChange={selectedHeaders => {
              const tableHeaders = generateNotificationColumns({ t, dispatch, filters, selectedHeaders });
              setTableColumns(tableHeaders);
              setItemToLocalStorage(`${REDUX_KEY.PUSH_NOTIFICATION.LIST}_selectedTableHeaders`, selectedHeaders);
            }}
          />
        </Col>
      </Row>
      <AntTable
        scroll={{ x: 'max-content' }}
        data={tableData}
        columns={tableColumns}
        loading={isPending}
        pagination={{ currentPage: filters.page + 1, rowsPerPage: filters.size }}
        onPaginationChange={handlePaginationChange}
        bordered
        size="middle"
      />
    </>
  );
};

export default memo(PushNotificationListTabe);
