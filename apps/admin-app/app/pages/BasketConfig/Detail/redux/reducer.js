import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  basketAmountDetails: {
    isPending: false,
    data: [],
    error: null,
  },
  updateAmountDetails: {
    isPending: false,
    data: [],
    error: null,
  },
};

const basketAmountDetailsRequest = (state = INITIAL_STATE) => ({
  ...state,
  basketAmountDetails: {
    ...state.basketAmountDetails,
    isPending: true,
    data: [],
  },
});

const basketAmountDetailsSuccess = (state = INITIAL_STATE, { data }) => ({
  ...state,
  basketAmountDetails: {
    ...state.basketAmountDetails,
    isPending: false,
    data,
  },
});

const basketAmountDetailsFailure = (state = INITIAL_STATE, { error }) => ({
  ...state,
  basketAmountDetails: {
    ...state.basketAmountDetails,
    isPending: false,
    error,
  },
});
const updateAmountDetailsRequest = (state = INITIAL_STATE) => ({
  ...state,
  updateAmountDetails: {
    ...state.updateAmountDetails,
    isPending: true,
    data: [],
  },
});

const updateAmountDetailsSuccess = (state = INITIAL_STATE, { data }) => ({
  ...state,
  updateAmountDetails: {
    ...state.updateAmountDetails,
    isPending: false,
    data,
  },
});

const updateAmountDetailsFailure = (state = INITIAL_STATE, { error }) => ({
  ...state,
  updateAmountDetails: {
    ...state.updateAmountDetails,
    isPending: false,
    error,
  },
});

const destroyPage = () => ({ ...INITIAL_STATE });

export const HANDLERS = {
  [Types.GET_DISCOUNTED_BASKET_AMOUNTS_REQUEST]: basketAmountDetailsRequest,
  [Types.GET_DISCOUNTED_BASKET_AMOUNTS_SUCCESS]: basketAmountDetailsSuccess,
  [Types.GET_DISCOUNTED_BASKET_AMOUNTS_FAILURE]: basketAmountDetailsFailure,
  [Types.UPDATE_DISCOUNTED_BASKET_AMOUNTS_REQUEST]: updateAmountDetailsRequest,
  [Types.UPDATE_DISCOUNTED_BASKET_AMOUNTS_SUCCESS]: updateAmountDetailsSuccess,
  [Types.UPDATE_DISCOUNTED_BASKET_AMOUNTS_FAILURE]: updateAmountDetailsFailure,
  [Types.DESTROY_PAGE]: destroyPage,
};

export default createReducer(INITIAL_STATE, HANDLERS);
