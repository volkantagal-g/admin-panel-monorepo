import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  courierList: {
    isPending: false,
    data: [],
    error: null,
    totalCount: 0,
  },
};

const courierListRequest = (state = INITIAL_STATE) => ({
  ...state,
  courierList: {
    ...state.courierList,
    isPending: true,
  },
});

const courierListSuccess = (state = INITIAL_STATE, { data, totalCount }) => ({
  ...state,
  courierList: {
    ...state.courierList,
    isPending: false,
    data,
    totalCount,
  },
});

const courierListFailure = (state = INITIAL_STATE, { error }) => ({
  ...state,
  courierList: {
    ...state.courierList,
    isPending: false,
    error,
  },
});

const destroyPage = () => ({ ...INITIAL_STATE });

export const HANDLERS = {
  [Types.GET_COURIER_LIST_REQUEST]: courierListRequest,
  [Types.GET_COURIER_LIST_SUCCESS]: courierListSuccess,
  [Types.GET_COURIER_LIST_FAILURE]: courierListFailure,
  [Types.DESTROY_PAGE]: destroyPage,
};

export default createReducer(INITIAL_STATE, HANDLERS);
