import { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { compose } from 'redux';
import { PageHeader, Col, Row } from 'antd';
import moment from 'moment';

import { ddsObjectionListSelector } from '@app/pages/Dds/Objection/List/redux/selector';
import { t } from '@shared/i18n';
import { REDUX_KEY, DDS_OBJECTION_STATUSES } from '@shared/shared/constants';
import injectSaga from '@shared/utils/injectSaga';
import injectReducer from '@shared/utils/injectReducer';
import { useInitAndDestroyPage, usePageViewAnalytics } from '@shared/hooks';
import { ROUTE } from '@app/routes';
import saga from './redux/saga';
import reducer from './redux/reducer';
import { Creators } from './redux/actions';
import { Filter, Table } from './components';
import { getDdsObjectionListRequestParams } from './utils';

const DDSObjectionListPage = () => {
  usePageViewAnalytics({ name: ROUTE.DDS_OBJECTION_LIST.name, squad: ROUTE.DDS_OBJECTION_LIST.squad });
  const dispatch = useDispatch();
  useInitAndDestroyPage({ dispatch, Creators });
  const [pagination, setPagination] = useState({ currentPage: 1, rowsPerPage: 10 });

  const data = useSelector(ddsObjectionListSelector.getData);
  const isPending = useSelector(ddsObjectionListSelector.getIsPending);
  const total = useSelector(ddsObjectionListSelector.getTotal);

  const [filters, setFilters] = useState({
    selectedFranchiseId: null,
    selectedWarehouseIds: [],
    selectedRequestTimeRange: [
      moment().subtract(15, 'days'),
      moment().endOf('day'),
    ],
    selectedStatuses: [DDS_OBJECTION_STATUSES.WAITING],
    selectedCriterionNames: [],
  });

  const handlePaginationChange = ({ currentPage, rowsPerPage }) => {
    // this equality prevents possible extra renders (because of AntTable) when the page initialized
    if (currentPage !== pagination.currentPage || rowsPerPage !== pagination.rowsPerPage) {
      setPagination({ currentPage, rowsPerPage });
    }
  };

  const handleSubmit = filter => {
    setPagination(prev => ({ ...prev, currentPage: 1 }));
    setFilters(filter);
  };

  const ddsObjectListRequest = useCallback(() => {
    const { currentPage, rowsPerPage } = pagination;
    const requestParams = getDdsObjectionListRequestParams({
      ...filters,
      currentPage,
      rowsPerPage,
    });
    dispatch(Creators.getDdsObjectionListRequest(requestParams));
  }, [dispatch, filters, pagination]);

  useEffect(() => {
    ddsObjectListRequest();
  }, [ddsObjectListRequest]);

  return (
    <>
      <Row>
        <Col flex={1}>
          <PageHeader
            className="p-0 page-title"
            title={t('global:PAGE_TITLE.DDS.OBJECTION.LIST')}
          />
        </Col>
      </Row>
      <Filter
        filters={filters}
        isPending={isPending}
        handleSubmit={handleSubmit}
      />
      <Row>
        <Col span={24}>
          <Table
            data={data}
            total={total}
            isPending={isPending}
            pagination={pagination}
            handlePaginationChange={handlePaginationChange}
          />
        </Col>
      </Row>
    </>
  );
};

const reduxKey = REDUX_KEY.DDS.OBJECTION.LIST;
const withSaga = injectSaga({ key: reduxKey, saga });
const withReducer = injectReducer({ key: reduxKey, reducer });

export default compose(withReducer, withSaga)(DDSObjectionListPage);
