import { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row } from 'antd';

import { Creators } from './redux/actions';
import saga from './redux/saga';
import reducer from './redux/reducer';
import { getDtsListSelector } from './redux/selectors';
import { Filter, Header, Table } from './components';
import { useInitAndDestroyPage, usePageViewAnalytics } from '@shared/hooks';
import { useInjectReducer } from '@shared/utils/injectReducer';
import { useInjectSaga } from '@shared/utils/injectSaga';
import { REDUX_KEY } from '@shared/shared/constants';
import { getLimitAndOffset } from '@shared/utils/common';
import { dtsEndDate, dtsStartDate } from '../constant';
import { ROUTE } from '@app/routes';
import { getDtsFilterRequestBody } from './utils';

const reduxKey = REDUX_KEY.DTS.GENERAL.LIST;

const StoreAuditList = () => {
  const dispatch = useDispatch();
  useInjectReducer({ key: reduxKey, reducer });
  useInjectSaga({ key: reduxKey, saga });
  useInitAndDestroyPage({ dispatch, Creators });
  usePageViewAnalytics({ name: ROUTE.DTS_LIST.name, squad: ROUTE.DTS_LIST.squad });

  const [filters, setFilters] = useState({
    dtsDate: [dtsStartDate, dtsEndDate],
    status: [],
    decision: [],
    reporter: '',
    warehouseIds: [],
    ruleIds: [],
  });
  const [sortedInfo, setSortedInfo] = useState({});

  const data = useSelector(getDtsListSelector.getData);
  const total = useSelector(getDtsListSelector.getTotal);
  const isPending = useSelector(getDtsListSelector.getIsPending);

  const [pagination, setPagination] = useState({ currentPage: 1, rowsPerPage: 100 });

  const handleSubmit = filter => {
    setPagination(prev => ({ ...prev, currentPage: 1 }));
    setFilters(filter);
    setSortedInfo({});
  };

  const handlePaginationChange = ({ currentPage, rowsPerPage }) => {
    if (currentPage !== pagination.currentPage || rowsPerPage !== pagination.rowsPerPage) {
      setPagination({ currentPage, rowsPerPage });
    }
  };

  const onChangeTable = (_paginations, _filterOptions, sorter) => {
    setSortedInfo(sorter);
  };

  const getDtsList = useCallback(() => {
    const { limit, offset } = getLimitAndOffset(pagination);
    const updatedFilters = getDtsFilterRequestBody(filters, sortedInfo);

    dispatch(Creators.getDtsListRequest({ offset, limit, filters: updatedFilters }));
  }, [dispatch, filters, pagination, sortedInfo]);

  useEffect(() => {
    getDtsList();
  }, [getDtsList]);

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
          <Table
            sortedInfo={sortedInfo}
            data={data}
            isPending={isPending}
            total={total}
            pagination={pagination}
            handlePaginationChange={handlePaginationChange}
            onChangeTable={onChangeTable}
          />
        </Col>
      </Row>
    </>
  );
};

export default StoreAuditList;
