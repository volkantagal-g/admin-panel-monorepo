import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { compose } from 'redux';
import { PageHeader, Col, Row } from 'antd';
import { get } from 'lodash';
import moment from 'moment';

import { t } from '@shared/i18n';
import { REDUX_KEY } from '@shared/shared/constants';
import injectSaga from '@shared/utils/injectSaga';
import injectReducer from '@shared/utils/injectReducer';
import { useEffectSkipInitialRender, useInitAndDestroyPage, usePageViewAnalytics } from '@shared/hooks';
import { getSelectedCountry } from '@shared/redux/selectors/countrySelection';
import { ROUTE } from '@app/routes';
import saga from './redux/saga';
import reducer from './redux/reducer';
import { Creators } from './redux/actions';
import { FORM_NAME, FORM_TYPE } from './constants';
import { franchiseRequestListSelector, franchiseRequestListColumnsSelector, franchiseRequestEnumsSelector } from './redux/selector';
import { Filter, Table } from './components';

const FranchiseRequestListPage = () => {
  usePageViewAnalytics({ name: ROUTE.FRANCHISE_REQUEST_LIST.name, squad: ROUTE.FRANCHISE_REQUEST_LIST.squad });
  const dispatch = useDispatch();
  useInitAndDestroyPage({ dispatch, Creators });
  const [pagination, setPagination] = useState({ currentPage: 1, rowsPerPage: 10 });

  const selectedCountry = getSelectedCountry();
  const countryCode = get(selectedCountry, 'code.alpha2', '');

  const franchiseRequestList = {
    data: useSelector(franchiseRequestListSelector.getData),
    isPending: useSelector(franchiseRequestListSelector.getIsPending),
    total: useSelector(franchiseRequestListSelector.getTotal),
  };

  const franchiseRequestListColumns = {
    data: useSelector(franchiseRequestListColumnsSelector.getData),
    isPending: useSelector(franchiseRequestListColumnsSelector.getIsPending),
  };

  const franchiseRequestEnums = {
    data: useSelector(franchiseRequestEnumsSelector.getData),
    isPending: useSelector(franchiseRequestEnumsSelector.getIsPending),
  };

  const isPending = franchiseRequestList.isPending || franchiseRequestEnums.isPending;

  const [filters, setFilters] = useState({
    selectedRequestTimeRange: [
      moment().subtract(15, 'days'),
      moment().endOf('day'),
    ],
  });

  const handlePaginationChange = ({ currentPage, rowsPerPage }) => {
    setPagination({ currentPage, rowsPerPage });
  };

  const handleSubmit = filters => {
    setFilters(filters);
  };

  const franchiseRequestListRequest = () => {
    const { currentPage, rowsPerPage } = pagination;
    const [startDate, endDate] = filters?.selectedRequestTimeRange;
    const requestParams = {
      startDate: startDate?.startOf('day'),
      endDate: endDate?.endOf('day'),
      limit: rowsPerPage,
      offset: (currentPage - 1) * rowsPerPage,
    };
    dispatch(Creators.getFranchiseRequestListRequest(requestParams));
  };

  const handleExport = () => {
    const [startDate, endDate] = filters?.selectedRequestTimeRange;
    dispatch(Creators.getFranchiseRequestListReportRequest({ startDate, endDate }));
  };

  useEffectSkipInitialRender(() => {
    const { currentPage } = pagination;

    if (currentPage !== 1) {
      setPagination({ ...pagination, currentPage: 1 });
    }
    else {
      franchiseRequestListRequest();
    }
  }, [filters]);

  useEffect(() => {
    dispatch(Creators.getFranchiseRequestListColumnsRequest({ formName: FORM_NAME, formType: FORM_TYPE }));
    dispatch(Creators.getFranchiseRequestEnumsRequest({ countryCode }));
  }, []);

  useEffect(() => {
    franchiseRequestListRequest();
  }, [pagination.currentPage, pagination.rowsPerPage]);

  return (
    <>
      <Row>
        <Col flex={1}>
          <PageHeader
            className="p-0 page-title"
            title={t('global:PAGE_TITLE.FRANCHISE_REQUEST.LIST')}
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
            data={franchiseRequestList.data}
            total={franchiseRequestList.total}
            columns={franchiseRequestListColumns.data}
            isPending={isPending}
            pagination={pagination}
            handlePaginationChange={handlePaginationChange}
            onExport={handleExport}
          />
        </Col>
      </Row>
    </>
  );
};

const reduxKey = REDUX_KEY.FRANCHISE_REQUEST.LIST;
const withSaga = injectSaga({ key: reduxKey, saga });
const withReducer = injectReducer({ key: reduxKey, reducer });

export default compose(withReducer, withSaga)(FranchiseRequestListPage);
