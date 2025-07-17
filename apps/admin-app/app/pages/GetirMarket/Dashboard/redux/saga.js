import { all, call, cancel, fork, put, take, takeLatest, takeEvery, select } from 'redux-saga/effects';

import { t } from '@shared/i18n';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { Types, Creators } from './actions';

import {
  getNPSStats,
  getDeviceStats,
  getProductAvailability,
  getProductSale,
  getOrderCardGroupDistribution,
  getDiscountReasons,
  getFinancials,
  getOrderCountByBasketAmount,
  getWarehouseStats,
  getWarehouseStatsV2,
  getClientRatings,
  getClientOrderCounts,
  getOrderTimeSeries,
  getOperationTimeSeries,
  getDurations,
  getBiTaksiSummaryStats,
  getGetirWaterMarketplaceSummaryStats,
  getClientDownloadSignupStats,
  getNPSConfig,
} from '@shared/api/getirMarketDashboard';
import { getOrderPromoDistributionBetweenDates } from '@shared/api/dailyTracking';
import { getExternalSourcesSummary } from '@shared/api/getirDriveDashboard';
import { formatOrderCountByBasketAmountData } from '../components/Tables/BasketDistribution/utils';
import { formatClientRatingData } from '../components/Tables/ClientRating/utils';
import { getDomainSummary } from '@shared/api/getirLocalsDashboard';
import { filtersSelector, warehouseStatsV2Selector } from './selectors';
import {
  availableDomainTypesForCountrySelector,
  getCitiesSelector,
  getDivisionsCitiesSelector,
  getFilteredWarehousesForDivisionSelector,
  getSelectedCountryTimezone,
} from '@shared/redux/selectors/common';
import { removeEmptyFieldsFromParams } from '@shared/utils/request';
import Excel from '@shared/utils/excel';
import { getFormattedData, WAREHOUSE_TABLE_COLUMNS, getWarehouseExportData } from '../components/Tables/WarehouseTable/utils';
import { getHours, getIsoDateString } from '../utils';
import { toFakeLocalTime } from '@shared/utils/dateHelper';
import { getSelectedCountryV2, getSelectedCountryDivision } from '@shared/redux/selectors/countrySelection';
import {
  DATE_TYPE_STRING,
  GETIR_BITAKSI_DOMAIN_TYPE,
  GETIR_DRIVE_DOMAIN_TYPE,
  GETIR_LOCALS_DOMAIN_TYPE,
  GETIR_WATER_MARKETPLACE_DOMAIN_TYPE,
  INTEGRATION_TYPES,
} from '@shared/shared/constants';
import { CLIENT_ORDER_COUNTS_GROUPS } from '../constants';
import { ORDER_GROWTH_SUMMARY_DOMAIN_TYPES } from '../components/Tables/OrderGrowthSummary/constants';

function* getFilterParams({ shouldReturnFakeLocalDate = false } = {}) {
  const selectedDateRange = yield select(filtersSelector.getSelectedDateRange);
  const { startDate, endDate } = selectedDateRange;
  const domainTypes = yield select(filtersSelector.getSelectedDomainType);
  const selectedHourRange = yield select(filtersSelector.getSelectedHourRange);
  const [minHour, maxHour] = selectedHourRange;
  const selectedCountryTimezone = yield select(getSelectedCountryTimezone.getData);
  const selectedCities = yield select(filtersSelector.getSelectedCities);
  const dateType = yield select(filtersSelector.getDateType);
  const dateTypeString = DATE_TYPE_STRING[dateType];

  return removeEmptyFieldsFromParams({
    startDate: shouldReturnFakeLocalDate ? getIsoDateString(toFakeLocalTime(startDate)) : getIsoDateString(startDate),
    endDate: shouldReturnFakeLocalDate ? getIsoDateString(toFakeLocalTime(endDate)) : getIsoDateString(endDate),
    hours: getHours(minHour, maxHour, selectedCountryTimezone),
    domainTypes: [domainTypes],
    cities: selectedCities,
    selectedCountryTimezone,
    dateType,
    dateTypeString,
  });
}

function* getOrderCountByBasketAmountRequest() {
  try {
    const selectedCountry = yield select(getSelectedCountryV2);
    const filterParams = yield call(getFilterParams, {});

    const params = {
      hours: filterParams.hours,
      domain_types: filterParams.domainTypes,
      cities: filterParams.cities,
      start_date: filterParams.startDate,
      end_date: filterParams.endDate,
    };
    const { basket_stats: basketStats } = yield call(getOrderCountByBasketAmount, params);

    yield put(
      Creators.getOrderCountByBasketAmountSuccess({
        data: formatOrderCountByBasketAmountData({
          data: basketStats,
          country: selectedCountry,
        }),
      }),
    );
  }
  catch (error) {
    yield put(Creators.getOrderCountByBasketAmountFailure({ error }));
    yield put(ToastCreators.error({
      message: t(
        'getirMarketDashboardPage:ERROR_TABLE_DATA_NOT_FETCHED',
        { tableName: t('getirMarketDashboardPage:BASKET_DISTRIBUTION') },
      ),
    }));
  }
}

function* getClientOrderCountsRequest() {
  try {
    const filterParams = yield call(getFilterParams, {});

    const params = {
      startDate: filterParams.startDate,
      endDate: filterParams.endDate,
      hours: filterParams.hours,
      domainTypes: filterParams.domainTypes,
      cities: filterParams.cities,
      rankGroups: CLIENT_ORDER_COUNTS_GROUPS,
      integrationTypes: [INTEGRATION_TYPES.GETIR],
    };
    const data = yield call(getClientOrderCounts, params);
    yield put(Creators.getClientOrderCountsSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getClientOrderCountsFailure({ error }));
    yield put(ToastCreators.error({
      message: t(
        'getirMarketDashboardPage:ERROR_TABLE_DATA_NOT_FETCHED',
        { tableName: t('getirMarketDashboardPage:CLIENT_ORDERS') },
      ),
    }));
  }
}

function* getFinancialsRequest() {
  try {
    const filterParams = yield call(getFilterParams, {});

    const params = {
      start_date: filterParams.startDate,
      end_date: filterParams.endDate,
      hours: filterParams.hours,
      domain_types: filterParams.domainTypes,
      cities: filterParams.cities,
    };

    const data = yield call(getFinancials, params);
    yield put(Creators.getFinancialsSuccess({ data: data?.financial_stats?.[params.domain_types[0]] }));
  }
  catch (error) {
    yield put(Creators.getFinancialsFailure({ error }));
    yield put(ToastCreators.error({
      message: t(
        'getirMarketDashboardPage:ERROR_TABLE_DATA_NOT_FETCHED',
        { tableName: t('global:FINANCIALS') },
      ),
    }));
  }
}

function* getProductAvailabilityRequest() {
  try {
    const filterParams = yield call(getFilterParams, { shouldReturnFakeLocalDate: true });

    const params = {
      start_date: filterParams.startDate,
      end_date: filterParams.endDate,
      hours: filterParams.hours,
      domain_types: filterParams.domainTypes,
      cities: filterParams.cities,
    };

    const result = yield call(getProductAvailability, params);
    yield put(Creators.getProductAvailabilitySuccess({ data: result.product_availability }));
  }
  catch (error) {
    yield put(Creators.getProductAvailabilityFailure({ error }));
    yield put(ToastCreators.error({ message: t('getirMarketDashboardPage:ERROR_PRODUCT_AVAILABILITY_DATA_NOT_FETCHED') }));
  }
}

function* getProductSaleRequest() {
  try {
    const filterParams = yield call(getFilterParams, { shouldReturnFakeLocalDate: true });

    const params = {
      start_date: filterParams.startDate,
      end_date: filterParams.endDate,
      domain_types: filterParams.domainTypes,
      cities: filterParams.cities,
    };

    const result = yield call(getProductSale, params);
    yield put(Creators.getProductSaleSuccess({ data: result.itemFinancialStats }));
  }
  catch (error) {
    yield put(Creators.getProductSaleFailure({ error }));
    yield put(ToastCreators.error({ message: t('getirMarketDashboardPage:ERROR_PRODUCT_SALE_DATA_NOT_FETCHED') }));
  }
}

function* getDeviceStatsRequest() {
  try {
    const filterParams = yield call(getFilterParams, {});

    const params = {
      startDate: filterParams.startDate,
      endDate: filterParams.endDate,
      hours: filterParams.hours,
      domainTypes: filterParams.domainTypes,
      cities: filterParams.cities,
    };
    const { deviceStats } = yield call(getDeviceStats, params);
    yield put(Creators.getDeviceStatsSuccess({ data: deviceStats }));
  }
  catch (error) {
    yield put(Creators.getDeviceStatsFailure({ error }));
    yield put(ToastCreators.error({
      message: t(
        'getirMarketDashboardPage:ERROR_TABLE_DATA_NOT_FETCHED',
        { tableName: t('getirMarketDashboardPage:ORDER_CHANNEL') },
      ),
    }));
  }
}

function* getOrderCardGroupDistributionRequest() {
  try {
    const filterParams = yield call(getFilterParams, {});

    const params = {
      start_date: filterParams.startDate,
      end_date: filterParams.endDate,
      hours: filterParams.hours,
      domain_types: filterParams.domainTypes,
      cities: filterParams.cities,
    };

    const { card_stats: cardStats } = yield call(getOrderCardGroupDistribution, params);
    yield put(Creators.getOrderCardGroupDistributionSuccess({ data: cardStats }));
  }
  catch (error) {
    yield put(Creators.getOrderCardGroupDistributionFailure({ error }));
    yield put(ToastCreators.error({
      message: t(
        'getirMarketDashboardPage:ERROR_TABLE_DATA_NOT_FETCHED',
        { tableName: t('getirMarketDashboardPage:CARD_GROUPS') },
      ),
    }));
  }
}

function* getDiscountReasonsRequest() {
  try {
    const filterParams = yield call(getFilterParams, {});

    const params = {
      startDate: filterParams.startDate,
      endDate: filterParams.endDate,
      hours: filterParams.hours,
      domainTypes: filterParams.domainTypes,
      cities: filterParams.cities,
    };

    const { deliveryStats } = yield call(getDiscountReasons, params);
    yield put(Creators.getDiscountReasonsSuccess({ data: deliveryStats }));
  }
  catch (error) {
    yield put(Creators.getDiscountReasonsFailure({ error }));
    yield put(ToastCreators.error({
      message: t(
        'getirMarketDashboardPage:ERROR_TABLE_DATA_NOT_FETCHED',
        { tableName: t('getirMarketDashboardPage:DELIVERY_FEE_DISCOUNT_REASON') },
      ),
    }));
  }
}

function* getWarehouseStatsRequest({ data, statsType }) {
  try {
    const filterParams = yield call(getFilterParams, {});
    const params = {
      ...data,
      hours: filterParams.hours,
      cities: filterParams.cities,
    };

    const { warehouse_order_stats: warehouseOrderStats } = yield call(getWarehouseStats, params);
    yield put(Creators.getWarehouseStatsSuccess({ data: warehouseOrderStats, statsType }));
  }
  catch (error) {
    yield put(Creators.getWarehouseStatsFailure({ error, statsType }));
    yield put(ToastCreators.error({
      message: t(
        'getirMarketDashboardPage:ERROR_DOMAIN_SUMMARY_DATA_FOR_X_NOT_FETCHED',
        {
          domainName: t('global:GETIR_FOOD'),
          statsType: t(`getirMarketDashboardPage:CONSTANTS_VALUE.STATS_TYPE.WAREHOUSE_STATS_TYPES.${statsType}`),
        },
      ),
    }));
  }
}

function* getWarehouseStatsV2Request({ data, statsType }) {
  try {
    const { warehouseStats } = yield call(getWarehouseStatsV2, data);
    yield put(Creators.getWarehouseStatsV2Success({ data: warehouseStats, statsType }));
  }
  catch (error) {
    yield put(Creators.getWarehouseStatsV2Failure({ error, statsType }));
    yield put(ToastCreators.error({
      message: t(
        'getirMarketDashboardPage:ERROR_DOMAIN_SUMMARY_DATA_FOR_MARKET_NOT_FETCHED',
        { statsType: t(`getirMarketDashboardPage:CONSTANTS_VALUE.STATS_TYPE.WAREHOUSE_STATS_TYPES.${statsType}`) },
      ),
    }));
  }
}

function* getBiTaksiStatsRequest({ data, statsType }) {
  try {
    const availableDomainsForCountry = yield select(state => availableDomainTypesForCountrySelector.getDomainTypes(state, ORDER_GROWTH_SUMMARY_DOMAIN_TYPES));
    let biTaksiStats = {};
    if (availableDomainsForCountry.includes(GETIR_BITAKSI_DOMAIN_TYPE)) {
      const filterParams = yield call(getFilterParams, {});

      const params = {
        ...data,
        hours: filterParams.hours,
        domain_types: filterParams.domainTypes,
        cities: filterParams.cities,
      };

      const { stats } = yield call(getBiTaksiSummaryStats, params);
      biTaksiStats = stats;
    }
    yield put(Creators.getBiTaksiStatsSuccess({ data: biTaksiStats, statsType }));
  }
  catch (error) {
    yield put(Creators.getBiTaksiStatsFailure({ error, statsType }));
    yield put(ToastCreators.error({
      message: t(
        'getirMarketDashboardPage:ERROR_DOMAIN_SUMMARY_DATA_FOR_X_NOT_FETCHED',
        {
          domainName: t(`global:GETIR_MARKET_DOMAIN_TYPES.${GETIR_BITAKSI_DOMAIN_TYPE}`),
          statsType: t(`getirMarketDashboardPage:CONSTANTS_VALUE.STATS_TYPE.WAREHOUSE_STATS_TYPES.${statsType}`),
        },
      ),
    }));
  }
}

function* getWaterMarketplaceStatsRequest({ data, statsType }) {
  try {
    const availableDomainsForCountry = yield select(state => availableDomainTypesForCountrySelector.getDomainTypes(state, ORDER_GROWTH_SUMMARY_DOMAIN_TYPES));
    let waterMarketplaceStats = {};
    if (availableDomainsForCountry.includes(GETIR_WATER_MARKETPLACE_DOMAIN_TYPE)) {
      const filterParams = yield call(getFilterParams, {});

      const params = {
        ...data,
        hours: filterParams.hours,
        domain_types: filterParams.domainTypes,
        cities: filterParams.cities,
      };

      const { stats } = yield call(getGetirWaterMarketplaceSummaryStats, params);
      waterMarketplaceStats = stats;
    }
    yield put(Creators.getWaterMarketplaceStatsSuccess({ data: waterMarketplaceStats, statsType }));
  }
  catch (error) {
    yield put(Creators.getWaterMarketplaceStatsFailure({ error, statsType }));
    yield put(ToastCreators.error({
      message: t(
        'getirMarketDashboardPage:ERROR_DOMAIN_SUMMARY_DATA_FOR_X_NOT_FETCHED',
        {
          domainName: t(`global:GETIR_MARKET_DOMAIN_TYPES.${GETIR_WATER_MARKETPLACE_DOMAIN_TYPE}`),
          statsType: t(`getirMarketDashboardPage:CONSTANTS_VALUE.STATS_TYPE.WAREHOUSE_STATS_TYPES.${statsType}`),
        },
      ),
    }));
  }
}

function* getMoovStatsRequest({ data, statsType }) {
  try {
    const availableDomainsForCountry = yield select(state => availableDomainTypesForCountrySelector.getDomainTypes(state, ORDER_GROWTH_SUMMARY_DOMAIN_TYPES));
    let moovStats = {};

    if (availableDomainsForCountry.includes(GETIR_DRIVE_DOMAIN_TYPE)) {
      const filterParams = yield call(getFilterParams, {});

      const params = {
        ...data,
        hours: filterParams.hours,
        cities: filterParams.cities,
      };

      moovStats = yield call(getExternalSourcesSummary, params);
    }
    yield put(Creators.getMoovStatsSuccess({ data: moovStats, statsType }));
  }
  catch (error) {
    yield put(Creators.getMoovStatsFailure({ error, statsType }));
    yield put(ToastCreators.error({
      message: t(
        'getirMarketDashboardPage:ERROR_DOMAIN_SUMMARY_DATA_FOR_X_NOT_FETCHED',
        {
          domainName: t(`global:GETIR_MARKET_DOMAIN_TYPES.${GETIR_DRIVE_DOMAIN_TYPE}`),
          statsType: t(`getirMarketDashboardPage:CONSTANTS_VALUE.STATS_TYPE.WAREHOUSE_STATS_TYPES.${statsType}`),
        },
      ),
    }));
  }
}

function* getOrderPromoDistributionBetweenDatesRequest() {
  try {
    const filterParams = yield call(getFilterParams, {});

    const params = {
      startDate: filterParams.startDate,
      endDate: filterParams.endDate,
      hours: filterParams.hours,
      domainTypes: filterParams.domainTypes,
      cities: filterParams.cities,
    };

    const result = yield call(getOrderPromoDistributionBetweenDates, params);
    yield put(Creators.getOrderPromoDistributionBetweenDatesSuccess({ data: result }));
  }
  catch (error) {
    yield put(Creators.getOrderPromoDistributionBetweenDatesFailure({ error }));
    yield put(ToastCreators.error({
      message: t(
        'getirMarketDashboardPage:ERROR_TABLE_DATA_NOT_FETCHED',
        { tableName: t('global:PROMOS') },
      ),
    }));
  }
}

function* getClientRatingsRequest() {
  try {
    const filterParams = yield call(getFilterParams, {});

    const params = {
      startDate: filterParams.startDate,
      endDate: filterParams.endDate,
      hours: filterParams.hours,
      domainTypes: filterParams.domainTypes,
      cities: filterParams.cities,
    };

    const { rate_stats: rateStats } = yield call(getClientRatings, params);
    const formattedStats = formatClientRatingData({ data: rateStats, selectedDomainType: params.domainTypes[0] });
    yield put(Creators.getClientRatingsSuccess({ data: formattedStats }));
  }
  catch (error) {
    yield put(Creators.getClientRatingsFailure({ error }));
    yield put(ToastCreators.error({
      message: t(
        'getirMarketDashboardPage:ERROR_TABLE_DATA_NOT_FETCHED',
        { tableName: t('getirMarketDashboardPage:CLIENT_RATINGS') },
      ),
    }));
  }
}

function* getOrderTimeSeriesRequest() {
  try {
    const filterParams = yield call(getFilterParams, {});

    const params = {
      startDate: filterParams.startDate,
      endDate: filterParams.endDate,
      hours: filterParams.hours,
      domainTypes: filterParams.domainTypes,
      cities: filterParams.cities,
      intervalValue: filterParams.dateTypeString,
      timezone: filterParams.selectedCountryTimezone,
    };

    const orderStats = yield call(getOrderTimeSeries, params);
    yield put(Creators.getOrderTimeSeriesSuccess({ data: orderStats }));
  }
  catch (error) {
    yield put(Creators.getOrderTimeSeriesFailure({ error }));
    yield put(ToastCreators.error({
      message: t(
        'getirMarketDashboardPage:ERROR_DOMAIN_GRAPH_DATA_NOT_FETCHED',
        { graphName: t('global:ORDER') },
      ),
    }));
  }
}

function* getOperationTimeSeriesRequest() {
  try {
    const filterParams = yield call(getFilterParams, {});

    const params = {
      startDate: filterParams.startDate,
      endDate: filterParams.endDate,
      hours: filterParams.hours,
      cities: filterParams.cities,
      intervalValue: filterParams.dateTypeString,
      timezone: filterParams.selectedCountryTimezone,
    };

    const { operationalStats } = yield call(getOperationTimeSeries, params);

    yield put(Creators.getOperationTimeSeriesSuccess({ data: operationalStats }));
  }
  catch (error) {
    yield put(Creators.getOperationTimeSeriesFailure({ error }));
    const graphNames = (
      `${t('global:UTILIZATION')}, ${t('getirMarketDashboardPage:THROUGHPUT')}, ${t('global:AND')} ${t('getirMarketDashboardPage:FINANCIAL_THROUGHPUT')}`
    );
    yield put(ToastCreators.error({
      message: t(
        'getirMarketDashboardPage:ERROR_DOMAIN_GRAPHS_DATA_NOT_FETCHED',
        { graphNames },
      ),
    }));
  }
}

function* getDurationsRequest() {
  try {
    const filterParams = yield call(getFilterParams, {});

    const params = {
      startDate: filterParams.startDate,
      endDate: filterParams.endDate,
      hours: filterParams.hours,
      domainTypes: filterParams.domainTypes,
      cities: filterParams.cities,
    };

    const { orderStats } = yield call(getDurations, params);
    yield put(Creators.getDurationsSuccess({ data: orderStats }));
  }
  catch (error) {
    yield put(Creators.getDurationsFailure({ error }));
    yield put(ToastCreators.error({
      message: t(
        'getirMarketDashboardPage:ERROR_TABLE_DATA_NOT_FETCHED',
        { tableName: t('getirMarketDashboardPage:DELIVERY_DURATION_TABLE.NAME') },
      ),
    }));
  }
}

function* getDashboardComparisonStatsRequest({ data }) {
  try {
    const comparisonStats = yield call(getClientDownloadSignupStats, data);
    yield put(Creators.getDashboardComparisonStatsSuccess({ data: comparisonStats }));
  }
  catch (error) {
    yield put(Creators.getDashboardComparisonStatsFailure({ error }));
    yield put(ToastCreators.error({
      message: t(
        'getirMarketDashboardPage:ERROR_TABLE_DATA_NOT_FETCHED',
        { tableName: t('getirMarketDashboardPage:NEW_CLIENTS') },
      ),
    }));
  }
}

function* getDomainSummaryForLocalsRequest({ data, statsType }) {
  try {
    const availableDomainsForCountry = yield select(state => availableDomainTypesForCountrySelector.getDomainTypes(state, ORDER_GROWTH_SUMMARY_DOMAIN_TYPES));
    let localsSummary = {};

    if (availableDomainsForCountry.includes(GETIR_LOCALS_DOMAIN_TYPE)) {
      const filterParams = yield call(getFilterParams, {});
      const params = {
        ...data,
        hours: filterParams.hours,
        cities: filterParams.cities,
      };
      const { summary } = yield call(getDomainSummary, { ...data, ...params });
      localsSummary = summary;
    }
    yield put(Creators.getDomainSummaryForLocalsSuccess({ data: localsSummary, statsType }));
  }
  catch (error) {
    yield put(Creators.getDomainSummaryForLocalsFailure({ error, statsType }));
    yield put(ToastCreators.error({
      message: t(
        'getirMarketDashboardPage:ERROR_DOMAIN_SUMMARY_DATA_FOR_X_NOT_FETCHED',
        {
          domainName: t(`global:GETIR_MARKET_DOMAIN_TYPES.${GETIR_LOCALS_DOMAIN_TYPE}`),
          statsType: t(`getirMarketDashboardPage:CONSTANTS_VALUE.STATS_TYPE.WAREHOUSE_STATS_TYPES.${statsType}`),
        },
      ),
    }));
  }
}

function* getNPSStatsRequest({ payload }) {
  try {
    const data = yield call(getNPSStats, { ...payload });

    yield put(Creators.getNPSStatsSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getNPSStatsFailure({}));
    yield put(ToastCreators.error({ message: t('getirMarketDashboardPage:NPS_FAILED') }));
  }
}

function* getNPSConfigRequest() {
  try {
    const data = yield call(getNPSConfig);
    yield put(Creators.getNPSConfigSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getNPSConfigFailure({}));
  }
}

function* exportWarehouseTableRequest() {
  try {
    const hasSelectedCountryGotADivision = yield select(getSelectedCountryDivision);
    const warehouseStatsData = yield select(warehouseStatsV2Selector.getData);
    const warehouses = yield select(getFilteredWarehousesForDivisionSelector.getData);
    const divisionsCities = yield select(getDivisionsCitiesSelector.getData);
    const cities = yield select(getCitiesSelector.getOperationalCities);
    const selectedDomainType = yield select(filtersSelector.getSelectedDomainType);
    const selectedCities = yield select(filtersSelector.getSelectedCities);

    const formattedData = getFormattedData({
      data: warehouseStatsData?.current,
      warehouses,
      cities: hasSelectedCountryGotADivision ? divisionsCities : cities,
      selectedDomainType,
      selectedCities,
    });

    const dataToExport = getWarehouseExportData(formattedData);

    new Excel({
      name: 'WarehouseTable',
      data: dataToExport,
      fields: WAREHOUSE_TABLE_COLUMNS(t),
    }).export();
  }
  catch (error) {
    yield put(ToastCreators.error({ message: t('getirMarketDashboardPage:ERROR_EXPORTING_TABLE') }));
  }
}

function* watchExportWarehouseTableRequest() {
  yield takeLatest(Types.EXPORT_WAREHOUSE_TABLE_REQUEST, exportWarehouseTableRequest);
}

function* watchNPSConfigRequest() {
  yield takeLatest(Types.GET_NPS_CONFIG_REQUEST, getNPSConfigRequest);
}

function* watchOrderCountByBasketAmountRequest() {
  yield takeLatest(Types.GET_ORDER_COUNT_BY_BASKET_AMOUNT_REQUEST, getOrderCountByBasketAmountRequest);
}

function* watchClientOrderCountsRequest() {
  yield takeLatest(Types.GET_CLIENT_ORDER_COUNTS_REQUEST, getClientOrderCountsRequest);
}

function* watchFinancialsRequest() {
  yield takeLatest(Types.GET_FINANCIALS_REQUEST, getFinancialsRequest);
}

function* watchProductAvailabilityRequest() {
  yield takeLatest(Types.GET_PRODUCT_AVAILABILITY_REQUEST, getProductAvailabilityRequest);
}

function* watchProductSaleRequest() {
  yield takeLatest(Types.GET_PRODUCT_SALE_REQUEST, getProductSaleRequest);
}

function* watchDeviceStatsRequest() {
  yield takeLatest(Types.GET_DEVICE_STATS_REQUEST, getDeviceStatsRequest);
}

function* watchOrderCardGroupDistributionRequest() {
  yield takeLatest(Types.GET_ORDER_CARD_GROUP_DISTRIBUTION_REQUEST, getOrderCardGroupDistributionRequest);
}

function* watchDiscountReasonsRequest() {
  yield takeLatest(Types.GET_DISCOUNT_REASONS_REQUEST, getDiscountReasonsRequest);
}

function* watchGetOrderPromoDistributionBetweenDatesRequest() {
  yield takeLatest(Types.GET_ORDER_PROMO_DISTRIBUTION_BETWEEN_DATES_REQUEST, getOrderPromoDistributionBetweenDatesRequest);
}

function* watchGetClientRatingsRequest() {
  yield takeLatest(Types.GET_CLIENT_RATINGS_REQUEST, getClientRatingsRequest);
}

function* watchGetDurationsRequest() {
  yield takeLatest(Types.GET_DURATIONS_REQUEST, getDurationsRequest);
}

function* watchGetDashboardComparisoStatsRequest() {
  yield takeLatest(Types.GET_DASHBOARD_COMPARISON_STATS_REQUEST, getDashboardComparisonStatsRequest);
}

function* watchGetWarehouseStatsRequest() {
  yield takeEvery(Types.GET_WAREHOUSE_STATS_REQUEST, getWarehouseStatsRequest);
}

function* watchGetWarehouseStatsV2Request() {
  yield takeEvery(Types.GET_WAREHOUSE_STATS_V2_REQUEST, getWarehouseStatsV2Request);
}

function* watchGetBiTaksiStatsRequest() {
  yield takeEvery(Types.GET_BI_TAKSI_STATS_REQUEST, getBiTaksiStatsRequest);
}

function* watchWaterMarketplaceStatsRequest() {
  yield takeEvery(Types.GET_WATER_MARKETPLACE_STATS_REQUEST, getWaterMarketplaceStatsRequest);
}

function* watchMoovStatsRequest() {
  yield takeEvery(Types.GET_MOOV_STATS_REQUEST, getMoovStatsRequest);
}

function* watchGetOrderTimeSeriesRequest() {
  yield takeLatest(Types.GET_ORDER_TIME_SERIES_REQUEST, getOrderTimeSeriesRequest);
}

function* watchGetOperationTimeSeriesRequest() {
  yield takeLatest(Types.GET_OPERATION_TIME_SERIES_REQUEST, getOperationTimeSeriesRequest);
}

function* watchGetDomainSummaryForLocalsRequest() {
  yield takeEvery(Types.GET_DOMAIN_SUMMARY_FOR_LOCALS_REQUEST, getDomainSummaryForLocalsRequest);
}

function* watchGetNPSStatsRequest() {
  yield takeEvery(Types.GET_NPS_STATS_REQUEST, getNPSStatsRequest);
}

export default function* root() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchOrderCountByBasketAmountRequest),
      fork(watchClientOrderCountsRequest),
      fork(watchFinancialsRequest),
      fork(watchProductAvailabilityRequest),
      fork(watchProductSaleRequest),
      fork(watchDeviceStatsRequest),
      fork(watchOrderCardGroupDistributionRequest),
      fork(watchDiscountReasonsRequest),
      fork(watchGetOrderPromoDistributionBetweenDatesRequest),
      fork(watchGetWarehouseStatsRequest),
      fork(watchGetWarehouseStatsV2Request),
      fork(watchGetBiTaksiStatsRequest),
      fork(watchWaterMarketplaceStatsRequest),
      fork(watchMoovStatsRequest),
      fork(watchGetClientRatingsRequest),
      fork(watchGetOrderTimeSeriesRequest),
      fork(watchGetOperationTimeSeriesRequest),
      fork(watchGetDurationsRequest),
      fork(watchGetDashboardComparisoStatsRequest),
      fork(watchGetDomainSummaryForLocalsRequest),
      fork(watchGetNPSStatsRequest),
      fork(watchNPSConfigRequest),
      fork(watchExportWarehouseTableRequest),
    ]);
    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
