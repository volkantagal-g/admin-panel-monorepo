import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

const prefix = `${REDUX_KEY.MARKET_ORDER_ANALYTICS.ACTIVE_ORDERS_FOR_GROWTH}_`;
export const defaultRowsPerPage = 10;

export const { Types, Creators } = createActions(
  {
    getActiveOrdersForGrowthRequest: { data: {}, integrationType: null },
    getActiveOrdersForGrowthSuccess: {
      data: {
        orders: [],
        count: 0,
      },
    },
    getActiveOrdersForGrowthFailure: { error: null },

    getPromoRequest: { },
    getPromoSuccess: { data: [] },
    getPromoFailure: { error: null },

    setSelectedPromos: { promos: [] },
    setSelectedPaymentMethods: { paymentMethods: [] },
    setSelectedDomainType: { domainType: null },
    setSelectedCities: { cities: [] },
    setSelectedWarehouses: { warehouses: [] },
    setSlottedState: { slottedState: null },
    setOrderStatuses: { orderStatuses: [] },
    setPagination: { currentPage: 1, rowsPerPage: defaultRowsPerPage },
    setIntegrationTypes: { integrationTypes: [] },
    setExcludedIntegrationTypes: { excludedIntegrationTypes: [] },
    setSortOptions: { sortOptions: {} },
    initPage: null,
    fetchInitialData: { canAccess: null },
    destroyPage: null,
  },
  { prefix },
);
