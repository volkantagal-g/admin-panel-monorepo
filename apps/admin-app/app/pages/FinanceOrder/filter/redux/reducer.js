import { createReducer } from 'reduxsauce';

import moment from 'moment';

import { DEFAULT_ROWS_PER_PAGE, FILTER_DOMAINS, FILTER_STATUSES } from '../constants';
import { Types } from './actions';

export const INITIAL_STATE = {
  financeOrderFilter: {
    isPending: false,
    data: [],
    filters: {
      startCheckoutDate: moment().startOf('day').format(),
      endCheckoutDate: moment().endOf('day').format(),
      domainTypes: FILTER_DOMAINS[0].name,
      status: FILTER_STATUSES[0].name,
      orderId: '',
      fullName: '',
      warehouseId: '',
      warehouseIdInput: '',
      barcode: '',
      city: null,
      phoneNumber: '',
    },
    pagination: {
      currentPage: 1,
      rowsPerPage: DEFAULT_ROWS_PER_PAGE,
    },
    totalCount: 0,
  },
};

const financeOrderFilterRequest = (state = INITIAL_STATE) => ({
  ...state,
  financeOrderFilter: {
    ...state.financeOrderFilter,
    isPending: true,
    data: [],
  },
});

const financeOrderFilterSuccess = (state = INITIAL_STATE, { data }) => ({
  ...state,
  financeOrderFilter: {
    ...state.financeOrderFilter,
    isPending: false,
    data: data?.orders,
    totalCount: data?.totalCount,
  },
});

const financeOrderFilterFailure = (state = INITIAL_STATE) => ({
  ...state,
  financeOrderFilter: {
    ...state.financeOrderFilter,
    isPending: false,
  },
});

const updateFinanceOrderFilterValues = (state = INITIAL_STATE, data) => ({
  ...state,
  financeOrderFilter: {
    ...state.financeOrderFilter,
    isPending: true,
    filters: {
      ...state.financeOrderFilter.filters,
      ...data,
    },
    pagination: INITIAL_STATE.financeOrderFilter.pagination,
  },
});

const updateFinanceOrderFilterPagination = (state = INITIAL_STATE, data) => ({
  ...state,
  financeOrderFilter: {
    ...state.financeOrderFilter,
    isPending: true,
    pagination: { ...state.financeOrderFilter.pagination, ...data },
  },
});

const setSelectedCity = (state = INITIAL_STATE, { city }) => {
  return {
    ...state,
    financeOrderFilter: {
      ...state.financeOrderFilter,
      filters: {
        ...state.financeOrderFilter.filters,
        city,
      },
    },
  };
};

const destroyPage = () => ({ ...INITIAL_STATE });

export const HANDLERS = {
  [Types.GET_FINANCE_ORDER_FILTER_REQUEST]: financeOrderFilterRequest,
  [Types.GET_FINANCE_ORDER_FILTER_SUCCESS]: financeOrderFilterSuccess,
  [Types.GET_FINANCE_ORDER_FILTER_FAILURE]: financeOrderFilterFailure,
  [Types.UPDATE_FINANCE_ORDER_FILTER_VALUES]: updateFinanceOrderFilterValues,
  [Types.UPDATE_FINANCE_ORDER_FILTER_PAGINATION]: updateFinanceOrderFilterPagination,
  [Types.DESTROY_PAGE]: destroyPage,
  [Types.SET_SELECTED_CITY]: setSelectedCity,
};

export default createReducer(INITIAL_STATE, HANDLERS);
