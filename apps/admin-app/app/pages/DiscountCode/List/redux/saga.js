import { all, call, cancel, fork, put, take, takeLatest } from 'redux-saga/effects';

import { getDiscountCode, getClientByIds } from '@shared/api/discountCode';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';

import { Creators, Types } from './actions';

function* getDiscountCodeRequest({ discountCode }) {
  try {
    const data = yield call(getDiscountCode, { discountCode });
    yield put(Creators.getDiscountCodeSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getDiscountCodeFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* getDiscountCodeUsedClientsRequest({ clientIds }) {
  try {
    const data = yield call(getClientByIds, { clientIds });
    yield put(Creators.getDiscountCodeUsedClientsSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getDiscountCodeUsedClientsFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchGetDiscountCodeRequest() {
  yield takeLatest(Types.GET_DISCOUNT_CODE_REQUEST, getDiscountCodeRequest);
}

function* watchGetDiscountCodeUsedClientsRequest() {
  yield takeLatest(Types.GET_DISCOUNT_CODE_USED_CLIENTS_REQUEST, getDiscountCodeUsedClientsRequest);
}

export default function* discountCodeListRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchGetDiscountCodeRequest),
      fork(watchGetDiscountCodeUsedClientsRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
