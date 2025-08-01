import { createReducer } from 'reduxsauce';

import { INITIAL_STATE } from '../utils';
import { Types } from './actions';

const fetchCentralWarehousesForMatchRequest = state => ({
  ...state,
  loading: { ...state.loading, fetch: true },
  error: null,
});

const fetchCentralWarehousesForMatchSuccess = (state, { response }) => ({
  ...state,
  loading: { ...state.loading, fetch: false },
  warehouses: Array.isArray(response.data) ? response.data : [],
  error: null,
});

const fetchCentralWarehousesForMatchFailure = (state, { error }) => ({
  ...state,
  loading: { ...state.loading, fetch: false },
  error,
});

const fetchWarehouseDataRequest = (state, { warehouseId }) => ({
  ...state,
  loading: { ...state.loading, fetch: true },
  selectedWarehouse: warehouseId,
  error: null,
});

const fetchWarehouseDataSuccess = (state, { response }) => ({
  ...state,
  loading: { ...state.loading, fetch: false },
  matchedSuppliers: response.matchedData || [],
  unmatchedSuppliers: response.unmatchedData || [],
  initialMatchedSuppliers: response.matchedData || [],
  error: null,
});

const fetchWarehouseDataFailure = (state, { error }) => ({
  ...state,
  loading: { ...state.loading, fetch: false },
  error,
});

const moveSupplierSuccess = (state, { matchedSuppliers, unmatchedSuppliers }) => {
  const newMatchedSuppliers = matchedSuppliers || [];
  return {
    ...state,
    matchedSuppliers: newMatchedSuppliers,
    unmatchedSuppliers: unmatchedSuppliers || [],
    selectedPlatforms: {
      ...state.selectedPlatforms,
      ...newMatchedSuppliers.reduce((acc, supplier) => ({
        ...acc,
        [supplier.id]: supplier.selectedPlatform?.id || null,
      }), {}),
    },
  };
};

const updatePlatformSuccess = (state, { supplierId, platformId, selectedPlatform }) => {
  const updatedSuppliers = state.matchedSuppliers.map(supplier => {
    if (supplier.id === supplierId) {
      return {
        ...supplier,
        selectedPlatform: selectedPlatform || null,
      };
    }
    return supplier;
  });

  return {
    ...state,
    matchedSuppliers: updatedSuppliers,
    selectedPlatforms: {
      ...state.selectedPlatforms,
      [supplierId]: platformId || null,
    },
    editingPlatform: null,
  };
};

const saveChangesSuccess = (state, { data }) => ({
  ...state,
  loading: { ...state.loading, save: false },
  initialMatchedSuppliers: data.matchedSuppliers || [],
  ...data,
});

const saveChangesFailure = (state, { error }) => ({
  ...state,
  loading: { ...state.loading, save: false },
  error,
});

const resetState = () => INITIAL_STATE;

const setEditingPlatform = (state, { recordId }) => ({
  ...state,
  editingPlatform: recordId,
});

const updateSearchValue = (state, { searchType, value }) => ({
  ...state,
  [`${searchType}SearchValue`]: value,
});

const resetForms = state => ({
  ...state,
  editingPlatform: null,
  selectedPlatforms: {},
  matchedSearchValue: '',
  unmatchedSearchValue: '',
  matchedSuppliers: [],
  unmatchedSuppliers: [],
  initialMatchedSuppliers: [],
  selectedWarehouse: null,
});

const HANDLERS = {
  [Types.FETCH_CENTRAL_WAREHOUSES_FOR_MATCH_REQUEST]: fetchCentralWarehousesForMatchRequest,
  [Types.FETCH_CENTRAL_WAREHOUSES_FOR_MATCH_SUCCESS]: fetchCentralWarehousesForMatchSuccess,
  [Types.FETCH_CENTRAL_WAREHOUSES_FOR_MATCH_FAILURE]: fetchCentralWarehousesForMatchFailure,
  [Types.FETCH_WAREHOUSE_DATA_REQUEST]: fetchWarehouseDataRequest,
  [Types.FETCH_WAREHOUSE_DATA_SUCCESS]: fetchWarehouseDataSuccess,
  [Types.FETCH_WAREHOUSE_DATA_FAILURE]: fetchWarehouseDataFailure,
  [Types.MOVE_SUPPLIER_SUCCESS]: moveSupplierSuccess,
  [Types.UPDATE_PLATFORM_SUCCESS]: updatePlatformSuccess,
  [Types.SAVE_CHANGES_SUCCESS]: saveChangesSuccess,
  [Types.SAVE_CHANGES_FAILURE]: saveChangesFailure,
  [Types.RESET_STATE]: resetState,
  [Types.SET_EDITING_PLATFORM]: setEditingPlatform,
  [Types.UPDATE_SEARCH_VALUE]: updateSearchValue,
  [Types.RESET_FORMS]: resetForms,
};

const reducer = createReducer(INITIAL_STATE, HANDLERS);

export default reducer;
