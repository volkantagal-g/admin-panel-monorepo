import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  filterCourierFeedback: {
    isPending: false,
    data: {
      result: [],
      totalCount: null,
    },
    error: null,
  },
  feedbackOptions: {
    isPending: false,
    data: null,
    error: null,
  },
  feedbackChartData: {
    isPending: false,
    data: [],
    error: null,
  },
};

const filterCourierFeedbackRequest = (state = INITIAL_STATE) => ({
  ...state,
  filterCourierFeedback: {
    ...state.filterCourierFeedback,
    isPending: true,
    data: [],
  },
});

const filterCourierFeedbackSuccess = (state = INITIAL_STATE, { data }) => ({
  ...state,
  filterCourierFeedback: {
    ...state.filterCourierFeedback,
    isPending: false,
    data,
  },
});

const filterCourierFeedbackFailure = (state = INITIAL_STATE, { error }) => ({
  ...state,
  filterCourierFeedback: {
    ...state.filterCourierFeedback,
    isPending: false,
    error,
  },
});

const getFeedbackOptionsRequest = (state = INITIAL_STATE) => ({
  ...state,
  feedbackOptions: {
    ...state.feedbackOptions,
    isPending: true,
  },
});

const getFeedbackOptionsSuccess = (state = INITIAL_STATE, { data }) => ({
  ...state,
  feedbackOptions: {
    ...state.feedbackOptions,
    isPending: false,
    data,
  },
});

const getFeedbackOptionsFailure = (state = INITIAL_STATE, { error }) => ({
  ...state,
  feedbackOptions: {
    ...state.feedbackOptions,
    isPending: false,
    error,
  },
});

const getFeedbackChartDataRequest = (state = INITIAL_STATE) => ({
  ...state,
  feedbackChartData: {
    ...state.feedbackChartData,
    isPending: true,
  },
});

const getFeedbackChartDataSuccess = (state = INITIAL_STATE, { data }) => ({
  ...state,
  feedbackChartData: {
    ...state.feedbackChartData,
    isPending: false,
    data,
  },
});

const getFeedbackChartDataFailure = (state = INITIAL_STATE, { error }) => ({
  ...state,
  feedbackChartData: {
    ...state.feedbackChartData,
    isPending: false,
    error,
  },
});

const destroyPage = () => ({ ...INITIAL_STATE });

export const HANDLERS = {
  [Types.FILTER_COURIER_FEEDBACK_REQUEST]: filterCourierFeedbackRequest,
  [Types.FILTER_COURIER_FEEDBACK_SUCCESS]: filterCourierFeedbackSuccess,
  [Types.FILTER_COURIER_FEEDBACK_FAILURE]: filterCourierFeedbackFailure,
  [Types.GET_FEEDBACK_OPTIONS_REQUEST]: getFeedbackOptionsRequest,
  [Types.GET_FEEDBACK_OPTIONS_SUCCESS]: getFeedbackOptionsSuccess,
  [Types.GET_FEEDBACK_OPTIONS_FAILURE]: getFeedbackOptionsFailure,
  [Types.GET_FEEDBACK_CHART_DATA_REQUEST]: getFeedbackChartDataRequest,
  [Types.GET_FEEDBACK_CHART_DATA_SUCCESS]: getFeedbackChartDataSuccess,
  [Types.GET_FEEDBACK_CHART_DATA_FAILURE]: getFeedbackChartDataFailure,
  [Types.DESTROY_PAGE]: destroyPage,
};

export default createReducer(INITIAL_STATE, HANDLERS);
