import { useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Space, Button } from 'antd';
import { SyncOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

import AntTableV2 from '@shared/components/UI/AntTableV2';

import useStyles from './styles';

import { usePermission } from '@shared/hooks';
import permKey from '@shared/shared/permKey.json';
import { generateColumns } from './config';
import { Creators } from '../../redux/actions';
import { activesSelector, paymentMethodsSelector, filtersSelector } from '../../redux/selectors';
import { getCitiesSelector, getSelectedCountryTimezone } from '@shared/redux/selectors/common';
import { getOrderedData, mapTotals } from './utils';

const DataTable = () => {
  const { t } = useTranslation(['foodOrderActivePage', 'global']);
  const dispatch = useDispatch();
  const classes = useStyles();
  const { canAccess } = usePermission();

  const isActivesPending = useSelector(activesSelector.getActivesIsPending);
  const totalCount = useSelector(activesSelector.getActivesTotalCount);
  const isCitiesPending = useSelector(getCitiesSelector.getIsPending);
  const isPaymentMethodsPending = useSelector(paymentMethodsSelector.getPaymentMethodsIsPending);
  const pagination = useSelector(filtersSelector.getPagination);

  const isPending = isActivesPending || isCitiesPending || isPaymentMethodsPending;

  const activeOrders = useSelector(activesSelector.getActives);
  const cities = useSelector(getCitiesSelector.getData);
  const dataTimeZone = useSelector(getSelectedCountryTimezone.getData);

  const hasAccessToClientDetailPage = canAccess(permKey.PAGE_CLIENT_DETAIL);

  const arrangedTotal = useMemo(() => mapTotals(activeOrders), [activeOrders]);

  const tableColumns = useMemo(
    () => generateColumns({ cities, dataTimeZone, arrangedTotal, hasAccessToClientDetailPage, t }),
    [cities, dataTimeZone, arrangedTotal, hasAccessToClientDetailPage, t],
  );

  const orderedData = useMemo(() => getOrderedData(activeOrders), [activeOrders]);

  const refreshTable = () => {
    dispatch(Creators.getActivesRequest());
  };

  const handlePaginationChange = newPagination => {
    dispatch(Creators.setPagination({ pagination: newPagination }));
  };

  useEffect(() => {
    dispatch(Creators.getActivesRequest());
  }, [dispatch, pagination]);

  return (
    <Row gutter={[8, 8]}>
      <Col span={24}>
        <Space direction="vertical" className={classes.filterWrapper}>
          <div className={classes.refreshWrapper}>
            <Button key="refreshTable" type="default" size="small" icon={<SyncOutlined />} onClick={refreshTable} />
          </div>
          <AntTableV2
            data-testid="food-active-orders-list"
            dataSource={orderedData}
            columns={tableColumns}
            rowKey="_id"
            loading={isPending}
            scroll={{ x: 'max-content' }}
            className={classes.tableWrapper}
            sortDirections={['descend', 'ascend']}
            size="small"
            pagination={pagination}
            onPaginationChange={handlePaginationChange}
            pageSizeOptions={[100]}
            total={totalCount}
          />
        </Space>
      </Col>
    </Row>
  );
};

export default DataTable;
