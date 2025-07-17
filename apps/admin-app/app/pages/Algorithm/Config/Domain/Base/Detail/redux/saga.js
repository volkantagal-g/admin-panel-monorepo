import { all, call, cancel, fork, put, take, takeLatest } from 'redux-saga/effects';

import {
  getDomainConfigDetail as getAlgorithmDomainConfigDetailApi,
  getDomainConfigValue as getAlgorithmDomainConfigValueApi,
  getDomainSettings as getAlgorithmDomainSettingsApi,
  updateDomainConfigValue as updateAlgorithmDomainConfigValueApi,
} from '@shared/api/algorithm/config';

import { getWarehouseById as getWarehouseByIdApi } from '@shared/api/warehouse';

import { Types, Creators } from './actions';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { CONFIG_TYPES } from '@app/pages/Algorithm/Config/Domain/constants';

export function* getAlgorithmDomainConfigDetail({ key, namespace }) {
  try {
    const { data } = yield call(getAlgorithmDomainConfigDetailApi, { key, namespace });
    yield put(Creators.getAlgorithmDomainConfigDetailSuccess({ data }));

    if (data?.type === CONFIG_TYPES.WAREHOUSE) {
      yield put(Creators.getWarehouseDetailRequest({ key }));
    }
  }
  catch (error) {
    yield put(Creators.getAlgorithmDomainConfigDetailFailure({ error }));
  }
}

export function* getAlgorithmDomainConfigValue({ key, namespace }) {
  try {
    const { data } = yield call(getAlgorithmDomainConfigValueApi, { key, namespace });
    yield put(Creators.getAlgorithmDomainConfigValueSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getAlgorithmDomainConfigValueFailure({ error }));
  }
}

export function* getAlgorithmDomainSettings({ namespace }) {
  try {
    const { data } = yield call(getAlgorithmDomainSettingsApi, { namespace });
    yield put(Creators.getAlgorithmDomainSettingsSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getAlgorithmDomainSettingsFailure({ error }));
  }
}

export function* updateAlgorithmDomainConfigValue({ key, namespace, value }) {
  try {
    const { data } = yield call(updateAlgorithmDomainConfigValueApi, { key, namespace, value });
    yield put(Creators.updateAlgorithmDomainConfigValueSuccess({ data }));
    yield put(ToastCreators.success());
    yield put(Creators.getAlgorithmDomainConfigDetailRequest({ key, namespace }));
    yield put(Creators.getAlgorithmDomainConfigValueRequest({ key, namespace }));
  }
  catch (error) {
    yield put(Creators.updateAlgorithmDomainConfigValueFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* getWarehouseDetail({ key }) {
  try {
    const data = yield call(getWarehouseByIdApi, { id: key });
    yield put(Creators.getWarehouseDetailSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getWarehouseDetailFailure({ error }));
  }
}

export function* watchGetAlgorithmDomainConfigDetailRequest() {
  yield takeLatest(Types.GET_ALGORITHM_DOMAIN_CONFIG_DETAIL_REQUEST, getAlgorithmDomainConfigDetail);
}

export function* watchGetAlgorithmDomainConfigValueRequest() {
  yield takeLatest(Types.GET_ALGORITHM_DOMAIN_CONFIG_VALUE_REQUEST, getAlgorithmDomainConfigValue);
}

export function* watchGetAlgorithmDomainSettingsRequest() {
  yield takeLatest(Types.GET_ALGORITHM_DOMAIN_SETTINGS_REQUEST, getAlgorithmDomainSettings);
}

export function* watchUpdateAlgorithmDomainConfigValueRequest() {
  yield takeLatest(Types.UPDATE_ALGORITHM_DOMAIN_CONFIG_VALUE_REQUEST, updateAlgorithmDomainConfigValue);
}

export function* watchGetWarehouseDetail() {
  yield takeLatest(Types.GET_WAREHOUSE_DETAIL_REQUEST, getWarehouseDetail);
}

export default function* algorithmDomainConfigDetailPageRootSaga() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchGetAlgorithmDomainConfigDetailRequest),
      fork(watchGetAlgorithmDomainConfigValueRequest),
      fork(watchGetAlgorithmDomainSettingsRequest),
      fork(watchUpdateAlgorithmDomainConfigValueRequest),
      fork(watchGetWarehouseDetail),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
