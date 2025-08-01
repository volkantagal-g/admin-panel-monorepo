import { all, call, cancel, fork, put, take, takeLatest } from 'redux-saga/effects';

import { getMarketProductCategories } from '@shared/api/marketProductCategory';
import { Types, Creators } from './actions';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';

export function* getMarketProductCategoriesRequest({ limit, offset, queryText, status, domainType }) {
  try {
    const data = yield call(getMarketProductCategories, { isSubCategory: false, limit, offset, queryText, status, domainType });
    yield put(Creators.getMarketProductCategoriesSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getMarketProductCategoriesFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* getMarketProductSubCategoriesRequest({ limit, offset, queryText, status }) {
  try {
    const data = yield call(getMarketProductCategories, { isSubCategory: true, limit, offset, queryText, status });
    yield put(Creators.getMarketProductSubCategoriesSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getMarketProductSubCategoriesFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* watchMarketProductCategoriesRequest() {
  yield takeLatest(Types.GET_MARKET_PRODUCT_CATEGORIES_REQUEST, getMarketProductCategoriesRequest);
}

export function* watchMarketProductSubCategoriesRequest() {
  yield takeLatest(Types.GET_MARKET_PRODUCT_SUB_CATEGORIES_REQUEST, getMarketProductSubCategoriesRequest);
}

export default function* marketProductCategoryListRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchMarketProductCategoriesRequest),
      fork(watchMarketProductSubCategoriesRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
