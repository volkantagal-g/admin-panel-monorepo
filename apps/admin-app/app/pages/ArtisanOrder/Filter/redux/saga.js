import { all, call, cancel, fork, put, take, takeLatest } from 'redux-saga/effects';

import { getResults } from '@shared/api/artisanOrder';
import { getPaymentMethods } from '@shared/api/shop';
import { Types, Creators } from '@app/pages/ArtisanOrder/Filter/redux/actions';
import { Types as CommonsTypes } from '@shared/redux/actions/common';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';

function* getResultsRequest({ data }) {
  try {
    const results = yield call(getResults, data);
    yield put(Creators.getResultsSuccess({ data: results }));
  }
  catch (error) {
    yield put(Creators.getResultsFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* getPaymentMethodsRequest({ data }) {
  try {
    const paymentMethods = yield call(getPaymentMethods, data);
    yield put(Creators.setPaymentMethods({ paymentMethods }));
  }
  catch (error) {
    yield put(Creators.getPaymentMethodsFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* getCitiesAction({ data: cities }) {
  try {
    const selectedCities = {};
    cities.forEach(city => {
      selectedCities[city._id] = city;
    });
    yield put(Creators.setCities({ cities: selectedCities }));
  }
  catch (error) {
    yield put(ToastCreators.error({ error }));
  }
}

function* watchPaymentMethodsRequest() {
  yield takeLatest(Types.GET_PAYMENT_METHODS, getPaymentMethodsRequest);
}

function* watchResultsRequest() {
  yield takeLatest(Types.GET_RESULTS_REQUEST, getResultsRequest);
}

function* watchGetCitiesAction() {
  yield takeLatest(CommonsTypes.GET_CITIES_SUCCESS, getCitiesAction);
}

export default function* artisanOrderFilterSagaRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchResultsRequest),
      fork(watchPaymentMethodsRequest),
      fork(watchGetCitiesAction),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
