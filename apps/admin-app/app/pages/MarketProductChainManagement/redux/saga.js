import { get } from 'lodash';
import {
  all,
  put,
  call,
  takeLatest,
} from 'redux-saga/effects';

import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { marketProductChainManagementAPI } from '@shared/api/marketProductChainManagement';

import { Types, Creators } from './actions';

function* fetchModalCentralWarehousesSaga() {
  try {
    const response = yield call(marketProductChainManagementAPI.centralWarehouse.getCentralWarehouseList);

    if (response.success) {
      yield put(Creators.fetchModalCentralWarehousesSuccess(response.data));
    }
    else {
      throw new Error('Failed to fetch central warehouses');
    }
  }
  catch (error) {
    yield put(Creators.fetchModalCentralWarehousesFailure(
      get(error, 'message', 'An error occurred while fetching central warehouses'),
    ));
    yield put(ToastCreators.error({ message: get(error, 'message', 'Failed to fetch central warehouses') }));
  }
}

function* createPlatformSaga({ request }) {
  try {
    const response = yield call(marketProductChainManagementAPI.platform.createPlatform, request);
    if (response.success) {
      yield put(Creators.createPlatformSuccess(response.data));
      yield put(ToastCreators.success({ message: 'Platform created successfully' }));
    }
    else {
      throw new Error('Failed to create platform');
    }
  }
  catch (error) {
    yield put(Creators.createPlatformFailure(
      get(error, 'message', 'An error occurred while creating platform'),
    ));
    yield put(ToastCreators.error({ message: get(error, 'message', 'Failed to create platform') }));
  }
}

function* watchFetchModalCentralWarehouses() {
  yield takeLatest(Types.FETCH_MODAL_CENTRAL_WAREHOUSES_REQUEST, fetchModalCentralWarehousesSaga);
}

function* watchCreatePlatform() {
  yield takeLatest(Types.CREATE_PLATFORM_REQUEST, createPlatformSaga);
}

export default function* rootSaga() {
  yield all([
    watchFetchModalCentralWarehouses(),
    watchCreatePlatform(),
  ]);
}
