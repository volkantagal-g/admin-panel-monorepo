import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  alertData: {
    data: [],
    isPending: false,
    error: null,
  },
  alertResolveData: {
    data: [],
    isPending: false,
    error: null,
  },
  filters: {
    city: '',
    alertMessage: '',
    warehouse: '',
  },
  selectedDate: {
    startDate: null,
    endDate: null,
  },
  mappedResults: { data: [] },
};

export const getAlertDataRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    alertData: {
      ...INITIAL_STATE.alertData,
      isPending: true,
    },
  };
};

export const getAlertDataSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    alertData: {
      ...INITIAL_STATE.alertData,
      data,
      isPending: false,
    },
  };
};

export const getAlertDataFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    alertData: {
      ...INITIAL_STATE.alertData,
      isPending: false,
      error,
    },
  };
};

export const getAlertResolveDataRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    alertResolveData: {
      ...INITIAL_STATE.alertResolveData,
      isPending: true,
    },
  };
};

export const getAlertResolveDataSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    alertResolveData: {
      ...INITIAL_STATE.alertResolveData,
      data,
      isPending: false,
    },
  };
};

export const getAlertResolveDataFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    alertResolveData: {
      ...INITIAL_STATE.alertResolveData,
      isPending: false,
      error,
    },
  };
};

export const setCity = (state = INITIAL_STATE, { city }) => {
  return {
    ...state,
    filters: {
      ...state.filters,
      city,
    },
  };
};

export const setAlertType = (state = INITIAL_STATE, { alertMessage }) => {
  return {
    ...state,
    filters: {
      ...state.filters,
      alertMessage,
    },
  };
};

export const setWarehouse = (state = INITIAL_STATE, { warehouse }) => {
  return {
    ...state,
    filters: {
      ...state.filters,
      warehouse,
    },
  };
};

export const setMappedResults = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    mappedResults: {
      ...state.mappedResults,
      data,
    },
  };
};

export const destroy = () => {
  return { ...INITIAL_STATE };
};

const setSelectedDate = (state = INITIAL_STATE, { startDate, endDate }) => {
  return {
    ...state,
    selectedDate: {
      startDate,
      endDate,
    },
  };
};

const init = (state = INITIAL_STATE, { selectedDate }) => {
  return {
    ...state,
    selectedDate,
  };
};

export const HANDLERS = {
  [Types.INIT_PAGE]: init,
  [Types.SET_SELECTED_DATE]: setSelectedDate,
  [Types.DESTROY_PAGE]: destroy,
  [Types.GET_ALERT_DATA_REQUEST]: getAlertDataRequest,
  [Types.GET_ALERT_DATA_SUCCESS]: getAlertDataSuccess,
  [Types.GET_ALERT_DATA_FAILURE]: getAlertDataFailure,
  [Types.GET_ALERT_RESOLVE_DATA_REQUEST]: getAlertResolveDataRequest,
  [Types.GET_ALERT_RESOLVE_DATA_SUCCESS]: getAlertResolveDataSuccess,
  [Types.GET_ALERT_RESOLVE_DATA_FAILURE]: getAlertResolveDataFailure,
  [Types.SET_CITY]: setCity,
  [Types.SET_ALERT_TYPE]: setAlertType,
  [Types.SET_WAREHOUSE]: setWarehouse,
  [Types.SET_MAPPED_RESULTS]: setMappedResults,

};

export default createReducer(INITIAL_STATE, HANDLERS);
