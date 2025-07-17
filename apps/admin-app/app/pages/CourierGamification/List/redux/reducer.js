import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  courierGamificationTasks: {
    isPending: false,
    data: [],
    totalCount: 0,
  },
};

const getCourierGamificationTasksRequest = state => ({
  ...state,
  courierGamificationTasks: {
    ...state.courierGamificationTasks,
    isPending: true,
    data: [],
  },
});
const getCourierGamificationTasksSuccess = (state, { data, totalCount }) => ({
  ...state,
  courierGamificationTasks: {
    ...state.courierGamificationTasks,
    isPending: false,
    data,
    totalCount,
  },
});
const getCourierGamificationTasksFailure = state => ({
  ...state,
  courierGamificationTasks: {
    ...state.courierGamificationTasks,
    isPending: false,
  },
});

const destroyPage = () => ({ ...INITIAL_STATE });

export const HANDLERS = {
  [Types.GET_COURIER_GAMIFICATION_TASKS_REQUEST]: getCourierGamificationTasksRequest,
  [Types.GET_COURIER_GAMIFICATION_TASKS_SUCCESS]: getCourierGamificationTasksSuccess,
  [Types.GET_COURIER_GAMIFICATION_TASKS_FAILURE]: getCourierGamificationTasksFailure,
  [Types.DESTROY_PAGE]: destroyPage,
};

export default createReducer(INITIAL_STATE, HANDLERS);
