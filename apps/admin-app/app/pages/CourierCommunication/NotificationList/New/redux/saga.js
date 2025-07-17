import { all, call, cancel, fork, put, take, takeLatest } from 'redux-saga/effects';

import { createNotification, getCategories } from '@shared/api/CourierCommunication';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import history from '@shared/utils/history';
import { Types, Creators } from './action';
import { filterCourier as filterCouriersApi } from '@shared/api/courierHandler';

export function* notificationCreateRequest({
  courierIds, notificationDateTime,
  notificationName, notificationChannel, priority, notification, channel, category,
}) {
  try {
    const params = {
      courierIds,
      notificationDateTime,
      notificationName,
      notificationChannel,
      priority,
      notification,
      channel,
      category,
    };
    const data = yield call(createNotification, params);
    yield put(Creators.createNotificationSuccess({ data }));
    yield put(ToastCreators.success());
    history.push('/courier/communication/notification/list');
  }
  catch (error) {
    yield put(Creators.createNotificationFailure({ error }));
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

export function* cleanCourierIds() {
  try {
    yield put(Creators.getCourierIdsListSuccess({ data: [] }));
  }
  catch (error) {
    yield put(ToastCreators.error({ error }));
  }
}

export function* getCourierIdsList(data) {
  try {
    const { couriers } = yield call(
      filterCouriersApi,
      { limit: 10000, offset: 0, reqParams: { fields: 'id', warehouseIds: data?.warehouseIds } },
    );
    const courierIdsArr = couriers.map(item => item?._id);

    yield put(Creators.getCourierIdsListSuccess({ data: courierIdsArr }));
  }
  catch (error) {
    yield put(ToastCreators.error({ error }));
  }
}

export function* watchCreateNotification() {
  yield takeLatest(Types.CREATE_NOTIFICATION, notificationCreateRequest);
}

export function* watchGetCategories() {
  yield takeLatest(Types.GET_CATEGORIES_REQUEST, getCategoriesRequest);
}

export function* watchGetCourierIdsList() {
  yield takeLatest(Types.GET_COURIER_IDS_LIST_REQUEST, getCourierIdsList);
}

export default function* notificationList() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchCreateNotification),
      fork(watchGetCategories),
      fork(watchGetCourierIdsList),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
