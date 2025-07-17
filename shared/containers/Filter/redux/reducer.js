import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  selectedCity: {},
  selectedCities: {},
  selectedDomainType: {},
  selectedDomainTypes: {},
  selectedHourRange: {}, // default: [0, 24]
  selectedDateRange: {}, // default: getInitialDateRanges()
  selectedDate: {}, // default: getInitialEndDate(),
  dateType: {}, // default: DATE_TYPE.LOG_SUMMARY_DATE_TYPE_1_HOUR,
};

const setSelectedDomainType = (state = INITIAL_STATE, { selectedDomainType, filterKey }) => ({
  ...state,
  selectedDomainType: {
    ...state.selectedDomainType,
    [filterKey]: selectedDomainType,
  },
});

const setSelectedDomainTypes = (state = INITIAL_STATE, { selectedDomainTypes, filterKey }) => ({
  ...state,
  selectedDomainTypes: {
    ...state.selectedDomainTypes,
    [filterKey]: selectedDomainTypes,
  },
});

const setSelectedCity = (state = INITIAL_STATE, { selectedCity, filterKey }) => ({
  ...state,
  selectedCity: {
    ...state.selectedCity,
    [filterKey]: selectedCity,
  },
});

const setSelectedCities = (state = INITIAL_STATE, { selectedCities, filterKey }) => ({
  ...state,
  selectedCities: {
    ...state.selectedCities,
    [filterKey]: selectedCities,
  },
});

const setSelectedHourRange = (state = INITIAL_STATE, { selectedHourRange, filterKey }) => ({
  ...state,
  selectedHourRange: {
    ...state.selectedHourRange,
    [filterKey]: selectedHourRange,
  },
});

const setSelectedDateRange = (state = INITIAL_STATE, { selectedDateRange, filterKey }) => ({
  ...state,
  selectedDateRange: {
    ...state.selectedDateRange,
    [filterKey]: selectedDateRange,
  },
});

const setDateType = (state = INITIAL_STATE, { dateType, filterKey }) => ({
  ...state,
  dateType: {
    ...state.dateType,
    [filterKey]: dateType,
  },
});

const destroy = () => ({ ...INITIAL_STATE });

export const HANDLERS = {
  [Types.SET_SELECTED_CITY]: setSelectedCity,
  [Types.SET_SELECTED_CITIES]: setSelectedCities,
  [Types.SET_SELECTED_DOMAIN_TYPE]: setSelectedDomainType,
  [Types.SET_SELECTED_DOMAIN_TYPES]: setSelectedDomainTypes,
  [Types.SET_SELECTED_HOUR_RANGE]: setSelectedHourRange,
  [Types.SET_SELECTED_DATE_RANGE]: setSelectedDateRange,
  [Types.SET_DATE_TYPE]: setDateType,

  [Types.DESTROY_FILTER]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
