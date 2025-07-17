import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  peakHours: {
    data: [],
    isPending: false,
    error: null,
  },
  filters: {
    peakHoursType: undefined,
    cityId: '',
    regionId: '',
  },
};

export const getPeakHoursRequest = (state = INITIAL_STATE, { peakHoursType, cityId, regionId }) => {
  return {
    ...state,
    peakHours: {
      ...state.peakHours,
      isPending: true,
    },
    filters: {
      ...state.peakHours,
      peakHoursType,
      cityId,
      regionId,
    },
  };
};

export const getPeakHoursSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    peakHours: {
      ...state.peakHours,
      data,
      isPending: false,
    },
  };
};

export const getPeakHoursFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    peakHours: {
      ...state.peakHours,
      isPending: false,
      error,
    },
  };
};

export const updatePeakHoursRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    peakHours: {
      ...state.peakHours,
      isPending: true,
    },
  };
};

export const updatePeakHoursSuccess = (state = INITIAL_STATE) => {
  return {
    ...state,
    peakHours: {
      ...state.peakHours,
      isPending: false,
    },
  };
};

export const updatePeakHoursFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    peakHours: {
      ...state.peakHours,
      isPending: false,
      error,
    },
  };
};

export const updatePeakHoursMessageRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    peakHours: {
      ...state.peakHours,
      isPending: true,
    },
  };
};

export const updatePeakHoursMessageSuccess = (state = INITIAL_STATE) => {
  return {
    ...state,
    peakHours: {
      ...state.peakHours,
      isPending: false,
    },
  };
};

export const updatePeakHoursMessageFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    peakHours: {
      ...state.peakHours,
      isPending: false,
      error,
    },
  };
};

export const setPeakHoursType = (state = INITIAL_STATE, { peakHoursType }) => {
  return {
    ...state,
    filters: {
      ...state.filters,
      peakHoursType,
    },
  };
};

export const setCity = (state = INITIAL_STATE, { cityId }) => {
  return {
    ...state,
    filters: {
      ...state.filters,
      cityId,
    },
  };
};

export const setRegion = (state = INITIAL_STATE, { regionId }) => {
  return {
    ...state,
    filters: {
      ...state.filters,
      regionId,
    },
  };
};

export const createPeakHoursRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    peakHours: {
      ...state.peakHours,
      isPending: true,
    },
  };
};

export const createPeakHoursSuccess = (state = INITIAL_STATE) => {
  return {
    ...state,
    peakHours: {
      ...state.peakHours,
      isPending: false,
    },
  };
};

export const createPeakHoursFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    peakHours: {
      ...state.peakHours,
      isPending: false,
      error,
    },
  };
};

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.GET_PEAK_HOURS_REQUEST]: getPeakHoursRequest,
  [Types.GET_PEAK_HOURS_SUCCESS]: getPeakHoursSuccess,
  [Types.GET_PEAK_HOURS_FAILURE]: getPeakHoursFailure,
  [Types.CREATE_PEAK_HOURS_REQUEST]: createPeakHoursRequest,
  [Types.CREATE_PEAK_HOURS_SUCCESS]: createPeakHoursSuccess,
  [Types.CREATE_PEAK_HOURS_FAILURE]: createPeakHoursFailure,
  [Types.UPDATE_PEAK_HOURS_REQUEST]: updatePeakHoursRequest,
  [Types.UPDATE_PEAK_HOURS_SUCCESS]: updatePeakHoursSuccess,
  [Types.UPDATE_PEAK_HOURS_FAILURE]: updatePeakHoursFailure,
  [Types.UPDATE_PEAK_HOURS_MESSAGE_REQUEST]: updatePeakHoursMessageRequest,
  [Types.UPDATE_PEAK_HOURS_MESSAGE_SUCCESS]: updatePeakHoursMessageSuccess,
  [Types.UPDATE_PEAK_HOURS_MESSAGE_FAILURE]: updatePeakHoursMessageFailure,
  [Types.SET_PEAK_HOURS_TYPE]: setPeakHoursType,
  [Types.SET_CITY]: setCity,
  [Types.SET_REGION]: setRegion,
  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
