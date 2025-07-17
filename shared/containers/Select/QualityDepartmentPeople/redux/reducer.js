import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  qualityDepartmentPeople: {
    data: [],
    isPending: false,
    error: null,
  },
};

export const getQualityDepartmentPeopleRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    qualityDepartmentPeople: {
      ...state.qualityDepartmentPeople,
      isPending: true,
    },
  };
};

export const getQualityDepartmentPeopleSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    qualityDepartmentPeople: {
      ...state.qualityDepartmentPeople,
      data,
      isPending: false,
    },
  };
};

export const getQualityDepartmentPeopleFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    qualityDepartmentPeople: {
      ...state.qualityDepartmentPeople,
      isPending: false,
      error,
    },
  };
};

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.GET_QUALITY_DEPARTMENT_PEOPLE_REQUEST]: getQualityDepartmentPeopleRequest,
  [Types.GET_QUALITY_DEPARTMENT_PEOPLE_SUCCESS]: getQualityDepartmentPeopleSuccess,
  [Types.GET_QUALITY_DEPARTMENT_PEOPLE_FAILURE]: getQualityDepartmentPeopleFailure,
  [Types.DESTROY_CONTAINER]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
