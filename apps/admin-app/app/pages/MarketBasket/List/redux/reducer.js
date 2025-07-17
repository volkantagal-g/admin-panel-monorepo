import { createReducer } from 'reduxsauce';

import { Types, defaultDomainType, defaultDates, defaultRowsPerPage } from './actions';

export const INITIAL_STATE = {
  getMarketBaskets: {
    isPending: false,
    data: [],
  },
  filters: {
    domainType: defaultDomainType,
    city: null,
    statuses: [],
    pagination: { currentPage: 1, rowsPerPage: defaultRowsPerPage },
    selectedDateRange: defaultDates,
    referenceId: null,
    clientId: null,
    deviceTypes: [],
  },
};

const getMarketBasketsRequest = state => ({
  ...state,
  getMarketBaskets: {
    ...state.getMarketBaskets,
    isPending: true,
    data: [],
  },
});

const getMarketBasketsSuccess = (state, { data }) => ({
  ...state,
  getMarketBaskets: {
    ...state.getMarketBaskets,
    isPending: false,
    data,
  },
});

const getMarketBasketsFailure = state => ({
  ...state,
  getMarketBaskets: {
    ...state.getMarketBaskets,
    isPending: false,
  },
});

const setFilters = (state, { filters }) => {
  return {
    ...state,
    filters: {
      ...state.filters,
      ...filters,
    },
  };
};

const destroyPage = () => ({ ...INITIAL_STATE });

export const HANDLERS = {
  [Types.GET_MARKET_BASKETS_REQUEST]: getMarketBasketsRequest,
  [Types.GET_MARKET_BASKETS_SUCCESS]: getMarketBasketsSuccess,
  [Types.GET_MARKET_BASKETS_FAILURE]: getMarketBasketsFailure,
  [Types.DESTROY_PAGE]: destroyPage,
  [Types.SET_FILTERS]: setFilters,
};

export default createReducer(INITIAL_STATE, HANDLERS);
