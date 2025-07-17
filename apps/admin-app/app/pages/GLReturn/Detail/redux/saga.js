import { call, all, cancel, fork, put, take, takeLatest } from 'redux-saga/effects';

import { t } from '@shared/i18n';

import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { getSlotData, getUpdatedCourierPlanData, getCourierReassignData } from '@shared/api/getirLocalsReturn';
import { Types, Creators } from './actions';
import { DATA_STATUS } from '../constants';

function* getSlotDataRequest({ data: dataIn }) {
  const { warehouseId } = dataIn;
  try {
    const data = yield call(getSlotData, { warehouseId });
    yield put(Creators.getSlotDataSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getSlotDataFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* getUpdatedCourierPlanRequest({ warehouseId }) {
  try {
    const data = yield call(getUpdatedCourierPlanData, { warehouseId });
    yield put(Creators.getUpdatedCourierPlanSuccess({ data }));

    if (data.status === DATA_STATUS.SUCCESS) {
      yield put(Creators.getSlotDataRequest({ data: { warehouseId } }));
    }
    else if (data.status === DATA_STATUS.FAILED) {
      yield put(ToastCreators.error({ message: t('glReturnAlertPage:UPDATE_COURIER_PLAN_ERROR_MESSAGE'), toastOptions: { autoClose: 3000 } }));
      yield put(Creators.getSlotDataRequest({ data: { warehouseId } }));
    }
  }
  catch (error) {
    yield put(Creators.getUpdatedCourierPlanFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* getCourierReassignDataRequest({ id, warehouseId }) {
  try {
    const data = yield call(getCourierReassignData, { id });
    yield put(Creators.getUpdatedCourierPlanSuccess({ data }));

    if (data.status === DATA_STATUS.SUCCESS) {
      yield put(Creators.getSlotDataRequest({ data: { warehouseId } }));
    }
    else if (data.status === DATA_STATUS.FAILED) {
      yield put(ToastCreators.error({ message: t('glReturnAlertPage:RETRY_COURIER_ASSIGNMENT_MESSAGE'), toastOptions: { autoClose: 3000 } }));
      yield put(Creators.getSlotDataRequest({ data: { warehouseId } }));
    }
  }
  catch (error) {
    yield put(Creators.getUpdatedCourierPlanFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchGetSlotDataRequest() {
  yield takeLatest(Types.GET_SLOT_DATA_REQUEST, getSlotDataRequest);
}

function* watchGetUpdatedCourierPlanRequest() {
  yield takeLatest(Types.GET_UPDATED_COURIER_PLAN_REQUEST, getUpdatedCourierPlanRequest);
}

function* watchGetCourierReassignDataRequest() {
  yield takeLatest(Types.GET_COURIER_REASSIGN_DATA_REQUEST, getCourierReassignDataRequest);
}

export default function* dataTrackingOrderRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchGetSlotDataRequest),
      fork(watchGetUpdatedCourierPlanRequest),
      fork(watchGetCourierReassignDataRequest),
    ]);
    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
