import { createReducer } from 'reduxsauce';

import { Types } from 'pages/MarketProduct/containers/NewProductButton/redux/actions';

export const INITIAL_STATE = {
  isModalOpen: false,
  createMarketProduct: {
    isPending: false,
    data: {},
    error: null,
  },
};

export const createMarketProductRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    createMarketProduct: {
      ...INITIAL_STATE.createMarketProduct,
      isPending: true,
    },
  };
};

export const createMarketProductSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    createMarketProduct: {
      ...INITIAL_STATE.createMarketProduct,
      data,
      isPending: false,
    },
  };
};

export const createMarketProductFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    createMarketProduct: {
      ...INITIAL_STATE.createMarketProduct,
      isPending: false,
      error,
    },
  };
};

export const openModal = state => ({
  ...state,
  isModalOpen: true,
});

export const closeModal = state => ({
  ...state,
  isModalOpen: false,
});

export const HANDLERS = {
  [Types.CREATE_MARKET_PRODUCT_REQUEST]: createMarketProductRequest,
  [Types.CREATE_MARKET_PRODUCT_SUCCESS]: createMarketProductSuccess,
  [Types.CREATE_MARKET_PRODUCT_FAILURE]: createMarketProductFailure,
  [Types.OPEN_MODAL]: openModal,
  [Types.CLOSE_MODAL]: closeModal,
};

export default createReducer(INITIAL_STATE, HANDLERS);
