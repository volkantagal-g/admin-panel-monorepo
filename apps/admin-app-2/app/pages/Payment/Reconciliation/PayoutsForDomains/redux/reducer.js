import { createReducer } from 'reduxsauce';

import { Types } from './actions';
import { INIT_FILTERS } from '../constants';

export const INITIAL_STATE = {
  payoutReports: {
    isPending: false,
    data: [],
    error: null,
  },
  domainTab: { domain: 'Food' },
  payoutsFilters: { filters: INIT_FILTERS },
};

const domainTabChange = (state = INITIAL_STATE, { domain }) => ({
  ...state,
  domainTab: { domain },
});

const submitFilters = (state = INITIAL_STATE, { filters }) => {
  return {
    ...state,
    payoutsFilters: {
      ...state.filters,
      ...filters,
    },
  };
};

const payoutReportsRequest = (state = INITIAL_STATE) => ({
  ...state,
  payoutReports: {
    ...state.payoutReports,
    isPending: true,
    data: [],
    error: null,
  },
});

const payoutReportsSuccess = (state = INITIAL_STATE, { data }) => ({
  ...state,
  payoutReports: {
    ...state.payoutReports,
    isPending: false,
    data,
    error: null,
  },
});

const payoutReportsFailure = (state = INITIAL_STATE, { error }) => ({
  ...state,
  payoutReports: {
    ...state.payoutReports,
    isPending: false,
    error,
  },
});

const destroyPage = () => ({ ...INITIAL_STATE });

export const HANDLERS = {
  [Types.GET_PAYOUT_REPORTS_REQUEST]: payoutReportsRequest,
  [Types.GET_PAYOUT_REPORTS_SUCCESS]: payoutReportsSuccess,
  [Types.GET_PAYOUT_REPORTS_FAILURE]: payoutReportsFailure,
  [Types.HANDLE_DOMAIN_TAB]: domainTabChange,
  [Types.SUBMIT_FILTERS]: submitFilters,
  [Types.DESTROY_PAGE]: destroyPage,
};

export default createReducer(INITIAL_STATE, HANDLERS);
