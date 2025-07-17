import { createSelector } from 'reselect';

import { getStateObject } from '@shared/utils/common';
import { REDUX_KEY } from '@shared/shared/constants';
import { defaultValues } from '../constants';

const reducerKey = REDUX_KEY.FILTER;

export const getSelectedCity = filterKey =>
  createSelector(
    state => getStateObject(state, reducerKey, 'selectedCity'),
    state => state[filterKey] ?? defaultValues.SELECTED_CITY
  );

export const getAllSelectedCityStates = createSelector(
  state => getStateObject(state, reducerKey, 'selectedCity'),
  state => state
);

export const getSelectedCities = filterKey => createSelector(
  state => getStateObject(state, reducerKey, 'selectedCities'),
  state => state[filterKey] ?? defaultValues.SELECTED_CITIES
);

export const getAllSelectedCitiesStates = createSelector(
  state => getStateObject(state, reducerKey, 'selectedCities'),
  state => state
);

export const getSelectedDomainType = filterKey => createSelector(
  state => getStateObject(state, reducerKey, 'selectedDomainType'),
  state => state[filterKey] ?? defaultValues.SELECTED_DOMAIN_TYPE
);

export const getSelectedDomainTypeStates = createSelector(
  state => getStateObject(state, reducerKey, 'selectedDomainType'),
  state => state
);

export const getSelectedDomainTypes = filterKey => createSelector(
  state => getStateObject(state, reducerKey, 'selectedDomainTypes'),
  state => state[filterKey] ?? defaultValues.SELECTED_DOMAIN_TYPES
);

export const getAllSelectedDomainTypesStates = createSelector(
  state => getStateObject(state, reducerKey, 'selectedDomainTypes'),
  state => state
);

export const getSelectedDateRange = filterKey => createSelector(
  state => getStateObject(state, reducerKey, 'selectedDateRange'),
  state => state[filterKey] ?? defaultValues.SELECTED_DATE_RANGE
);

export const getAllSelectedDateRangeStates = createSelector(
  state => getStateObject(state, reducerKey, 'selectedDateRange'),
  state => state
);

export const getSelectedHourRange = filterKey => createSelector(
  state => getStateObject(state, reducerKey, 'selectedHourRange'),
  state => state[filterKey] ?? defaultValues.SELECTED_HOUR_RANGE
);

export const getAllSelectedHourRangeStates = createSelector(
  state => getStateObject(state, reducerKey, 'selectedHourRange'),
  state => state
);

export const getSelectedDateType = filterKey => createSelector(
  state => getStateObject(state, reducerKey, 'dateType'),
  state => state[filterKey] ?? defaultValues.DATE_TYPE
);

export const getAllSelectedDateTypeStates = createSelector(
  state => getStateObject(state, reducerKey, 'dateType'),
  state => state
);

export const getAllStates = createSelector(
  state => state[reducerKey],
  state => state
);

export const getIsFiltersInitialized = createSelector(
  state => state[reducerKey],
  state => !!state,
);
