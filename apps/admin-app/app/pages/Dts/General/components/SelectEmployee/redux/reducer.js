import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  employees: {
    data: [],
    isPending: false,
    error: null,
  },
};

export const getEmployeeRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    employees: {
      ...state.employees,
      isPending: true,
    },
  };
};

export const getEmployeeSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    employees: {
      ...state.employees,
      data,
      isPending: false,
    },
  };
};

export const getEmployeeFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    employees: {
      ...state.employees,
      isPending: false,
      error,
    },
  };
};

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.GET_EMPLOYEE_REQUEST]: getEmployeeRequest,
  [Types.GET_EMPLOYEE_SUCCESS]: getEmployeeSuccess,
  [Types.GET_EMPLOYEE_FAILURE]: getEmployeeFailure,
  [Types.DESTROY_CONTAINER]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
