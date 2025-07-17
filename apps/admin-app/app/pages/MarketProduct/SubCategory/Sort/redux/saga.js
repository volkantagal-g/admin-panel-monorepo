import { all, call, cancel, fork, put, take, takeLatest } from 'redux-saga/effects';

import {
  getSubCategoryPositions,
  updateSubCategoryOrderBulk,
} from '@shared/api/marketProductCategory';
import { Types, Creators } from './actions';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';

function* getSubCategoryPositionsRequest({ categoryId }) {
  try {
    const data = yield call(getSubCategoryPositions, { id: categoryId });
    yield put(Creators.getSubCategoryPositionsSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getSubCategoryPositionsFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* updateSubCategoryOrderBulkRequest({ categoryId, body }) {
  try {
    const data = yield call(updateSubCategoryOrderBulk, { body });
    yield put(Creators.updateSubCategoryOrderBulkSuccess({ data }));
    yield getSubCategoryPositionsRequest({ categoryId });
    yield put(ToastCreators.success());
  }
  catch (error) {
    yield put(Creators.updateSubCategoryOrderBulkFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchGetSubCategoryPositionsRequest() {
  yield takeLatest(Types.GET_SUB_CATEGORY_POSITIONS_REQUEST, getSubCategoryPositionsRequest);
}

function* watchUpdateSubCategoryOrderBulkRequest() {
  yield takeLatest(Types.UPDATE_SUB_CATEGORY_ORDER_BULK_REQUEST, updateSubCategoryOrderBulkRequest);
}

export default function* subCategorySortRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchGetSubCategoryPositionsRequest),
      fork(watchUpdateSubCategoryOrderBulkRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
