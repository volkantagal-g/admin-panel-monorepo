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
import { Header, Filter, Table } from './components';
import { INIT_FILTERS } from './constants';

const reduxKey = REDUX_KEY.TIP_PAYBACK.SUMMARY_LIST;

const PayoutSummaryListPage = () => {
  const { t } = useTranslation(['global']);
  const dispatch = useDispatch();
  const [filters, setFilters] = useState(INIT_FILTERS);
  const [pagination, setPagination] = useState({
    currentPage: INIT_FILTERS.pageNo,
    rowsPerPage: INIT_FILTERS.pageSize,
  });
  usePageViewAnalytics({ name: ROUTE.TIP_PAYBACK_PAYOUT_SUMMARY_LIST.name, squad: ROUTE.TIP_PAYBACK_PAYOUT_SUMMARY_LIST.squad });

  useInjectReducer({ key: reduxKey, reducer });
  useInjectSaga({ key: reduxKey, saga });
  useInitAndDestroyPage({ dispatch, Creators });

  const handleSubmit = updatedFilters => {
    setFilters(updatedFilters);
    setPagination({ currentPage: updatedFilters.currentPage, rowsPerPage: updatedFilters.rowsPerPage });
  };

  return (
    <>
      <PageTitleHeader title={t('global:PAGE_TITLE.TIP_PAYBACK.PAYOUT_SUMMARY')} />
      <Header />
      <Filter pagination={pagination} filters={filters} handleSubmit={handleSubmit} />
      <Table pagination={pagination} setPagination={setPagination} filters={filters} />
    </>
  );
};

export default PayoutSummaryListPage;
