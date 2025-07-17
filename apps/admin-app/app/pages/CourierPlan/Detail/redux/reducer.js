import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  plan: {
    data: null,
    isPending: false,
    error: null,
  },
};

export const courierPlanRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    plan: {
      ...state.plan,
      isPending: true,
    },
  };
};

export const getCourierPlanSuccess = (state = INITIAL_STATE, { plan }) => {
  return {
    ...state,
    plan: {
      ...state.plan,
      data: plan,
      isPending: false,
    },
  };
};

export const courierPlanSuccess = (state = INITIAL_STATE) => {
  return {
    ...state,
    plan: {
      ...state.plan,
      isPending: false,
    },
  };
};

export const courierPlanFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    plan: {
      ...state.plan,
      isPending: false,
      error,
    },
  };
};

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.GET_COURIER_PLAN_REQUEST]: courierPlanRequest,
  [Types.GET_COURIER_PLAN_SUCCESS]: getCourierPlanSuccess,
  [Types.GET_COURIER_PLAN_FAILURE]: courierPlanFailure,
  [Types.UPLOAD_COURIER_PLAN_EXCEL_FILE_REQUEST]: courierPlanRequest,
  [Types.UPLOAD_COURIER_PLAN_EXCEL_FILE_FAILURE]: courierPlanFailure,
  [Types.PROCEED_COURIER_PLAN_PROCESS_REQUEST]: courierPlanRequest,
  [Types.PROCEED_COURIER_PLAN_PROCESS_FAILURE]: courierPlanFailure,
  [Types.UPDATE_TTP_REQUEST]: courierPlanRequest,
  [Types.UPDATE_TTP_FAILURE]: courierPlanFailure,
  [Types.DOWNLOAD_SIGNED_FILE_REQUEST]: courierPlanRequest,
  [Types.DOWNLOAD_SIGNED_FILE_SUCCESS]: courierPlanSuccess,
  [Types.DOWNLOAD_SIGNED_FILE_FAILURE]: courierPlanFailure,
  [Types.PUBLISH_COURIER_PLAN_PROCESS_REQUEST]: courierPlanRequest,
  [Types.PUBLISH_COURIER_PLAN_PROCESS_SUCCESS]: courierPlanSuccess,
  [Types.PUBLISH_COURIER_PLAN_PROCESS_FAILURE]: courierPlanFailure,
  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
