import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  records: {
    data: [],
    isPending: false,
    totalCount: 0,
    error: null,
  },
  recordDeletion: {
    isPending: false,
    error: null,
  },
};

export const getCourierPlansRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    records: {
      ...state.records,
      isPending: true,
    },
  };
};

export const getCourierPlansSuccess = (state = INITIAL_STATE, { records = [], totalCount }) => {
  return {
    ...state,
    records: {
      ...state.records,
      data: records,
      isPending: false,
      totalCount,
    },
  };
};

export const getCourierPlansFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    records: {
      ...state.records,
      isPending: false,
      error,
    },
  };
};

export const deleteCourierPlanRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    recordDeletion: {
      isPending: true,
      error: null,
    },
  };
};

export const deleteCourierPlanSuccess = (state = INITIAL_STATE) => {
  return {
    ...state,
    recordDeletion: { isPending: false },
  };
};

export const deleteCourierPlanFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    recordDeletion: {
      isPending: false,
      error,
    },
  };
};

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.GET_COURIER_PLANS_REQUEST]: getCourierPlansRequest,
  [Types.GET_COURIER_PLANS_SUCCESS]: getCourierPlansSuccess,
  [Types.GET_COURIER_PLANS_FAILURE]: getCourierPlansFailure,
  [Types.DELETE_COURIER_PLAN_REQUEST]: deleteCourierPlanRequest,
  [Types.DELETE_COURIER_PLAN_SUCCESS]: deleteCourierPlanSuccess,
  [Types.DELETE_COURIER_PLAN_FAILURE]: deleteCourierPlanFailure,
  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
