import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  courierGamificationKPI: {
    isPending: false,
    data: [],
  },
};

const getCourierGamificationKpiRequest = state => ({
  ...state,
  courierGamificationKPI: {
    ...state.courierGamificationKPI,
    isPending: true,
    data: [],
  },
});

const getCourierGamificationKpiSuccess = (state, { data }) => ({
  ...state,
  courierGamificationKPI: {
    ...state.courierGamificationKPI,
    isPending: false,
    data,
  },
});

const getCourierGamificationKpiFailure = state => ({
  ...state,
  courierGamificationKPI: {
    ...state.courierGamificationKPI,
    isPending: false,
  },
});

const destroyPage = () => ({ ...INITIAL_STATE });

export const HANDLERS = {
  [Types.GET_COURIER_GAMIFICATION_KPI_REQUEST]: getCourierGamificationKpiRequest,
  [Types.GET_COURIER_GAMIFICATION_KPI_SUCCESS]: getCourierGamificationKpiSuccess,
  [Types.GET_COURIER_GAMIFICATION_KPI_FAILURE]: getCourierGamificationKpiFailure,
  [Types.DESTROY_PAGE]: destroyPage,
};

export default createReducer(INITIAL_STATE, HANDLERS);
