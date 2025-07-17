import { all, call, cancel, fork, put, take, takeLatest } from 'redux-saga/effects';

import { getMarketProductMasterCategories } from '@shared/api/marketProductMasterCategory';
import { Types, Creators } from './actions';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';

function* getMarketProductMasterCategoriesRequest({ queryText, level, limit, offset }) {
  try {
    const data = yield call(getMarketProductMasterCategories, { queryText, level, limit, offset });
    yield put(Creators.getMarketProductMasterCategoriesSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getMarketProductMasterCategoriesFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* watchGetMarketProductMasterCategoriesRequest() {
  yield takeLatest(Types.GET_MARKET_PRODUCT_MASTER_CATEGORIES_REQUEST, getMarketProductMasterCategoriesRequest);
}

export default function* getMarketProductMasterCategoriesRoot() {
  while (yield take(Types.INIT_CONTAINER)) {
    const backgroundTasks = yield all([
      fork(watchGetMarketProductMasterCategoriesRequest),
    ]);

    yield take(Types.DESTROY_CONTAINER);
    yield cancel(backgroundTasks);
  }
}
