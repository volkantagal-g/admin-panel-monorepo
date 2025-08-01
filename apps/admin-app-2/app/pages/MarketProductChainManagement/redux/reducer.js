import { createReducer } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';
import { Types } from './actions';

const INITIAL_STATE = {
  selectedWarehouse: null,
  isLoading: false,
  isSaving: false,
  error: null,
  isActive: true,
  isAddPlatformModalOpen: false,
  isGlobalLoading: false,
  globalError: null,
  centralWarehouses: [],
  isFetchingCentralWarehouses: false,
  centralWarehousesError: null,
  modalCentralWarehouses: [],
  isFetchingModalCentralWarehouses: false,
  modalCentralWarehousesError: null,
  isCreatingPlatform: false,
  createPlatformError: null,
};

const setAddPlatformModalOpen = (state, { isOpen }) => ({
  ...state,
  isAddPlatformModalOpen: isOpen,
});

const fetchModalCentralWarehousesRequest = state => ({
  ...state,
  isFetchingModalCentralWarehouses: true,
  modalCentralWarehousesError: null,
});

const fetchModalCentralWarehousesSuccess = (state, { centralWarehouses }) => ({
  ...state,
  modalCentralWarehouses: centralWarehouses,
  isFetchingModalCentralWarehouses: false,
});

const fetchModalCentralWarehousesFailure = (state, { error }) => ({
  ...state,
  modalCentralWarehousesError: error,
  isFetchingModalCentralWarehouses: false,
});

const createPlatformRequest = state => ({
  ...state,
  isCreatingPlatform: true,
  createPlatformError: null,
});

const createPlatformSuccess = state => ({
  ...state,
  isCreatingPlatform: false,
  isAddPlatformModalOpen: false,
});

const createPlatformFailure = (state, { error }) => ({
  ...state,
  isCreatingPlatform: false,
  createPlatformError: error,
});

const HANDLERS = {
  [Types.SET_ADD_PLATFORM_MODAL_OPEN]: setAddPlatformModalOpen,
  [Types.FETCH_MODAL_CENTRAL_WAREHOUSES_REQUEST]: fetchModalCentralWarehousesRequest,
  [Types.FETCH_MODAL_CENTRAL_WAREHOUSES_SUCCESS]: fetchModalCentralWarehousesSuccess,
  [Types.FETCH_MODAL_CENTRAL_WAREHOUSES_FAILURE]: fetchModalCentralWarehousesFailure,
  [Types.CREATE_PLATFORM_REQUEST]: createPlatformRequest,
  [Types.CREATE_PLATFORM_SUCCESS]: createPlatformSuccess,
  [Types.CREATE_PLATFORM_FAILURE]: createPlatformFailure,
};

// Create the base reducer
export const chainManagementReducer = createReducer(INITIAL_STATE, HANDLERS);

// Selectors

export const selectCentralWarehouses = state => state[REDUX_KEY.MARKET_PRODUCT_CHAIN_MANAGEMENT.ROOT]?.centralWarehouses ?? [];

export const selectIsFetchingCentralWarehouses = state => state[REDUX_KEY.MARKET_PRODUCT_CHAIN_MANAGEMENT.ROOT]?.isFetchingCentralWarehouses ?? false;

export const selectCentralWarehousesError = state => state[REDUX_KEY.MARKET_PRODUCT_CHAIN_MANAGEMENT.ROOT]?.centralWarehousesError ?? null;

export const selectModalCentralWarehouses = state => state[REDUX_KEY.MARKET_PRODUCT_CHAIN_MANAGEMENT.ROOT]?.modalCentralWarehouses ?? [];

export const selectIsFetchingModalCentralWarehouses = state => state[REDUX_KEY.MARKET_PRODUCT_CHAIN_MANAGEMENT.ROOT]?.isFetchingModalCentralWarehouses ?? false;

export const selectModalCentralWarehousesError = state => state[REDUX_KEY.MARKET_PRODUCT_CHAIN_MANAGEMENT.ROOT]?.modalCentralWarehousesError ?? null;

export const selectIsCreatingPlatform = state => state[REDUX_KEY.MARKET_PRODUCT_CHAIN_MANAGEMENT.ROOT]?.isCreatingPlatform ?? false;

export const selectCreatePlatformError = state => state[REDUX_KEY.MARKET_PRODUCT_CHAIN_MANAGEMENT.ROOT]?.createPlatformError ?? null;
