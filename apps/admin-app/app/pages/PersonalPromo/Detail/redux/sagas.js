import { all, call, cancel, fork, put, take, takeLatest } from 'redux-saga/effects';

import { updatePromoDates, updatePromoStatus } from '@shared/api/customer';

import { Creators, Types } from './actions';
import { getPersonalPromoById } from '@shared/api/personalPromo';

function* getPromo(id) {
  const promo = yield call(getPersonalPromoById, id);
  yield put(Creators.getPersonalPromoSuccess({ personalPromo: promo }));
}

function* getPersonalPromoRequest({ promoId }) {
  try {
    yield call(getPromo, promoId);
  }
  catch (error) {
    yield put(Creators.getPersonalPromoFailure({ error }));
  }
}

function* updatePersonalPromoDatesRequest({ promoId, promoCode, validFrom, validUntil }) {
  try {
    yield call(updatePromoDates, { promoCode, validFrom, validUntil });
    yield call(getPromo, promoId);
  }
  catch (error) {
    yield put(Creators.updatePersonalPromoDatesFailure({ error }));
  }
}

function* updatePersonalPromoStatusRequest({ promoId, status }) {
  try {
    yield call(updatePromoStatus, { promoId, status });
    yield call(getPromo, promoId);
  }
  catch (error) {
    yield put(Creators.updatePersonalPromoStatusFailure({ error }));
  }
}

function* watchGetPersonalPromoRequest() {
  yield takeLatest(Types.GET_PERSONAL_PROMO_REQUEST, getPersonalPromoRequest);
}

function* watchUpdatePersonalPromoDatesRequest() {
  yield takeLatest(Types.UPDATE_PERSONAL_PROMO_DATES_REQUEST, updatePersonalPromoDatesRequest);
}

function* watchUpdatePersonalPromoStatus() {
  yield takeLatest(Types.UPDATE_PERSONAL_PROMO_STATUS_REQUEST, updatePersonalPromoStatusRequest);
}

export default function* personalPromoDetailRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchGetPersonalPromoRequest),
      fork(watchUpdatePersonalPromoDatesRequest),
      fork(watchUpdatePersonalPromoStatus),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
