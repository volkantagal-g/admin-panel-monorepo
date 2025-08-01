import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { useState } from 'react';

import { useInitAndDestroyPage } from '@shared/hooks';
import { useInjectReducer } from '@shared/utils/injectReducer';
import { useInjectSaga } from '@shared/utils/injectSaga';
import { REDUX_KEY } from '@shared/shared/constants';
import { ROUTE } from '@app/routes';
import usePageViewAnalytics from '@shared/hooks/usePageViewAnalytics';
import PageTitleHeader from '@shared/components/UI/PageTitleHeader';

import { Creators } from './redux/actions';
import saga from './redux/saga';
import reducer from './redux/reducer';
import { Header, Filter, Table, CountsCard } from './components';
import { INIT_FILTERS } from './constants';

const reduxKey = REDUX_KEY.RECONCILIATION_DAILY_REPORT.LIST;

const DailyReportPage = () => {
  const [filters, setFilters] = useState(INIT_FILTERS);
  const [pagination, setPagination] = useState({
    currentPage: INIT_FILTERS.page,
    rowsPerPage: INIT_FILTERS.pageSize,
  });
  const { t } = useTranslation(['global']);
  const dispatch = useDispatch();

  const handleSubmit = updatedFilters => {
    setFilters(updatedFilters);
    setPagination({ currentPage: updatedFilters.page, rowsPerPage: updatedFilters.pageSize });
  };

  usePageViewAnalytics({ name: ROUTE.RECONCILIATION_DAILY_REPORT.name, squad: ROUTE.RECONCILIATION_DAILY_REPORT.squad });

  useInjectReducer({ key: reduxKey, reducer });
  useInjectSaga({ key: reduxKey, saga });
  useInitAndDestroyPage({ dispatch, Creators });

  return (
    <>
      <PageTitleHeader title={t('global:PAGE_TITLE.RECONCILIATION_DAILY_REPORT.LIST')} />
      <Header />
      <Filter pagination={pagination} filters={filters} handleSubmit={handleSubmit} />
      <CountsCard />
      <Table pagination={pagination} setPagination={setPagination} filters={filters} />

    </>
  );
};

export default DailyReportPage;
