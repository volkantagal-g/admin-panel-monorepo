import { all, call, cancel, fork, put, take, takeLatest } from 'redux-saga/effects';

import { getResults, getPoints, getDtsCategories } from '@shared/api/dts';
import { Types, Creators } from './actions';
import { Types as CommonsTypes } from '@shared/redux/actions/common';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';

function* getResultsRequest({ date, franchiseId }) {
  try {
    const data = yield call(getResults, { date, franchiseId });
    yield put(Creators.getResultsSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getResultsFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* getPointsRequest({ startDate, endDate, franchiseId }) {
  try {
    const data = yield call(getPoints, { startDate, endDate, franchiseId });
    yield put(Creators.getPointsSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getPointsFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* getDtsCategoriesRequest() {
  try {
    const data = yield call(getDtsCategories);
    yield put(Creators.getDtsCategoriesSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getDtsCategoriesFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* getCitiesAction({ data: cities }) {
  try {
    // const selectedCities = cities.map(city => {
    //   return city._id;
    // });
    yield put(Creators.setCities({ cities: [] }));
  }
  catch (error) {
    yield put(ToastCreators.error({ error }));
  }
}

function* watchResultsRequest() {
  yield takeLatest(Types.GET_RESULTS_REQUEST, getResultsRequest);
}

function* watchPointsRequest() {
  yield takeLatest(Types.GET_POINTS_REQUEST, getPointsRequest);
}

function* watchDtsCategoriesRequest() {
  yield takeLatest(Types.GET_DTS_CATEGORIES_REQUEST, getDtsCategoriesRequest);
}

function* watchGetCitiesAction() {
  yield takeLatest(CommonsTypes.GET_CITIES_SUCCESS, getCitiesAction);
}

export default function* dtsRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchResultsRequest),
      fork(watchPointsRequest),
      fork(watchDtsCategoriesRequest),
      fork(watchGetCitiesAction),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
