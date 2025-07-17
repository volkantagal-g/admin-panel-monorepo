import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { compose } from 'redux';
import { useTranslation } from 'react-i18next';
import moment from 'moment-timezone';

import { REDUX_KEY } from '@shared/shared/constants';
import injectSaga from '@shared/utils/injectSaga';
import injectReducer from '@shared/utils/injectReducer';
import { Creators as CommonCreators } from '@shared/redux/actions/common';
import { usePageViewAnalytics, usePermission } from '@shared/hooks';
import permKey from '@shared/shared/permKey.json';
import { ROUTE } from '@app/routes';
import { chartsSelector, chartViewStatusMapSelector } from '@app/pages/DailySummary/Global/redux/selectors';

import saga from './redux/saga';
import reducer from './redux/reducer';
import { Creators } from './redux/actions';
import { computedDateRangesSelector, getIsTableDataPendingSelector, lastSuccessfulDateRangesSelector } from '../commonRedux/selectors';
import Filter from './components/Filter';
import Charts from '../commonComponents/Charts';
import { getInitialDataFilters } from '../utils';
import { DynamicNestedTable } from '../commonComponents/DynamicNestedTable';
import {
  getCountsTableRowConfigs,
  getGetirJobsTableRowConfigs,
  getFinancialsTableRowConfigs,
  getGetirN11TableRowConfigs,
  getGetirKuzeydenTableRowConfigs,
  getGetirFoodTableRowConfigs,
  getGetirLocalsTableRowConfigs,
  getGetirDriveTableRowConfigs,
  getGetirSelectTableRowConfigs,
  getGorillasTableRowConfigs,
  getGetirMarketIntegrationTableRowConfigs,
} from './tableConfigs';
import { DATA_FILTERS, DS_GLOBAL_TABLES } from './constants';
import useFetchTableData from '../hooks/useFetchTableData';
import PageTitleHeader from '@shared/components/UI/PageTitleHeader';

const reduxKey = REDUX_KEY.DAILY_SUMMARY.GLOBAL;

function DailySummaryGlobal() {
  usePageViewAnalytics({
    name: ROUTE.DAILY_SUMMARY_GLOBAL.name,
    squad: ROUTE.DAILY_SUMMARY_GLOBAL.squad,
  });

  const { canAccess } = usePermission();
  const hasPermissionToViewAppOpenData = canAccess(permKey.PAGE_DAILY_SUMMARY_GLOBAL_COMPONENT_VIEW_PERMISSION_APP_OPEN);
  const hasPermissionToViewG10Data = canAccess(permKey.PAGE_DAILY_SUMMARY_GLOBAL_COMPONENT_VIEW_PERMISSION_G10);
  const hasPermissionToViewG30Data = canAccess(permKey.PAGE_DAILY_SUMMARY_GLOBAL_COMPONENT_VIEW_PERMISSION_G30);

  const dispatch = useDispatch();
  const { t } = useTranslation(['dailySummaryPage', 'global']);

  const chartViewStatusMap = useSelector(chartViewStatusMapSelector);
  const chartsData = useSelector(chartsSelector.getChartsData);
  const isTableLoading = useSelector(state => getIsTableDataPendingSelector(state, reduxKey, DS_GLOBAL_TABLES.countsTable));
  const computedDateRanges = useSelector(state => computedDateRangesSelector(state, reduxKey));
  const lastSuccessfulDateRanges = useSelector(state => lastSuccessfulDateRangesSelector(state, reduxKey));

  useEffect(() => {
    const initialDataFilters = getInitialDataFilters({ now: moment(), filterDataKeys: DATA_FILTERS });
    dispatch(Creators.initPage({ initialDataFilters }));
    return () => {
      dispatch(Creators.destroyPage());
    };
  }, [dispatch]);

  useEffect(() => {
    dispatch(CommonCreators.getCountriesRequest());
    dispatch(CommonCreators.getCountryGroupsRequest());
  }, [dispatch]);

  const countsTableRowConfigs = useMemo(() => getCountsTableRowConfigs({ t, hasPermissionToViewAppOpenData }), [t, hasPermissionToViewAppOpenData]);
  const financialsTableRowConfigs = useMemo(() => getFinancialsTableRowConfigs({
    t,
    computedDateRanges,
    lastSuccessfulDateRanges,
    hasPermissionToViewG10Data,
    hasPermissionToViewG30Data,
  }), [t, computedDateRanges, lastSuccessfulDateRanges, hasPermissionToViewG10Data, hasPermissionToViewG30Data]);
  const getirJobsTableRowConfigs = useMemo(() => getGetirJobsTableRowConfigs({ t }), [t]);
  const getirN11TableRowConfigs = useMemo(() => getGetirN11TableRowConfigs({ t }), [t]);
  const getirKuzeydenTableRowConfigs = useMemo(() => getGetirKuzeydenTableRowConfigs({ t }), [t]);
  const getirFoodTableRowConfigs = useMemo(() => getGetirFoodTableRowConfigs({ t, computedDateRanges }), [t, computedDateRanges]);
  const getirLocalsTableRowConfigs = useMemo(() => getGetirLocalsTableRowConfigs({ t, computedDateRanges }), [t, computedDateRanges]);
  const getirDriveTableRowConfigs = useMemo(() => getGetirDriveTableRowConfigs({ t }), [t]);
  const getirSelectTableRowConfigs = useMemo(() => getGetirSelectTableRowConfigs({ t }), [t]);
  const gorillasTableRowConfigs = useMemo(() => getGorillasTableRowConfigs({ t }), [t]);
  const getirMarketIntegrationTableRowConfigs = useMemo(() => getGetirMarketIntegrationTableRowConfigs({ t }), [t]);

  const countsTableData = useFetchTableData({
    tableKey: DS_GLOBAL_TABLES.countsTable,
    reducerKey: reduxKey,
    rowConfigs: countsTableRowConfigs,
    dataFetcherAction: Creators.getGlobalDailySummaryDataRequest,
  });

  const financialTableData = useFetchTableData({
    tableKey: DS_GLOBAL_TABLES.financialsTable,
    reducerKey: reduxKey,
    rowConfigs: financialsTableRowConfigs,
    dataFetcherAction: Creators.getGlobalDailySummaryDataRequest,
  });

  const kuzeydenTableData = useFetchTableData({
    tableKey: DS_GLOBAL_TABLES.getirKuzeyden,
    reducerKey: reduxKey,
    rowConfigs: getirKuzeydenTableRowConfigs,
    dataFetcherAction: Creators.getGlobalDailySummaryDataRequest,
    permKey: permKey.PAGE_DAILY_SUMMARY_GLOBAL_COMPONENT_VIEW_PERMISSION_KUZEYDEN,
  });

  const getirFoodTableData = useFetchTableData({
    tableKey: DS_GLOBAL_TABLES.getirFood,
    reducerKey: reduxKey,
    rowConfigs: getirFoodTableRowConfigs,
    dataFetcherAction: Creators.getGlobalDailySummaryDataRequest,
    permKey: permKey.PAGE_DAILY_SUMMARY_GLOBAL_COMPONENT_VIEW_PERMISSION_GETIR_FOOD,
  });

  const getirLocalsTableData = useFetchTableData({
    tableKey: DS_GLOBAL_TABLES.getirLocals,
    reducerKey: reduxKey,
    rowConfigs: getirLocalsTableRowConfigs,
    dataFetcherAction: Creators.getGlobalDailySummaryDataRequest,
    permKey: permKey.PAGE_DAILY_SUMMARY_GLOBAL_COMPONENT_VIEW_PERMISSION_GETIR_LOCALS,
  });

  const getirDriveTableData = useFetchTableData({
    tableKey: DS_GLOBAL_TABLES.getirDrive,
    reducerKey: reduxKey,
    rowConfigs: getirDriveTableRowConfigs,
    dataFetcherAction: Creators.getGlobalDailySummaryDataRequest,
    permKey: permKey.PAGE_DAILY_SUMMARY_GLOBAL_COMPONENT_VIEW_PERMISSION_GETIR_DRIVE,
  });

  const getirJobsTableData = useFetchTableData({
    tableKey: DS_GLOBAL_TABLES.getirJobs,
    reducerKey: reduxKey,
    rowConfigs: getirJobsTableRowConfigs,
    dataFetcherAction: Creators.getGlobalDailySummaryDataRequest,
    permKey: permKey.PAGE_DAILY_SUMMARY_GLOBAL_COMPONENT_VIEW_PERMISSION_GETIR_JOBS,
  });

  const getirN11TableData = useFetchTableData({
    tableKey: DS_GLOBAL_TABLES.getirN11,
    reducerKey: reduxKey,
    rowConfigs: getirN11TableRowConfigs,
    dataFetcherAction: Creators.getGlobalDailySummaryDataRequest,
    permKey: permKey.PAGE_DAILY_SUMMARY_GLOBAL_COMPONENT_VIEW_PERMISSION_GETIR_N11,
  });

  const getirSelectTableData = useFetchTableData({
    tableKey: DS_GLOBAL_TABLES.getirSelect,
    reducerKey: reduxKey,
    rowConfigs: getirSelectTableRowConfigs,
    dataFetcherAction: Creators.getGlobalDailySummaryDataRequest,
    permKey: permKey.PAGE_DAILY_SUMMARY_GLOBAL_COMPONENT_VIEW_PERMISSION_GETIR_SELECT,
  });

  const gorillasTableData = useFetchTableData({
    tableKey: DS_GLOBAL_TABLES.gorillas,
    reducerKey: reduxKey,
    rowConfigs: gorillasTableRowConfigs,
    dataFetcherAction: Creators.getGlobalDailySummaryDataRequest,
    permKey: permKey.PAGE_DAILY_SUMMARY_GLOBAL_COMPONENT_VIEW_PERMISSION_GORILLAS,
  });

  const getirMarketIntegrationTableData = useFetchTableData({
    tableKey: DS_GLOBAL_TABLES.getirMarketIntegration,
    reducerKey: reduxKey,
    rowConfigs: getirMarketIntegrationTableRowConfigs,
    dataFetcherAction: Creators.getGlobalDailySummaryDataRequest,
    permKey: permKey.PAGE_DAILY_SUMMARY_GLOBAL_COMPONENT_VIEW_PERMISSION_GETIR_MARKET_INTEGRATION,
  });

  return (
    <div>
      <PageTitleHeader title={t('PAGE_TITLE.DAILY_SUMMARY.GLOBAL')} />
      <Filter reducerKey={reduxKey} />
      <DynamicNestedTable
        reducerKey={reduxKey}
        isLoading={isTableLoading}
        unformattedTableData={[
          countsTableData,
          financialTableData,
          kuzeydenTableData,
          getirFoodTableData,
          getirLocalsTableData,
          getirDriveTableData,
          getirJobsTableData,
          getirN11TableData,
          getirSelectTableData,
          gorillasTableData,
          getirMarketIntegrationTableData,
        ]}
        chartViewStatusMap={chartViewStatusMap}
        chartViewStatusSetterAction={Creators.setChartViewStatus}
      />
      <Charts
        reducerKey={reduxKey}
        chartViewStatusMap={chartViewStatusMap}
        data={chartsData}
      />
    </div>
  );
}

const withSaga = injectSaga({ key: reduxKey, saga });
const withReducer = injectReducer({ key: reduxKey, reducer });

export default compose(withReducer, withSaga)(DailySummaryGlobal);
