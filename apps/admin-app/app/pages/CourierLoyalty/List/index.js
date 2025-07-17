import { useDispatch, useSelector } from 'react-redux';

import { useEffect, useState } from 'react';

import Header from '@app/pages/CourierLoyalty/List/components/Header';

import { useInitAndDestroyPage } from '@shared/hooks';
import { useInjectReducer } from '@shared/utils/injectReducer';
import { useInjectSaga } from '@shared/utils/injectSaga';
import { REDUX_KEY } from '@shared/shared/constants';

import { ROUTE } from '@app/routes';
import usePageViewAnalytics from '@shared/hooks/usePageViewAnalytics';

import Filter from '@app/pages/CourierLoyalty/List/components/Filters';
import LoyaltyTable from './components/Table';
import { Creators } from './redux/actions';
import saga from './redux/saga';
import reducer from './redux/reducer';
import { courierLoyaltySelector } from './redux/selectors';
import { Creators as CommonCreators } from '@shared/redux/actions/common';

const reduxKey = REDUX_KEY.COURIER_LOYALTY.LIST;

const CourierLoyaltyList = () => {
  const dispatch = useDispatch();
  usePageViewAnalytics({ name: ROUTE.COURIER_LOYALTY_LIST.name, squad: ROUTE.COURIER_LOYALTY_LIST.squad });
  useInjectReducer({ key: reduxKey, reducer });
  useInjectSaga({ key: reduxKey, saga });
  useInitAndDestroyPage({ dispatch, Creators });

  const [filter, setFilter] = useState();
  const [pagination, setPagination] = useState({
    currentPage: 1,
    rowsPerPage: 10,
  });
  const tableData = useSelector(courierLoyaltySelector?.getData);
  const isTableLoading = useSelector(courierLoyaltySelector?.getIsPending);

  const handleFilter = config => {
    setFilter(config);
  };

  useEffect(() => {
    dispatch(CommonCreators.getCitiesRequest());
  }, [dispatch]);

  useEffect(() => {
    const { currentPage, rowsPerPage } = pagination;
    dispatch(Creators.getCourierLoyaltyRequest({ ...filter, currentPage, rowsPerPage }));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter, pagination]);

  const handlePaginationChange = value => {
    setPagination(value);
  };

  return (
    <>
      <Header />
      <Filter
        handleSubmit={handleFilter}
      />
      <LoyaltyTable
        pagination={pagination}
        data={tableData?.data}
        isLoading={isTableLoading}
        handlePagination={handlePaginationChange}
        totalRows={tableData?.totalCouriers}
      />
    </>
  );
};

export default CourierLoyaltyList;
