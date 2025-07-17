import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  employees: {
    data: [],
    isPending: false,
  },
};

export const getEmployeesRequest = state => {
  return {
    ...state,
    employees: {
      ...state.employees,
      isPending: true,
    },
  };
};

export const getEmployeesSuccess = (state, { data }) => {
  return {
    ...state,
    employees: {
      ...state.employees,
      data,
      isPending: false,
    },
  };
};

export const getEmployeesFailure = state => {
  return {
    ...state,
    employees: {
      ...state.employees,
      data: [],
      isPending: false,
    },
  };
};

export const clearEmployees = state => {
  return {
    ...state,
    employees: {
      ...state.employees,
      data: [],
      isPending: false,
    },
  };
};

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.GET_EMPLOYEES_REQUEST]: getEmployeesRequest,
  [Types.GET_EMPLOYEES_SUCCESS]: getEmployeesSuccess,
  [Types.GET_EMPLOYEES_FAILURE]: getEmployeesFailure,
  [Types.CLEAR_EMPLOYEES]: clearEmployees,
  [Types.DESTROY_CONTAINER]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
