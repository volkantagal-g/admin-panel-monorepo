import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  ddsCriteria: {
    data: [],
    isPending: false,
    error: null,
  },
};

export const getDdsCriteriaRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    ddsCriteria: {
      ...state.ddsCriteria,
      isPending: true,
    },
  };
};

export const getDdsCriteriaSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    ddsCriteria: {
      ...state.ddsCriteria,
      data,
      isPending: false,
    },
  };
};

export const getDdsCriteriaFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    ddsCriteria: {
      ...state.ddsCriteria,
      isPending: false,
      error,
    },
  };
};

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.GET_DDS_CRITERIA_REQUEST]: getDdsCriteriaRequest,
  [Types.GET_DDS_CRITERIA_SUCCESS]: getDdsCriteriaSuccess,
  [Types.GET_DDS_CRITERIA_FAILURE]: getDdsCriteriaFailure,
  [Types.DESTROY_CONTAINER]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
