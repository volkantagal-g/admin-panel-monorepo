import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  logs: {
    isPending: false,
    data: [],
  },
  personList: {
    isPending: false,
    data: [],
  },
  warehouses: {
    isPending: false,
    data: [],
  },
  leaveTypes: {
    isPending: false,
    data: [],
  },
};

const getTimesheetLogsRequest = state => ({
  ...state,
  logs: {
    ...state.logs,
    isPending: true,
  },
});

const getTimesheetLogsSuccess = (state, { data }) => ({
  ...state,
  logs: {
    ...state.logs,
    isPending: false,
    data,
  },
});

const getTimesheetLogsFailure = state => ({
  ...state,
  logs: {
    ...state.logs,
    isPending: false,
  },
});

const getPersonListRequest = state => ({
  ...state,
  personList: {
    ...state.personList,
    isPending: true,
  },
});

const getPersonListSuccess = (state, { data }) => ({
  ...state,
  personList: {
    ...state.personList,
    isPending: false,
    data,
  },
});

const getPersonListFailure = state => ({
  ...state,
  personList: {
    ...state.personList,
    isPending: false,
  },
});

const getWarehousesRequest = state => ({
  ...state,
  warehouses: {
    ...state.warehouses,
    isPending: true,
  },
});

const getWarehousesSuccess = (state, { data }) => ({
  ...state,
  warehouses: {
    ...state.warehouses,
    isPending: false,
    data,
  },
});

const getWarehousesFailure = state => ({
  ...state,
  warehouses: {
    ...state.warehouses,
    isPending: false,
  },
});

const getLeaveTypesRequest = state => ({
  ...state,
  leaveTypes: {
    ...state.leaveTypes,
    isPending: true,
  },
});

const getLeaveTypesSuccess = (state, { data }) => ({
  ...state,
  leaveTypes: {
    ...state.leaveTypes,
    isPending: false,
    data,
  },
});

const getLeaveTypesFailure = state => ({
  ...state,
  leaveTypes: {
    ...state.leaveTypes,
    isPending: false,
  },
});

const destroyPage = () => ({ ...INITIAL_STATE });

export const HANDLERS = {
  [Types.GET_TIMESHEET_LOGS_REQUEST]: getTimesheetLogsRequest,
  [Types.GET_TIMESHEET_LOGS_SUCCESS]: getTimesheetLogsSuccess,
  [Types.GET_TIMESHEET_LOGS_FAILURE]: getTimesheetLogsFailure,

  [Types.GET_PERSON_LIST_REQUEST]: getPersonListRequest,
  [Types.GET_PERSON_LIST_SUCCESS]: getPersonListSuccess,
  [Types.GET_PERSON_LIST_FAILURE]: getPersonListFailure,

  [Types.GET_WAREHOUSES_REQUEST]: getWarehousesRequest,
  [Types.GET_WAREHOUSES_SUCCESS]: getWarehousesSuccess,
  [Types.GET_WAREHOUSES_FAILURE]: getWarehousesFailure,

  [Types.GET_LEAVE_TYPES_REQUEST]: getLeaveTypesRequest,
  [Types.GET_LEAVE_TYPES_SUCCESS]: getLeaveTypesSuccess,
  [Types.GET_LEAVE_TYPES_FAILURE]: getLeaveTypesFailure,

  [Types.DESTROY_PAGE]: destroyPage,
};

export default createReducer(INITIAL_STATE, HANDLERS);
