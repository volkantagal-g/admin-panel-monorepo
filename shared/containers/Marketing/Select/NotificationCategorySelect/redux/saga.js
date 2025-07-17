import { all, call, cancel, fork, put, take, takeEvery, takeLatest } from 'redux-saga/effects';

import { Types, Creators } from './actions';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { getNotificationCategoryDetail, getNotificationCategories } from '@shared/api/notificationCenter';

export function* getNotificationCategoriesRequest({ textQuery }) {
  try {
    const { data } = yield call(getNotificationCategories, textQuery);
    yield put(Creators.getNotificationCategoriesSuccess({ content: data?.content }));
  }
  catch (error) {
    yield put(Creators.getNotificationCategoriesFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* getNotificationCategoryDetailRequest({ categoryId }) {
  try {
    const { data } = yield call(getNotificationCategoryDetail, categoryId);
    yield put(Creators.getNotificationCategoryDetailSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getNotificationCategoryDetailFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchgetNotificationCategoriesRequest() {
  yield takeLatest(Types.GET_NOTIFICATION_CATEGORIES_REQUEST, getNotificationCategoriesRequest);
}

function* watchgetNotificationCategoryDetailRequest() {
  yield takeEvery(Types.GET_NOTIFICATION_CATEGORY_DETAIL_REQUEST, getNotificationCategoryDetailRequest);
}

export default function* root() {
  while (yield take(Types.INIT_CONTAINER)) {
    const backgroundTasks = yield all([
      fork(watchgetNotificationCategoriesRequest),
      fork(watchgetNotificationCategoryDetailRequest),
    ]);
    yield take(Types.DESTROY_CONTAINER);
    yield cancel(backgroundTasks);
  }
}
