import { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Collapse, Row } from 'antd';

import { useTranslation } from 'react-i18next';

import moment from 'moment';

import { Creators } from './redux/actions';
import saga from './redux/saga';
import reducer from './redux/reducer';
import {
  getHighLevelDysListSelector,
  getHighLevelLineChartListSelector,
  getHighLevelBarChartListSelector,
} from './redux/selectors';
import { BarChart, Filter, Header, LineChart, Table } from './components';
import { useInitAndDestroyPage, usePageViewAnalytics } from '@shared/hooks';
import { useInjectReducer } from '@shared/utils/injectReducer';
import { useInjectSaga } from '@shared/utils/injectSaga';
import { REDUX_KEY } from '@shared/shared/constants';
import { getLimitAndOffset } from '@shared/utils/common';
import { ROUTE } from '@app/routes';
import { dysEndDate, dysStartDate, DEFAULT_PERFORMANCE_SELECT_ITEM, DEFAULT_SERVICE_TYPE_SELECT_ITEM } from './constant';
import { createRequestBody } from './utils';

const reduxKey = REDUX_KEY.HIGH_LEVEL_DYS;

const HighLevelDys = () => {
  const { Panel } = Collapse;

  const { t } = useTranslation('highLevelDys');

  const dispatch = useDispatch();
  useInjectReducer({ key: reduxKey, reducer });
  useInjectSaga({ key: reduxKey, saga });
  useInitAndDestroyPage({ dispatch, Creators });
  usePageViewAnalytics({ name: ROUTE.HIGH_LEVEL_DYS.name, squad: ROUTE.HIGH_LEVEL_DYS.squad });

  const [filters, setFilters] = useState({
    dysPeriod: [moment.utc(dysEndDate).subtract({ days: 89 }), dysEndDate],
    serviceType: DEFAULT_SERVICE_TYPE_SELECT_ITEM,
    performanceSystem: DEFAULT_PERFORMANCE_SELECT_ITEM,
    cities: [],
    date: dysStartDate,
  });

  const data = useSelector(getHighLevelDysListSelector.getData);
  const total = useSelector(getHighLevelDysListSelector.getTotal);
  const isPending = useSelector(getHighLevelDysListSelector.getIsPending);

  const lineChartData = useSelector(getHighLevelLineChartListSelector.getData);
  const isLineChartPending = useSelector(getHighLevelLineChartListSelector.getIsPending);

  const barChartData = useSelector(getHighLevelBarChartListSelector.getData);
  const isBarChartPending = useSelector(getHighLevelBarChartListSelector.getIsPending);

  const [pagination, setPagination] = useState({ currentPage: 1, rowsPerPage: 10 });

  const handleSubmit = filter => {
    setPagination(prev => ({ ...prev, currentPage: 1 }));
    setFilters(filter);
  };

  const handlePaginationChange = ({ currentPage, rowsPerPage }) => {
    if (currentPage !== pagination.currentPage || rowsPerPage !== pagination.rowsPerPage) {
      setPagination({ currentPage, rowsPerPage });
    }
  };

  const handleDownloadCsv = () => {
    const requestPayload = createRequestBody(filters);
    dispatch(Creators.exportHighLevelDysListRequest({ filters: requestPayload }));
  };

  const getHighLevelDysList = useCallback(() => {
    const { limit, offset } = getLimitAndOffset(pagination);
    const requestPayload = createRequestBody(filters);
    dispatch(Creators.getHighLevelDysListRequest({ offset, limit, filters: requestPayload }));
    dispatch(Creators.getHighLevelLineChartListRequest({ filters: requestPayload }));
    dispatch(Creators.getHighLevelBarChartListRequest({ filters: requestPayload }));
  }, [dispatch, filters, pagination]);

  useEffect(() => {
    getHighLevelDysList();
  }, [getHighLevelDysList]);

  return (
    <>
      <Header />
      <Filter
        filters={filters}
        handleSubmit={handleSubmit}
        isPending={isPending || isLineChartPending || isBarChartPending}
      />
      <Collapse defaultActiveKey={['1']}>
        <Panel header={t('CHARTS')} key="1">
          <Row>
            <LineChart
              data={lineChartData}
              isPending={isLineChartPending}
            />
            <BarChart
              data={barChartData}
              isPending={isBarChartPending}
            />
          </Row>
        </Panel>
      </Collapse>
      <Table
        data={data}
        isPending={isPending}
        total={total}
        selectedPerformanceSystem={filters.performanceSystem}
        pagination={pagination}
        handleDownloadCsv={handleDownloadCsv}
        handlePaginationChange={handlePaginationChange}
      />
    </>
  );
};

export default HighLevelDys;
