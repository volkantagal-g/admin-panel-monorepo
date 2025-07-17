import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  createLottery: {
    isPending: false,
    data: {},
    error: null,
  },
  updateLottery: {
    isPending: false,
    data: {},
    error: null,
  },
  createLotterySegments: {
    isPending: false,
    data: {},
    error: null,
  },
  getLotteryById: {
    isPending: false,
    data: {},
    error: null,
  },
  getLotterySegmentsById: {
    isPending: false,
    data: {},
    error: null,
  },
};

export const createLotteryRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    createLottery: {
      ...INITIAL_STATE.createLottery,
      isPending: true,
    },
  };
};

export const createLotterySuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    createLottery: {
      ...INITIAL_STATE.createLottery,
      data,
      isPending: false,
    },
  };
};

export const createLotteryFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    createLottery: {
      ...INITIAL_STATE.createLottery,
      isPending: false,
      error,
    },
  };
};

export const updateLotteryRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    updateLottery: {
      ...INITIAL_STATE.updateLottery,
      isPending: true,
    },
  };
};

export const updateLotterySuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    updateLottery: {
      ...INITIAL_STATE.updateLottery,
      data,
      isPending: false,
    },
  };
};

export const updateLotteryFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    updateLottery: {
      ...INITIAL_STATE.updateLottery,
      isPending: false,
      error,
    },
  };
};

export const createLotterySegmentsRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    createLotterySegments: {
      ...INITIAL_STATE.createLotterySegments,
      isPending: true,
    },
  };
};

export const createLotterySegmentsSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    createLotterySegments: {
      ...INITIAL_STATE.createLotterySegments,
      data,
      isPending: false,
    },
  };
};

export const createLotterySegmentsFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    createLotterySegments: {
      ...INITIAL_STATE.createLotterySegments,
      isPending: false,
      error,
    },
  };
};

export const getLotteryByIdRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    getLotteryById: {
      ...INITIAL_STATE.getLotteryById,
      isPending: true,
    },
  };
};

export const getLotteryByIdSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    getLotteryById: {
      ...INITIAL_STATE.getLotteryById,
      data,
      isPending: false,
    },
  };
};

export const getLotteryByIdFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    getLotteryById: {
      ...INITIAL_STATE.getLotteryById,
      isPending: false,
      error,
    },
  };
};

export const getLotterySegmentsByIdRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    getLotterySegmentsById: {
      ...INITIAL_STATE.getLotterySegmentsById,
      isPending: true,
    },
  };
};

export const getLotterySegmentsByIdSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    getLotterySegmentsById: {
      ...INITIAL_STATE.getLotterySegmentsById,
      data,
      isPending: false,
    },
  };
};

export const getLotterySegmentsByIdFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    getLotterySegmentsById: {
      ...INITIAL_STATE.getLotterySegmentsById,
      isPending: false,
      error,
    },
  };
};

const destroy = () => ({ ...INITIAL_STATE });

export const HANDLERS = {
  [Types.CREATE_LOTTERY_REQUEST]: createLotteryRequest,
  [Types.CREATE_LOTTERY_SUCCESS]: createLotterySuccess,
  [Types.CREATE_LOTTERY_FAILURE]: createLotteryFailure,
  [Types.UPDATE_LOTTERY_REQUEST]: updateLotteryRequest,
  [Types.UPDATE_LOTTERY_SUCCESS]: updateLotterySuccess,
  [Types.UPDATE_LOTTERY_FAILURE]: updateLotteryFailure,
  [Types.CREATE_LOTTERY_SEGMENTS_REQUEST]: createLotterySegmentsRequest,
  [Types.CREATE_LOTTERY_SEGMENTS_SUCCESS]: createLotterySegmentsSuccess,
  [Types.CREATE_LOTTERY_SEGMENTS_FAILURE]: createLotterySegmentsFailure,
  [Types.GET_LOTTERY_BY_ID_REQUEST]: getLotteryByIdRequest,
  [Types.GET_LOTTERY_BY_ID_SUCCESS]: getLotteryByIdSuccess,
  [Types.GET_LOTTERY_BY_ID_FAILURE]: getLotteryByIdFailure,
  [Types.GET_LOTTERY_SEGMENTS_BY_ID_REQUEST]: getLotterySegmentsByIdRequest,
  [Types.GET_LOTTERY_SEGMENTS_BY_ID_SUCCESS]: getLotterySegmentsByIdSuccess,
  [Types.GET_LOTTERY_SEGMENTS_BY_ID_FAILURE]: getLotterySegmentsByIdFailure,
  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
