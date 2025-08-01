import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

const prefix = `${REDUX_KEY.MARKET_ORDER_ANALYTICS.ACTIVE_ORDERS_FOR_CUSTOMER_SERVICES}_`;
export const INITIAL_PAGINATION = { currentPage: 1, rowsPerPage: 10 };

export const { Types, Creators } = createActions({
  getActiveOrdersForCustomerServicesRequest: { },
  getActiveOrdersForCustomerServicesSuccess: {
    data: {
      orders: [],
      count: 0,
    },
  },
  getActiveOrdersForCustomerServicesFailure: { error: null },
  setDomainType: { domainType: null },
  setCity: { city: null },
  setWarehouse: { warehouse: null },
  setCourierId: { courierId: null },
  setSlottedState: { slottedState: null },
  setOrderStatuses: { orderStatuses: [] },
  setPagination: INITIAL_PAGINATION,
  getCourierSearchRequest: { name: '' },
  getCourierSearchSuccess: { data: [] },
  getCourierSearchFailure: { error: null },
  initPage: null,
  fetchInitialData: { canAccess: null },
  setIntegrationTypes: { integrationTypes: [] },
  setExcludedIntegrationTypes: { excludedIntegrationTypes: [] },
  destroyPage: null,
}, { prefix });
