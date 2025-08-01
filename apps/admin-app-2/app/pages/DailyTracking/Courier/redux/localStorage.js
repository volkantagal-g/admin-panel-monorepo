import { REDUX_KEY } from '@shared/shared/constants';

const REDUCER_KEY = REDUX_KEY.DAILY_TRACKING.INSTANT;
export const SELECTED_CITY_FILTER_LOCAL_STORAGE_KEY = `${REDUCER_KEY}_selectedCityFilter`;

export const getSelectedCityFilterFromLocalStorage = () => {
  const result = JSON.parse(localStorage.getItem(SELECTED_CITY_FILTER_LOCAL_STORAGE_KEY));
  return result;
};

export const setSelectedCityFilterToLocalStorage = selectedCity => {
  localStorage.setItem(SELECTED_CITY_FILTER_LOCAL_STORAGE_KEY, JSON.stringify(selectedCity));
};
