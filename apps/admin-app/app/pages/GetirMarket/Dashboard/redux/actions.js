import { createActions } from 'reduxsauce';
import moment from 'moment';

import { REDUX_KEY, DATE_TYPE } from '@shared/shared/constants';
import { getInitialDateRanges } from '../utils';
import { getSelectedDomainType } from '@shared/redux/selectors/common';

export const { Types, Creators } = createActions(
  {
    setSelectedCities: { selectedCities: [] },
    setSelectedDomainType: { selectedDomainType: getSelectedDomainType() },
    setSelectedHourRange: { selectedHourRange: [0, 24] },
    setSelectedDateRange: { selectedDateRange: getInitialDateRanges() },
    setSelectedDate: { selectedDate: moment().endOf('day') },
    setSelectedDivisionCountries: { selectedDivisionCountries: [] },
    setDateType: { dateType: DATE_TYPE.LOG_SUMMARY_DATE_TYPE_1_HOUR },

    getOrderCountByBasketAmountRequest: { data: null },
    getOrderCountByBasketAmountSuccess: { data: null },
    getOrderCountByBasketAmountFailure: { error: null },

    getClientOrderCountsRequest: { data: null },
    getClientOrderCountsSuccess: { data: null },
    getClientOrderCountsFailure: { error: null },

    getFinancialsRequest: { data: null },
    getFinancialsSuccess: { data: null },
    getFinancialsFailure: { error: null },
    getProductAvailabilityRequest: { data: {} },
    getProductAvailabilitySuccess: { data: [] },
    getProductAvailabilityFailure: { error: null },

    getProductSaleRequest: { data: {} },
    getProductSaleSuccess: { data: [] },
    getProductSaleFailure: { error: null },

    getDeviceStatsRequest: { data: {} },
    getDeviceStatsSuccess: { data: {} },
    getDeviceStatsFailure: { error: null },

    getOrderCardGroupDistributionRequest: { data: {} },
    getOrderCardGroupDistributionSuccess: { data: {} },
    getOrderCardGroupDistributionFailure: { error: null },

    getDiscountReasonsRequest: { data: {} },
    getDiscountReasonsSuccess: { data: {} },
    getDiscountReasonsFailure: { error: null },

    getOrderPromoDistributionBetweenDatesRequest: { data: {} },
    getOrderPromoDistributionBetweenDatesSuccess: { data: {} },
    getOrderPromoDistributionBetweenDatesFailure: { error: null },

    getClientRatingsRequest: { data: {} },
    getClientRatingsSuccess: { data: {} },
    getClientRatingsFailure: { error: null },

    getWarehouseStatsRequest: { data: {}, statsType: null },
    getWarehouseStatsSuccess: { data: {}, statsType: null },
    getWarehouseStatsFailure: { error: null, statsType: null },

    getWarehouseStatsV2Request: { data: {}, statsType: null },
    getWarehouseStatsV2Success: { data: {}, statsType: null },
    getWarehouseStatsV2Failure: { error: null, statsType: null },

    getBiTaksiStatsRequest: { data: {}, statsType: null },
    getBiTaksiStatsSuccess: { data: {}, statsType: null },
    getBiTaksiStatsFailure: { error: null, statsType: null },

    getWaterMarketplaceStatsRequest: { data: {}, statsType: null },
    getWaterMarketplaceStatsSuccess: { data: {}, statsType: null },
    getWaterMarketplaceStatsFailure: { error: null, statsType: null },

    getMoovStatsRequest: { data: {}, statsType: null },
    getMoovStatsSuccess: { data: {}, statsType: null },
    getMoovStatsFailure: { error: null, statsType: null },

    getOrderTimeSeriesRequest: { data: null },
    getOrderTimeSeriesSuccess: { data: null },
    getOrderTimeSeriesFailure: { error: null },

    getOperationTimeSeriesRequest: { data: null },
    getOperationTimeSeriesSuccess: { data: null },
    getOperationTimeSeriesFailure: { error: null },

    getDurationsRequest: { data: null },
    getDurationsSuccess: { data: null },
    getDurationsFailure: { error: null },

    getDashboardComparisonStatsRequest: { data: null },
    getDashboardComparisonStatsSuccess: { data: null },
    getDashboardComparisonStatsFailure: { error: null },

    getDomainSummaryForLocalsRequest: { data: {}, statsType: null },
    getDomainSummaryForLocalsSuccess: { data: {}, statsType: null },
    getDomainSummaryForLocalsFailure: { error: null, statsType: null },

    getNPSStatsRequest: { payload: {} },
    getNPSStatsSuccess: { data: null },
    getNPSStatsFailure: {},

    getNPSConfigRequest: {},
    getNPSConfigSuccess: { data: null },
    getNPSConfigFailure: {},

    exportWarehouseTableRequest: {},

    initPage: null,
    destroyPage: null,
  },
  { prefix: `${REDUX_KEY.GETIR_MARKET.DASHBOARD}_` },
);
