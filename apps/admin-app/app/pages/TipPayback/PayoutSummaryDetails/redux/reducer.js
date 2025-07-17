import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  summaryDetails: {
    isPending: false,
    data: [],
    error: null,
  },
};

export const summaryDetailsRequest = (state = INITIAL_STATE) => ({
  ...state,
  summaryDetails: {
    ...state.summaryDetails,
    isPending: true,
    data: [],
  },
});

export const summaryDetailsSuccess = (state = INITIAL_STATE, { data }) => ({
  ...state,
  summaryDetails: {
    ...state.summaryDetails,
    isPending: false,
    data,
  },
});

export const summaryDetailsFailure = (state = INITIAL_STATE, { error }) => ({
  ...state,
  summaryDetails: {
    ...state.summaryDetails,
    isPending: false,
    error,
  },
});

const destroyPage = () => ({ ...INITIAL_STATE });

export const HANDLERS = {
  [Types.GET_SUMMARY_DETAILS_REQUEST]: summaryDetailsRequest,
  [Types.GET_SUMMARY_DETAILS_SUCCESS]: summaryDetailsSuccess,
  [Types.GET_SUMMARY_DETAILS_FAILURE]: summaryDetailsFailure,
  [Types.DESTROY_PAGE]: destroyPage,
};

export default createReducer(INITIAL_STATE, HANDLERS);
