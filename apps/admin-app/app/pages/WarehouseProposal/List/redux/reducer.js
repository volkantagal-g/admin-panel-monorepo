import { createReducer } from 'reduxsauce';
import moment from 'moment';

import { Types } from './actions';

export const INITIAL_STATE = {
  warehouseProposals: {
    data: [],
    total: 0,
    isPending: false,
  },
  warehouseProposalsReport: { isPending: false },
  cities: {
    data: [],
    isPending: false,
  },
  districts: {
    data: [],
    isPending: false,
  },
  filters: {
    city: null,
    district: null,
    status: null,
    minNetTotalSize: null,
    maxNetTotalSize: null,
    startDate: moment().subtract(30, 'days').startOf('day'),
    endDate: moment().endOf('day'),
    isCreatedByAdmin: false,
    proposalName: null,
    // Pagination
    currentPage: 1,
    rowsPerPage: 10,
    // Sort
    sort: {},
  },
};

const getWarehouseProposals = {
  request: (state = INITIAL_STATE) => {
    return {
      ...state,
      warehouseProposals: {
        ...state.warehouseProposals,
        isPending: true,
      },
    };
  },
  success: (state = INITIAL_STATE, { warehouseProposals = [], totalCount }) => {
    return {
      ...state,
      warehouseProposals: {
        ...state.warehouseProposals,
        data: warehouseProposals,
        total: totalCount,
        isPending: false,
      },
    };
  },
  failure: (state = INITIAL_STATE, { error }) => {
    return {
      ...state,
      warehouseProposals: {
        ...state.warehouseProposals,
        isPending: false,
        error,
      },
    };
  },
};

const getWarehouseProposalsReport = {
  request: (state = INITIAL_STATE) => {
    return {
      ...state,
      warehouseProposalsReport: {
        ...state.warehouseProposalsReport,
        isPending: true,
      },
    };
  },
  success: (state = INITIAL_STATE) => {
    return {
      ...state,
      warehouseProposalsReport: {
        ...state.warehouseProposalsReport,
        isPending: false,
      },
    };
  },
  failure: (state = INITIAL_STATE, { error }) => {
    return {
      ...state,
      warehouseProposalsReport: {
        ...state.warehouseProposalsReport,
        isPending: false,
        error,
      },
    };
  },
};

const getCities = {
  request: (state = INITIAL_STATE) => {
    return {
      ...state,
      cities: {
        ...state.cities,
        isPending: true,
      },
    };
  },
  success: (state = INITIAL_STATE, { data }) => {
    return {
      ...state,
      cities: {
        ...state.cities,
        data,
        isPending: false,
      },
    };
  },
  failure: (state = INITIAL_STATE, { error }) => {
    return {
      ...state,
      cities: {
        ...state.cities,
        isPending: false,
        error,
      },
    };
  },
};

const getDistricts = {
  request: (state = INITIAL_STATE) => {
    return {
      ...state,
      districts: {
        ...state.districts,
        isPending: true,
      },
    };
  },
  success: (state = INITIAL_STATE, { data }) => {
    return {
      ...state,
      districts: {
        ...state.districts,
        data,
        isPending: false,
      },
    };
  },
  failure: (state = INITIAL_STATE, { error }) => {
    return {
      ...state,
      districts: {
        ...state.districts,
        isPending: false,
        error,
      },
    };
  },
};

const setFilters = (state = INITIAL_STATE, { filters }) => {
  return {
    ...state,
    filters: {
      ...state.filters,
      ...filters,
    },
  };
};

const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.GET_WAREHOUSE_PROPOSALS_REQUEST]: getWarehouseProposals.request,
  [Types.GET_WAREHOUSE_PROPOSALS_SUCCESS]: getWarehouseProposals.success,
  [Types.GET_WAREHOUSE_PROPOSALS_FAILURE]: getWarehouseProposals.failure,
  [Types.GET_WAREHOUSE_PROPOSALS_REPORT_REQUEST]: getWarehouseProposalsReport.request,
  [Types.GET_WAREHOUSE_PROPOSALS_REPORT_SUCCESS]: getWarehouseProposalsReport.success,
  [Types.GET_WAREHOUSE_PROPOSALS_REPORT_FAILURE]: getWarehouseProposalsReport.failure,
  [Types.GET_CITIES_REQUEST]: getCities.request,
  [Types.GET_CITIES_SUCCESS]: getCities.success,
  [Types.GET_CITIES_FAILURE]: getCities.failure,
  [Types.GET_DISTRICTS_REQUEST]: getDistricts.request,
  [Types.GET_DISTRICTS_SUCCESS]: getDistricts.success,
  [Types.GET_DISTRICTS_FAILURE]: getDistricts.failure,
  [Types.SET_FILTERS]: setFilters,
  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
