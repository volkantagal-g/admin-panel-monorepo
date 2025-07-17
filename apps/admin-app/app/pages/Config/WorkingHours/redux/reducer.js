import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  workingHours: {
    data: [],
    isPending: false,
    error: null,
  },
  filters: {
    workingHoursType: undefined,
    countryId: '',
    cityId: '',
    regionId: '',
  },
};

export const getWorkingHoursRequest = (state = INITIAL_STATE, { workingHoursType, countryId, cityId, regionId }) => {
  return {
    ...state,
    workingHours: {
      ...state.workingHours,
      isPending: true,
    },
    filters: {
      ...state.workingHours,
      workingHoursType,
      countryId,
      cityId,
      regionId,
    },
  };
};

export const getWorkingHoursSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    workingHours: {
      ...state.workingHours,
      data,
      isPending: false,
    },
  };
};

export const getWorkingHoursFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    workingHours: {
      ...state.workingHours,
      isPending: false,
      error,
    },
  };
};

export const updateWorkingHoursRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    workingHours: {
      ...state.workingHours,
      isPending: true,
    },
  };
};

export const updateWorkingHoursSuccess = (state = INITIAL_STATE) => {
  return {
    ...state,
    workingHours: {
      ...state.workingHours,
      isPending: false,
    },
  };
};

export const updateWorkingHoursFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    workingHours: {
      ...state.workingHours,
      isPending: false,
      error,
    },
  };
};

export const updateWorkingHoursMessageRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    workingHours: {
      ...state.workingHours,
      isPending: true,
    },
  };
};

export const updateWorkingHoursMessageSuccess = (state = INITIAL_STATE) => {
  return {
    ...state,
    workingHours: {
      ...state.workingHours,
      isPending: false,
    },
  };
};

export const updateWorkingHoursMessageFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    workingHours: {
      ...state.workingHours,
      isPending: false,
      error,
    },
  };
};

export const createWorkingHoursRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    workingHours: {
      ...state.workingHours,
      isPending: true,
    },
  };
};

export const createWorkingHoursSuccess = (state = INITIAL_STATE) => {
  return {
    ...state,
    workingHours: {
      ...state.workingHours,
      isPending: false,
    },
  };
};

export const createWorkingHoursFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    workingHours: {
      ...state.workingHours,
      isPending: false,
      error,
    },
  };
};

export const setWorkingHoursType = (state = INITIAL_STATE, { workingHoursType }) => {
  return {
    ...state,
    filters: {
      ...state.filters,
      workingHoursType,
    },
  };
};

export const setCountry = (state = INITIAL_STATE, { countryId }) => {
  return {
    ...state,
    filters: {
      ...state.filters,
      countryId,
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

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.GET_WORKING_HOURS_REQUEST]: getWorkingHoursRequest,
  [Types.GET_WORKING_HOURS_SUCCESS]: getWorkingHoursSuccess,
  [Types.GET_WORKING_HOURS_FAILURE]: getWorkingHoursFailure,
  [Types.UPDATE_WORKING_HOURS_REQUEST]: updateWorkingHoursRequest,
  [Types.UPDATE_WORKING_HOURS_SUCCESS]: updateWorkingHoursSuccess,
  [Types.UPDATE_WORKING_HOURS_FAILURE]: updateWorkingHoursFailure,
  [Types.CREATE_WORKING_HOURS_REQUEST]: createWorkingHoursRequest,
  [Types.CREATE_WORKING_HOURS_SUCCESS]: createWorkingHoursSuccess,
  [Types.CREATE_WORKING_HOURS_FAILURE]: createWorkingHoursFailure,
  [Types.UPDATE_WORKING_HOURS_MESSAGE_REQUEST]: updateWorkingHoursMessageRequest,
  [Types.UPDATE_WORKING_HOURS_MESSAGE_SUCCESS]: updateWorkingHoursMessageSuccess,
  [Types.UPDATE_WORKING_HOURS_MESSAGE_FAILURE]: updateWorkingHoursMessageFailure,
  [Types.SET_WORKING_HOURS_TYPE]: setWorkingHoursType,
  [Types.SET_COUNTRY]: setCountry,
  [Types.SET_CITY]: setCity,
  [Types.SET_REGION]: setRegion,
  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
