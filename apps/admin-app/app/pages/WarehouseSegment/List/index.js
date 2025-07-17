import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Row, Col } from 'antd';
import moment from 'moment';

import AntTable from '@shared/components/UI/AntTable';
import { REDUX_KEY } from '@shared/shared/constants';
import { useInjectSaga } from '@shared/utils/injectSaga';
import { useInjectReducer } from '@shared/utils/injectReducer';
import { useEffectSkipInitialRender, useInitAndDestroyPage, usePageViewAnalytics } from '@shared/hooks';
import { ROUTE } from '@app/routes';
import saga from './redux/saga';
import reducer from './redux/reducer';
import { Creators } from './redux/actions';
import { warehouseSegmentsSelector, warehouseSegmentReportSelector } from './redux/selectors';
import { Filter, Header } from './components';
import { tableColumns } from './config';
import { getWarehouseSegmentsRequestParams } from './utils';
import { SEGMENT_TYPE_OPTIONS } from '../constants';

const reduxKey = REDUX_KEY.WAREHOUSE_SEGMENT.LIST;

const WarehouseSegments = () => {
  usePageViewAnalytics({ name: ROUTE.WAREHOUSE_SEGMENT_LIST.name, squad: ROUTE.WAREHOUSE_SEGMENT_LIST.squad });
  const { t } = useTranslation('warehouseSegmentPage');

  const INIT_FILTERS = {
    name: '',
    isDefault: undefined,
    segmentTypes: SEGMENT_TYPE_OPTIONS(t).map(item => item.value),
    dateRange: [moment().subtract(7, 'day').startOf('day'), moment().endOf('day')],
  };

  const dispatch = useDispatch();
  useInjectReducer({ key: reduxKey, reducer });
  useInjectSaga({ key: reduxKey, saga });
  useInitAndDestroyPage({ dispatch, Creators });

  const [filters, setFilters] = useState(INIT_FILTERS);
  const [pagination, setPagination] = useState({ currentPage: 1, rowsPerPage: 10 });

  const warehouseSegments = {
    data: useSelector(warehouseSegmentsSelector.getData),
    total: useSelector(warehouseSegmentsSelector.getTotal),
    isPending: useSelector(warehouseSegmentsSelector.getIsPending),
  };
  const warehouseSegmentReport = { isPending: useSelector(warehouseSegmentReportSelector.getIsPending) };

  const isPending = warehouseSegments.isPending || warehouseSegmentReport.isPending;

  const handlePaginationChange = ({ currentPage, rowsPerPage }) => {
    setPagination({ currentPage, rowsPerPage });
  };

  const handleSubmit = filters => {
    setFilters(filters);
  };

  const handleExport = () => {
    const requestParams = getWarehouseSegmentsRequestParams(filters);

    dispatch(Creators.getWarehouseSegmentReportRequest(requestParams));
  };

  const getWarehouseSegmentsRequest = () => {
    const { currentPage, rowsPerPage } = pagination;
    const requestParams = getWarehouseSegmentsRequestParams({
      ...filters,
      currentPage,
      rowsPerPage,
    });

    dispatch(Creators.getWarehouseSegmentsRequest(requestParams));
  };

  useEffectSkipInitialRender(() => {
    const { currentPage } = pagination;

    if (currentPage !== 1) {
      setPagination({ ...pagination, currentPage: 1 });
    }
    else {
      getWarehouseSegmentsRequest();
    }
  }, [filters]);

  useEffect(() => {
    getWarehouseSegmentsRequest();
  }, [pagination.currentPage, pagination.rowsPerPage]);

  return (
    <>
      <Header />
      <Filter
        filters={filters}
        handleSubmit={handleSubmit}
        isPending={isPending}
      />
      <Row>
        <Col span={24}>
          <AntTable
            data={warehouseSegments.data}
            columns={tableColumns(t)}
            total={warehouseSegments.total}
            loading={isPending}
            rowKey="_id"
            pagination={pagination}
            onPaginationChange={handlePaginationChange}
            onExport={handleExport}
            scroll={{ x: 1000 }}
          />
        </Col>
      </Row>
    </>
  );
};

export default WarehouseSegments;
