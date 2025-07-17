import { all, call, cancel, fork, put, take, takeLatest } from 'redux-saga/effects';

import { getProductPositionsByCategory, updateProductPositionsBulk } from '@shared/api/marketProduct';
import { Types, Creators } from './actions';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';

function* getProductPositionsByCategoryRequest({ id }) {
  try {
    const data = yield call(getProductPositionsByCategory, { id });
    yield put(Creators.getProductPositionsByCategorySuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getProductPositionsByCategoryFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* updateProductPositionsBulkRequest({ id, body }) {
  try {
    const data = yield call(updateProductPositionsBulk, { body });
    yield put(Creators.updateProductPositionsBulkSuccess({ data }));
    yield put(Creators.getProductPositionsByCategoryRequest({ id }));
    yield put(ToastCreators.success());
  }
  catch (error) {
    yield put(Creators.updateProductPositionsBulkFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchGetProductPositionsByCategoryRequest() {
  yield takeLatest(Types.GET_PRODUCT_POSITIONS_BY_CATEGORY_REQUEST, getProductPositionsByCategoryRequest);
}

function* watchUpdateProductPositionsBulkRequest() {
  yield takeLatest(Types.UPDATE_PRODUCT_POSITIONS_BULK_REQUEST, updateProductPositionsBulkRequest);
}

export default function* getProductPositionsByCategoryRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchGetProductPositionsByCategoryRequest),
      fork(watchUpdateProductPositionsBulkRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
