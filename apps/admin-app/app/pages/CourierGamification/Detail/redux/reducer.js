import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  courierGMFCTaskById: {
    isPending: false,
    data: {
      taskData: {},
      courierCount: 0,
      status: null,
    },
    currentId: '',
  },
};

const deleteTaskByIdRequest = state => ({
  ...state,
  courierGMFCTaskById: {
    ...state.courierGMFCTaskById,
    isPending: true,
  },
});

const deleteTaskByIdSuccess = state => ({
  ...state,
  courierGMFCTaskById: {
    ...state.courierGMFCTaskById,
    isPending: false,
  },
});

const deleteTaskByIdFailure = state => ({
  ...state,
  courierGMFCTaskById: {
    ...state.courierGMFCTaskById,
    isPending: false,
  },
});

const updateTaskDetailCourierGMFCRequest = state => ({
  ...state,
  courierGMFCTaskById: {
    ...state.courierGMFCTaskById,
    isPending: true,
  },
});

const updateTaskDetailCourierGMFCSuccess = state => ({
  ...state,
  courierGMFCTaskById: {
    ...state.courierGMFCTaskById,
    isPending: false,
  },
});

const updateTaskDetailCourierGMFCFailure = state => ({
  ...state,
  courierGMFCTaskById: {
    ...state.courierGMFCTaskById,
    isPending: false,
  },
});

const detailCourierGamificationTaskByIdRequest = (state, { currId }) => ({
  ...state,
  courierGMFCTaskById: {
    ...state.courierGMFCTaskById,
    isPending: true,
    data: {},
    currentId: currId,
  },
});

const detailCourierGamificationTaskByIdSuccess = (state, { taskData, courierCount, status }) => ({
  ...state,
  courierGMFCTaskById: {
    ...state.courierGMFCTaskById,
    isPending: false,
    data: {
      taskData,
      courierCount,
      status,
    },
  },
});

const detailCourierGamificationTaskByIdFailure = state => ({
  ...state,
  courierGMFCTaskById: {
    ...state.courierGMFCTaskById,
    isPending: false,
    data: {},
  },
});

const destroyPage = () => ({ ...INITIAL_STATE });

export const HANDLERS = {
  [Types.DETAIL_COURIER_GAMIFICATION_TASK_BY_ID_REQUEST]: detailCourierGamificationTaskByIdRequest,
  [Types.DETAIL_COURIER_GAMIFICATION_TASK_BY_ID_SUCCESS]: detailCourierGamificationTaskByIdSuccess,
  [Types.DETAIL_COURIER_GAMIFICATION_TASK_BY_ID_FAILURE]: detailCourierGamificationTaskByIdFailure,
  [Types.UPDATE_TASK_DETAIL_COURIER_GMFC_REQUEST]: updateTaskDetailCourierGMFCRequest,
  [Types.UPDATE_TASK_DETAIL_COURIER_GMFC_SUCCESS]: updateTaskDetailCourierGMFCSuccess,
  [Types.UPDATE_TASK_DETAIL_COURIER_GMFC_FAILURE]: updateTaskDetailCourierGMFCFailure,
  [Types.DELETE_TASK_BY_ID_REQUEST]: deleteTaskByIdRequest,
  [Types.DELETE_TASK_BY_ID_SUCCESS]: deleteTaskByIdSuccess,
  [Types.DELETE_TASK_BY_ID_FAILURE]: deleteTaskByIdFailure,
  [Types.DESTROY_PAGE]: destroyPage,
};

export default createReducer(INITIAL_STATE, HANDLERS);
