import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  dailyReport: {
    isPending: false,
    data: [],
    totalCount: 0,
  },
};

const dailyReportRequest = (state = INITIAL_STATE) => ({
  ...state,
  dailyReport: {
    ...state.dailyReport,
    isPending: true,
    data: [],
  },
});

const dailyReportSuccess = (state = INITIAL_STATE, { data, totalCount }) => ({
  ...state,
  dailyReport: {
    ...state.dailyReport,
    isPending: false,
    data,
    totalCount,
  },
});

const dailyReportFailure = (state = INITIAL_STATE) => ({
  ...state,
  dailyReport: {
    ...state.dailyReport,
    isPending: false,
  },
});

const destroyPage = () => ({ ...INITIAL_STATE });

export const HANDLERS = {
  [Types.GET_DAILY_REPORT_REQUEST]: dailyReportRequest,
  [Types.GET_DAILY_REPORT_SUCCESS]: dailyReportSuccess,
  [Types.GET_DAILY_REPORT_FAILURE]: dailyReportFailure,
  [Types.DESTROY_PAGE]: destroyPage,
};

export default createReducer(INITIAL_STATE, HANDLERS);
