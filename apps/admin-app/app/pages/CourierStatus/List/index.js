import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';

import PageTitleHeader from '@shared/components/UI/PageTitleHeader';

import { useInitAndDestroyPage } from '@shared/hooks';
import { useInjectReducer } from '@shared/utils/injectReducer';
import { useInjectSaga } from '@shared/utils/injectSaga';
import { REDUX_KEY } from '@shared/shared/constants';
import { ROUTE } from '@app/routes';
import usePageViewAnalytics from '@shared/hooks/usePageViewAnalytics';
import Filter from '@app/pages/CourierStatus/List/Component/filters/index';
import { courierListStatusAndBusy } from '@app/pages/CourierStatus/List/redux/selector';
import Table from '@app/pages/CourierStatus/List/Component/dataTable/index';
import Header from '@app/pages/CourierStatus/List/Component/header/index';

import { Creators } from './redux/actions';
import saga from './redux/saga';
import reducer from './redux/reducer';

const reduxKey = REDUX_KEY.COURIER_STATUS_AND_BUSY.LIST;

const CourierStatusBusyList = () => {
  const { t } = useTranslation(['global']);
  const dispatch = useDispatch();

  const [filters, setFilters] = useState({
    domains: [],
    warehouse: null,
    reason: null,
    timeSpent: null,
    status: null,
  });
  const [pagination, setPagination] = useState({
    currentPage: 1,
    rowsPerPage: 10,
  });
  usePageViewAnalytics({
    name: ROUTE.COURIER_STATUS_AND_BUSY_LIST.name,
    squad: ROUTE.COURIER_STATUS_AND_BUSY_LIST.squad,
  });

  const handleFiltersChange = ({ domains, status, warehouse, reason }) => {
    setFilters({ domains, status, warehouse, reason });
  };

  useInjectReducer({ key: reduxKey, reducer });
  useInjectSaga({ key: reduxKey, saga });
  useInitAndDestroyPage({ dispatch, Creators });

  useEffect(() => {
    const { currentPage, rowsPerPage } = pagination;
    dispatch(Creators.filterCourierRequest({ ...filters, currentPage, rowsPerPage }));
  }, [dispatch, filters, pagination]);

  const tableData = useSelector(courierListStatusAndBusy?.getData);
  const isTableDataPending = useSelector(courierListStatusAndBusy?.getIsPending);

  const handleTablePagination = ({ currentPage, rowsPerPage }) => {
    setPagination({ currentPage, rowsPerPage });
  };

  return (
    <>
      <PageTitleHeader title={t('global:PAGE_TITLE.COURIER_STATUS_AND_BUSY.LIST')} />
      <Header />
      <Filter
        filters={filters}
        handleSubmit={handleFiltersChange}
      />
      <Table
        pagination={pagination}
        handlePagination={handleTablePagination}
        loading={isTableDataPending}
        data={tableData}
      />
    </>
  );
};

export default CourierStatusBusyList;
