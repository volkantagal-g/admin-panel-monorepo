import { all, call, cancel, delay, fork, put, take, takeLatest } from 'redux-saga/effects';
import { get } from 'lodash';

import { Types, Creators } from './actions';
import { Creators as CommonCreators } from '@shared/redux/actions/common';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import {
  createCityBoundary, createCountryBoundary, getCityBoundary,
  getCountryBoundary, updateCityBoundaryById, updateCountryBoundaryById,
} from '@shared/api/gis/geoBoundaries';
import { createCity, updateCityById, createCountry, updateCountryById, getCountriesFromBE } from '@shared/api/countryInfo';

// Country
function* getCountriesWPageSizeRequest() {
  try {
    const data = yield call(getCountriesFromBE, { pageSize: 100, includeNonOperationals: true });
    yield put(Creators.getCountriesWPageSizeSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getCountriesWPageSizeFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchGetCountriesWPageSizeRequest() {
  yield takeLatest(Types.GET_COUNTRIES_W_PAGE_SIZE_REQUEST, getCountriesWPageSizeRequest);
}
function* createCountryRequest({ body }) {
  try {
    const data = yield call(createCountry, { body });
    yield put(Creators.createCountrySuccess({ data }));
    yield put(ToastCreators.success());
    yield put(Creators.getCountriesWPageSizeRequest());
  }
  catch (error) {
    const errorMessage = get(error, 'response.data.detail');
    yield put(ToastCreators.error({ message: errorMessage }));
  }
}

function* watchCreateCountryRequest() {
  yield takeLatest(Types.CREATE_COUNTRY_REQUEST, createCountryRequest);
}

function* updateCountryRequest({ id, updatedData }) {
  try {
    const data = yield call(updateCountryById, { id, updatedData });
    yield put(Creators.updateCountrySuccess({ data }));
    yield put(ToastCreators.success());
    yield delay(500);
    yield put(Creators.getCountriesWPageSizeRequest());
  }
  catch (error) {
    const errorMessage = get(error, 'response.data.detail');
    yield put(ToastCreators.error({ message: errorMessage }));
  }
}

function* watchUpdateCountryRequest() {
  yield takeLatest(Types.UPDATE_COUNTRY_REQUEST, updateCountryRequest);
}

function* getCountryBoundaryRequest({ id }) {
  try {
    const data = yield call(getCountryBoundary, { id });
    yield put(Creators.getCountryBoundarySuccess({ data }));
    yield put(ToastCreators.success());
  }
  catch (error) {
    const errorMessage = get(error, 'response.data.detail');
    yield put(ToastCreators.error({ message: errorMessage }));
  }
}

function* watchGetCountryBoundaryRequest() {
  yield takeLatest(Types.GET_COUNTRY_BOUNDARY_REQUEST, getCountryBoundaryRequest);
}

function* updateCountryBoundaryRequest({ id, updatedData }) {
  try {
    const data = yield call(updateCountryBoundaryById, { id, updatedData });
    yield put(Creators.updateCountryBoundarySuccess({ data }));
    yield put(ToastCreators.success());
  }
  catch (error) {
    const errorMessage = get(error, 'response.data.detail');
    yield put(ToastCreators.error({ message: errorMessage }));
  }
}

function* watchUpdateCountryBoundaryRequest() {
  yield takeLatest(Types.UPDATE_COUNTRY_BOUNDARY_REQUEST, updateCountryBoundaryRequest);
}

function* createCountryBoundaryRequest({ body }) {
  try {
    const data = yield call(createCountryBoundary, { body });
    yield put(Creators.createCountryBoundarySuccess({ data }));
    yield put(ToastCreators.success());
  }
  catch (error) {
    const errorMessage = get(error, 'response.data.detail');
    yield put(ToastCreators.error({ message: errorMessage }));
  }
}

function* watchCreateCountryBoundaryRequest() {
  yield takeLatest(Types.CREATE_COUNTRY_BOUNDARY_REQUEST, createCountryBoundaryRequest);
}

// City
function* createCityRequest({ body }) {
  const { countryId } = body;
  try {
    const data = yield call(createCity, { body });
    yield put(Creators.createCitySuccess({ data }));
    yield put(ToastCreators.success());
    yield put(CommonCreators.getCitiesRequest({ countryId }));
  }
  catch (error) {
    const errorMessage = get(error, 'response.data.detail');
    yield put(ToastCreators.error({ message: errorMessage }));
  }
}

function* watchCreateCityRequest() {
  yield takeLatest(Types.CREATE_CITY_REQUEST, createCityRequest);
}

function* updateCityRequest({ id, updatedData }) {
  const { countryId } = updatedData;
  try {
    const data = yield call(updateCityById, { id, updatedData });
    yield put(Creators.updateCitySuccess({ data }));
    yield put(ToastCreators.success());
    yield put(CommonCreators.getCitiesRequest({ countryId }));
  }
  catch (error) {
    const errorMessage = get(error, 'response.data.detail');
    yield put(ToastCreators.error({ message: errorMessage }));
  }
}

function* watchUpdateCityRequest() {
  yield takeLatest(Types.UPDATE_CITY_REQUEST, updateCityRequest);
}

function* getCityBoundaryRequest({ id }) {
  try {
    const data = yield call(getCityBoundary, { id });
    yield put(Creators.getCityBoundarySuccess({ data }));
    yield put(ToastCreators.success());
  }
  catch (error) {
    const errorMessage = get(error, 'response.data.detail');
    yield put(ToastCreators.error({ message: errorMessage }));
  }
}

function* watchGetCityBoundaryRequest() {
  yield takeLatest(Types.GET_CITY_BOUNDARY_REQUEST, getCityBoundaryRequest);
}

function* updateCityBoundaryRequest({ id, updatedData }) {
  try {
    const data = yield call(updateCityBoundaryById, { id, updatedData });
    yield put(Creators.updateCityBoundarySuccess({ data }));
    yield put(ToastCreators.success());
  }
  catch (error) {
    const errorMessage = get(error, 'response.data.detail');
    yield put(ToastCreators.error({ message: errorMessage }));
  }
}

function* watchUpdateCityBoundaryRequest() {
  yield takeLatest(Types.UPDATE_CITY_BOUNDARY_REQUEST, updateCityBoundaryRequest);
}

function* createCityBoundaryRequest({ body }) {
  try {
    const data = yield call(createCityBoundary, { body });
    yield put(Creators.createCityBoundarySuccess({ data }));
    yield put(ToastCreators.success());
  }
  catch (error) {
    const errorMessage = get(error, 'response.data.detail');
    yield put(ToastCreators.error({ message: errorMessage }));
  }
}

function* watchCreateCityBoundaryRequest() {
  yield takeLatest(Types.CREATE_CITY_BOUNDARY_REQUEST, createCityBoundaryRequest);
}

export default function* gisCountryCityManagementRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchGetCountriesWPageSizeRequest),
      fork(watchCreateCountryRequest),
      fork(watchUpdateCountryRequest),
      fork(watchGetCountryBoundaryRequest),
      fork(watchUpdateCountryBoundaryRequest),
      fork(watchCreateCountryBoundaryRequest),
      fork(watchCreateCityRequest),
      fork(watchUpdateCityRequest),
      fork(watchGetCityBoundaryRequest),
      fork(watchUpdateCityBoundaryRequest),
      fork(watchCreateCityBoundaryRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
