import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export type State = {
  filterOptions: {
    isPending: boolean,
    data: { [key: string]: string[] },
  },
  kpiAcronymDictionary: {
    isPending: boolean,
    data: { fullName: { [key: string]: string }, acronym: { [key: string]: string } }[],
  },
  kpiDictionary: {
    isPending: boolean,
    data: unknown[],
    totalCount: number,
  },
  filters: { [key: string]: any }
};

export const defaultFilters = {
  categories: [],
  acronyms: [],
  domains: [],
  search: '',
  pagination: {
    currentPage: 1,
    rowsPerPage: 50,
    total: 0,
  },
};

export const INITIAL_STATE: State = {
  filterOptions: {
    isPending: false,
    data: {},
  },
  kpiDictionary: {
    isPending: false,
    data: [],
    totalCount: 0,
  },
  kpiAcronymDictionary: {
    isPending: false,
    data: [],
  },
  filters: { ...defaultFilters },
};

const filterOptionsRequest = (state: State) => ({
  ...state,
  filterOptions: {
    ...state.filterOptions,
    isPending: true,
    data: {},
  },
});
const filterOptionsSuccess = (state: State, { data }: { data: State['filterOptions']['data'] }) => ({
  ...state,
  filterOptions: {
    ...state.filterOptions,
    isPending: false,
    data,
  },
});
const filterOptionsFailure = (state: State) => ({
  ...state,
  filterOptions: {
    ...state.filterOptions,
    isPending: false,
  },
});

const getKPIAcronymDictionaryRequest = (state: State) => ({
  ...state,
  kpiAcronymDictionary: {
    ...state.kpiAcronymDictionary,
    isPending: true,
    data: [],
  },
});
const getKPIAcronymDictionarySuccess = (state: State, { data }: { data: State['kpiAcronymDictionary']['data'] }) => ({
  ...state,
  kpiAcronymDictionary: {
    ...state.kpiAcronymDictionary,
    isPending: false,
    data,
  },
});
const getKPIAcronymDictionaryFailure = (state: State) => ({
  ...state,
  kpiAcronymDictionary: {
    ...state.kpiAcronymDictionary,
    isPending: false,
  },
});

const kpiDictionaryRequest = (state: State) => ({
  ...state,
  kpiDictionary: {
    ...state.kpiDictionary,
    isPending: true,
    data: [],
  },
});
const kpiDictionarySuccess = (state: State, { data, totalCount }: { data: State['kpiDictionary']['data'], totalCount: number }) => ({
  ...state,
  kpiDictionary: {
    ...state.kpiDictionary,
    isPending: false,
    totalCount,
    data,
  },
});
const kpiDictionaryFailure = (state: State) => ({
  ...state,
  kpiDictionary: {
    ...state.kpiDictionary,
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
  [Types.GET_FILTER_OPTIONS_REQUEST]: filterOptionsRequest,
  [Types.GET_FILTER_OPTIONS_SUCCESS]: filterOptionsSuccess,
  [Types.GET_FILTER_OPTIONS_FAILURE]: filterOptionsFailure,
  [Types.GET_KPI_ACRONYM_DICTIONARY_REQUEST]: getKPIAcronymDictionaryRequest,
  [Types.GET_KPI_ACRONYM_DICTIONARY_SUCCESS]: getKPIAcronymDictionarySuccess,
  [Types.GET_KPI_ACRONYM_DICTIONARY_FAILURE]: getKPIAcronymDictionaryFailure,
  [Types.GET_KPI_DICTIONARY_REQUEST]: kpiDictionaryRequest,
  [Types.GET_KPI_DICTIONARY_SUCCESS]: kpiDictionarySuccess,
  [Types.GET_KPI_DICTIONARY_FAILURE]: kpiDictionaryFailure,
  [Types.UPDATE_FILTERS]: updateFilters,
  [Types.RESET_FILTERS]: resetFilters,
  [Types.DESTROY_PAGE]: destroyPage,
};

export default createReducer(INITIAL_STATE, HANDLERS);
