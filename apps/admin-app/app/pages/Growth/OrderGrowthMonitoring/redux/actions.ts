import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

const prefix = `${REDUX_KEY.LIVE_MONITORING.LIST}_`;

export const { Types, Creators } = createActions({
  getOrderGrowthMonitoringDataRequest: null,
  getOrderGrowthMonitoringDataSuccess: { data: null },
  getOrderGrowthMonitoringDataFailure: { error: null },

  getOrderGrowthMonitoringWarehouseDataRequest: null,
  getOrderGrowthMonitoringWarehouseDataSuccess: {
    data: {
      courierStatusCounts: null,
      warehouseData: null,
      cityOperationStats: null,
    },
  },
  getOrderGrowthMonitoringWarehouseDataFailure: { error: null },

  getOperationStatsRequest: null,
  getOperationStatsSuccess: { data: null },
  getOperationStatsFailure: { error: null },

  exportCSVRequest: { domainType: null, dataToExport: {} },

  setFilters: { selectedCity: null, selectedDomainTypes: [], selectedWarehouses: [] },
  refreshPageTimer: { data: null },
  initPage: null,
  destroyPage: null,
}, { prefix });
