import { createReducer } from 'reduxsauce';

import { SUB_REGION_GETIR_MARKET_POLYGON_TYPE } from '@shared/shared/constants';
import { Types } from './actions';

export const INITIAL_STATE = {
  isPageInitialized: false,
  warehouse: {
    isPending: false,
    data: {},
  },
  polygons: {
    isPending: false,
    data: [],
  },
  couriers: {
    isPending: false,
    data: [],
  },
  filters: {
    showCouriers: { showBusyCouriers: false },
    polygonType: SUB_REGION_GETIR_MARKET_POLYGON_TYPE,
  },
  selectedPlaceMark: {
    data: {},
    type: null,
  },
};

const getWarehouseRequest = state => ({
  ...state,
  warehouse: {
    ...state.warehouse,
    isPending: true,
    data: [],
  },
});

const getWarehouseSuccess = (state, { data }) => ({
  ...state,
  warehouse: {
    ...state.warehouse,
    isPending: false,
    data,
  },
});

const getWarehouseFailure = state => ({
  ...state,
  warehouse: {
    ...state.warehouse,
    isPending: false,
  },
});

const getPolygonsRequest = state => ({
  ...state,
  polygons: {
    ...state.polygons,
    isPending: true,
    data: [],
  },
});

const getPolygonsSuccess = (state, { data }) => ({
  ...state,
  polygons: {
    ...state.polygons,
    isPending: false,
    data,
  },
});

const getPolygonsFailure = state => ({
  ...state,
  polygons: {
    ...state.polygons,
    isPending: false,
  },
});

const getWarehouseCouriersSuccess = (state, { data = [] }) => ({
  ...state,
  couriers: {
    ...state.couriers,
    isPending: false,
    data,
  },
});

const getWarehouseCouriersFailure = state => ({
  ...state,
  couriers: {
    ...state.couriers,
    isPending: false,
  },
});

const setFilterParams = (state, { filterParams = {} }) => ({
  ...state,
  filters: {
    ...state.filters,
    ...filterParams,
  },
});

const setSelectedPlaceMark = (state, { data, eventType }) => ({
  ...state,
  selectedPlaceMark: {
    ...state.selectedPlaceMark,
    type: eventType,
    data,
  },
});

const destroyPage = () => ({ ...INITIAL_STATE });

export const HANDLERS = {
  [Types.GET_WAREHOUSE_REQUEST]: getWarehouseRequest,
  [Types.GET_WAREHOUSE_SUCCESS]: getWarehouseSuccess,
  [Types.GET_WAREHOUSE_FAILURE]: getWarehouseFailure,
  [Types.GET_POLYGONS_REQUEST]: getPolygonsRequest,
  [Types.GET_POLYGONS_SUCCESS]: getPolygonsSuccess,
  [Types.GET_POLYGONS_FAILURE]: getPolygonsFailure,
  [Types.GET_WAREHOUSE_COURIERS_SUCCESS]: getWarehouseCouriersSuccess,
  [Types.GET_WAREHOUSE_COURIERS_FAILURE]: getWarehouseCouriersFailure,
  [Types.SET_SELECTED_PLACE_MARK]: setSelectedPlaceMark,
  [Types.SET_FILTER_PARAMS]: setFilterParams,
  [Types.DESTROY_PAGE]: destroyPage,
};

export default createReducer(INITIAL_STATE, HANDLERS);
