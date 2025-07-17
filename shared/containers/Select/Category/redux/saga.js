import { all, takeEvery, call, cancel, fork, put, take } from 'redux-saga/effects';

import { getCategories } from '@shared/api/category';
import { Types, Creators } from './actions';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';

function* getCategoryRequest({ serviceType, textQuery }) {
  try {
    const data = yield call(getCategories, { serviceType, textQuery });
    yield put(Creators.getCategorySuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getCategoryFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchGetCategoriesRequest() {
  yield takeEvery(Types.GET_CATEGORY_REQUEST, getCategoryRequest);
}

export default function* pushNotificationRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchGetCategoriesRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
