import { all, call, cancel, fork, put, take, takeLatest } from 'redux-saga/effects';

import { deleteConfigByKey, filterConfigs, updateConfigByKey, updateCustomConfigByKeyAndCountry } from '@shared/api/marketConfig';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';

import { Types, Creators } from './actions';

function* getConfigs({
  searchText,
  cursor,
  limit,
}) {
  try {
    const { configs, nextPageToken, prevPageToken } = yield call(filterConfigs, { searchText, cursor, limit });
    yield put(Creators.getConfigsSuccess({ data: configs, prevPageToken, nextPageToken }));
  }
  catch (error) {
    yield put(Creators.getConfigsFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* updateConfig({ t, successCallback, mismatchCallback, key, configType, isCustomEnabled, value, description, responsibleSquad, __v }) {
  try {
    const updatedConfig = yield call(updateConfigByKey, { key, isCustomEnabled, value, type: configType, description, responsibleSquad, __v });
    if (updatedConfig.error === 'ConfigVersionMismatched') {
      yield put(ToastCreators.error({ message: t('configPage:CONFIG_VERSION_MISMATCH'), toastOptions: { autoClose: 10 * 1000 } }));
      yield put(Creators.updateConfigFailure({ error: updatedConfig }));
      yield call(mismatchCallback);
    }
    else {
      yield put(Creators.updateConfigSuccess({ key, updatedConfig }));
      yield call(successCallback);
    }
  }
  catch (error) {
    yield put(Creators.updateConfigFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* updateCustomConfig({ key, configType, countryCode, value, __v }) {
  try {
    const updatedConfig = yield call(updateCustomConfigByKeyAndCountry, { key, countryCode, value, __v, type: configType });
    yield put(Creators.updateConfigSuccess({ key, updatedConfig }));
  }
  catch (error) {
    yield put(ToastCreators.error({ error }));
    yield put(Creators.updateConfigFailure({ error }));
  }
}

function* deleteConfig({ key, configType }) {
  try {
    yield call(deleteConfigByKey, { key, type: configType });
    yield put(Creators.deleteConfigSuccess({ key }));
  }
  catch (error) {
    yield put(Creators.deleteConfigFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchGetConfigsRequest() {
  yield takeLatest(Types.GET_CONFIGS_REQUEST, getConfigs);
}

function* watchUpdateConfigRequest() {
  yield takeLatest(Types.UPDATE_CONFIG_REQUEST, updateConfig);
}

function* watchUpdateCustomConfigRequest() {
  yield takeLatest(Types.UPDATE_CUSTOM_CONFIG_REQUEST, updateCustomConfig);
}

function* watchDeleteConfigRequest() {
  yield takeLatest(Types.DELETE_CONFIG_REQUEST, deleteConfig);
}

export default function* configListPageRootSaga() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchGetConfigsRequest),
      fork(watchUpdateConfigRequest),
      fork(watchUpdateCustomConfigRequest),
      fork(watchDeleteConfigRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
