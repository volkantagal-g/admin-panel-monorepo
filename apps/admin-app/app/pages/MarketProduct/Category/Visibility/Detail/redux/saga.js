import { all, takeLatest, call, cancel, fork, put, take } from 'redux-saga/effects';

import {
  getMarketProductCategoryAvailableTime,
  updateMarketProductCategoryAvailableTime,
} from '@shared/api/marketProductCategoryAvailableTime';
import { Types, Creators } from './actions';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';

export function* getMarketProductCategoryAvailableTimeRequest({ id }) {
  try {
    const data = yield call(getMarketProductCategoryAvailableTime, { id });
    yield put(Creators.getMarketProductCategoryAvailableTimeSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getMarketProductCategoryAvailableTimeFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* updateMarketProductCategoryAvailableTimeRequest({ id, body }) {
  try {
    yield call(updateMarketProductCategoryAvailableTime, { id, body });
    yield put(Creators.updateMarketProductCategoryAvailableTimeSuccess());
    yield put(Creators.getMarketProductCategoryAvailableTimeRequest({ id }));
    yield put(ToastCreators.success());
  }
  catch (error) {
    yield put(Creators.updateMarketProductCategoryAvailableTimeFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* watchGetMarketProductCategoryAvailableTimeRequest() {
  yield takeLatest(Types.GET_MARKET_PRODUCT_CATEGORY_AVAILABLE_TIME_REQUEST, getMarketProductCategoryAvailableTimeRequest);
}

export function* watchUpdateMarketProductCategoryAvailableTimeRequest() {
  yield takeLatest(Types.UPDATE_MARKET_PRODUCT_CATEGORY_AVAILABLE_TIME_REQUEST, updateMarketProductCategoryAvailableTimeRequest);
}

export default function* marketProductCategoryAvailableTimeRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchGetMarketProductCategoryAvailableTimeRequest),
      fork(watchUpdateMarketProductCategoryAvailableTimeRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
