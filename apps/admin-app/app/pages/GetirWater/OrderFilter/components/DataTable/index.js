import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Row, Col, Space } from 'antd';
import _ from 'lodash';

import AntTable from '@shared/components/UI/AntTableV2';
import { usePermission } from '@shared/hooks';
import useWindowSize from '@shared/shared/hooks/useWindowSize';

import { ordersSelector, filterSelector } from '../../redux/selectors';
import { Creators } from '../../redux/actions';

import { findOrderStatusValues } from '../Filter/filterFormConstants';

import { generateColumns } from './config';
import useStyles from './styles';

const DataTable = () => {
  const { width } = useWindowSize();
  const { t } = useTranslation('getirWaterOrderFilter');
  const dispatch = useDispatch();
  const classes = useStyles();
  const filters = useSelector(filterSelector.getFilters);
  const orderList = useSelector(ordersSelector.getOrders);
  const orderListPending = useSelector(ordersSelector.getOrdersIsPending);
  const { Can } = usePermission();

  const [pagination, setPagination] = useState({ currentPage: filters.page, rowsPerPage: filters.count });

  const handlePaginationChange = ({ currentPage, rowsPerPage }) => {
    setPagination({ currentPage, rowsPerPage });
  };

  useEffect(() => {
    setPagination({ currentPage: filters.page, rowsPerPage: filters.count });
  }, [filters]);

  useEffect(() => {
    const statusValues = findOrderStatusValues(filters.status);
    const data = _.omit(filters, ['status']);

    dispatch(
      Creators.filterOrdersRequest({
        data: {
          ...data,
          ...statusValues,
          page: pagination.currentPage,
          count: pagination.rowsPerPage,
        },
      }),
    );
    // eslint-disable-next-line
  }, [pagination.currentPage, pagination.rowsPerPage]);

  return (
    <Row gutter={[8, 8]}>
      <Col span={24}>
        <Space direction="vertical" className={classes.filterWrapper}>
          <AntTable
            data={orderList}
            columns={generateColumns(Can, t, width)}
            className={classes.tableWrapper}
            sortDirections={['descend', 'ascend']}
            pagination={pagination}
            loading={orderListPending}
            onPaginationChange={handlePaginationChange}
            data-testid="orderDataTable"
          />
        </Space>
      </Col>
    </Row>
  );
};

export default DataTable;
