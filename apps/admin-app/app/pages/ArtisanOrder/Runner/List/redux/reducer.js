import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  getRunners: {
    data: null,
    isPending: false,
    error: null,
  },
};

export const getRunnersRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    getRunners: {
      ...INITIAL_STATE.getRunners,
      isPending: true,
    },
  };
};

export const getRunnersSuccess = (
  state = INITIAL_STATE,
  { data: { data } },
) => {
  const { hasNext, limit, page } = data;

  return {
    ...state,
    getRunners: {
      ...INITIAL_STATE.getRunners,
      data: data.dtos,
      pagination: {
        hasNext,
        limit,
        page,
      },
      isPending: false,
    },
  };
};

export const HANDLERS = {
  [Types.GET_RUNNERS_REQUEST]: getRunnersRequest,
  [Types.GET_RUNNERS_SUCCESS]: getRunnersSuccess,
};

export default createReducer(INITIAL_STATE, HANDLERS);
