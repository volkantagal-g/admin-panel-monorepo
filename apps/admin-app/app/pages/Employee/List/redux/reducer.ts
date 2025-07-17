import { createReducer } from 'reduxsauce';

import {
  IFilteredActiveEmployees,
  IFilteredEmployeesCommon,
  IFilteredNoNActiveEmployees,
  IFilters,
} from '@app/pages/Employee/List/types';
import { ACTIVE_GETIRIANS_TAB } from '@app/pages/Employee/List/constants';
import { DEPARTMENT_LEVELS } from '@app/pages/Employee/constants';

import { Types } from './actions';

export type State = {
  filteredEmployeesCommon: IFilteredEmployeesCommon;
  filteredActiveEmployees: IFilteredActiveEmployees;
  filteredNoNActiveEmployees: IFilteredNoNActiveEmployees;
  filters: IFilters;
};

export const defaultFilters = {
  searchTerm: '',
  department: undefined,
  subDepartments: { [DEPARTMENT_LEVELS.SUB_DEPARTMENT_FIRST]: undefined },
  lineManager: undefined,
  businessCountry: undefined,
  mainWorkLocation: undefined,
  businessUnit: undefined,
  positionLevel: undefined,
  activeTabKey: ACTIVE_GETIRIANS_TAB,
  pagination: {
    currentPage: 1,
    rowsPerPage: 10,
    total: 0,
  },
};

export const INITIAL_STATE: State = {
  filteredEmployeesCommon: { isPending: false },
  filteredActiveEmployees: { data: [], totalCount: 0 },
  filteredNoNActiveEmployees: { data: [], totalCount: 0 },
  filters: { ...defaultFilters },
};

const filteredEmployeesCommonRequest = (state: State) => ({
  ...state,
  filteredEmployeesCommon: {
    ...state.filteredEmployeesCommon,
    isPending: true,
  },
});

const filteredActiveEmployeesRequest = (state: State) => ({
  ...state,
  filteredActiveEmployees: {
    ...state.filteredActiveEmployees,
    data: [],
    totalCount: 0,
  },
});
const filteredActiveEmployeesSuccess = (state: State, { data, totalCount }: State['filteredActiveEmployees']) => ({
  ...state,
  filteredActiveEmployees: {
    ...state.filteredActiveEmployees,
    totalCount: totalCount ?? 0,
    data,
  },
  filteredEmployeesCommon: {
    ...state.filteredEmployeesCommon,
    isPending: false,
  },
});
const filteredActiveEmployeesFailure = (state: State) => ({
  ...state,
  filteredActiveEmployees: {
    ...state.filteredActiveEmployees,
    data: [],
    isPending: false,
  },
  filteredEmployeesCommon: {
    ...state.filteredEmployeesCommon,
    isPending: false,
  },
});

const filteredNoNActiveEmployeesRequest = (state: State) => ({
  ...state,
  filteredNoNActiveEmployees: {
    ...state.filteredNoNActiveEmployees,
    data: [],
    totalCount: 0,
  },
});
const filteredNoNActiveEmployeesSuccess = (state: State, { data, totalCount }: State['filteredNoNActiveEmployees']) => ({
  ...state,
  filteredNoNActiveEmployees: {
    ...state.filteredNoNActiveEmployees,
    totalCount: totalCount ?? 0,
    data,
  },
  filteredEmployeesCommon: {
    ...state.filteredEmployeesCommon,
    isPending: false,
  },
});
const filteredNoNActiveEmployeesFailure = (state: State) => ({
  ...state,
  filteredNoNActiveEmployees: {
    ...state.filteredNoNActiveEmployees,
    data: [],
  },
  filteredEmployeesCommon: {
    ...state.filteredEmployeesCommon,
    isPending: false,
  },
});

const updateFilters = (state: State, { filters, resetPagination }: { filters: State['filters'], resetPagination: boolean }) => ({
  ...state,
  filters: {
    ...state?.filters,
    ...(filters || undefined),
    ...(resetPagination && { pagination: defaultFilters.pagination }),
  },
});

const resetFilters = (state: State) => ({
  ...state,
  filters: { ...defaultFilters },
});

const destroyPage = () => ({ ...INITIAL_STATE });

export const HANDLERS = {
  [Types.GET_FILTERED_EMPLOYEES_COMMON_REQUEST]: filteredEmployeesCommonRequest,
  [Types.GET_FILTERED_ACTIVE_EMPLOYEES_REQUEST]: filteredActiveEmployeesRequest,
  [Types.GET_FILTERED_ACTIVE_EMPLOYEES_SUCCESS]: filteredActiveEmployeesSuccess,
  [Types.GET_FILTERED_ACTIVE_EMPLOYEES_FAILURE]: filteredActiveEmployeesFailure,
  [Types.GET_FILTERED_NO_N_ACTIVE_EMPLOYEES_REQUEST]: filteredNoNActiveEmployeesRequest,
  [Types.GET_FILTERED_NO_N_ACTIVE_EMPLOYEES_SUCCESS]: filteredNoNActiveEmployeesSuccess,
  [Types.GET_FILTERED_NO_N_ACTIVE_EMPLOYEES_FAILURE]: filteredNoNActiveEmployeesFailure,
  [Types.UPDATE_FILTERS]: updateFilters,
  [Types.RESET_FILTERS]: resetFilters,
  [Types.DESTROY_PAGE]: destroyPage,
};

export default createReducer(INITIAL_STATE, HANDLERS);
