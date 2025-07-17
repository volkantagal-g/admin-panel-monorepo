import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  summaryFailReasons: {
    isPending: false,
    data: [],
    error: null,
  },
};

export const summaryFailReasonsRequest = (state = INITIAL_STATE) => ({
  ...state,
  summaryFailReasons: {
    ...state.summaryFailReasons,
    isPending: true,
    data: [],
  },
});

export const summaryFailReasonsSuccess = (state = INITIAL_STATE, { data }) => ({
  ...state,
  summaryFailReasons: {
    ...state.summaryFailReasons,
    isPending: false,
    data,
  },
});

export const summaryFailReasonsFailure = (state = INITIAL_STATE, { error }) => ({
  ...state,
  summaryFailReasons: {
    ...state.summaryFailReasons,
    isPending: false,
    error,
  },
});

const destroyPage = () => ({ ...INITIAL_STATE });

export const HANDLERS = {
  [Types.GET_SUMMARY_FAIL_REASONS_REQUEST]: summaryFailReasonsRequest,
  [Types.GET_SUMMARY_FAIL_REASONS_SUCCESS]: summaryFailReasonsSuccess,
  [Types.GET_SUMMARY_FAIL_REASONS_FAILURE]: summaryFailReasonsFailure,
  [Types.DESTROY_PAGE]: destroyPage,
};

export default createReducer(INITIAL_STATE, HANDLERS);
