import { all, call, cancel, fork, put, take, takeLatest } from 'redux-saga/effects';

import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { Types, Creators } from './actions';
import { getDynamicLevels, getFeeDetails } from '@shared/api/fee';
import { watchmarketFeesBulkUploadRequest } from '../../BulkFeeUpload/redux/sagas';
import { createSocketEventChannel } from '@shared/redux/sagas/common';
import { SOCKET_EVENT } from '@shared/api/socket/constants';

export function* getFeeDetailsRequest({ warehouseId }) {
  try {
    const data = yield call(getFeeDetails, { warehouseId });
    yield put(Creators.getFeeDetailsSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getFeeDetailsFailure({ error }));
  }
}

export function* fetchDynamicLevels({ warehouseId }) {
  const data = yield call(getDynamicLevels, { warehouseId });
  yield put(Creators.getDynamicLevelsSuccess({ data }));
}
export function* getDynamicLevelsRequest({ warehouseId }) {
  try {
    yield call(fetchDynamicLevels, { warehouseId });
  }
  catch (error) {
    yield put(Creators.getDynamicLevelsFailure({ error }));
  }
}

function* watchDynamicDeliveryLevel(channel) {
  try {
    while (true) {
      const dynamicDeliveryFeeLevel = yield take(channel);
      if (dynamicDeliveryFeeLevel) {
        yield put(Creators.updateDynamicDeliveryLevel({ dynamicDeliveryFeeLevel }));
      }
    }
  }
  catch (error) {
    yield put(ToastCreators.error({ error }));
  }
  finally {
    channel.close();
  }
}
function* watchDynamicServiceLevel(channel) {
  try {
    while (true) {
      const dynamicServiceFeeLevel = yield take(channel);
      if (dynamicServiceFeeLevel) {
        yield put(Creators.updateDynamicServiceLevel({ dynamicServiceFeeLevel }));
      }
    }
  }
  catch (error) {
    yield put(ToastCreators.error({ error }));
  }
  finally {
    channel.close();
  }
}

export function* startListeningSocketEvents({ warehouseId }) {
  const channels = [];
  channels.push(call(createSocketEventChannel, SOCKET_EVENT.NEW_DYNAMIC_DELIVERY_LEVEL, { warehouseId }));
  channels.push(call(createSocketEventChannel, SOCKET_EVENT.NEW_DYNAMIC_SERVICE_LEVEL, { warehouseId }));

  const [dynamicDeliveryLevelChannel, dynamicServiceLevelChannel] = yield all(channels);
  yield all([
    fork(watchDynamicDeliveryLevel, dynamicDeliveryLevelChannel),
    fork(watchDynamicServiceLevel, dynamicServiceLevelChannel),
  ]);
}

export function* watchSocketEvents() {
  yield takeLatest(Types.START_LISTENING_SOCKET_EVENTS, startListeningSocketEvents);
}

export function* watchGetFeeDetailsRequest() {
  yield takeLatest(Types.GET_FEE_DETAILS_REQUEST, getFeeDetailsRequest);
}

export function* watchGetDynamicLevelsRequest() {
  yield takeLatest(Types.GET_DYNAMIC_LEVELS_REQUEST, getDynamicLevelsRequest);
}

export default function* marketFeeDetailPageRootSaga() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchGetFeeDetailsRequest),
      fork(watchGetDynamicLevelsRequest),
      fork(watchmarketFeesBulkUploadRequest),
      fork(watchSocketEvents),
    ]);
    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
