import { createReducer } from 'reduxsauce';

import { Types } from './actions';
import { DEFAULT_REFRESH_PAGE_TIMER } from '../constants';
import {
  FilterType,
  OrderGrowthMonitoringDataType,
} from '../orderGrowthMonitoring';
import { CityOperationStats } from '@shared/api/businessMonitoring/types';

export type State = {
  orderGrowthMonitoringData: {
    isPending: boolean,
    data: orderGrowthMonitoringDataType[],
  },
  orderGrowthMonitoringWarehouseData: {
    isPending: boolean,
    data: object,
  },
  operationStats: {
    isPending: boolean,
    data: CityOperationStats,
  },
  refreshPageTimer: number,
  filters: filterType,
};

export const INITIAL_STATE: State = {
  orderGrowthMonitoringData: {
    isPending: false,
    data: [],
  },
  orderGrowthMonitoringWarehouseData: {
    isPending: false,
    data: {
      courierStatusCounts: {},
      warehouseData: [],
      cityOperationStats: {},
    },
  },
  operationStats: {
    isPending: false,
    data: {},
  },
  refreshPageTimer: DEFAULT_REFRESH_PAGE_TIMER,
  filters: {
    selectedCity: null,
    selectedDomainTypes: [],
    selectedWarehouses: [],
  },
};

const orderGrowthMonitoringDataRequest = (state: State) => ({
  ...state,
  orderGrowthMonitoringData: {
    ...state.orderGrowthMonitoringData,
    isPending: true,
  },
});
const orderGrowthMonitoringDataSuccess = (state: State, { data }: any) => ({
  ...state,
  orderGrowthMonitoringData: {
    ...state.orderGrowthMonitoringData,
    isPending: false,
    data,
  },
});
const orderGrowthMonitoringDataFailure = (state: State) => ({
  ...state,
  orderGrowthMonitoringData: {
    ...state.orderGrowthMonitoringData,
    isPending: false,
  },
});

const orderGrowthMonitoringWarehouseDataRequest = (state: State) => ({
  ...state,
  orderGrowthMonitoringWarehouseData: {
    ...state.orderGrowthMonitoringWarehouseData,
    isPending: true,
  },
});
const orderGrowthMonitoringWarehouseDataSuccess = (state: State, { data }: any) => ({
  ...state,
  orderGrowthMonitoringWarehouseData: {
    ...state.orderGrowthMonitoringWarehouseData,
    isPending: false,
    data,
  },
});
const orderGrowthMonitoringWarehouseDataFailure = (state: State) => ({
  ...state,
  orderGrowthMonitoringWarehouseData: {
    ...state.orderGrowthMonitoringWarehouseData,
    isPending: false,
  },
});

const operationStatsRequest = (state: State) => ({
  ...state,
  operationStats: {
    ...state.operationStats,
    isPending: true,
  },
});
const operationStatsSuccess = (state: State, { data }: any) => ({
  ...state,
  operationStats: {
    ...state.operationStats,
    isPending: false,
    data,
  },
});
const operationStatsFailure = (state: State) => ({
  ...state,
  operationStats: {
    ...state.operationStats,
    isPending: false,
  },
});

const refreshPageTimer = (state: State, { data }: any) => {
  return {
    ...state,
    refreshPageTimer: data,
  };
};

const setFilters = (state: State, { selectedCity, selectedDomainTypes, selectedWarehouses }: filterType) => {
  return {
    ...state,
    filters: {
      ...state.filters,
      selectedCity,
      selectedDomainTypes,
      selectedWarehouses,
    },
  };
};

const destroyPage = () => ({ ...INITIAL_STATE });

export const HANDLERS = {
  [Types.GET_ORDER_GROWTH_MONITORING_DATA_REQUEST]: orderGrowthMonitoringDataRequest,
  [Types.GET_ORDER_GROWTH_MONITORING_DATA_SUCCESS]: orderGrowthMonitoringDataSuccess,
  [Types.GET_ORDER_GROWTH_MONITORING_DATA_FAILURE]: orderGrowthMonitoringDataFailure,
  [Types.GET_ORDER_GROWTH_MONITORING_WAREHOUSE_DATA_REQUEST]: orderGrowthMonitoringWarehouseDataRequest,
  [Types.GET_ORDER_GROWTH_MONITORING_WAREHOUSE_DATA_SUCCESS]: orderGrowthMonitoringWarehouseDataSuccess,
  [Types.GET_ORDER_GROWTH_MONITORING_WAREHOUSE_DATA_FAILURE]: orderGrowthMonitoringWarehouseDataFailure,
  [Types.GET_OPERATION_STATS_REQUEST]: operationStatsRequest,
  [Types.GET_OPERATION_STATS_SUCCESS]: operationStatsSuccess,
  [Types.GET_OPERATION_STATS_FAILURE]: operationStatsFailure,
  [Types.REFRESH_PAGE_TIMER]: refreshPageTimer,
  [Types.SET_FILTERS]: setFilters,
  [Types.DESTROY_PAGE]: destroyPage,
};

export default createReducer(INITIAL_STATE, HANDLERS);
