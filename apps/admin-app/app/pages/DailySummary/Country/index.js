import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { compose } from 'redux';
import { useTranslation } from 'react-i18next';
import moment from 'moment-timezone';

import injectSaga from '@shared/utils/injectSaga';
import injectReducer from '@shared/utils/injectReducer';
import { usePageViewAnalytics, usePermission } from '@shared/hooks';
import permKey from '@shared/shared/permKey.json';
import { ROUTE } from '@app/routes';
import {
  GETIR_DRIVE_DOMAIN_TYPE,
  GETIR_FOOD_DOMAIN_TYPE,
  GETIR_JOB_DOMAIN_TYPE,
  GETIR_LOCALS_DOMAIN_TYPE,
  GETIR_N11_DOMAIN_TYPE,
  GETIR_VOYAGER_DOMAIN_TYPE,
  GETIR_SELECT_DOMAIN_TYPE,
  GORILLAS_INTEGRATION_TYPE,
  REDUX_KEY,
} from '@shared/shared/constants';

import saga from './redux/saga';
import reducer from './redux/reducer';
import { Creators } from './redux/actions';
import {
  chartsSelector,
  chartViewStatusMapSelector,
  getActiveDomainTypesSet,
  getActiveIntegrationTypesSet,
} from './redux/selectors';
import { computedDateRangesSelector, getIsTableDataPendingSelector, lastSuccessfulDateRangesSelector } from '../commonRedux/selectors';
import Filter from './components/Filter';
import Charts from '../commonComponents/Charts';
import { getInitialDataFilters } from '../utils';
import { DynamicNestedTable } from '../commonComponents/DynamicNestedTable';
import {
  getCountsTableRowConfigs,
  getFinancialsTableRowConfigs,
  getGetirFoodTableRowConfigs,
  getGetirKuzeydenTableRowConfigs,
  getGetirLocalsTableRowConfigs,
  getGetirDriveTableRowConfigs,
  getGetirJobsTableRowConfigs,
  getGetirN11TableRowConfigs,
  getGetirSelectTableRowConfigs,
  getGorillasTableRowConfigs,
  getGetirMarketIntegrationTableRowConfigs,
} from './tableConfigs';
import { DATA_FILTERS, DS_COUNTRY_TABLES } from './constants';
import useFetchTableData from '@app/pages/DailySummary/hooks/useFetchTableData';
import { Creators as CommonCreators } from '@shared/redux/actions/common';
import { getSelectedCountryDivision, getSelectedCountryV2 } from '@shared/redux/selectors/countrySelection';
import PageTitleHeader from '@shared/components/UI/PageTitleHeader';

const reduxKey = REDUX_KEY.DAILY_SUMMARY.COUNTRY;

function DailySummaryCountry() {
  usePageViewAnalytics({
    name: ROUTE.DAILY_SUMMARY_COUNTRY.name,
    squad: ROUTE.DAILY_SUMMARY_COUNTRY.squad,
  });

  const { canAccess } = usePermission();
  const hasPermissionToViewAppOpenData = canAccess(permKey.PAGE_DAILY_SUMMARY_COUNTRY_COMPONENT_VIEW_PERMISSION_APP_OPEN);
  const hasPermissionToViewG10Data = canAccess(permKey.PAGE_DAILY_SUMMARY_COUNTRY_COMPONENT_VIEW_PERMISSION_G10);
  const hasPermissionToViewG30Data = canAccess(permKey.PAGE_DAILY_SUMMARY_COUNTRY_COMPONENT_VIEW_PERMISSION_G30);

  const dispatch = useDispatch();
  const { t } = useTranslation(['dailySummaryPage', 'global']);

  const chartViewStatusMap = useSelector(chartViewStatusMapSelector);
  const chartsData = useSelector(chartsSelector.getChartsData);
  const activeDomainTypesSet = useSelector(getActiveDomainTypesSet);
  const activeIntegrationTypesSet = useSelector(getActiveIntegrationTypesSet);
  const selectedDivision = getSelectedCountryDivision();
  const selectedCountry = useSelector(getSelectedCountryV2);
  const defaultSelectedDivisionCountries = useMemo(() => {
    if (selectedDivision) {
      return [selectedCountry._id];
    }
    return null;
  }, [selectedDivision, selectedCountry]);

  useEffect(() => {
    const initialDataFilters = getInitialDataFilters({ now: moment(), filterDataKeys: DATA_FILTERS });
    if (defaultSelectedDivisionCountries) {
      initialDataFilters.countries = defaultSelectedDivisionCountries;
    }
    dispatch(Creators.initPage({ initialDataFilters }));
    dispatch(Creators.getActiveDomainTypesConfigRequest({}));
    dispatch(Creators.getActiveIntegrationTypesConfigRequest({}));
    return () => {
      dispatch(Creators.destroyPage());
    };
  }, [dispatch, defaultSelectedDivisionCountries]);

  useEffect(() => {
    if (!selectedDivision) {
      dispatch(CommonCreators.getCitiesRequest({}));
    }
  }, [dispatch, selectedDivision]);

  const computedDateRanges = useSelector(state => computedDateRangesSelector(state, reduxKey));
  const lastSuccessfulDateRanges = useSelector(state => lastSuccessfulDateRangesSelector(state, reduxKey));
  const isTableLoading = useSelector(state => getIsTableDataPendingSelector(state, reduxKey, DS_COUNTRY_TABLES.countsTable));

  const countsTableRowConfigs = useMemo(() => getCountsTableRowConfigs({ t, hasPermissionToViewAppOpenData }), [t, hasPermissionToViewAppOpenData]);
  const financialsTableRowConfigs = useMemo(() => getFinancialsTableRowConfigs({
    t,
    computedDateRanges,
    lastSuccessfulDateRanges,
    hasPermissionToViewG10Data,
    hasPermissionToViewG30Data,
  }), [t, computedDateRanges, lastSuccessfulDateRanges, hasPermissionToViewG10Data, hasPermissionToViewG30Data]);
  const getirKuzeydenTableRowConfigs = useMemo(() => getGetirKuzeydenTableRowConfigs({ t }), [t]);
  const getirFoodTableRowConfigs = useMemo(() => getGetirFoodTableRowConfigs({ t, computedDateRanges }), [t, computedDateRanges]);
  const getirLocalsTableRowConfigs = useMemo(() => getGetirLocalsTableRowConfigs({ t, computedDateRanges }), [t, computedDateRanges]);
  const getirDriveTableRowConfigs = useMemo(() => getGetirDriveTableRowConfigs({ t }), [t]);
  const getirJobsTableRowConfigs = useMemo(() => getGetirJobsTableRowConfigs({ t }), [t]);
  const getirN11TableRowConfigs = useMemo(() => getGetirN11TableRowConfigs({ t }), [t]);
  const getirSelectTableRowConfigs = useMemo(() => getGetirSelectTableRowConfigs({ t }), [t]);
  const gorillasTableRowConfigs = useMemo(() => getGorillasTableRowConfigs({ t }), [t]);
  const getirMarketIntegrationTableRowConfigs = useMemo(() => getGetirMarketIntegrationTableRowConfigs({ t }), [t]);

  const countsTableData = useFetchTableData({
    tableKey: DS_COUNTRY_TABLES.countsTable,
    reducerKey: reduxKey,
    rowConfigs: countsTableRowConfigs,
    dataFetcherAction: Creators.getCountryDailySummaryDataRequest,
  });

  const financialTableData = useFetchTableData({
    tableKey: DS_COUNTRY_TABLES.financialsTable,
    reducerKey: reduxKey,
    rowConfigs: financialsTableRowConfigs,
    dataFetcherAction: Creators.getCountryDailySummaryDataRequest,
  });

  const kuzeydenTableData = useFetchTableData({
    tableKey: DS_COUNTRY_TABLES.getirKuzeyden,
    reducerKey: reduxKey,
    rowConfigs: getirKuzeydenTableRowConfigs,
    dataFetcherAction: Creators.getCountryDailySummaryDataRequest,
    permKey: permKey.PAGE_DAILY_SUMMARY_COUNTRY_COMPONENT_VIEW_PERMISSION_KUZEYDEN,
    isVisible: activeDomainTypesSet.has(GETIR_VOYAGER_DOMAIN_TYPE),
  });

  const getirFoodTableData = useFetchTableData({
    tableKey: DS_COUNTRY_TABLES.getirFood,
    reducerKey: reduxKey,
    rowConfigs: getirFoodTableRowConfigs,
    dataFetcherAction: Creators.getCountryDailySummaryDataRequest,
    permKey: permKey.PAGE_DAILY_SUMMARY_COUNTRY_COMPONENT_VIEW_PERMISSION_GETIR_FOOD,
    isVisible: activeDomainTypesSet.has(GETIR_FOOD_DOMAIN_TYPE),
  });

  const getirLocalsTableData = useFetchTableData({
    tableKey: DS_COUNTRY_TABLES.getirLocals,
    reducerKey: reduxKey,
    rowConfigs: getirLocalsTableRowConfigs,
    dataFetcherAction: Creators.getCountryDailySummaryDataRequest,
    permKey: permKey.PAGE_DAILY_SUMMARY_COUNTRY_COMPONENT_VIEW_PERMISSION_GETIR_LOCALS,
    isVisible: activeDomainTypesSet.has(GETIR_LOCALS_DOMAIN_TYPE),
  });

  const getirDriveTableData = useFetchTableData({
    tableKey: DS_COUNTRY_TABLES.getirDrive,
    reducerKey: reduxKey,
    rowConfigs: getirDriveTableRowConfigs,
    dataFetcherAction: Creators.getCountryDailySummaryDataRequest,
    permKey: permKey.PAGE_DAILY_SUMMARY_COUNTRY_COMPONENT_VIEW_PERMISSION_GETIR_DRIVE,
    isVisible: activeDomainTypesSet.has(GETIR_DRIVE_DOMAIN_TYPE),
  });

  const getirJobsTableData = useFetchTableData({
    tableKey: DS_COUNTRY_TABLES.getirJobs,
    reducerKey: reduxKey,
    rowConfigs: getirJobsTableRowConfigs,
    dataFetcherAction: Creators.getCountryDailySummaryDataRequest,
    permKey: permKey.PAGE_DAILY_SUMMARY_COUNTRY_COMPONENT_VIEW_PERMISSION_GETIR_JOBS,
    isVisible: activeDomainTypesSet.has(GETIR_JOB_DOMAIN_TYPE),
  });

  const getirN11TableData = useFetchTableData({
    tableKey: DS_COUNTRY_TABLES.getirN11,
    reducerKey: reduxKey,
    rowConfigs: getirN11TableRowConfigs,
    dataFetcherAction: Creators.getCountryDailySummaryDataRequest,
    permKey: permKey.PAGE_DAILY_SUMMARY_COUNTRY_COMPONENT_VIEW_PERMISSION_GETIR_N11,
    isVisible: activeDomainTypesSet.has(GETIR_N11_DOMAIN_TYPE),
  });

  const getirSelectTableData = useFetchTableData({
    tableKey: DS_COUNTRY_TABLES.getirSelect,
    reducerKey: reduxKey,
    rowConfigs: getirSelectTableRowConfigs,
    dataFetcherAction: Creators.getCountryDailySummaryDataRequest,
    permKey: permKey.PAGE_DAILY_SUMMARY_COUNTRY_COMPONENT_VIEW_PERMISSION_GETIR_SELECT,
    isVisible: activeDomainTypesSet.has(GETIR_SELECT_DOMAIN_TYPE),
  });

  const gorillasTableData = useFetchTableData({
    tableKey: DS_COUNTRY_TABLES.gorillas,
    reducerKey: reduxKey,
    rowConfigs: gorillasTableRowConfigs,
    dataFetcherAction: Creators.getCountryDailySummaryDataRequest,
    permKey: permKey.PAGE_DAILY_SUMMARY_COUNTRY_COMPONENT_VIEW_PERMISSION_GORILLAS,
    isVisible: activeIntegrationTypesSet.has(GORILLAS_INTEGRATION_TYPE),
  });

  const getirMarketIntegrationTableData = useFetchTableData({
    tableKey: DS_COUNTRY_TABLES.getirMarketIntegration,
    reducerKey: reduxKey,
    rowConfigs: getirMarketIntegrationTableRowConfigs,
    dataFetcherAction: Creators.getCountryDailySummaryDataRequest,
    permKey: permKey.PAGE_DAILY_SUMMARY_COUNTRY_COMPONENT_VIEW_PERMISSION_GETIR_MARKET_INTEGRATION,
  });

  return (
    <div>
      <PageTitleHeader title={t('PAGE_TITLE.DAILY_SUMMARY.COUNTRY')} />
      <Filter reducerKey={reduxKey} defaultSelectedDivisionCountries={defaultSelectedDivisionCountries} />
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

export default compose(withReducer, withSaga)(DailySummaryCountry);
