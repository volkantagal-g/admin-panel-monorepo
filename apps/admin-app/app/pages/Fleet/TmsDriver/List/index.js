import { useState, useMemo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { useInitAndDestroyPage } from '@shared/hooks';
import { useInjectReducer } from '@shared/utils/injectReducer';
import { useInjectSaga } from '@shared/utils/injectSaga';
import { REDUX_KEY } from '@shared/shared/constants';
import { ROUTE } from '@app/routes';
import usePageViewAnalytics from '@shared/hooks/usePageViewAnalytics';
import { TmsDriversSelector } from '@app/pages/Fleet/TmsDriver/List/redux/selectors';
import { getTableColumns } from '@app/pages/Fleet/TmsDriver/List/components/Table/config';
import TmsDriversTable from '@app/pages/Fleet/TmsDriver/List/components/Table/';
import Filter from '@app/pages/Fleet/TmsDriver/List/components/Filter';
import { Creators } from '@app/pages/Fleet/TmsDriver/List/redux/actions';
import Header from '@app/pages/Fleet/TmsDriver/List/components/Header';
import saga from '@app/pages/Fleet/TmsDriver/List/redux/saga';
import reducer from '@app/pages/Fleet/TmsDriver/List/redux/reducer';

const reduxKey = REDUX_KEY.TMS_DRIVER.LIST;

const TmsDriversListPage = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation(['global', 'courierPage']);
  usePageViewAnalytics({ name: ROUTE.TMS_DRIVER_LIST.name, squad: ROUTE.TMS_DRIVER_LIST.squad });
  useInjectReducer({ key: reduxKey, reducer });
  useInjectSaga({ key: reduxKey, saga });
  useInitAndDestroyPage({ dispatch, Creators });

  const isTmsDriversDataPending = useSelector(TmsDriversSelector.getIsPending);
  const tmsDriversData = useSelector(TmsDriversSelector.getData);
  const tmsDriversTotalCount = useSelector(TmsDriversSelector.getTotalCount);

  const [pagination, setPagination] = useState({
    currentPage: 1,
    rowsPerPage: 10,
  });

  const [filters, setFilters] = useState({
    statuses: [],
    isActivated: null,
    isLoggedIn: null,
    name: null,
  });

  const handlePaginationChange = ({ currentPage, rowsPerPage }) => {
    setPagination({ currentPage, rowsPerPage });
  };

  const handleFiltersChange = ({ statuses, isActivated, isLoggedIn, name }) => {
    setFilters({ statuses, isActivated, isLoggedIn, name });
  };

  const columns = useMemo(() => getTableColumns(t), [t]);

  useEffect(() => {
    const { currentPage, rowsPerPage } = pagination;
    dispatch(Creators.filterTmsDriversRequest({
      currentPage,
      rowsPerPage,
      filters,
    }));
  }, [dispatch, pagination, filters]);

  return (
    <>
      <Header title={t('global:PAGE_TITLE.FLEET.TMS_DRIVER.LIST')} />
      <Filter
        filters={filters}
        handleSubmit={handleFiltersChange}
        isPending={isTmsDriversDataPending}
      />
      <TmsDriversTable
        data={tmsDriversData}
        isPending={isTmsDriversDataPending}
        columns={columns}
        pagination={pagination}
        handlePagination={handlePaginationChange}
        totalCount={tmsDriversTotalCount}
      />
    </>
  );
};

export default TmsDriversListPage;
