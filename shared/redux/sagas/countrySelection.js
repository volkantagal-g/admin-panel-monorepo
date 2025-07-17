import { all, fork, put, take, takeLatest, select } from 'redux-saga/effects';
import { get } from 'lodash';

import { toast } from 'react-toastify';

import { Types, Creators } from '@shared/redux/actions/countrySelection';
import { PANEL_EVENTS } from '@shared/shared/analyticsConstants';
import { Types as CommonTypes } from '@shared/redux/actions/common';
import AnalyticsService from '@shared/services/analytics';
import { getDivisionOfACountryFromAllDivisions, isNullOrEmpty } from '@shared/utils/common';

import { getAllDivisionsSelector } from '../selectors/common';
import { setSelectedCityFilterToLocalStorage as setDailyTrackingInstantCityLocalStorage } from '@app/pages/DailyTracking/Courier/redux/localStorage';

export const setSelectedCountryToLocalStorage = selectedCountry => {
  localStorage.setItem('selectedCountry', selectedCountry);
};

const getSelectedCountryFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem('selectedCountry'));
};

const setSelectedCountryDivisionToLocalStorage = selectedCountryDivision => {
  localStorage.setItem('selectedCountryDivision', selectedCountryDivision);
};

const getSelectedCountryDivisionFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem('selectedCountryDivision'));
};

const removeSelectedCitiesFromLocalStorage = () => {
  localStorage.removeItem('selectedCities');
};

function* startCountrySelectionFlowWithPrompt({ selectedCountry, message }) {
  const toastClosed = new Promise(resolve => {
    const options = {
      autoClose: 3000,
      theme: 'light',
      onClose: resolve,
      pauseOnHover: false,
      pauseOnFocusLoss: false,
      closeOnClick: true,
    };
    toast.info(message, options);
  });

  yield toastClosed;
  yield put(Creators.startCountrySelectionFlow({ selectedCountry, shouldReloadAfterLocalStorage: true }));
}

function* watchStartCountrySelectionFlowWithPrompt() {
  yield takeLatest(Types.START_COUNTRY_SELECTION_FLOW_WITH_PROMPT, startCountrySelectionFlowWithPrompt);
}

export function* initializeSelectedCountryFromStorage() {
  while (true) {
    yield take(Types.INITIALIZE_SELECTED_COUNTRY_FROM_STORAGE);
    const selectedCountry = yield getSelectedCountryFromLocalStorage();
    const selectedCountryDivision = yield getSelectedCountryDivisionFromLocalStorage();
    yield put({ type: Types.START_COUNTRY_SELECTION_FLOW, selectedCountry, selectedCountryDivision });
  }
}

export function* countrySelectionFlow() {
  while (true) {
    const { selectedCountry, shouldReloadAfterLocalStorage } = yield take(Types.START_COUNTRY_SELECTION_FLOW);
    const divisions = yield select(getAllDivisionsSelector.getData);
    const selectedCountryDivision = getDivisionOfACountryFromAllDivisions(selectedCountry, divisions);
    const previousCountry = getSelectedCountryFromLocalStorage();

    setSelectedCountryToLocalStorage(JSON.stringify(selectedCountry));
    setSelectedCountryDivisionToLocalStorage(JSON.stringify(selectedCountryDivision));

    if (previousCountry?._id !== selectedCountry?._id) {
      removeSelectedCitiesFromLocalStorage();
      setDailyTrackingInstantCityLocalStorage(null);
    }

    const previousCountryCode = get(previousCountry, 'code.alpha2');
    const selectedCountryCode = get(selectedCountry, 'code.alpha2');

    if (!isNullOrEmpty(previousCountryCode) && previousCountryCode !== selectedCountryCode) {
      AnalyticsService.track(PANEL_EVENTS.USER_COUNTRY_CHANGED.EVENT_NAME, {
        ...(previousCountryCode ? { old: previousCountryCode } : undefined),
        ...(selectedCountryCode ? { new: selectedCountryCode } : undefined),
      });
    }

    if (shouldReloadAfterLocalStorage) {
      const queryParameters = new URLSearchParams(window.location.search);
      queryParameters.set('country', selectedCountryCode.toLowerCase());
      window.location.search = queryParameters.toString();
    }
    else {
      yield put({ type: Types.SET_SELECTED_COUNTRY, selectedCountry, selectedCountryDivision });
      if (previousCountry?._id !== selectedCountry?._id) {
        yield put({ type: CommonTypes.SET_SELECTED_CITIES, data: [] });
      }
    }
  }
}

export default function* countrySelection() {
  yield all([fork(initializeSelectedCountryFromStorage), fork(countrySelectionFlow), fork(watchStartCountrySelectionFlowWithPrompt)]);
}
