import { createReducer } from 'reduxsauce';

import { Types } from '@app/pages/Banner/List/redux/actions';
import { getLangKey } from '@shared/i18n';

export const INITIAL_STATE = {
  results: {
    data: { content: [] },
    isPending: false,
    error: null,
  },
  filters: {
    ids: [],
    startDate: '',
    endDate: '',
    title: '',
    description: '',
    targetDomain: null,
    customTag: '',
    page: 0,
    status: null,
    size: 10,
    clientLanguage: getLangKey(),
  },
};

export const setTableFilters = (state = INITIAL_STATE, { filters }) => {
  return {
    ...state,
    filters: {
      ...state.filters,
      ...filters,
    },
    results: {
      ...state.results,
      error: null,
      isPending: true,
    },
  };
};

export const getResultsRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    results: {
      ...state.results,
      isPending: true,
      error: null,
    },
  };
};

export const getResultsSuccess = (state = INITIAL_STATE, { data }) => {
  return ({
    ...state,
    results: {
      ...state.results,
      data,
      isPending: false,
      error: null,
    },
  });
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

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.SET_TABLE_FILTERS]: setTableFilters,
  [Types.GET_RESULTS_REQUEST]: getResultsRequest,
  [Types.GET_RESULTS_SUCCESS]: getResultsSuccess,
  [Types.GET_RESULTS_FAILURE]: getResultsFailure,
  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
