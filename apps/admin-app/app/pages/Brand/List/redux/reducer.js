import { createReducer } from 'reduxsauce';

import { brandStatuses } from '@shared/shared/constantValues';

import { Types } from './actions';

const selectedStatuses = Object.keys(brandStatuses);

export const INITIAL_STATE = {
  brands: {
    data: [],
    isPending: false,
    error: null,
  },
  filters: { selectedStatuses },
};

export const getBrandsRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    brands: {
      ...INITIAL_STATE.brands,
      isPending: true,
    },
  };
};

export const getBrandsSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    brands: {
      ...INITIAL_STATE.brands,
      data,
      isPending: false,
    },
  };
};

export const getBrandsFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    brands: {
      ...INITIAL_STATE.brands,
      isPending: false,
      error,
    },
  };
};

export const setFilterOptions = (state = INITIAL_STATE, { selectedStatuses }) => {
  return {
    ...state,
    filters: {
      ...state.filters,
      selectedStatuses,
    },
  };
};

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.GET_BRANDS_REQUEST]: getBrandsRequest,
  [Types.GET_BRANDS_SUCCESS]: getBrandsSuccess,
  [Types.GET_BRANDS_FAILURE]: getBrandsFailure,
  [Types.SET_FILTER_OPTIONS]: setFilterOptions,
  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
