import { createReducer } from 'reduxsauce';

import { Types } from './actions';

const INITIAL_STATE = {
  personalPromo: {
    isPending: false,
    data: [],
    error: null,
  },
  disablePersonalPromo: {
    isPending: false,
    data: [],
    error: null,
  },
};

const getPersonalPromoRequest = (state = INITIAL_STATE) => ({
  ...state,
  personalPromo: {
    ...state.personalPromo,
    isPending: true,
  },
});

const getPersonalPromoSuccess = (state = INITIAL_STATE, { data }) => ({
  ...state,
  personalPromo: {
    ...state.personalPromo,
    isPending: false,
    data,
  },
});

const getPersonalPromoFailure = (state = INITIAL_STATE, { error }) => ({
  ...state,
  personalPromo: {
    ...state.personalPromo,
    isPending: false,
    error,
  },
});

const disablePersonalPromoRequest = (state = INITIAL_STATE) => ({
  ...state,
  disablePersonalPromo: {
    ...state.disablePersonalPromo,
    isPending: true,
  },
});

const disablePersonalPromoSuccess = (state = INITIAL_STATE, { data }) => ({
  ...state,
  disablePersonalPromo: {
    ...state.disablePersonalPromo,
    isPending: false,
    data,
  },
});

const disablePersonalPromoFailure = (state = INITIAL_STATE, { error }) => ({
  ...state,
  disablePersonalPromo: {
    ...state.disablePersonalPromo,
    isPending: false,
    error,
  },
});

const destroy = () => ({ ...INITIAL_STATE });

const HANDLERS = {
  [Types.GET_PERSONAL_PROMO_REQUEST]: getPersonalPromoRequest,
  [Types.GET_PERSONAL_PROMO_SUCCESS]: getPersonalPromoSuccess,
  [Types.GET_PERSONAL_PROMO_FAILURE]: getPersonalPromoFailure,

  [Types.DISABLE_PERSONAL_PROMO_REQUEST]: disablePersonalPromoRequest,
  [Types.DISABLE_PERSONAL_PROMO_SUCCESS]: disablePersonalPromoSuccess,
  [Types.DISABLE_PERSONAL_PROMO_FAILURE]: disablePersonalPromoFailure,

  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
