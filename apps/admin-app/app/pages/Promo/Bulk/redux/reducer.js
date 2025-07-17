import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  getMasterPromoIds: {
    isPending: false,
    data: [],
    error: null,
  },
  createBulkPromos: {
    isPending: false,
    data: [],
    error: null,
  },
};

export const getMasterPromoIdsRequest = state => {
  return {
    ...state,
    getMasterPromoIds: {
      data: state.getMasterPromoIds.data,
      error: null,
      isPending: true,
    },
  };
};

export const getMasterPromoIdsSuccess = (
  state,
  { promos = [], totalCount },
) => {
  return {
    ...state,
    getMasterPromoIds: {
      ...INITIAL_STATE.getMasterPromoIds,
      data: promos,
      isPending: false,
      totalCount,
    },
  };
};

export const getMasterPromoIdsFailure = (state, { error }) => {
  return {
    ...state,
    getMasterPromoIds: {
      ...INITIAL_STATE.getMasterPromoIds,
      error,
      isPending: false,
    },
  };
};

export const createBulkPromosRequest = state => {
  return {
    ...state,
    createBulkPromos: {
      ...INITIAL_STATE.createBulkPromos,
      isPending: true,
    },
  };
};

export const createBulkPromosSuccess = (state, { data }) => {
  return {
    ...state,
    createBulkPromos: {
      ...INITIAL_STATE.createBulkPromos,
      data,
      isPending: false,
    },
  };
};

export const createBulkPromosFailure = (state, { error }) => {
  return {
    ...state,
    createBulkPromos: {
      ...INITIAL_STATE.createBulkPromos,
      error,
      isPending: false,
    },
  };
};

const initPage = () => ({ ...INITIAL_STATE });

export const destroy = () => ({ ...INITIAL_STATE });

export const HANDLERS = {
  [Types.INIT_PAGE]: initPage,
  [Types.GET_MASTER_PROMO_IDS_REQUEST]: getMasterPromoIdsRequest,
  [Types.GET_MASTER_PROMO_IDS_SUCCESS]: getMasterPromoIdsSuccess,
  [Types.GET_MASTER_PROMO_IDS_FAILURE]: getMasterPromoIdsFailure,
  [Types.CREATE_BULK_PROMOS_REQUEST]: createBulkPromosRequest,
  [Types.CREATE_BULK_PROMOS_SUCCESS]: createBulkPromosSuccess,
  [Types.CREATE_BULK_PROMOS_FAILURE]: createBulkPromosFailure,
  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
