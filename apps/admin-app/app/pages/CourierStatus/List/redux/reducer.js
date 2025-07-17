import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  filterCourier: {
    isPending: false,
    data: null,
    error: null,
  },
};

const filterCourierRequest = (state = INITIAL_STATE) => ({
  ...state,
  filterCourier: {
    ...state.filterCourier,
    isPending: true,
    data: [],
  },
});

const filterCourierSuccess = (state = INITIAL_STATE, { data }) => ({
  ...state,
  filterCourier: {
    ...state.filterCourier,
    isPending: false,
    data,
  },
});

const filterCourierFailure = (state = INITIAL_STATE, { error }) => ({
  ...state,
  filterCourier: {
    ...state.filterCourier,
    isPending: false,
    error,
  },
});

const destroyPage = () => ({ ...INITIAL_STATE });

export const HANDLERS = {
  [Types.FILTER_COURIER_REQUEST]: filterCourierRequest,
  [Types.FILTER_COURIER_SUCCESS]: filterCourierSuccess,
  [Types.FILTER_COURIER_FAILURE]: filterCourierFailure,
  [Types.DESTROY_PAGE]: destroyPage,
};

export default createReducer(INITIAL_STATE, HANDLERS);
