import { all, takeLatest, call, cancel, fork, put, take } from 'redux-saga/effects';

import { getMarketProductCategories } from '@shared/api/marketProductCategory';
import { Types, Creators } from './actions';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';

function* getMarketProductSubCategoriesRequest({ body }) {
  try {
    const data = yield call(getMarketProductCategories, body);
    yield put(Creators.getMarketProductSubCategoriesSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getMarketProductSubCategoriesFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchGetMarketProductSubCategoriesRequest() {
  yield takeLatest(Types.GET_MARKET_PRODUCT_SUB_CATEGORIES_REQUEST, getMarketProductSubCategoriesRequest);
}

export default function* pushNotificationRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchGetMarketProductSubCategoriesRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
