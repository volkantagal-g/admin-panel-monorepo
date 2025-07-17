import { createReducer } from 'reduxsauce';

import { getEndDate1, getStartDate1 } from '../utils';
import { Types } from './actions';

const INITIAL_STATE = {
  comparisonData: {
    data: [],
    isPending: false,
    error: null,
  },
  selectedDate1: {
    startDate: null,
    endDate: null,
  },
  selectedDate2: {
    startDate: null,
    endDate: null,
  },
  selectedTimeRange: {
    startTime: getStartDate1(),
    endTime: getEndDate1(),
  },
  selectedCity: null,
  maxOrderCount: '',
  minOrderCount: '',
  // we should show the dates on tables if the filters are used on the request
  requestedDates: {
    selectedDate1: {
      startDate: null,
      endDate: null,
    },
    selectedDate2: {
      startDate: null,
      endDate: null,
    },
  },
};

const getComparisonDataRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    comparisonData: {
      ...INITIAL_STATE.comparisonData,
      isPending: true,
    },
  };
};

const getComparisonDataSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    comparisonData: {
      ...INITIAL_STATE.comparisonData,
      data,
      isPending: false,
    },
  };
};

const getComparisonDataFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    comparisonData: {
      ...INITIAL_STATE.comparisonData,
      isPending: false,
      error,
    },
  };
};

const setSelectedDate1 = (state = INITIAL_STATE, { startDate, endDate }) => {
  return {
    ...state,
    selectedDate1: {
      startDate,
      endDate,
    },
  };
};

const setSelectedDate2 = (state = INITIAL_STATE, { startDate, endDate }) => {
  return {
    ...state,
    selectedDate2: {
      startDate,
      endDate,
    },
  };
};

const setSelectedTimeRange = (state = INITIAL_STATE, { startTime, endTime }) => {
  return {
    ...state,
    selectedTimeRange: {
      startTime,
      endTime,
    },
  };
};

const setSelectedCity = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    selectedCity: data,
  };
};

const setMaxOrderCount = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    maxOrderCount: data,
  };
};

const setMinOrderCount = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    minOrderCount: data,
  };
};

const setRequestedDates = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    requestedDates: data,
  };
};

const init = (state = INITIAL_STATE, { selectedDate1, selectedDate2 }) => {
  return {
    ...state,
    selectedDate1,
    selectedDate2,
  };
};

const destroy = () => {
  return { ...INITIAL_STATE };
};

const HANDLERS = {
  [Types.INIT_PAGE]: init,
  [Types.DESTROY_PAGE]: destroy,
  [Types.GET_COMPARISON_DATA_REQUEST]: getComparisonDataRequest,
  [Types.GET_COMPARISON_DATA_SUCCESS]: getComparisonDataSuccess,
  [Types.GET_COMPARISON_DATA_FAILURE]: getComparisonDataFailure,
  [Types.SET_SELECTED_CITY]: setSelectedCity,
  [Types.SET_MIN_ORDER_COUNT]: setMinOrderCount,
  [Types.SET_MAX_ORDER_COUNT]: setMaxOrderCount,
  [Types.SET_SELECTED_DATE1]: setSelectedDate1,
  [Types.SET_SELECTED_DATE2]: setSelectedDate2,
  [Types.SET_SELECTED_TIME_RANGE]: setSelectedTimeRange,
  [Types.SET_REQUESTED_DATES]: setRequestedDates,
};

export default createReducer(INITIAL_STATE, HANDLERS);
