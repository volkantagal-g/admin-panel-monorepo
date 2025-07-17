import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  form: {
    data: {},
    isPending: false,
    error: null,
  },
};

export const createCourierPlanRequest = (state = INITIAL_STATE, { requestBody }) => {
  return {
    ...state,
    form: {
      ...state.form,
      data: requestBody,
      isPending: true,
    },
  };
};

export const createCourierPlanSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    form: {
      ...state.form,
      data,
      isPending: false,
    },
  };
};

export const createCourierPlanFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    form: {
      ...state.form,
      isPending: false,
      error,
    },
  };
};

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.CREATE_COURIER_PLAN_REQUEST]: createCourierPlanRequest,
  [Types.CREATE_COURIER_PLAN_SUCCESS]: createCourierPlanSuccess,
  [Types.CREATE_COURIER_PLAN_FAILURE]: createCourierPlanFailure,
  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
