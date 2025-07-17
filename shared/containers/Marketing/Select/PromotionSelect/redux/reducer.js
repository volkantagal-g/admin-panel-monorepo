import { createReducer } from 'reduxsauce';

import { uniqBy } from 'lodash';

import { Types } from './actions';
import { promotionStateKey } from '@shared/containers/Marketing/Select/PromotionSelect/constantValues';
import { PROMO_TYPE } from '@shared/containers/Marketing/Select/PromotionSelect/constants';

export const INITIAL_STATE = {
  [promotionStateKey[PROMO_TYPE.MARKET_PROMO]]: {
    isPending: false,
    data: [],
    error: null,
  },
  [promotionStateKey[PROMO_TYPE.LOCALS_PROMO]]: {
    isPending: false,
    data: [],
    error: null,
  },
  [promotionStateKey[PROMO_TYPE.FOOD_PROMO]]: {
    isPending: false,
    data: [],
    error: null,
  },
};

export const getPromosByTargetDomainRequest = (state = INITIAL_STATE, { promoType }) => {
  return {
    ...state,
    [promotionStateKey[promoType]]: {
      ...INITIAL_STATE[promotionStateKey[promoType]],
      isPending: true,
    },
  };
};

export const getPromosByTargetDomainSuccess = (state = INITIAL_STATE, { data, promoType }) => {
  return {
    ...state,
    [promotionStateKey[promoType]]: {
      ...INITIAL_STATE[promotionStateKey[promoType]],
      data,
      isPending: false,
    },
  };
};

export const getPromosByTargetDomainFailure = (state = INITIAL_STATE, { error, promoType }) => {
  return {
    ...state,
    [promotionStateKey[promoType]]: {
      ...INITIAL_STATE[promotionStateKey[promoType]],
      isPending: false,
      error,
    },
  };
};

export const getPromoDetailsByTargetDomainRequest = (state = INITIAL_STATE, { promoType }) => {
  return {
    ...state,
    [promotionStateKey[promoType]]: {
      ...INITIAL_STATE[promotionStateKey[promoType]],
      isPending: true,
    },
  };
};

export const getPromoDetailsByTargetDomainSuccess = (state = INITIAL_STATE, { promoDetail, promoType }) => {
  // Prevent duplicated options
  const uniqPromoList = uniqBy([...state[promotionStateKey[promoType]].data, promoDetail], 'value');
  return {
    ...state,
    [promotionStateKey[promoType]]: {
      ...INITIAL_STATE[promotionStateKey[promoType]],
      data: uniqPromoList,
      isPending: false,
    },
  };
};

export const getPromoDetailsByTargetDomainFailure = (state = INITIAL_STATE, { error, promoType }) => {
  return {
    ...state,
    [promotionStateKey[promoType]]: {
      ...INITIAL_STATE[promotionStateKey[promoType]],
      isPending: false,
      error,
    },
  };
};

const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.GET_PROMOS_BY_TARGET_DOMAIN_REQUEST]: getPromosByTargetDomainRequest,
  [Types.GET_PROMOS_BY_TARGET_DOMAIN_SUCCESS]: getPromosByTargetDomainSuccess,
  [Types.GET_PROMOS_BY_TARGET_DOMAIN_FAILURE]: getPromosByTargetDomainFailure,

  [Types.GET_PROMO_DETAILS_BY_TARGET_DOMAIN_REQUEST]: getPromoDetailsByTargetDomainRequest,
  [Types.GET_PROMO_DETAILS_BY_TARGET_DOMAIN_SUCCESS]: getPromoDetailsByTargetDomainSuccess,
  [Types.GET_PROMO_DETAILS_BY_TARGET_DOMAIN_FAILURE]: getPromoDetailsByTargetDomainFailure,

  [Types.DESTROY_CONTAINER]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
