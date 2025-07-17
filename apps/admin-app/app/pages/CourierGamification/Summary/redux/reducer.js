import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  courierGamificationTaskSummary: {
    isPending: false,
    isPendingSummaryTable: false,
    data: {
      taskData: {},
      summaryData: null,
      courierCount: 0,
      status: null,
    },
    currentId: '',
  },
};
const detailCourierGamificationTaskByIdRequest = (state, { currId }) => ({
  ...state,
  courierGamificationTaskSummary: {
    ...state.courierGamificationTaskSummary,
    isPending: true,
    isPendingSummaryTable: true,
    currentId: currId,
  },
});

const detailCourierGamificationTaskByIdSuccess = (state, { taskData, courierCount, status }) => ({
  ...state,
  courierGamificationTaskSummary: {
    ...state.courierGamificationTaskSummary,
    isPending: false,
    isPendingSummaryTable: false,
    data: {
      ...state.courierGamificationTaskSummary.data,
      taskData,
      courierCount,
      status,
    },
  },
});

const detailCourierGamificationTaskByIdFailure = state => ({
  ...state,
  courierGamificationTaskSummary: {
    ...state.courierGamificationTaskSummary,
    isPending: false,
    data: {},
  },
});

const getSummaryCourierGamificationByIdRequest = (state, { currId }) => {
  return ({
    ...state,
    courierGamificationTaskSummary: {
      ...state.courierGamificationTaskSummary,
      isPendingSummaryTable: true,
      currentId: currId,
    },
  });
};

const getSummaryCourierGamificationByIdSuccess = (state, { summaryData }) => {
  return ({
    ...state,
    courierGamificationTaskSummary: {
      ...state.courierGamificationTaskSummary,
      isPendingSummaryTable: false,
      data: {
        ...state.courierGamificationTaskSummary.data,
        summaryData,
      },
    },
  });
};

const getSummaryCourierGamificationByIdFailure = state => ({
  ...state,
  courierGamificationTaskSummary: {
    ...state.courierGamificationTaskSummary,
    isPendingSummaryTable: false,
    data: {
      ...state.courierGamificationTaskSummary.data,
      summaryData: [],
    },
  },
});

const destroyPage = () => ({ ...INITIAL_STATE });

export const HANDLERS = {
  [Types.DETAIL_COURIER_GAMIFICATION_TASK_BY_ID_REQUEST]: detailCourierGamificationTaskByIdRequest,
  [Types.DETAIL_COURIER_GAMIFICATION_TASK_BY_ID_SUCCESS]: detailCourierGamificationTaskByIdSuccess,
  [Types.DETAIL_COURIER_GAMIFICATION_TASK_BY_ID_FAILURE]: detailCourierGamificationTaskByIdFailure,
  [Types.GET_SUMMARY_COURIER_GAMIFICATION_BY_ID_REQUEST]: getSummaryCourierGamificationByIdRequest,
  [Types.GET_SUMMARY_COURIER_GAMIFICATION_BY_ID_SUCCESS]: getSummaryCourierGamificationByIdSuccess,
  [Types.GET_SUMMARY_COURIER_GAMIFICATION_BY_ID_FAILURE]: getSummaryCourierGamificationByIdFailure,
  [Types.DESTROY_PAGE]: destroyPage,
};

export default createReducer(INITIAL_STATE, HANDLERS);
