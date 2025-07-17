import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  courierLoyalty: {
    isPending: false,
    data: [],
  },
};

const courierLoyaltyRequest = state => ({
  ...state,
  courierLoyalty: {
    ...state.courierLoyalty,
    isPending: true,
    data: [],
  },
});

const courierLoyaltySuccess = (state, { data }) => ({
  ...state,
  courierLoyalty: {
    ...state.courierLoyalty,
    isPending: false,
    data,
  },
});

const courierLoyaltyFailure = state => ({
  ...state,
  courierLoyalty: {
    ...state.courierLoyalty,
    isPending: false,
  },
});

const destroyPage = () => ({ ...INITIAL_STATE });

export const HANDLERS = {
  [Types.GET_COURIER_LOYALTY_REQUEST]: courierLoyaltyRequest,
  [Types.GET_COURIER_LOYALTY_SUCCESS]: courierLoyaltySuccess,
  [Types.GET_COURIER_LOYALTY_FAILURE]: courierLoyaltyFailure,
  [Types.DESTROY_PAGE]: destroyPage,
};

export default createReducer(INITIAL_STATE, HANDLERS);
