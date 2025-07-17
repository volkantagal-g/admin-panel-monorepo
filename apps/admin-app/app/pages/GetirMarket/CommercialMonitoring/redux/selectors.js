import { createSelector } from 'reselect';

import { GETIR_10_DOMAIN_TYPE, REDUX_KEY } from '@shared/shared/constants';
import { getFormattedTableData } from '@app/pages/GetirMarket/CommercialMonitoring/utils';
import {
  getMarketProductCategoriesSelector,
  getMarketProductsSelector,
  getMarketProductSubCategoriesSelector,
  getSuppliersSelector,
  availableDomainTypesForCountrySelector,
} from '@shared/redux/selectors/common';

const reduxKey = REDUX_KEY.GETIR_MARKET.COMMERCIAL_MONITORING;

export const isPageInitializedSelector = state => state[reduxKey]?.isPageInitialized;

export const filtersSelector = {
  getAllFilters: createSelector(
    state => state[reduxKey]?.filters,
    availableDomainTypesForCountrySelector.getDomainTypes,
    (filters, availableDomainTypes) => {
      const domainType = filters?.domainType;
      if (!availableDomainTypes.includes(domainType)) {
        return {
          ...filters,
          domainType: GETIR_10_DOMAIN_TYPE,
        };
      }
      return {
        ...filters,
        domainType,
      };
    },
  ),
};
export const tableFiltersSelector = { getAllFilters: state => state[reduxKey]?.tableFilters };

export const productSaleStatsSelector = {
  getIsPending: state => state[reduxKey]?.productSaleStats.isPending,
  getData: state => state[reduxKey]?.productSaleStats.data,
};

export const availabilitySelector = {
  getIsPending: state => state[reduxKey]?.availability.isPending,
  getData: state => state[reduxKey]?.availability.data,
  getTotalAvailabilityCounts: state => {
    const availability = state[reduxKey]?.availability.data || {};

    return {
      totalAvailabilityExceptSupplierProblem: availability.total_availability_except_supplier_problem,
      totalCustomerAvailability: availability.total_customer_availability,
      totalCriticalAvailability: availability.total_critical_availability,
    };
  },
};

export const instantAvailabilitySelector = {
  getIsPending: state => state[reduxKey]?.instantAvailability.isPending,
  getData: state => state[reduxKey]?.instantAvailability.data,
  getTotalAvailabilityCounts: state => {
    const instantAvailability = state[reduxKey]?.instantAvailability.data || {};

    return {
      totalAvailabilityExceptSupplierProblem: instantAvailability.total_availability_except_supplier_problem,
      totalCustomerAvailability: instantAvailability.total_customer_availability,
      totalCriticalAvailability: instantAvailability.total_critical_availability,
    };
  },
};

export const formattedTableDataSelector = createSelector(
  productSaleStatsSelector.getData,
  availabilitySelector.getData,
  instantAvailabilitySelector.getData,
  filtersSelector.getAllFilters,
  tableFiltersSelector.getAllFilters,
  getSuppliersSelector.getData,
  getMarketProductCategoriesSelector.getData,
  getMarketProductSubCategoriesSelector.getData,
  getMarketProductsSelector.getData,
  (productSaleStats, availability, instantAvailability, filters, tableFilters, suppliers, categories, subCategories, products) => {
    const { tableData = [], totalStats = {}, nonFilteredSaleStats = {} } = getFormattedTableData({
      productSaleStats,
      availability,
      instantAvailability,
      filters,
      tableFilters,
      suppliers,
      categories,
      subCategories,
      products,
    });
    return { data: tableData, totalStats, nonFilteredSaleStats, total: tableData.length };
  },
);
