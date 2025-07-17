import { all, call, cancel, fork, put, take, takeLatest } from 'redux-saga/effects';

import { getMarketProductCategories } from '@shared/api/marketProductCategory';
import { Types, Creators } from './actions';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';

function* getMarketProductCategoriesRequest(body) {
  try {
    const { parent, isSubCategory, limit, offset, queryText } = body;
    const data = yield call(getMarketProductCategories, { parent, isSubCategory, limit, offset, queryText });
    yield put(Creators.getMarketProductCategoriesSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getMarketProductCategoriesFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* watchGetMarketProductCategoriesRequest() {
  yield takeLatest(Types.GET_MARKET_PRODUCT_CATEGORIES_REQUEST, getMarketProductCategoriesRequest);
}

export default function* getMarketProductCategoriesRoot() {
  while (yield take(Types.INIT_CONTAINER)) {
    const backgroundTasks = yield all([
      fork(watchGetMarketProductCategoriesRequest),
    ]);

    yield take(Types.DESTROY_CONTAINER);
    yield cancel(backgroundTasks);
  }
}
