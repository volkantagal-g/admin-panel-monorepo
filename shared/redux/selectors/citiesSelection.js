import { createSelector } from 'reselect';

import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.CITIES_SELECTION;

export const getSelectedCities = {
  getData: createSelector(
    state => {
      let selectedCities;
      if (state) {
        selectedCities = state[reducerKey].selectedCities;
      }
      if (!selectedCities) {
        selectedCities = JSON.parse(localStorage.getItem('selectedCities'));
      }
      return selectedCities;
    },
    data => {
      return data;
    }
  ),
};
