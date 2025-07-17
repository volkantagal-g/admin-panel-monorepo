import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  timesheets: {
    isPending: false,
    data: [],
  },
  timesheetAction: { isSuccess: false },
};

const filterLockedTimesheetsRequest = (state = INITIAL_STATE) => ({
  ...state,
  timesheets: {
    ...state.timesheets,
    isPending: true,
    data: [],
  },
});

const filterLockedTimesheetsSuccess = (state = INITIAL_STATE, { data }) => ({
  ...state,
  timesheets: {
    ...state.timesheets,
    isPending: false,
    data,
  },
  timesheetAction: {
    ...state.timesheetAction,
    isSuccess: false,
  },
});

const filterLockedTimesheetsFailure = (state = INITIAL_STATE) => ({
  ...state,
  timesheets: {
    ...state.timesheets,
    isPending: false,
  },
});

const lockTimesheetsRequest = (state = INITIAL_STATE) => ({
  ...state,
  timesheets: {
    ...state.timesheets,
    isPending: true,
  },
});

const lockTimesheetsSuccess = (state = INITIAL_STATE) => ({
  ...state,
  timesheets: {
    ...state.timesheets,
    isPending: false,
  },
  timesheetAction: {
    ...state.timesheetAction,
    isSuccess: true,
  },
});

const lockTimesheetsFailure = (state = INITIAL_STATE) => ({
  ...state,
  timesheets: {
    ...state.timesheets,
    isPending: false,
  },
  timesheetAction: {
    ...state.timesheetAction,
    isSuccess: false,
  },
});

const unlockTimesheetsRequest = lockTimesheetsRequest;

const unlockTimesheetsSuccess = lockTimesheetsSuccess;

const unlockTimesheetsFailure = lockTimesheetsFailure;

const destroyPage = () => ({ ...INITIAL_STATE });

export const HANDLERS = {
  [Types.FILTER_LOCKED_TIMESHEETS_REQUEST]: filterLockedTimesheetsRequest,
  [Types.FILTER_LOCKED_TIMESHEETS_SUCCESS]: filterLockedTimesheetsSuccess,
  [Types.FILTER_LOCKED_TIMESHEETS_FAILURE]: filterLockedTimesheetsFailure,

  [Types.LOCK_TIMESHEETS_REQUEST]: lockTimesheetsRequest,
  [Types.LOCK_TIMESHEETS_SUCCESS]: lockTimesheetsSuccess,
  [Types.LOCK_TIMESHEETS_FAILURE]: lockTimesheetsFailure,

  [Types.UNLOCK_TIMESHEETS_REQUEST]: unlockTimesheetsRequest,
  [Types.UNLOCK_TIMESHEETS_SUCCESS]: unlockTimesheetsSuccess,
  [Types.UNLOCK_TIMESHEETS_FAILURE]: unlockTimesheetsFailure,

  [Types.DESTROY_PAGE]: destroyPage,
};

export default createReducer(INITIAL_STATE, HANDLERS);
