import { createReducer } from 'reduxsauce';
import moment from 'moment';

import { MINUTES_IN_A_DAY } from '@shared/shared/constants';
import { Types } from './actions';
import { TABLE_TYPES } from '../components/Table/constants';
import { getSelectedDomainType } from '@shared/redux/selectors/common';

const generateCustomInitialState = () => ({
  isPageInitialized: false,
  filters: {
    hoursRange: [0, MINUTES_IN_A_DAY],
    dateRange: [moment().startOf('day'), moment().endOf('day')],
    singleDate: moment().endOf('day'),
    selectedDateButton: null,
    cities: [],
    countries: [],
    domainType: getSelectedDomainType(),
  },
  tableFilters: {
    searchTerm: '',
    suppliers: [],
    categories: [],
    subCategories: [],
    tableType: TABLE_TYPES.PRODUCT,
  },
  productSaleStats: {
    isPending: false,
    data: {},
  },
  availability: {
    isPending: false,
    data: {},
  },
  instantAvailability: {
    isPending: false,
    data: {},
  },
});

export const INITIAL_STATE = generateCustomInitialState();

const productSaleStatsRequest = (state = INITIAL_STATE) => ({
  ...state,
  productSaleStats: {
    ...state.productSaleStats,
    isPending: true,
    data: {},
  },
});

const productSaleStatsSuccess = (state = INITIAL_STATE, { data }) => ({
  ...state,
  productSaleStats: {
    ...state.productSaleStats,
    isPending: false,
    data,
  },
});

const productSaleStatsFailure = (state = INITIAL_STATE) => ({
  ...state,
  productSaleStats: {
    ...state.productSaleStats,
    isPending: false,
  },
});

const availabilityRequest = (state = INITIAL_STATE) => ({
  ...state,
  availability: {
    ...state.availability,
    isPending: true,
    data: {},
  },
});

const availabilitySuccess = (state = INITIAL_STATE, { data }) => ({
  ...state,
  availability: {
    ...state.availability,
    isPending: false,
    data,
  },
});

const availabilityFailure = (state = INITIAL_STATE) => ({
  ...state,
  availability: {
    ...state.availability,
    isPending: false,
  },
});

const instantAvailabilityRequest = (state = INITIAL_STATE) => ({
  ...state,
  instantAvailability: {
    ...state.instantAvailability,
    isPending: true,
    data: {},
  },
});

const instantAvailabilitySuccess = (state = INITIAL_STATE, { data }) => ({
  ...state,
  instantAvailability: {
    ...state.instantAvailability,
    isPending: false,
    data,
  },
});

const instantAvailabilityFailure = (state = INITIAL_STATE) => ({
  ...state,
  instantAvailability: {
    ...state.instantAvailability,
    isPending: false,
  },
});

const setFilterParams = (state = INITIAL_STATE, { filterParams = {} }) => ({
  ...state,
  filters: {
    ...state.filters,
    ...filterParams,
  },
});

const setTableFilterParams = (state = INITIAL_STATE, { filterParams = {} }) => ({
  ...state,
  tableFilters: {
    ...state.tableFilters,
    ...filterParams,
  },
});

const destroyPage = () => ({ ...INITIAL_STATE });
const initPage = () => {
  const generatedInitialState = generateCustomInitialState();
  return { ...generatedInitialState, isPageInitialized: true };
};

export const HANDLERS = {
  [Types.GET_PRODUCT_SALE_STATS_REQUEST]: productSaleStatsRequest,
  [Types.GET_PRODUCT_SALE_STATS_SUCCESS]: productSaleStatsSuccess,
  [Types.GET_PRODUCT_SALE_STATS_FAILURE]: productSaleStatsFailure,
  [Types.GET_AVAILABILITY_REQUEST]: availabilityRequest,
  [Types.GET_AVAILABILITY_SUCCESS]: availabilitySuccess,
  [Types.GET_AVAILABILITY_FAILURE]: availabilityFailure,
  [Types.GET_INSTANT_AVAILABILITY_REQUEST]: instantAvailabilityRequest,
  [Types.GET_INSTANT_AVAILABILITY_SUCCESS]: instantAvailabilitySuccess,
  [Types.GET_INSTANT_AVAILABILITY_FAILURE]: instantAvailabilityFailure,
  [Types.SET_FILTER_PARAMS]: setFilterParams,
  [Types.SET_TABLE_FILTER_PARAMS]: setTableFilterParams,
  [Types.DESTROY_PAGE]: destroyPage,
  [Types.INIT_PAGE]: initPage,
};

export default createReducer(INITIAL_STATE, HANDLERS);
