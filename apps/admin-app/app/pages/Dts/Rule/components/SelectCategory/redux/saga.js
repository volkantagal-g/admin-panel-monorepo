import { all, cancel, call, fork, put, take, takeLatest } from 'redux-saga/effects';

import { getDtsCategories } from '@shared/api/dts';

import { Types, Creators } from './actions';

function* getCategoryRequest() {
  try {
    const { dtsRuleCategories } = yield call(getDtsCategories, { isActive: true });

    yield put(Creators.getCategorySuccess({ data: dtsRuleCategories }));
  }
  catch (error) {
    yield put(Creators.getCategoryFailure({ error }));
  }
}

function* watchCategoryRequest() {
  yield takeLatest(Types.GET_CATEGORY_REQUEST, getCategoryRequest);
}

export default function* getCategoryRoot() {
  while (yield take(Types.INIT_CONTAINER)) {
    const backgroundTasks = yield all([
      fork(watchCategoryRequest),
    ]);
    yield take(Types.DESTROY_CONTAINER);
    yield cancel(backgroundTasks);
  }
}
