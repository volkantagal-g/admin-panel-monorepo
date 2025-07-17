import { createSelector } from 'reselect';

import { getStateObject } from '@shared/utils/common';
import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.CONFIG.WORKING_HOURS;

export const workingHoursSelector = {
  getData: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'workingHours');
    },
    ({ data }) => {
      return data;
    }
  ),
};

export const filtersSelector = {
  getData: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'filters');
    },
    filters => {
      return filters;
    }
  ),
  getWorkingHoursType: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'filters');
    },
    ({ workingHoursType }) => {
      return workingHoursType;
    }
  ),
  getCountry: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'filters');
    },
    ({ countryId }) => {
      return countryId;
    }
  ),
  getCity: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'filters');
    },
    ({ cityId }) => {
      return cityId;
    }
  ),
  getRegion: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'filters');
    },
    ({ regionId }) => {
      return regionId;
    }
  ),
};