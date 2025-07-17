import { isFunction } from 'lodash';
import { all, call, fork, put, take, takeLatest } from 'redux-saga/effects';

import { ActionWithType } from '@shared/containers/AssetManagementModules/types';

import {
  getTrafficPenaltyRecords,
  createTrafficPenaltyRecords,
  ICreateTrafficPenaltyRecord,
  updateTrafficPenaltyRecord,
  IUpdateTrafficPenaltyRecord,
  deleteTrafficPenaltyRecord,
} from '@shared/api/employeeAssetManagement/vehicleTabRequests';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { Creators, Types } from './actions';

export function* filterTrafficPenaltyRequest(
  { assetId }: ActionWithType<{assetId: MongoIDType}>,
): Generator {
  try {
    const trafficPenalty = yield call(getTrafficPenaltyRecords, { assetId });
    yield put(Creators.filterTrafficPenaltySuccess({ trafficPenalty }));
  }
  catch (error) {
    yield put(Creators.filterTrafficPenaltyFailure({ error }));
  }
}

export function* watchFilterTrafficPenaltyRequest(): Generator {
  yield takeLatest(Types.FILTER_TRAFFIC_PENALTY_REQUEST, filterTrafficPenaltyRequest);
}

export function* createTrafficPenaltyRequest(
  { trafficPenaltyRecord, onSuccess }: ActionWithType<{trafficPenaltyRecord: ICreateTrafficPenaltyRecord, onSuccess: () => void}>,
): Generator {
  try {
    const trafficPenalty = yield call(createTrafficPenaltyRecords, { trafficPenaltyRecord });
    yield put(Creators.createTrafficPenaltySuccess({ trafficPenalty }));

    yield put(ToastCreators.success());

    if (isFunction(onSuccess)) {
      onSuccess();
    }
  }
  catch (error) {
    yield put(Creators.createTrafficPenaltyFailure({ error }));
  }
}

export function* watchCreateTrafficPenaltyRequest(): Generator {
  yield takeLatest(Types.CREATE_TRAFFIC_PENALTY_REQUEST, createTrafficPenaltyRequest);
}

export function* updateTrafficPenaltyRequest(
  { trafficPenaltyRecordId, updateData, onSuccess }:
  ActionWithType<{trafficPenaltyRecordId: MongoIDType, updateData: IUpdateTrafficPenaltyRecord, onSuccess: () => void}>,
): Generator {
  try {
    const trafficPenalty = yield call(updateTrafficPenaltyRecord, { trafficPenaltyRecordId, updateData });
    yield put(Creators.updateTrafficPenaltySuccess({ trafficPenalty }));

    yield put(ToastCreators.success());

    if (isFunction(onSuccess)) {
      onSuccess();
    }
  }
  catch (error) {
    yield put(Creators.updateTrafficPenaltyFailure({ error }));
  }
}

export function* watchUpdateTrafficPenaltyRequest(): Generator {
  yield takeLatest(Types.UPDATE_TRAFFIC_PENALTY_REQUEST, updateTrafficPenaltyRequest);
}

export function* deleteTrafficPenaltyRequest(
  { trafficPenaltyRecordId, onSuccess }: ActionWithType<{trafficPenaltyRecordId: MongoIDType, onSuccess: () => void}>,
): Generator {
  try {
    const trafficPenalty = yield call(deleteTrafficPenaltyRecord, { trafficPenaltyRecordId });
    yield put(Creators.deleteTrafficPenaltySuccess({ trafficPenalty }));

    yield put(ToastCreators.success());

    if (isFunction(onSuccess)) {
      onSuccess();
    }
  }
  catch (error) {
    yield put(Creators.deleteTrafficPenaltyFailure({ error }));
  }
}

export function* watchDeleteTrafficPenaltyRequest(): Generator {
  yield takeLatest(Types.DELETE_TRAFFIC_PENALTY_REQUEST, deleteTrafficPenaltyRequest);
}

// Root Saga
export default function* trafficPenaltyRecordRootSaga(): Generator {
  while (yield take(Types.INIT_CONTAINER)) {
    const backgroundTasks = yield all([
      fork(watchFilterTrafficPenaltyRequest),
      fork(watchCreateTrafficPenaltyRequest),
      fork(watchUpdateTrafficPenaltyRequest),
      fork(watchDeleteTrafficPenaltyRequest),
    ]);

    yield (take(Types.DESTROY_CONTAINER));

    // @ts-ignore
    yield all(backgroundTasks.map(task => task.cancel()));
  }
}
