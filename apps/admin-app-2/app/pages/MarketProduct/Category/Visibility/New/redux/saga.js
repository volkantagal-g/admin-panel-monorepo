import { all, takeLatest, call, cancel, fork, put, take } from 'redux-saga/effects';

import history from '@shared/utils/history';
import { createMarketProductCategoryAvailableTime } from '@shared/api/marketProductCategoryAvailableTime';
import { Types, Creators } from './actions';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { ROUTE } from '@app/routes';

export function* createMarketProductCategoryAvailableTimeRequest({ body }) {
  try {
    const data = yield call(createMarketProductCategoryAvailableTime, { body });
    yield put(ToastCreators.success());
    yield call(history.push, ROUTE.MARKET_PRODUCT_CATEGORY_VISIBILITY_LIST.path);
    yield put(Creators.createMarketProductCategoryAvailableTimeSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.createMarketProductCategoryAvailableTimeFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* watchCreateMarketProductCategoryAvailableTimeRequest() {
  yield takeLatest(Types.CREATE_MARKET_PRODUCT_CATEGORY_AVAILABLE_TIME_REQUEST, createMarketProductCategoryAvailableTimeRequest);
}

export default function* marketProductCategoryAvailableTimeRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchCreateMarketProductCategoryAvailableTimeRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
