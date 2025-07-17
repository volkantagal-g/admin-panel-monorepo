import { all, call, cancel, fork, put, take, takeLatest } from 'redux-saga/effects';

import { Types, Creators } from './actions';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { getMarketProductCategories } from '@shared/api/marketing';

export function* getMarketProductCategoriesRequest({ isSubCategory, status }) {
  try {
    const data = yield call(getMarketProductCategories, { isSubCategory, status });
    yield put(Creators.getMarketProductCategoriesSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getMarketProductCategoriesFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchGetMarketProductCategoriesRequest() {
  yield takeLatest(Types.GET_MARKET_PRODUCT_CATEGORIES_REQUEST, getMarketProductCategoriesRequest);
}

export default function* root() {
  while (yield take(Types.INIT_CONTAINER)) {
    const backgroundTasks = yield all([
      fork(watchGetMarketProductCategoriesRequest),
    ]);
    yield take(Types.DESTROY_CONTAINER);
    yield cancel(backgroundTasks);
  }
}
