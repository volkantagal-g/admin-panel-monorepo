import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  neighborhoods: {
    data: [],
    isPending: false,
  },
};

const getNeighborhoodsRequest = state => ({
  neighborhoods: {
    ...state.neighborhoods,
    isPending: true,
  },
});

const getNeighborhoodsSuccess = (state, { data }) => ({
  neighborhoods: {
    ...state.neighborhoods,
    isPending: false,
    data,
  },
});

const getNeighborhoodsFailure = state => ({
  neighborhoods: {
    ...state.neighborhoods,
    isPending: false,
  },
});

const destroyPage = () => ({ ...INITIAL_STATE });

export const HANDLERS = {
  [Types.GET_NEIGHBORHOODS_REQUEST]: getNeighborhoodsRequest,
  [Types.GET_NEIGHBORHOODS_SUCCESS]: getNeighborhoodsSuccess,
  [Types.GET_NEIGHBORHOODS_FAILURE]: getNeighborhoodsFailure,
  [Types.DESTROY_PAGE]: destroyPage,
};
export default createReducer(INITIAL_STATE, HANDLERS);
