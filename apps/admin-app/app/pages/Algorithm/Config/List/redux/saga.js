import { all, call, cancel, fork, put, take, takeLatest } from 'redux-saga/effects';

import {
  getConfigList as getAlgorithmConfigListApi,
  getNamespaceList as getAlgorithmConfigNamespaceListApi,
  getTypeList as getAlgorithmConfigTypeListApi,
  createConfig as createConfigApi,
  getConfigSchema as getConfigSchemaApi,
  bulkEditWithCsv as bulkEditWithCsvApi,
} from '@shared/api/algorithm/config';

import { Types, Creators } from './actions';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { authorizedNamespaces } from '@app/pages/Algorithm/Config/utils';
import { exportExcel } from '@shared/utils/common';

const AUTO_CLOSE_DURATION_MS = 2000;
export function* getAlgorithmConfigList({ namespace, page, pageSize, filters }) {
  try {
    const data = yield call(getAlgorithmConfigListApi, { namespace, page, pageSize, filters });
    yield put(Creators.getAlgorithmConfigListSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getAlgorithmConfigListFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* getAlgorithmConfigNamespaceList() {
  try {
    const data = yield call(getAlgorithmConfigNamespaceListApi);
    yield put(Creators.getAlgorithmConfigNamespaceListSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getAlgorithmConfigNamespaceListFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* getAlgorithmConfigTypeList({ namespace }) {
  try {
    const data = yield call(getAlgorithmConfigTypeListApi, { namespace });
    yield put(Creators.getAlgorithmConfigTypeListSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getAlgorithmConfigTypeListFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* getConfigSchema({ namespace }) {
  try {
    let data;
    if (authorizedNamespaces.includes(namespace)) {
      data = yield call(getConfigSchemaApi, { namespace });
    }
    else {
      data = {};
    }
    yield put(Creators.getConfigSchemaSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getConfigSchemaFailure({ error }));
  }
}

export function* bulkEditCsvRequest({ namespace, file, isDomain }) {
  try {
    const data = yield call(bulkEditWithCsvApi, { namespace, data: file.base64File, isDomain });
    yield put(Creators.bulkEditCsvSuccess());
    yield put(ToastCreators.success({
      message: data.message,
      toastOptions: { autoClose: AUTO_CLOSE_DURATION_MS },
    }));
  }
  catch (error) {
    yield put(Creators.bulkEditCsvFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* watchBulkEditCsvRequest() {
  yield takeLatest(Types.BULK_EDIT_CSV_REQUEST, bulkEditCsvRequest);
}

export function* createAlgorithmConfig({ namespace, key, alias, configType, value }) {
  try {
    const data = yield call(createConfigApi, { namespace, key, alias, configType, value });
    yield put(Creators.createAlgorithmConfigSuccess({ data }));
    yield put(ToastCreators.success());
  }
  catch (error) {
    yield put(Creators.createAlgorithmConfigFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* watchGetAlgorithmConfigListRequest() {
  yield takeLatest(Types.GET_ALGORITHM_CONFIG_LIST_REQUEST, getAlgorithmConfigList);
}

export function* watchGetAlgorithmConfigNamespaceListRequest() {
  yield takeLatest(Types.GET_ALGORITHM_CONFIG_NAMESPACE_LIST_REQUEST, getAlgorithmConfigNamespaceList);
}

export function* watchGetAlgorithmConfigTypeListRequest() {
  yield takeLatest(Types.GET_ALGORITHM_CONFIG_TYPE_LIST_REQUEST, getAlgorithmConfigTypeList);
}

function* watchGetConfigSchemaRequest() {
  yield takeLatest(Types.GET_CONFIG_SCHEMA_REQUEST, getConfigSchema);
}

export function* watchCreateAlgorithmConfigRequest() {
  yield takeLatest(Types.CREATE_ALGORITHM_CONFIG_REQUEST, createAlgorithmConfig);
}

export function* exportCsvRequest({ rows, fileName, columns }) {
  try {
    exportExcel(rows, fileName, columns);
    yield put(Creators.exportCsvSuccess());
  }
  catch (error) {
    yield put(Creators.exportCsvFailure({ error }));
  }
}

export function* watchExportCsvRequest() {
  yield takeLatest(Types.EXPORT_CSV_REQUEST, exportCsvRequest);
}

export default function* algorithmConfigListPageRootSaga() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchGetAlgorithmConfigListRequest),
      fork(watchGetAlgorithmConfigNamespaceListRequest),
      fork(watchGetAlgorithmConfigTypeListRequest),
      fork(watchGetConfigSchemaRequest),
      fork(watchCreateAlgorithmConfigRequest),
      fork(watchBulkEditCsvRequest),
      fork(watchExportCsvRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
