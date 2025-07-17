import { all, call, cancel, fork, put, take, takeLatest } from 'redux-saga/effects';

import history from '@shared/utils/history';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { getNotificationById, updateNotification, getNotificationStats, getCategories } from '@shared/api/CourierCommunication';
import { Types, Creators } from './actions';

export function* notificationDetailsRequest({ id }) {
  try {
    const data = yield call(getNotificationById, { id });
    yield put(Creators.getNotificationByIdSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getNotificationByIdFailure({ error }));
    yield put(ToastCreators.error({ error }));
    history.push('/courier/communication/notification/list');
  }
}

export function* notificationUpdateRequest({
  _id,
  courierIds,
  scheduledAt,
  name,
  priority,
  notification,
  channel,
  category,
}) {
  try {
    const data = yield call(updateNotification, {
      _id,
      courierIds,
      name,
      channel,
      priority,
      notification,
      scheduledAt,
      category,
    });
    yield put(Creators.notificationUpdateSuccess({ data }));
    yield put(ToastCreators.success());
  }
  catch (error) {
    yield put(Creators.notificationUpdateFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* notificationStatsRequest({ id }) {
  try {
    const data = yield call(getNotificationStats, { id });
    yield put(Creators.getNotificationStatsSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getNotificationStatsFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* getCategoriesRequest({ fields }) {
  try {
    const data = yield call(getCategories, { fields });
    yield put(Creators.getCategoriesSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getCategoriesFailure({ error }));
  }
}

export function* watchNotificationDetailsRequest() {
  yield takeLatest(Types.GET_NOTIFICATION_BY_ID_REQUEST, notificationDetailsRequest);
}

export function* watchNotificationUpdateRequest() {
  yield takeLatest(Types.NOTIFICATION_UPDATE_REQUEST, notificationUpdateRequest);
}

export function* watchNotificationStatsRequest() {
  yield takeLatest(Types.GET_NOTIFICATION_STATS, notificationStatsRequest);
}

export function* watchGetCategories() {
  yield takeLatest(Types.GET_CATEGORIES_REQUEST, getCategoriesRequest);
}

export default function* notificationDetailPageRootSaga() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchNotificationDetailsRequest),
      fork(watchNotificationUpdateRequest),
      fork(watchNotificationStatsRequest),
      fork(watchGetCategories),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
