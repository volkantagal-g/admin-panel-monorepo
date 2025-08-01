import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export type State = {
  createEmployee: {
    isPending: boolean;
    error: Error | Object | undefined
  },
};

export const INITIAL_STATE: State = {
  createEmployee: {
    isPending: false,
    error: undefined,
  },
};

const createEmployeeRequest = (state: State) => ({
  ...state,
  createEmployee: {
    ...state.createEmployee,
    isPending: true,
    error: undefined,
  },
});
const createEmployeeSuccess = (state: State) => ({
  ...state,
  createEmployee: {
    ...state.createEmployee,
    isPending: false,
    error: undefined,
  },
});
const createEmployeeFailure = (state: State, { error }: { error: Object; }) => ({
  ...state,
  createEmployee: {
    ...state.createEmployee,
    isPending: false,
    error,
  },
});

const destroyPage = () => ({ ...INITIAL_STATE });

export const HANDLERS = {
  [Types.CREATE_EMPLOYEE_REQUEST]: createEmployeeRequest,
  [Types.CREATE_EMPLOYEE_SUCCESS]: createEmployeeSuccess,
  [Types.CREATE_EMPLOYEE_FAILURE]: createEmployeeFailure,
  [Types.DESTROY_PAGE]: destroyPage,
};

export default createReducer(INITIAL_STATE, HANDLERS);
