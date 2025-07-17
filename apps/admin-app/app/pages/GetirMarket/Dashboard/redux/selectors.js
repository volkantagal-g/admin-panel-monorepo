import { createSelector } from 'reselect';
import { get, isEmpty } from 'lodash';

import { getStateObject } from '@shared/utils/common';
import { GETIR_10_DOMAIN_TYPE, REDUX_KEY, ALL_DOMAIN_TYPES } from '@shared/shared/constants';
import { getProductTotalsData, getProductSale } from '../components/Tables/utils';
import {
  formatDeviceStats,
  formatCardGroupDistribution,
  formatDeliveryFeeDiscountDataSource,
  formatPromoTableData,
  formatWarehouseStatsTable,
} from '../utils';
import { getFormattedClientOrderCounts } from '../components/Tables/ClientOrderCounts/utils';
import { getFormattedOrderTimeSeries } from '../components/Charts/Order/utils';
import { getFormattedUtilizationAndCourierData } from '../components/Charts/UtilAndCourier/utils';
import { getFormattedFinancialThroughputData } from '../components/Charts/FinancialThroughput/utils';
import { getFormattedThroughputData } from '../components/Charts/Throughput/utils';
import { formatDurations } from '../components/Tables/Durations/utils';
import { getFormattedNPSStats } from '../components/Tables/NPSStatsTable/utils';
import { formatFinancialsData } from '@app/pages/GetirMarket/Dashboard/components/Tables/Financials/utils';
import { getClientDistributionCounts } from '../components/Tables/NewClientStats/utils';
import { availableDomainTypesForCountrySelector, getSelectedCountryTimezone } from '@shared/redux/selectors/common';
import { getSelectedCountryV2 } from '@shared/redux/selectors/countrySelection';

const reducerKey = REDUX_KEY.GETIR_MARKET.DASHBOARD;

export const filtersSelector = {
  getSelectedCities: createSelector(
    state => getStateObject(state, reducerKey, 'filters'),
    ({ selectedCities }) => selectedCities,
  ),

  getSelectedDomainType: createSelector(
    availableDomainTypesForCountrySelector.getDomainTypes,
    state => state[reducerKey]?.filters?.selectedDomainType,
    (availableDomainTypes, domainType) => {
      if (availableDomainTypes.length && !availableDomainTypes?.includes(domainType)) return GETIR_10_DOMAIN_TYPE;
      return domainType;
    },
  ),

  getSelectedHourRange: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'filters');
    },
    ({ selectedHourRange }) => selectedHourRange,
  ),

  getSelectedDateRange: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'filters');
    },
    ({ selectedDateRange }) => selectedDateRange,
  ),

  getSelectedDate: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'filters');
    },
    ({ selectedDate }) => selectedDate,
  ),

  getDateType: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'filters');
    },
    ({ dateType }) => dateType,
  ),

  getSelectedDivisionCountries: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'filters');
    },
    ({ selectedDivisionCountries }) => selectedDivisionCountries,
  ),
};

export const basketDistributionSelector = {
  getData: createSelector(
    state => getStateObject(state, reducerKey, 'orderCountByBasketAmount'),
    ({ data }) => data,
  ),
  getIsPending: createSelector(
    state => getStateObject(state, reducerKey, 'orderCountByBasketAmount'),
    ({ isPending }) => isPending,
  ),
};

export const clientOrderCountsSelector = {
  getData: createSelector(
    state => state?.[reducerKey]?.clientOrderCounts,
    ({ data }) => getFormattedClientOrderCounts(data).orderCounts,
  ),
  getIsPending: createSelector(
    state => state?.[reducerKey]?.clientOrderCounts,
    ({ isPending }) => isPending,
  ),
};

export const financialsSelector = {
  getData: createSelector(
    state => state[reducerKey].financials,
    ({ data }) => formatFinancialsData({ financial: data }),
  ),
  getIsPending: createSelector(
    state => getStateObject(state, reducerKey, 'financials'),
    ({ isPending }) => isPending,
  ),
};

export const getProductTotalsDataSelector = createSelector(
  state => {
    return getStateObject(state, reducerKey, 'productAvailability');
  },
  ({ data }) => {
    return getProductTotalsData(data);
  },
);

export const getProductSaleSelector = {
  getData: createSelector(
    state => state,
    state => {
      const { productAvailability, productSale } = state[reducerKey];
      if (isEmpty(productAvailability.data) && isEmpty(productSale.data)) {
        return {
          productAvailability: [],
          categoryAvailability: [],
          subCategoryAvailability: [],
          supplierAvailability: [],
          totalAllPrice: 0,
          totalAllCount: 0,
        };
      }

      const { getSuppliers, getMarketProductCategories, getMarketProductSubCategories, getMarketProducts } = state[REDUX_KEY.COMMON];

      return getProductSale({
        productAvailability: productAvailability.data,
        itemFinancialStats: productSale.data,
        products: getMarketProducts.data,
        categories: getMarketProductCategories.data,
        subCategories: getMarketProductSubCategories.data,
        suppliers: getSuppliers.data,
      });
    },
  ),
  isPending: createSelector(
    state => state,
    state => {
      const { productAvailability, productSale } = state[reducerKey];
      const { getSuppliers, getMarketProductCategories, getMarketProductSubCategories, getMarketProducts } = state[REDUX_KEY.COMMON];

      return (
        productAvailability.isPending ||
        productSale.isPending ||
        getSuppliers.isPending ||
        getMarketProductCategories.isPending ||
        getMarketProductSubCategories.isPending ||
        getMarketProducts.isPending
      );
    },
  ),
};

export const deviceStatsSelector = {
  getData: createSelector(
    state => state[reducerKey].deviceStats.data,
    state => state[reducerKey].filters.selectedDomainType,
    (deviceStats, domainType) => {
      return formatDeviceStats(deviceStats, domainType);
    },
  ),
  getIsPending: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'deviceStats');
    },
    ({ isPending }) => isPending,
  ),
};

export const orderCardGroupDistributionSelector = {
  getData: createSelector(
    state => state[reducerKey].orderCardGroupDistribution.data,
    orderCardGroupDistribution => formatCardGroupDistribution(orderCardGroupDistribution),
  ),
  getIsPending: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'orderCardGroupDistribution');
    },
    ({ isPending }) => isPending,
  ),
};

export const deliveryFeeDiscountSelector = {
  getData: createSelector(
    state => state[reducerKey].discountReasons.data,
    discountReasons => {
      return formatDeliveryFeeDiscountDataSource(discountReasons);
    },
  ),
  getIsPending: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'discountReasons');
    },
    ({ isPending }) => isPending,
  ),
};

export const promoStatisticsSelector = {
  getData: selectedRows => createSelector(
    state => getStateObject(state, reducerKey, 'promoStatistics'),
    ({ data }) => {
      return formatPromoTableData(data, selectedRows);
    },
  ),
  getIsPending: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'promoStatistics');
    },
    ({ isPending }) => isPending,
  ),
};

export const clientRatingsSelector = {
  getData: createSelector(
    state => getStateObject(state, reducerKey, 'clientRatings'),
    ({ data }) => data,
  ),
  getIsPending: createSelector(
    state => getStateObject(state, reducerKey, 'clientRatings'),
    ({ isPending }) => isPending,
  ),
};

export const warehouseStatsSelector = {
  getFormattedData: (classes, availableDomainTypes) => createSelector(
    state => state[reducerKey].allDomainsSummary,
    state => state[reducerKey].getirMarketWarehouseStats,
    ({ current, previous }, getirMarketWarehouseStats) => formatWarehouseStatsTable({
      classes,
      availableDomainTypes,
      getirMarketWarehouseStats,
      currentData: current,
      previousData: previous,
    }),
  ),
  getIsPending: createSelector(
    state => state[reducerKey].allDomainsSummary,
    state => state[reducerKey].getirMarketWarehouseStats,
    (allDomainsSummary, getirMarketWarehouseStats) => (
      allDomainsSummary?.current?.isPending ||
      allDomainsSummary?.previous?.isPending ||
      getirMarketWarehouseStats?.current?.isPending ||
      getirMarketWarehouseStats?.previous?.isPending
    ),
  ),
};

export const warehouseStatsV2Selector = {
  getData: createSelector(
    state => state[reducerKey].getirMarketWarehouseStats,
    ({ current }) => {
      return { current: current.data };
    },
  ),
  getIsPending: createSelector(
    state => state[reducerKey].getirMarketWarehouseStats,
    ({ current }) => {
      return !!current.isPending;
    },
  ),
};

export const orderTimeSeriesSelector = {
  getSelectedDomainTypeData: createSelector(
    state => state[reducerKey].orderTimeSeries?.data?.orderStats,
    getSelectedCountryTimezone.getData,
    (orderStats, timezone) => getFormattedOrderTimeSeries(orderStats, { timezone }),
  ),
  getIsPending: createSelector(
    state => state[reducerKey].orderTimeSeries,
    ({ isPending }) => isPending,
  ),
};

export const operationTimeSeriesSelector = {
  getUtilsAndCouriers: createSelector(
    state => state[reducerKey].operationTimeSeries,
    getSelectedCountryTimezone.getData,
    ({ data }, timezone) => getFormattedUtilizationAndCourierData(data, { timezone }),
  ),
  getFinancialThroughput: createSelector(
    state => state[reducerKey].operationTimeSeries,
    getSelectedCountryTimezone.getData,
    ({ data }, timezone) => getFormattedFinancialThroughputData(data, { timezone }),
  ),
  getThroughput: createSelector(
    state => state[reducerKey].operationTimeSeries,
    getSelectedCountryTimezone.getData,
    ({ data }, timezone) => getFormattedThroughputData(data, { timezone }),
  ),
  getIsPending: createSelector(
    state => state[reducerKey].operationTimeSeries,
    ({ isPending }) => isPending,
  ),
};

export const durationsSelector = {
  getData: createSelector(
    state => state[reducerKey].durations,
    state => state[reducerKey].filters.selectedDomainType,
    ({ data }, selectedDomainType) => formatDurations({ data, selectedDomainType }),
  ),
  getIsPending: createSelector(
    state => state[reducerKey].durations,
    ({ isPending }) => isPending,
  ),
};

export const dashboardComparisonStatsSelector = {
  getData: createSelector(
    state => getStateObject(state, reducerKey, 'dashboardComparisonStats'),
    ({ data }) => getClientDistributionCounts(data),
  ),
  getIsPending: createSelector(
    state => getStateObject(state, reducerKey, 'dashboardComparisonStats'),
    ({ isPending }) => isPending,
  ),
};

export const npsStatsSelector = {
  getNPSStats: createSelector(
    state => availableDomainTypesForCountrySelector.getDomainTypes(state, ALL_DOMAIN_TYPES),
    state => state[reducerKey].npsStats,
    (availableDomainTypes, { data }) => getFormattedNPSStats(data, availableDomainTypes),
  ),
  getNPSStatsIsPending: createSelector(
    state => state[reducerKey].npsStats,
    ({ isPending }) => isPending,
  ),
};

export const npsTimeIntervalSelector = {
  getNPSTimeInterval: createSelector(
    state => state[reducerKey].npsConfig,
    getSelectedCountryV2,
    ({ data }, selectedCountry) => {
      const countryCode = get(selectedCountry, 'code.alpha2', '');
      const timeInterval = get(data, `customValue.${countryCode}.timeInterval`, 0);
      const defaultTimeInterval = get(data, 'value.timeInterval', 0);
      return timeInterval || defaultTimeInterval;
    },
  ),
  getNPSTimeIntervalPending: createSelector(
    state => state[reducerKey].npsConfig,
    ({ isPending }) => isPending,
  ),
};
