import { createReducer } from 'reduxsauce';

import moment from 'moment';

import { Types } from '@app/pages/ArtisanOrder/Filter/redux/actions';

export const INITIAL_STATE = {
  results: {
    data: [],
    isPending: false,
    error: null,
  },
  filters: {
    defaultStartDate: moment().startOf('day'),
    defaultEndDate: moment().endOf('day'),
    page: 1,
    count: 10,
  },
  cities: [],
  paymentMethods: [],
  filteredResults: { data: [] },
};

export const getResultsRequest = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    results: {
      ...state.results,
      isPending: true,
    },
  };
};

export const getResultsSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    results: {
      ...state.results,
      data,
      isPending: false,
    },
  };
};

export const getResultsFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    results: {
      ...state.results,
      isPending: false,
      error,
    },
  };
};

export const setFilters = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    filters: { ...data },
  };
};

export const setPaymentMethods = (state = INITIAL_STATE, { paymentMethods }) => {
  return {
    ...state,
    paymentMethods,
  };
};

export const setCities = (state = INITIAL_STATE, { cities }) => {
  return {
    ...state,
    cities,
  };
};

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.GET_RESULTS_REQUEST]: getResultsRequest,
  [Types.GET_RESULTS_SUCCESS]: getResultsSuccess,
  [Types.GET_RESULTS_FAILURE]: getResultsFailure,
  [Types.SET_FILTERS]: setFilters,
  [Types.SET_PAYMENT_METHODS]: setPaymentMethods,
  [Types.SET_CITIES]: setCities,
  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
