import { createReducer } from 'reduxsauce';

import { INIT_FILTERS } from '../constants';
import { Types } from './actions';

export const INITIAL_STATE = {
  cardInstallmentCounts: { // coming form API response
    isPending: false,
    data: {},
  },
  updatedInstallments: [], // using for summary table
  updateCardInstallmentCounts: { // update card installment API call
    isPending: false,
    data: {},
  },
  initialCardInstallmentCounts: { data: {} }, // set initial response from getCardInstallmentCounts when page opened
  filters: { ...INIT_FILTERS },
  pagination: {
    currentPage: INIT_FILTERS.currentPage,
    rowsPerPage: INIT_FILTERS.rowsPerPage,
  },
  cardUserType: { data: 'PERSONAL' },
};

const cardInstallmentCountsRequest = (state = INITIAL_STATE) => ({
  ...state,
  cardInstallmentCounts: {
    ...state.cardInstallmentCounts,
    isPending: true,
    data: {},
  },
});

const cardInstallmentCountsSuccess = (state = INITIAL_STATE, { data }) => ({
  ...state,
  cardInstallmentCounts: {
    ...state.cardInstallmentCounts,
    isPending: false,
    data,
  },
});

const cardInstallmentCountsFailure = (state = INITIAL_STATE) => ({
  ...state,
  cardInstallmentCounts: {
    ...state.cardInstallmentCounts,
    isPending: false,
  },
});

const updateLocalInstallmentDataRequest = (state = INITIAL_STATE, { updatedInstallments }) => ({
  ...state,
  updatedInstallments,
});

const updateCardInstallmentCountsRequest = (state = INITIAL_STATE) => ({
  ...state,
  updateCardInstallmentCounts: {
    ...state.updateCardInstallmentCounts,
    isPending: true,
    data: {},
  },
});

const updateCardInstallmentCountsSuccess = (state = INITIAL_STATE, { data }) => ({
  ...state,
  updateCardInstallmentCounts: {
    ...state.updateCardInstallmentCounts,
    isPending: false,
    data,
  },
});

const updateCardInstallmentCountsFailure = (state = INITIAL_STATE) => ({
  ...state,
  updateCardInstallmentCounts: {
    ...state.updateCardInstallmentCounts,
    isPending: false,
  },
});

const setInitialCardInstallmentCounts = (state = INITIAL_STATE, { data }) => ({
  ...state,
  initialCardInstallmentCounts: {
    ...state.initialCardInstallmentCounts,
    data,
  },
});

const setFilters = (state, { filters }) => ({
  ...state,
  filters,
});

const resetFilters = state => ({
  ...state,
  filters: { ...INIT_FILTERS },
});

const setPagination = (state = INITIAL_STATE, { currentPage, rowsPerPage }) => {
  return {
    ...state,
    pagination: {
      currentPage,
      rowsPerPage,
    },
  };
};

const updateCardUserTypeTabSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    cardUserType: { data },
  };
};

const destroyPage = () => ({ ...INITIAL_STATE });

export const HANDLERS = {
  [Types.GET_CARD_INSTALLMENT_COUNTS_REQUEST]: cardInstallmentCountsRequest,
  [Types.GET_CARD_INSTALLMENT_COUNTS_SUCCESS]: cardInstallmentCountsSuccess,
  [Types.GET_CARD_INSTALLMENT_COUNTS_FAILURE]: cardInstallmentCountsFailure,

  [Types.UPDATE_LOCAL_INSTALLMENT_DATA_REQUEST]: updateLocalInstallmentDataRequest,

  [Types.UPDATE_CARD_INSTALLMENT_COUNTS_REQUEST]: updateCardInstallmentCountsRequest,
  [Types.UPDATE_CARD_INSTALLMENT_COUNTS_SUCCESS]: updateCardInstallmentCountsSuccess,
  [Types.UPDATE_CARD_INSTALLMENT_COUNTS_FAILURE]: updateCardInstallmentCountsFailure,

  [Types.SET_INITIAL_CARD_INSTALLMENT_COUNTS]: setInitialCardInstallmentCounts,

  [Types.SET_FILTERS]: setFilters,
  [Types.RESET_FILTERS]: resetFilters,

  [Types.SET_PAGINATION]: setPagination,

  [Types.UPDATE_CARD_USER_TYPE_TAB_SUCCESS]: updateCardUserTypeTabSuccess,

  [Types.DESTROY_PAGE]: destroyPage,
};

export default createReducer(INITIAL_STATE, HANDLERS);
