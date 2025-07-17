import { createSelector } from 'reselect';
import get from 'lodash/get';

import { REDUX_KEY } from '@shared/shared/constants';
import store from '@shared/redux/store';

const reducerKey = REDUX_KEY.COUNTRY_SELECTION;

/**
 * @deprecated Use getSelectedCountryV2 with useSelector instead.
 * This is not an actual selector, it directly accesses the store or localStorage
 * Which doesn't trigger re-renders when the value changes.
 * That is why we are forced to reload the app when the country is changed.
 * There are a lot of places where this is used, so we can't just remove it yet.
 * try to refactor the usages like below.
 *
 * instead of:
 * ```
 *   const selectedCountry = getSelectedCountry();
 * ```
 * use
 * ```
 *  // in the top level part of the components
 *  const selectedCountry = useSelector(getSelectedCountryV2);
 * // pass the selectedCountry to the functions that need it
 * ```
 */

export const getSelectedCountry = (): ICountry | undefined => {
  const state = store.getState();
  if (state?.[reducerKey]?.selectedCountry) return state[reducerKey].selectedCountry;

  const storedCountry = localStorage.getItem('selectedCountry');
  if (!storedCountry) return undefined;
  return JSON.parse(storedCountry);
};

export const getSelectedCountryV2 = (state: any) : ICountry => state[reducerKey].selectedCountry;

export const getSelectedCountryDivision = () => {
  const state = store.getState();
  let selectedCountryDivision;
  if (state) {
    selectedCountryDivision = state[reducerKey].selectedCountryDivision;
  }
  if (!selectedCountryDivision) {
    const storedCountryDivision = localStorage.getItem('selectedCountryDivision');
    if (storedCountryDivision) {
      selectedCountryDivision = JSON.parse(storedCountryDivision);
    }
  }
  return selectedCountryDivision;
};

export const getSelectedCountryLanguages = () => {
  const selectedCountry = getSelectedCountry();
  const languages = get(selectedCountry, 'languageSortOrder', []);
  if (languages.length === 0) {
    return ['en', 'tr'];
  }
  return languages;
};

export const selectSelectedCountryLanguages = (state: any) => {
  const selectedCountry = getSelectedCountryV2(state);
  const languages = get(selectedCountry, 'languageSortOrder', []);
  if (languages.length === 0) {
    return ['en', 'tr'];
  }
  return languages;
};

export const getSelectedCountryCurrencySymbol = createSelector(
  getSelectedCountry,
  selectedCountry => get(selectedCountry, 'currency.symbol', '₺'),
);

export const getSelectedCountryCurrencyAlpha = createSelector(
  getSelectedCountry,
  selectedCountry => get(selectedCountry, 'currency.code.alpha', 'TRY'),
);

export const getSelectedCountryTimeZones = () => {
  const selectedCountry = getSelectedCountry();
  return get(selectedCountry, 'timezones', []);
};

export const getCountryIsChanging = createSelector(
  () => store.getState(),
  state => state?.[reducerKey]?.changeInProgress,
);

export const getInitialCountryIsSet = createSelector(
  () => store.getState(),
  state => state?.[reducerKey]?.initialCountrySet,
);
