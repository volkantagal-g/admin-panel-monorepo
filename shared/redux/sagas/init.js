import { take, put, fork, all } from 'redux-saga/effects';

import AnalyticsService from '@shared/services/analytics';
import { Types, Creators } from '@shared/redux/actions/init';
import { Creators as CommonCreators, Types as CommonTypes } from '@shared/redux/actions/common';
import { Creators as CountrySelectionCreators, Types as CountrySelectionTypes } from '@shared/redux/actions/countrySelection';
import { Creators as LanguageSelectionCreators, Types as LanguageSelectionTypes } from '@shared/redux/actions/languageSelection';
import { getUser } from '../selectors/auth';

function* initAfterLogin() {
  while (true) {
    yield take(Types.INIT_AFTER_LOGIN);
    const user = getUser();
    AnalyticsService.identify({ traits: { ...user } });

    // dispatch independent requests first
    yield all([
      put(CommonCreators.getAllPagesRequest()),
      put(CommonCreators.getCountriesRequest()),
      put(CommonCreators.getOperationalCountriesRequest()),
      put(CommonCreators.getMyPermissionsRequest()),
      put(CommonCreators.getAllDivisionsRequest()),
      put(LanguageSelectionCreators.initializeSelectedLanguageFromStorage()),
    ]);

    // wait for results of independent tasks
    const [countriesResult, operationalCountriesResult, permissionResult, divisionsResult] = yield all([
      take([CommonTypes.GET_COUNTRIES_SUCCESS, CommonTypes.GET_COUNTRIES_FAILURE]),
      take([CommonTypes.GET_OPERATIONAL_COUNTRIES_SUCCESS, CommonTypes.GET_OPERATIONAL_COUNTRIES_FAILURE]),
      take([CommonTypes.GET_MY_PERMISSIONS_SUCCESS, CommonTypes.GET_MY_PERMISSIONS_FAILURE]),
      take([CommonTypes.GET_ALL_DIVISIONS_SUCCESS, CommonTypes.GET_ALL_DIVISIONS_FAILURE]),
      // language selection shouldn't have an error, it is not a network request
      take(LanguageSelectionTypes.SET_SELECTED_LANGUAGE),
    ]);
    if (
      countriesResult.error || permissionResult.error || divisionsResult.error || operationalCountriesResult.error
    ) {
      yield put(Creators.failAfterLoginInit());
    }
    else {
      // dispatch dependent requests after
      // country selection depends on divisions data
      yield all([put(CountrySelectionCreators.initializeSelectedCountryFromStorage())]);

      // wait for results of dependent tasks
      // country selection shouldn't have an error, it is not a network request
      yield all([take(CountrySelectionTypes.SET_SELECTED_COUNTRY)]);
    }

    yield put(Creators.finishAfterLoginInit());
  }
}

export default function* init() {
  yield fork(initAfterLogin);
}
