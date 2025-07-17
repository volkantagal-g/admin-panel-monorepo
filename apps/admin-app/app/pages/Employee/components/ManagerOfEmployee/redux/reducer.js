import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  managerOfEmployee: {
    data: {},
    isPending: false,
  },
};

export const getManagerOfEmployeeRequest = state => {
  return {
    ...state,
    managerOfEmployee: {
      ...state.managerOfEmployee,
      isPending: true,
    },
  };
};

export const getManagerOfEmployeeSuccess = (state, { data }) => {
  return {
    ...state,
    managerOfEmployee: {
      ...state.managerOfEmployee,
      data,
      isPending: false,
    },
  };
};

export const getManagerOfEmployeeFailure = state => {
  return {
    ...state,
    managerOfEmployee: {
      ...state.managerOfEmployee,
      data: {},
      isPending: false,
    },
  };
};

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.GET_MANAGER_OF_EMPLOYEE_REQUEST]: getManagerOfEmployeeRequest,
  [Types.GET_MANAGER_OF_EMPLOYEE_SUCCESS]: getManagerOfEmployeeSuccess,
  [Types.GET_MANAGER_OF_EMPLOYEE_FAILURE]: getManagerOfEmployeeFailure,
  [Types.DESTROY_CONTAINER]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
