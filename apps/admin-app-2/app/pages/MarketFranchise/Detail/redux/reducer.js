import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  marketFranchise: {
    data: {},
    isPending: false,
    error: null,
  },
  crisisCard: {
    isSuccess: false,
    isPending: false,
    error: null,
    data: {},
  },
  crisisLogs: {
    data: [],
    isPending: false,
    error: null,
    count: 0,
    pagination: { currentPage: 1, rowsPerPage: 10 },
  },
  crisisCardList: {
    data: [],
    count: 0,
    isPending: false,
    error: null,
    pagination: { currentPage: 1, rowsPerPage: 10 },
  },
  createFranchiseArea: {
    data: {},
    isPending: false,
    isSuccess: false,
  },
  updateFranchiseArea: {
    isPending: false,
    isSuccess: false,
  },
  deleteFranchiseArea: {
    isPending: false,
    isSuccess: false,
  },
};

export const updateCommissionRatesRequest = state => {
  return {
    ...state,
    marketFranchise: {
      ...state.marketFranchise,
      isPending: true,
    },
  };
};

export const updateCommissionRatesSuccess = (state, { data }) => {
  return {
    ...state,
    marketFranchise: {
      ...state.marketFranchise,
      data,
      isPending: false,
    },
  };
};

export const updateCommissionRatesFailure = (state, { error }) => {
  return {
    ...state,
    marketFranchise: {
      ...state.marketFranchise,
      isPending: false,
      error,
    },
  };
};

export const getMarketFranchiseRequest = state => {
  return {
    ...state,
    marketFranchise: {
      ...state.marketFranchise,
      isPending: true,
    },
  };
};

export const getMarketFranchiseSuccess = (state, { data }) => {
  return {
    ...state,
    marketFranchise: {
      ...state.marketFranchise,
      data,
      isPending: false,
    },
  };
};

export const getMarketFranchiseFailure = (state, { error }) => {
  return {
    ...state,
    marketFranchise: {
      ...state.marketFranchise,
      isPending: false,
      error,
    },
  };
};

export const updateMarketFranchiseRequest = state => {
  return {
    ...state,
    marketFranchise: {
      ...state.marketFranchise,
      isPending: true,
    },
  };
};

export const updateMarketFranchiseSuccess = (state, { data }) => {
  return {
    ...state,
    marketFranchise: {
      ...state.marketFranchise,
      data,
      isPending: false,
    },
  };
};

export const updateMarketFranchiseFailure = (state, { error }) => {
  return {
    ...state,
    marketFranchise: {
      ...state.marketFranchise,
      isPending: false,
      error,
    },
  };
};

export const updateMarketFranchiseWithSAPRequest = state => {
  return {
    ...state,
    marketFranchise: {
      ...state.marketFranchise,
      isPending: true,
    },
  };
};

export const updateMarketFranchiseWithSAPSuccess = (state, { data }) => {
  return {
    ...state,
    marketFranchise: {
      ...state.marketFranchise,
      data,
      isPending: false,
    },
  };
};

export const updateMarketFranchiseWithSAPFailure = (state, { error }) => {
  return {
    ...state,
    marketFranchise: {
      ...state.marketFranchise,
      isPending: false,
      error,
    },
  };
};

export const createNewCrisisCardRequest = state => {
  return {
    ...state,
    crisisCard: {
      ...state.crisisCard,
      isPending: true,
      isSuccess: false,
    },
  };
};

export const createNewCrisisCardSuccess = state => {
  return {
    ...state,
    crisisCard: {
      ...state.crisisCard,
      isSuccess: true,
      isPending: false,
    },
    crisisCardList: {
      ...state.crisisCardList,
      pagination: { ...INITIAL_STATE.crisisCardList.pagination },
    },
    crisisLogs: {
      ...state.crisisLogs,
      pagination: { ...INITIAL_STATE.crisisLogs.pagination },
    },
  };
};

export const createNewCrisisCardFailure = (state, { error }) => {
  return {
    ...state,
    crisisCard: {
      ...state.crisisCard,
      isPending: false,
      isSuccess: false,
      error,
    },
  };
};

export const updateCrisisCardRequest = state => {
  return {
    ...state,
    crisisCard: {
      ...state.crisisCard,
      isPending: true,
    },
  };
};

export const updateCrisisCardSuccess = state => {
  return {
    ...state,
    crisisCard: {
      ...state.crisisCard,
      isSuccess: true,
      isPending: false,
    },
    crisisCardList: {
      ...state.crisisCardList,
      pagination: { ...INITIAL_STATE.crisisCardList.pagination },
    },
    crisisLogs: {
      ...state.crisisLogs,
      pagination: { ...INITIAL_STATE.crisisLogs.pagination },
    },
  };
};

export const updateCrisisCardFailure = (state, { error }) => {
  return {
    ...state,
    crisisCard: {
      ...state.crisisCard,
      isPending: false,
      isSuccess: false,
      error,
    },
  };
};

export const createNewCrisisCardModalClose = state => {
  return {
    ...state,
    crisisCard: {
      ...state.crisisCard,
      isSuccess: false,
      isPending: false,
      error: null,
    },
  };
};

export const getCrisisLogsRequest = state => {
  return {
    ...state,
    crisisLogs: {
      ...state.crisisLogs,
      isPending: true,
    },
  };
};

export const getCrisisLogsSuccess = (state, { data = [], count = 0 }) => {
  return {
    ...state,
    crisisLogs: {
      ...state.crisisLogs,
      data,
      count,
      isPending: false,
    },
  };
};

export const getCrisisLogsFailure = (state, { error }) => {
  return {
    ...state,
    crisisLogs: {
      ...state.crisisLogs,
      isPending: false,
      error,
    },
  };
};

export const changeCrisisLogsPagination = (state, { currentPage, rowsPerPage }) => {
  return {
    ...state,
    crisisLogs: {
      ...state.crisisLogs,
      pagination: { currentPage, rowsPerPage },
    },
  };
};

export const getCrisisCardListRequest = state => {
  return {
    ...state,
    crisisCardList: {
      ...state.crisisCardList,
      isPending: true,
    },
  };
};

export const getCrisisCardListSuccess = (state, { data = [], count = 0 }) => {
  return {
    ...state,
    crisisCardList: {
      ...state.crisisCardList,
      isPending: false,
      data,
      count,
    },
  };
};

export const getCrisisCardListFailure = (state, { error }) => {
  return {
    ...state,
    crisisCardList: {
      ...state.crisisCardList,
      isPending: false,
      error,
    },
  };
};

export const changeCrisisCardListPagination = (state, { currentPage, rowsPerPage }) => {
  return {
    ...state,
    crisisCardList: {
      ...state.crisisCardList,
      pagination: { currentPage, rowsPerPage },
    },
  };
};

export const getCrisisCardRequest = state => {
  return {
    ...state,
    crisisCard: {
      ...state.crisisCard,
      isPending: true,
    },
  };
};

export const getCrisisCardSuccess = (state, { data }) => {
  return {
    ...state,
    crisisCard: {
      ...state.crisisCard,
      isPending: false,
      data,
    },
  };
};

export const getCrisisCardFailure = (state, { error }) => {
  return {
    ...state,
    crisisCard: {
      ...state.crisisCard,
      isPending: false,
      error,
    },
  };
};

export const removeCrisisCardRequest = state => {
  return {
    ...state,
    crisisCardList: {
      ...state.crisisCardList,
      isPending: true,
    },
  };
};

export const removeCrisisCardSuccess = state => {
  return {
    ...state,
    crisisCardList: {
      ...state.crisisCardList,
      isPending: false,
      pagination: { ...INITIAL_STATE.crisisCardList.pagination },
    },
    crisisLogs: {
      ...state.crisisLogs,
      pagination: { ...INITIAL_STATE.crisisLogs.pagination },
    },
  };
};

export const removeCrisisCardFailure = state => {
  return {
    ...state,
    crisisCardList: {
      ...state.crisisCardList,
      isPending: false,
    },
  };
};

export const createFranchiseAreaRequest = state => {
  return {
    ...state,
    createFranchiseArea: {
      ...state.createFranchiseArea,
      isPending: true,
      isSuccess: false,
    },
  };
};

export const createFranchiseAreaSuccess = (state, { data }) => {
  return {
    ...state,
    createFranchiseArea: {
      ...state.createFranchiseArea,
      isSuccess: true,
      isPending: false,
      data,
    },
  };
};

export const createFranchiseAreaFailure = (state, { error }) => {
  return {
    ...state,
    createFranchiseArea: {
      ...state.createFranchiseArea,
      isPending: false,
      isSuccess: false,
      error,
    },
  };
};

export const updateFranchiseAreaRequest = state => {
  return {
    ...state,
    updateFranchiseArea: {
      ...state.updateFranchiseArea,
      isPending: true,
      isSuccess: false,
    },
  };
};

export const updateFranchiseAreaSuccess = state => {
  return {
    ...state,
    updateFranchiseArea: {
      ...state.updateFranchiseArea,
      isSuccess: true,
      isPending: false,
    },
  };
};

export const updateFranchiseAreaFailure = state => {
  return {
    ...state,
    updateFranchiseArea: {
      ...state.updateFranchiseArea,
      isPending: false,
      isSuccess: false,
    },
  };
};

export const deleteFranchiseAreaRequest = state => {
  return {
    ...state,
    deleteFranchiseArea: {
      ...state.deleteFranchiseArea,
      isPending: true,
      isSuccess: false,
    },
  };
};

export const deleteFranchiseAreaSuccess = state => {
  return {
    ...state,
    deleteFranchiseArea: {
      ...state.deleteFranchiseArea,
      isSuccess: true,
      isPending: false,
    },
  };
};

export const deleteFranchiseAreaFailure = state => {
  return {
    ...state,
    deleteFranchiseArea: {
      ...state.deleteFranchiseArea,
      isPending: false,
      isSuccess: false,
    },
  };
};

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.GET_MARKET_FRANCHISE_REQUEST]: getMarketFranchiseRequest,
  [Types.GET_MARKET_FRANCHISE_SUCCESS]: getMarketFranchiseSuccess,
  [Types.GET_MARKET_FRANCHISE_FAILURE]: getMarketFranchiseFailure,
  [Types.UPDATE_MARKET_FRANCHISE_REQUEST]: updateMarketFranchiseRequest,
  [Types.UPDATE_MARKET_FRANCHISE_SUCCESS]: updateMarketFranchiseSuccess,
  [Types.UPDATE_MARKET_FRANCHISE_FAILURE]: updateMarketFranchiseFailure,
  [Types.UPDATE_MARKET_FRANCHISE_WITH_SAP_REQUEST]: updateMarketFranchiseWithSAPRequest,
  [Types.UPDATE_MARKET_FRANCHISE_WITH_SAP_SUCCESS]: updateMarketFranchiseWithSAPSuccess,
  [Types.UPDATE_MARKET_FRANCHISE_WITH_SAP_FAILURE]: updateMarketFranchiseWithSAPFailure,
  [Types.UPDATE_COMMISSION_RATES_REQUEST]: updateCommissionRatesRequest,
  [Types.UPDATE_COMMISSION_RATES_SUCCESS]: updateCommissionRatesSuccess,
  [Types.UPDATE_COMMISSION_RATES_FAILURE]: updateCommissionRatesFailure,
  [Types.CREATE_NEW_CRISIS_CARD_REQUEST]: createNewCrisisCardRequest,
  [Types.CREATE_NEW_CRISIS_CARD_SUCCESS]: createNewCrisisCardSuccess,
  [Types.CREATE_NEW_CRISIS_CARD_FAILURE]: createNewCrisisCardFailure,
  [Types.UPDATE_CRISIS_CARD_REQUEST]: updateCrisisCardRequest,
  [Types.UPDATE_CRISIS_CARD_SUCCESS]: updateCrisisCardSuccess,
  [Types.UPDATE_CRISIS_CARD_FAILURE]: updateCrisisCardFailure,
  [Types.GET_CRISIS_LOGS_REQUEST]: getCrisisLogsRequest,
  [Types.GET_CRISIS_LOGS_SUCCESS]: getCrisisLogsSuccess,
  [Types.GET_CRISIS_LOGS_FAILURE]: getCrisisLogsFailure,
  [Types.CHANGE_CRISIS_LOGS_PAGINATION]: changeCrisisLogsPagination,
  [Types.CREATE_NEW_CRISIS_CARD_MODAL_CLOSE]: createNewCrisisCardModalClose,
  [Types.GET_CRISIS_CARD_LIST_REQUEST]: getCrisisCardListRequest,
  [Types.GET_CRISIS_CARD_LIST_SUCCESS]: getCrisisCardListSuccess,
  [Types.GET_CRISIS_CARD_LIST_FAILURE]: getCrisisCardListFailure,
  [Types.CHANGE_CRISIS_CARD_LIST_PAGINATION]: changeCrisisCardListPagination,
  [Types.GET_CRISIS_CARD_REQUEST]: getCrisisCardRequest,
  [Types.GET_CRISIS_CARD_SUCCESS]: getCrisisCardSuccess,
  [Types.GET_CRISIS_CARD_FAILURE]: getCrisisCardFailure,
  [Types.REMOVE_CRISIS_CARD_REQUEST]: removeCrisisCardRequest,
  [Types.REMOVE_CRISIS_CARD_SUCCESS]: removeCrisisCardSuccess,
  [Types.REMOVE_CRISIS_CARD_FAILURE]: removeCrisisCardFailure,
  [Types.CREATE_FRANCHISE_AREA_REQUEST]: createFranchiseAreaRequest,
  [Types.CREATE_FRANCHISE_AREA_SUCCESS]: createFranchiseAreaSuccess,
  [Types.CREATE_FRANCHISE_AREA_FAILURE]: createFranchiseAreaFailure,
  [Types.UPDATE_FRANCHISE_AREA_REQUEST]: updateFranchiseAreaRequest,
  [Types.UPDATE_FRANCHISE_AREA_SUCCESS]: updateFranchiseAreaSuccess,
  [Types.UPDATE_FRANCHISE_AREA_FAILURE]: updateFranchiseAreaFailure,
  [Types.DELETE_FRANCHISE_AREA_REQUEST]: deleteFranchiseAreaRequest,
  [Types.DELETE_FRANCHISE_AREA_SUCCESS]: deleteFranchiseAreaSuccess,
  [Types.DELETE_FRANCHISE_AREA_FAILURE]: deleteFranchiseAreaFailure,
  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
