import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useMemo } from 'react';
import { compose } from 'redux';

import { useInitAndDestroyPage } from '@shared/hooks';
import injectReducer from '@shared/utils/injectReducer';
import injectSaga from '@shared/utils/injectSaga';
import { REDUX_KEY } from '@shared/shared/constants';
import { ROUTE } from '@app/routes';
import usePageViewAnalytics from '@shared/hooks/usePageViewAnalytics';
import PageTitleHeader from '@shared/components/UI/PageTitleHeader';

import { Creators } from './redux/actions';
import saga from './redux/saga';
import reducer from './redux/reducer';
import useFetchTableData from './useFetchTableData';
import { DS_GLOBAL_TABLES } from './constants';

import Filter from './components/Filter';
import NestedTable from './components/NestedTable';

import { getGetirMarketOrderNetRevenueGMVTableRowConfigs } from './tableConfigs';

const reduxKey = REDUX_KEY.DAILY_SUMMARY.FOUNDERS_CUSTOM;

const DailySummaryFoundersCustomPage = () => {
  const { t } = useTranslation(['dailySummaryFoundersCustomPage', 'global']);
  const dispatch = useDispatch();
  usePageViewAnalytics({ name: ROUTE.DAILY_SUMMARY_FOUNDERS_CUSTOM.name, squad: ROUTE.DAILY_SUMMARY_FOUNDERS_CUSTOM.squad });
  useInitAndDestroyPage({ dispatch, Creators });

  const getirMarketOrderNetRevenueGMVTableRowConfigs = useMemo(
    () => getGetirMarketOrderNetRevenueGMVTableRowConfigs({ t }),
    [t],
  );

  const getirMarketOrderNetRevenueGMVTableData = useFetchTableData({
    tableKey: DS_GLOBAL_TABLES.getirMarketOrderNetRevenueGMVTable,
    reducerKey: reduxKey,
    rowConfigs: getirMarketOrderNetRevenueGMVTableRowConfigs,
    dataFetcherAction: Creators.getGlobalDailySummaryDataRequest,
  });

  return (
    <>
      <PageTitleHeader title={t('global:PAGE_TITLE.DAILY_SUMMARY.FOUNDERS_CUSTOM')} />
      <Filter reducerKey={reduxKey} />
      <NestedTable
        reducerKey={reduxKey}
        isLoading={false}
        unformattedTableData={[
          getirMarketOrderNetRevenueGMVTableData,
        ]}
      />
    </>
  );
};

const withSaga = injectSaga({ key: reduxKey, saga });
const withReducer = injectReducer({ key: reduxKey, reducer });

export default compose(withReducer, withSaga)(DailySummaryFoundersCustomPage);
