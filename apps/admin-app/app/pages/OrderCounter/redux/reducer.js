import { createReducer } from 'reduxsauce';

import { Types } from './actions';

const INITIAL_COUNTER_TYPE = 'country';

export const INITIAL_STATE = {
  filters: { orderType: INITIAL_COUNTER_TYPE },
  totalOrderCounts: {
    isPending: false,
    data: [],
  },
};

const setFilterParams = (state = INITIAL_STATE, { filterParams = {} }) => ({
  ...state,
  filters: {
    ...state.filters,
    ...filterParams,
  },
});

const getTotalOrderCountsDataRequest = (state = INITIAL_STATE) => ({
  ...state,
  totalOrderCounts: {
    ...state.totalOrderCounts,
    isPending: true,
    data: [],
  },
});

const getTotalOrderCountsDataSuccess = (state = INITIAL_STATE, { data }) => ({
  ...state,
  totalOrderCounts: {
    ...state.totalOrderCounts,
    isPending: false,
    data,
  },
});

const getTotalOrderCountsDataFailure = (state = INITIAL_STATE) => ({
  ...state,
  totalOrderCounts: {
    ...state.totalOrderCounts,
    isPending: false,
  },
});

const destroyPage = () => ({ ...INITIAL_STATE });

export const HANDLERS = {
  [Types.SET_FILTER_PARAMS]: setFilterParams,
  [Types.GET_TOTAL_ORDER_COUNTS_DATA_REQUEST]: getTotalOrderCountsDataRequest,
  [Types.GET_TOTAL_ORDER_COUNTS_DATA_SUCCESS]: getTotalOrderCountsDataSuccess,
  [Types.GET_TOTAL_ORDER_COUNTS_DATA_FAILURE]: getTotalOrderCountsDataFailure,
  [Types.DESTROY_PAGE]: destroyPage,
};

export default createReducer(INITIAL_STATE, HANDLERS);
