import { all, call, cancel, fork, put, select, take, takeLatest } from 'redux-saga/effects';

import {
  getConfigList as getAlgorithmDomainConfigListApi,
  getDomainSettings as getAlgorithmDomainSettingsApi,
  bulkEditWithCsv as bulkEditWithCsvApi,
} from '@shared/api/algorithm/config';

import { Types, Creators } from './actions';
import { algorithmDomainConfigListSelector } from './selectors';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { exportExcel } from '@shared/utils/common';

const AUTO_CLOSE_DURATION_MS = 2000;
export function* getAlgorithmDomainConfigList({ page, pageSize, filters }) {
  try {
    const namespace = yield select(algorithmDomainConfigListSelector.getNamespace);
    const data = yield call(getAlgorithmDomainConfigListApi, { namespace, page, pageSize, filters });
    yield put(Creators.getAlgorithmDomainConfigListSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getAlgorithmDomainConfigListFailure({ error }));
    yield put(ToastCreators.error({ error }));
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

export function* bulkEditCsvRequest({ file, isDomain }) {
  try {
    const namespace = yield select(algorithmDomainConfigListSelector.getNamespace);
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
export function* watchGetAlgorithmDomainConfigListRequest() {
  yield takeLatest(Types.GET_ALGORITHM_DOMAIN_CONFIG_LIST_REQUEST, getAlgorithmDomainConfigList);
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

export function* watchGetAlgorithmDomainSettingsRequest() {
  yield takeLatest(Types.GET_ALGORITHM_DOMAIN_SETTINGS_REQUEST, getAlgorithmDomainSettings);
}

export default function* algorithmDomainConfigListPageRootSaga() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchGetAlgorithmDomainConfigListRequest),
      fork(watchGetAlgorithmDomainSettingsRequest),
      fork(watchBulkEditCsvRequest),
      fork(watchExportCsvRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
