import { useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Table, Row, Col, Space, Button } from 'antd';
import { SyncOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

import { usePermission } from '@shared/hooks';
import permKey from '@shared/shared/permKey.json';
import {
  getCitiesSelector,
  getSelectedCountryTimezone,
} from '@shared/redux/selectors/common';
import { Creators } from '@app/pages/GetirFood/FilterOrders/redux/actions';
import {
  filtersSelector,
  paymentMethodsSelector,
  resultsSelector,
} from '@app/pages/GetirFood/FilterOrders/redux/selectors';
import { generateColumns } from '../../utils';
import useStyles from './styles';

const DataTable = () => {
  const { t } = useTranslation(['foodOrderFilterPage', 'global']);
  const dispatch = useDispatch();
  const classes = useStyles();
  const { canAccess } = usePermission();

  const isResultsPending = useSelector(resultsSelector.isPending);
  const isCitiesPending = useSelector(getCitiesSelector.getIsPending);
  const isPaymentMethodsPending = useSelector(paymentMethodsSelector.isPending);

  const filters = useSelector(filtersSelector.getFilters);
  const resultData = useSelector(resultsSelector.getData);
  const cities = useSelector(getCitiesSelector.getData);
  const dataTimeZone = useSelector(getSelectedCountryTimezone.getData);

  const hasAccessToClientDetailPage = canAccess(permKey.PAGE_CLIENT_DETAIL);

  const tableColumns = useMemo(
    () => generateColumns({ t, filters, cities, dataTimeZone, hasAccessToClientDetailPage }),
    [t, filters, cities, dataTimeZone, hasAccessToClientDetailPage],
  );

  const refreshTable = () => {
    dispatch(Creators.getResultsRequest());
  };

  const onPaginationChange = pagination => {
    let send = false;
    if (pagination.defaultPageSize !== pagination.pageSize) {
      send = true;
      dispatch(Creators.setFiltersPagePerRow({ pagePerRow: pagination.pageSize }));
    }
    if (pagination.current !== pagination.page) {
      send = true;
      dispatch(Creators.setFiltersPage({ page: pagination.current }));
    }

    if (send) {
      dispatch(Creators.getResultsRequest());
    }
  };

  useEffect(() => {
    dispatch(Creators.getResultsRequest());
  }, [dispatch]);

  const isPending =
    isResultsPending || isCitiesPending || isPaymentMethodsPending;

  return (
    <Row gutter={[8, 8]}>
      <Col span={24}>
        <Space direction="vertical" className={classes.filterWrapper}>
          <div className={classes.refreshWrapper}>
            <Button
              size="small"
              type="default"
              key="refreshTable"
              onClick={refreshTable}
              icon={<SyncOutlined />}
            />
          </div>
          <Table
            data-testid="food-filter-orders-list"
            rowKey="_id"
            size="small"
            loading={isPending}
            columns={tableColumns}
            dataSource={resultData}
            scroll={{ x: 'max-content' }}
            className={classes.tableWrapper}
            sortDirections={['descend', 'ascend']}
            pagination={{
              page: filters.page,
              defaultPageSize: filters.count,
              showSizeChanger: true,
              total: 10000, // TODO: get the total count from server when it is ready
            }}
            onChange={onPaginationChange}
            bordered
          />
        </Space>
      </Col>
    </Row>
  );
};

export default DataTable;
