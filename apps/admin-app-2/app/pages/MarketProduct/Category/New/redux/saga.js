import { all, takeLatest, call, cancel, fork, put, take } from 'redux-saga/effects';
import _ from 'lodash';

import history from '@shared/utils/history';
import { createMarketProductCategory, getMarketProductCategories } from '@shared/api/marketProductCategory';
import { Types, Creators } from './actions';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { ROUTE } from '@app/routes';

export function* getMarketProductCategoriesRequest() {
  try {
    const data = yield call(getMarketProductCategories, { isSubCategory: false, limit: null, offset: null });
    yield put(Creators.getMarketProductCategoriesSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getMarketProductCategoriesFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* createMarketProductCategoryRequest({ body }) {
  try {
    const data = yield call(createMarketProductCategory, { body });
    yield put(ToastCreators.success());
    const marketProductCategoryId = _.get(data, '_id', '');
    const path = ROUTE.MARKET_PRODUCT_CATEGORY_DETAIL.path.replace(':id', marketProductCategoryId);
    history.push(path);
    yield put(Creators.createMarketProductCategorySuccess({ data }));
  }
  catch (error) {
    yield put(Creators.createMarketProductCategoryFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* watchGetMarketProductCategoriesRequest() {
  yield takeLatest(Types.GET_MARKET_PRODUCT_CATEGORIES_REQUEST, getMarketProductCategoriesRequest);
}

export function* watchCreateMarketProductCategoryRequest() {
  yield takeLatest(Types.CREATE_MARKET_PRODUCT_CATEGORY_REQUEST, createMarketProductCategoryRequest);
}

export default function* marketProductCategoryNewRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchGetMarketProductCategoriesRequest),
      fork(watchCreateMarketProductCategoryRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
