import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  thirdPartyCompanies: {
    data: [],
    isPending: false,
    error: null,
  },
  filters: { searchParam: '' },
};

const getThirdPartyCompanies = {
  request: (state = INITIAL_STATE) => ({
    ...state,
    thirdPartyCompanies: {
      ...state.thirdPartyCompanies,
      isPending: true,
    },
  }),
  success: (state = INITIAL_STATE, { thirdPartyCompanies = [] }) => ({
    ...state,
    thirdPartyCompanies: {
      ...state.thirdPartyCompanies,
      data: thirdPartyCompanies,
      isPending: false,
    },
  }),
  failure: (state = INITIAL_STATE, { error }) => ({
    ...state,
    thirdPartyCompanies: {
      ...state.thirdPartyCompanies,
      isPending: false,
      error,
    },
  }),
};

const setThirdPartyCompanyFilters = {
  searchParam: (state = INITIAL_STATE, { searchParam }) => ({
    ...state,
    filters: {
      ...state.filters,
      searchParam,
    },
  }),
};

const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.GET_THIRD_PARTY_COMPANIES_REQUEST]: getThirdPartyCompanies.request,
  [Types.GET_THIRD_PARTY_COMPANIES_SUCCESS]: getThirdPartyCompanies.success,
  [Types.GET_THIRD_PARTY_COMPANIES_FAILURE]: getThirdPartyCompanies.failure,
  [Types.SET_THIRD_PARTY_COMPANY_FILTERS_SEARCH_PARAM]: setThirdPartyCompanyFilters.searchParam,
  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
