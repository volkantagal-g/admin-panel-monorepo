import { all, call, cancel, fork, put, take, takeLatest } from 'redux-saga/effects';

import { omitBy, isUndefined, isNull } from 'lodash';
import axios from 'axios';

import {
  getEmployeeAssetList, getEmployeeAssetListExcelDownloadLink,
  bulkInsertAssets as bulkInsertAssetsApi,
  bulkUpdateAssets as bulkUpdateAssetsApi,
  getCurrentEmployeeAssetReportDownloadLink,
  getFormerEmployeeAssetReportDownloadLink,
} from '@shared/api/employee';

import { Types, Creators } from './actions';
import { getLangKey } from '@shared/i18n';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';

function* getEmployeeAssetListRequest({ filters }) {
  const { CancelToken } = axios;
  const cancelSource = CancelToken.source();
  const requestBody = omitBy(filters, filter => isUndefined(filter) || isNull(filter) || filter === '');
  try {
    const { assets, nextPageCursor, previousPageCursor } = yield call(getEmployeeAssetList, { ...requestBody, cancelSource });
    yield put(Creators.getEmployeeAssetListSuccess({ data: assets, nextPageCursor, previousPageCursor }));
  }
  catch (error) {
    yield put(Creators.getEmployeeAssetListFailure({ error }));
  }
}

function* getEmployeeAssetDownload({ filters, isForBulkUpdate = false }) {
  const { CancelToken } = axios;
  const cancelSource = CancelToken.source();

  const requestBody = omitBy(filters, filter => isUndefined(filter) || isNull(filter) || filter === '');
  requestBody.deviceStatuses = undefined;

  try {
    const { url } = yield call(getEmployeeAssetListExcelDownloadLink, { cancelSource, langKey: getLangKey(), ...requestBody, isForBulkUpdate });
    if (url) {
      yield put(Creators.getEmployeeAssetListExcelDownloadSuccess());
      window.open(url, '_blank').focus();
    }
  }
  catch (error) {
    yield put(Creators.getEmployeeAssetListExcelDownloadFailure({ error }));
  }
}

function* getCurrentEmployeeAssetReportDownload({ country }) {
  const { CancelToken } = axios;
  const cancelSource = CancelToken.source();

  try {
    const { url } = yield call(getCurrentEmployeeAssetReportDownloadLink, { cancelSource, langKey: getLangKey(), country });
    if (url) {
      yield put(Creators.getEmployeeAssetListExcelDownloadSuccess());
      window.open(url, '_blank').focus();
    }
  }
  catch (error) {
    yield put(Creators.getEmployeeAssetListExcelDownloadFailure({ error }));
  }
}

function* getFormerEmployeeAssetReportDownload({ country }) {
  const { CancelToken } = axios;
  const cancelSource = CancelToken.source();

  try {
    const { url } = yield call(getFormerEmployeeAssetReportDownloadLink, { cancelSource, langKey: getLangKey(), country });
    if (url) {
      yield put(Creators.getEmployeeAssetListExcelDownloadSuccess());
      window.open(url, '_blank').focus();
    }
  }
  catch (error) {
    yield put(Creators.getEmployeeAssetListExcelDownloadFailure({ error }));
  }
}

function* bulkInsertAssets({ assets }) {
  const { CancelToken } = axios;
  const cancelSource = CancelToken.source();

  try {
    yield call(bulkInsertAssetsApi, { cancelSource, assets });
    yield put(Creators.bulkInsertAssetsSuccess());
    yield put(ToastCreators.success());
  }
  catch (error) {
    yield put(Creators.bulkInsertAssetsFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* bulkUpdateAssets({ assets }) {
  const { CancelToken } = axios;
  const cancelSource = CancelToken.source();

  try {
    yield call(bulkUpdateAssetsApi, { cancelSource, assets });
    yield put(Creators.bulkUpdateAssetsSuccess());
    yield put(ToastCreators.success());
  }
  catch (error) {
    yield put(Creators.bulkUpdateAssetsFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchGetEmployeeAssetListRequest() {
  yield takeLatest(Types.GET_EMPLOYEE_ASSET_LIST_REQUEST, getEmployeeAssetListRequest);
}

function* watchGetCurrentEmployeeAssetReportRequest() {
  yield takeLatest(Types.GET_CURRENT_EMPLOYEE_ASSET_REPORT_DOWNLOAD_REQUEST, getCurrentEmployeeAssetReportDownload);
}

function* watchGetFormerEmployeeAssetReportRequest() {
  yield takeLatest(Types.GET_FORMER_EMPLOYEE_ASSET_REPORT_DOWNLOAD_REQUEST, getFormerEmployeeAssetReportDownload);
}

function* watchGetEmployeeAssetListExcelDownloadRequest() {
  yield takeLatest(Types.GET_EMPLOYEE_ASSET_LIST_EXCEL_DOWNLOAD_REQUEST, getEmployeeAssetDownload);
}

function* watchGetBulkInsertAssetsRequest() {
  yield takeLatest(Types.BULK_INSERT_ASSETS_REQUEST, bulkInsertAssets);
}

function* watchGetBulkUpdateAssetsRequest() {
  yield takeLatest(Types.BULK_UPDATE_ASSETS_REQUEST, bulkUpdateAssets);
}

export default function* employeeAssetListPageRootSaga() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchGetEmployeeAssetListRequest),
      fork(watchGetEmployeeAssetListExcelDownloadRequest),
      fork(watchGetBulkInsertAssetsRequest),
      fork(watchGetBulkUpdateAssetsRequest),
      fork(watchGetCurrentEmployeeAssetReportRequest),
      fork(watchGetFormerEmployeeAssetReportRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
