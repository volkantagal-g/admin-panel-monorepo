import { all, call, cancel, fork, put, take, takeLatest } from 'redux-saga/effects';

import { createNotification, filterNotification } from '@shared/api/CourierCommunication';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import history from '@shared/utils/history';
import { ROUTE } from '@app/routes';
import { Types, Creators } from './action';
import notificationListParams from '../utils';

export function* notificationListRequest({
  notificationID,
  notificationName,
  status,
  priority,
  creationDateTime,
  sendingDateTime,
  currentPage,
  rowsPerPage,
}) {
  try {
    const params = notificationListParams({ notificationID, notificationName, status, priority, creationDateTime, sendingDateTime, currentPage, rowsPerPage });
    const data = yield call(filterNotification, params);
    yield put(Creators.notificationListSuccess({ data }));
    yield put(ToastCreators.success());
  }
  catch (error) {
    yield put(Creators.notificationListFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* watchNotificationList() {
  yield takeLatest(Types.NOTIFICATION_LIST, notificationListRequest);
}

export function* duplicateNotificationRequest({
  courierIds,
  notificationName,
  channel,
  priority,
  notification,
  category,
}) {
  try {
    const params = {
      courierIds,
      notificationName,
      channel,
      priority,
      notification,
      category,
    };
    const { notificationTask } = yield call(createNotification, params);
    yield put(ToastCreators.success());
    history.push(ROUTE.COURIER_COMMUNICATION_NOTIFICATION_DETAIL.path.replace(':id', notificationTask._id));
  }
  catch (error) {
    yield put(ToastCreators.error({ error }));
  }
}

export function* watchDuplicateNotificationRequest() {
  yield takeLatest(Types.DUPLICATE_NOTIFICATION, duplicateNotificationRequest);
}

export default function* notificationList() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchDuplicateNotificationRequest),
      fork(watchNotificationList),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
