import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  getPromosByFilters: {
    data: [],
    isPending: false,
  },
  getResponsibleDepartments: {
    isPending: false,
    data: {},
    error: null,
  },
  excludePromoProducts: {
    isPending: false,
    data: {},
    error: null,
  },
};

export const getPromosByFiltersRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    getPromosByFilters: {
      ...state.getPromosByFilters,
      isPending: true,
    },
  };
};

export const getPromosByFiltersSuccess = (state = INITIAL_STATE, { promos = [] }) => {
  return {
    ...state,
    getPromosByFilters: {
      ...state.getPromosByFilters,
      data: promos,
      isPending: false,
    },
  };
};

export const getPromosByFiltersFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    getPromosByFilters: {
      ...state.getPromosByFilters,
      isPending: false,
      error,
    },
  };
};

export const setFilteredPromosRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    getPromosByFilters: {
      ...state.getPromosByFilters,
      isPending: true,
    },
  };
};

export const setFilteredPromosSuccess = (state = INITIAL_STATE, { promos = [] }) => {
  return {
    ...state,
    getPromosByFilters: {
      ...state.getPromosByFilters,
      data: promos,
      isPending: false,
    },
  };
};

export const setFilteredPromosFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    getPromosByFilters: {
      ...state.getPromosByFilters,
      isPending: false,
      error,
    },
  };
};

export const getResponsibleDepartmentsRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    getResponsibleDepartments: {
      ...INITIAL_STATE.getResponsibleDepartments,
      isPending: true,
    },
  };
};

export const getResponsibleDepartmentsSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    getResponsibleDepartments: {
      ...INITIAL_STATE.getResponsibleDepartments,
      data,
      isPending: false,
    },
  };
};

export const getResponsibleDepartmentsFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    getResponsibleDepartments: {
      ...INITIAL_STATE.getResponsibleDepartments,
      isPending: false,
      error,
    },
  };
};

export const excludePromoProductsRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    excludePromoProducts: {
      ...INITIAL_STATE.excludePromoProducts,
      isPending: true,
    },
  };
};

export const excludePromoProductsSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    excludePromoProducts: {
      ...INITIAL_STATE.excludePromoProducts,
      data,
      isPending: false,
    },
  };
};

export const excludePromoProductsFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    excludePromoProducts: {
      ...INITIAL_STATE.excludePromoProducts,
      isPending: false,
      error,
    },
  };
};

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.GET_PROMOS_BY_FILTERS_REQUEST]: getPromosByFiltersRequest,
  [Types.GET_PROMOS_BY_FILTERS_SUCCESS]: getPromosByFiltersSuccess,
  [Types.GET_PROMOS_BY_FILTERS_FAILURE]: getPromosByFiltersFailure,
  [Types.SET_FILTERED_PROMOS_REQUEST]: setFilteredPromosRequest,
  [Types.SET_FILTERED_PROMOS_SUCCESS]: setFilteredPromosSuccess,
  [Types.SET_FILTERED_PROMOS_FAILURE]: setFilteredPromosFailure,
  [Types.GET_RESPONSIBLE_DEPARTMENTS_REQUEST]: getResponsibleDepartmentsRequest,
  [Types.GET_RESPONSIBLE_DEPARTMENTS_SUCCESS]: getResponsibleDepartmentsSuccess,
  [Types.GET_RESPONSIBLE_DEPARTMENTS_FAILURE]: getResponsibleDepartmentsFailure,
  [Types.EXCLUDE_PROMO_PRODUCTS_REQUEST]: excludePromoProductsRequest,
  [Types.EXCLUDE_PROMO_PRODUCTS_SUCCESS]: excludePromoProductsSuccess,
  [Types.EXCLUDE_PROMO_PRODUCTS_FAILURE]: excludePromoProductsFailure,
  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
