import { all, call, cancel, fork, put, take, takeLatest } from 'redux-saga/effects';

import { getPromosByPromoCode, updatePromoStatus } from '@shared/api/promo';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';

import { Creators, Types } from './actions';

function* getPersonalPromoRequest({ promoCode, promoUsageType }) {
  try {
    const data = yield call(
      getPromosByPromoCode,
      promoCode,
      promoUsageType,
    );
    yield put(Creators.getPersonalPromoSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getPersonalPromoFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* disablePersonalPromoRequest({ id, body }) {
  try {
    const { promoCode, promoUsageType } = body;
    yield call(updatePromoStatus, { id, body });
    yield put(Creators.getPersonalPromoRequest({ promoCode, promoUsageType }));
    yield put(ToastCreators.success());
  }
  catch (error) {
    yield put(Creators.disablePersonalPromoFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchGetPersonalPromoRequest() {
  yield takeLatest(Types.GET_PERSONAL_PROMO_REQUEST, getPersonalPromoRequest);
}

function* watchDisablePersonalPromoRequest() {
  yield takeLatest(Types.DISABLE_PERSONAL_PROMO_REQUEST, disablePersonalPromoRequest);
}

export default function* personalPromoListRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchGetPersonalPromoRequest),
      fork(watchDisablePersonalPromoRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
