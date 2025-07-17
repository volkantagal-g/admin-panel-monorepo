import { all, call, cancel, fork, put, take, takeLatest } from 'redux-saga/effects';

import {
  getConfigDetail as getConfigDetailApi,
  getConfigValue as getConfigValueApi,
  updateConfigValue as updateConfigValueApi,
  getConfigList as getConfigListApi,
  updateConfigNode as updateConfigNodeApi,
  deleteConfigNode as deleteConfigNodeApi,
  linkCustomConfig as linkCustomConfigApi,
  unlinkCustomConfig as unlinkCustomConfigApi,
  getLinkedConfigs as getLinkedConfigsApi,
  getConfigSchema as getConfigSchemaApi,
  validateConfigValue as validateConfigValueApi,
} from '@shared/api/algorithm/config';
import { t } from '@shared/i18n';
import { Types, Creators } from './actions';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import history from '@shared/utils/history';
import { ROUTE } from '@app/routes';

function* getConfigDetail({ key, namespace }) {
  try {
    const data = yield call(getConfigDetailApi, { key, namespace });
    yield put(Creators.getConfigDetailSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getConfigDetailFailure({ error }));
  }
}

function* getConfigValue({ key, namespace }) {
  try {
    const data = yield call(getConfigValueApi, { key, namespace });
    yield put(Creators.getConfigValueSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getConfigValueFailure({ error }));
  }
}

function* updateConfigValue({ namespace, key, value }) {
  try {
    const data = yield call(updateConfigValueApi, { namespace, key, value });
    yield put(Creators.updateConfigValueSuccess({ data }));
    yield put(Creators.getConfigValueRequest({ key, namespace }));
  }
  catch (error) {
    yield put(Creators.updateConfigValueFailure({ error }));
  }
}

function* searchCustomConfig({ namespace, searchTerm }) {
  try {
    const filters = [
      { field: 'key', value: searchTerm, operator: 'icontains' },
      { field: 'is_custom', value: true, operator: 'exact' },
    ];
    const data = yield call(getConfigListApi, { namespace, filters });
    yield put(Creators.searchCustomConfigSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.searchCustomConfigFailure({ error }));
  }
}

function* linkCustomConfig({ namespace, leftKey, rightKey }) {
  try {
    const data = yield call(linkCustomConfigApi, { namespace, leftKey, rightKey });
    yield put(Creators.linkCustomConfigSuccess({ data }));
    yield put(Creators.getConfigValueRequest({ key: leftKey, namespace }));
  }
  catch (error) {
    yield put(Creators.linkCustomConfigFailure({ error }));
    yield put(ToastCreators.error({ error, toastOptions: { autoClose: 5000 } }));
  }
}

function* updateConfigNode({ namespace, key, updateBody }) {
  try {
    const data = yield call(updateConfigNodeApi, { namespace, key, updateBody });
    yield put(Creators.updateConfigNodeSuccess({ data }));
    const newKey = updateBody?.key;
    if (newKey !== key) {
      history.push(ROUTE.ALGORITHM_CONFIG_DETAIL.path.replace(':namespace', namespace).replace(':key', newKey));
    }
    else {
      yield put(Creators.getConfigDetailRequest({ key, namespace }));
    }
  }
  catch (error) {
    yield put(Creators.updateConfigNodeFailure({ error }));
    yield put(ToastCreators.error({ error, toastOptions: { autoClose: 5000 } }));
  }
}

function* deleteConfigNode({ namespace, key }) {
  try {
    const data = yield call(deleteConfigNodeApi, { namespace, key });
    yield put(Creators.deleteConfigNodeSuccess({ data }));
    yield put(ToastCreators.success({ message: t('Success'), toastOptions: { autoClose: 2000 } }));
    history.push(ROUTE.ALGORITHM_CONFIG_LIST.path);
  }
  catch (error) {
    yield put(Creators.deleteConfigNodeFailure({ error }));
    yield put(ToastCreators.error({ error, toastOptions: { autoClose: 5000 } }));
  }
}

function* getLinkedConfigs({ key, namespace }) {
  try {
    const data = yield call(getLinkedConfigsApi, { key, namespace });
    yield put(Creators.getLinkedConfigsSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getLinkedConfigsFailure({ error }));
  }
}

function* unlinkCustomConfig({ namespace, leftKey, rightKey }) {
  try {
    const data = yield call(unlinkCustomConfigApi, { namespace, leftKey, rightKey });
    yield put(Creators.unlinkCustomConfigSuccess({ data }));
    yield put(Creators.getConfigValueRequest({ key: leftKey, namespace }));
    yield put(Creators.getConfigDetailRequest({ key: leftKey, namespace }));
  }
  catch (error) {
    yield put(Creators.unlinkCustomConfigFailure({ error }));
  }
}

function* getConfigSchema({ namespace }) {
  try {
    const data = yield call(getConfigSchemaApi, { namespace });
    yield put(Creators.getConfigSchemaSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getConfigSchemaFailure({ error }));
  }
}

function* validateConfigValue({ namespace, value }) {
  try {
    const data = yield call(validateConfigValueApi, { namespace, value });
    yield put(Creators.validateConfigValueSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.validateConfigValueFailure({ error }));
  }
}

function* watchGetConfigDetailRequest() {
  yield takeLatest(Types.GET_CONFIG_DETAIL_REQUEST, getConfigDetail);
}

function* watchGetConfigValueRequest() {
  yield takeLatest(Types.GET_CONFIG_VALUE_REQUEST, getConfigValue);
}

function* watchUpdateConfigValueRequest() {
  yield takeLatest(Types.UPDATE_CONFIG_VALUE_REQUEST, updateConfigValue);
}

function* watchSearchCustomConfigRequest() {
  yield takeLatest(Types.SEARCH_CUSTOM_CONFIG_REQUEST, searchCustomConfig);
}

function* watchLinkCustomConfigRequest() {
  yield takeLatest(Types.LINK_CUSTOM_CONFIG_REQUEST, linkCustomConfig);
}

function* watchUnlinkCustomConfigRequest() {
  yield takeLatest(Types.UNLINK_CUSTOM_CONFIG_REQUEST, unlinkCustomConfig);
}

function* watchUpdateConfigNodeRequest() {
  yield takeLatest(Types.UPDATE_CONFIG_NODE_REQUEST, updateConfigNode);
}

function* watchDeleteConfigNodeRequest() {
  yield takeLatest(Types.DELETE_CONFIG_NODE_REQUEST, deleteConfigNode);
}

function* watchGetLinkedConfigsRequest() {
  yield takeLatest(Types.GET_LINKED_CONFIGS_REQUEST, getLinkedConfigs);
}

function* watchGetConfigSchemaRequest() {
  yield takeLatest(Types.GET_CONFIG_SCHEMA_REQUEST, getConfigSchema);
}

function* watchValidateConfigValueRequest() {
  yield takeLatest(Types.VALIDATE_CONFIG_VALUE_REQUEST, validateConfigValue);
}

export default function* algorithmConfigDetailPageRootSaga() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchGetConfigDetailRequest),
      fork(watchGetConfigValueRequest),
      fork(watchUpdateConfigValueRequest),
      fork(watchSearchCustomConfigRequest),
      fork(watchDeleteConfigNodeRequest),
      fork(watchUpdateConfigNodeRequest),
      fork(watchLinkCustomConfigRequest),
      fork(watchUnlinkCustomConfigRequest),
      fork(watchGetLinkedConfigsRequest),
      fork(watchGetConfigSchemaRequest),
      fork(watchValidateConfigValueRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
