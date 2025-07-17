import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  personalPromo: {
    data: null,
    isPending: false,
    error: null,
  },
};

export const getPersonalPromoRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    personalPromo: {
      ...state.personalPromo,
      isPending: true,
    },
  };
};

export const getPersonalPromoSuccess = (
  state = INITIAL_STATE,
  { personalPromo = {} },
) => {
  return {
    ...state,
    personalPromo: {
      ...state.personalPromo,
      data: personalPromo,
      isPending: false,
    },
  };
};

export const getPersonalPromoFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    personalPromo: {
      ...state.personalPromo,
      isPending: false,
      error,
    },
  };
};

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.GET_PERSONAL_PROMO_REQUEST]: getPersonalPromoRequest,
  [Types.GET_PERSONAL_PROMO_SUCCESS]: getPersonalPromoSuccess,
  [Types.GET_PERSONAL_PROMO_FAILURE]: getPersonalPromoFailure,
  [Types.UPDATE_PERSONAL_PROMO_DATES_REQUEST]: getPersonalPromoRequest,
  [Types.UPDATE_PERSONAL_PROMO_DATES_FAILURE]: getPersonalPromoFailure,
  [Types.UPDATE_PERSONAL_PROMO_STATUS_REQUEST]: getPersonalPromoRequest,
  [Types.UPDATE_PERSONAL_PROMO_STATUS_FAILURE]: getPersonalPromoFailure,
  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
