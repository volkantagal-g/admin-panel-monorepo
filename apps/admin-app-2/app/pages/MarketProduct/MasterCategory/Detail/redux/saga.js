import { all, takeLatest, call, cancel, fork, put, take } from 'redux-saga/effects';

import {
  getMarketProductMasterCategory,
  updateMarketProductMasterCategory,
  getChildrenOfMarketProductMasterCategory,
} from '@shared/api/marketProductMasterCategory';
import { Types, Creators } from './actions';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';

function* getMarketProductMasterCategoryRequest({ id }) {
  try {
    const data = yield call(getMarketProductMasterCategory, { id });
    yield put(Creators.getMarketProductMasterCategorySuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getMarketProductMasterCategoryFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* updateMarketProductMasterCategoryRequest({ id, body }) {
  try {
    const data = yield call(updateMarketProductMasterCategory, { id, body });
    yield put(Creators.updateMarketProductMasterCategorySuccess({ data }));
    yield put(Creators.getMarketProductMasterCategoryRequest({ id }));
    yield put(ToastCreators.success());
  }
  catch (error) {
    yield put(Creators.updateMarketProductMasterCategoryFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* getChildrenOfMarketProductMasterCategoryRequest({ id, limit, offset }) {
  try {
    const data = yield call(getChildrenOfMarketProductMasterCategory, { id, limit, offset });
    yield put(Creators.getChildrenOfMarketProductMasterCategorySuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getChildrenOfMarketProductMasterCategoryFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchGetMarketProductMasterCategoryRequest() {
  yield takeLatest(Types.GET_MARKET_PRODUCT_MASTER_CATEGORY_REQUEST, getMarketProductMasterCategoryRequest);
}

function* watchUpdateMarketProductMasterCategoryRequest() {
  yield takeLatest(Types.UPDATE_MARKET_PRODUCT_MASTER_CATEGORY_REQUEST, updateMarketProductMasterCategoryRequest);
}

function* watchGetChildrenOfMarketProductMasterCategoryRequest() {
  yield takeLatest(Types.GET_CHILDREN_OF_MARKET_PRODUCT_MASTER_CATEGORY_REQUEST, getChildrenOfMarketProductMasterCategoryRequest);
}

export default function* masterCategoryDetailRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchGetMarketProductMasterCategoryRequest),
      fork(watchUpdateMarketProductMasterCategoryRequest),
      fork(watchGetChildrenOfMarketProductMasterCategoryRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
