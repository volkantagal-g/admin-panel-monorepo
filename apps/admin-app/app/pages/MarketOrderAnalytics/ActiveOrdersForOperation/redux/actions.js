import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

const prefix = `${REDUX_KEY.MARKET_ORDER_ANALYTICS.ACTIVE_ORDERS_FOR_OPERATION}_`;
export const defaultRowsPerPage = 10;
const defaultCurrentPage = 1;

export const { Types, Creators } = createActions(
  {
    getActiveOrdersRequest: { data: {} },
    getActiveOrdersSuccess: {
      data: {
        orders: [],
        count: 0,
        totalKuzeydenCarboyCount: 0,
      },
    },
    getActiveOrdersFailure: { error: null },
    getActiveOrderStatsRequest: { data: {} },
    getActiveOrderStatsSuccess: { data: { getActiveOrderStats: {} } },
    getActiveOrderStatsFailure: { error: null },
    getFieldManagersRequest: { employeeIds: [] },
    getFieldManagersSuccess: { data: [] },
    getFieldManagersFailure: { error: null },
    resetFieldManagers: null,

    getCourierSearchRequest: { courierName: '' },
    getCourierSearchSuccess: { data: [] },
    getCourierSearchFailure: { error: null },
    setCourierId: { courierId: null },

    setDomainType: { domainType: null },
    setCity: { city: null },
    setFieldManagers: { fieldManagers: [] },
    setWarehouses: { warehouses: [] },
    setIsSlottedDelivery: { isSlottedDelivery: null },
    setOrderStatus: { orderStatus: '' },
    setOrderStatusMoreThan: { orderStatusMoreThan: 0 },
    setPagination: { currentPage: defaultCurrentPage, rowsPerPage: defaultRowsPerPage },
    setSortOptions: { sortOptions: {} },
    setIntegrationTypes: { integrationTypes: [] },
    setExcludedIntegrationTypes: { excludedIntegrationTypes: [] },

    initPage: null,
    fetchInitialData: { canAccess: null },
    destroyPage: null,
  },
  { prefix },
);
