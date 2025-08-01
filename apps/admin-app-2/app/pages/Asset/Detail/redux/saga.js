import { all, takeLatest, call, cancel, fork, put, take } from 'redux-saga/effects';

import { Types, Creators } from './actions';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import {
  updateEmployeeAsset, assetDetails, assetHistory, getAssetRepairHistory,
  createAssetRepairHistory, updateAssetRepairHistory, getAssetChangeEventInfo,
} from '@shared/api/employee';
import { getLangKey } from '@shared/i18n';

function* updateAssetRequest({ body, assetId }) {
  const langKey = getLangKey();
  try {
    const data = yield call(updateEmployeeAsset, { body, assetId });
    yield put(Creators.updateAssetSuccess({ data }));
    yield put(Creators.getAssetChangeEventInfoRequest({ assetId, langKey }));
    yield put(ToastCreators.success());
  }
  catch (error) {
    yield put(Creators.updateAssetFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* AssetDetailRequest({ assetId }) {
  try {
    const data = yield call(assetDetails, { assetId });
    yield put(Creators.assetDetailSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.updateAssetFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* AssetHistoryRequest({ filters }) {
  try {
    const { data, nextPageCursor, previousPageCursor } = yield call(assetHistory, { filters });
    yield put(Creators.assetHistorySuccess({ data, nextPageCursor, previousPageCursor }));
  }
  catch (error) {
    yield put(Creators.assetHistoryFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* getAssetRepairHistoryRequest({ assetId }) {
  try {
    const { data } = yield call(getAssetRepairHistory, { assetId });
    yield put(Creators.getAssetRepairHistorySuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getAssetRepairHistoryFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* createAssetRepairHistoryRequest({ body }) {
  try {
    yield call(createAssetRepairHistory, { body });
    const { assetId } = body;
    yield put(Creators.getAssetRepairHistoryRequest({ assetId }));
    yield put(ToastCreators.success());
  }
  catch (error) {
    yield put(ToastCreators.error({ error }));
  }
}

function* updateAssetRepairHistoryRequest({ body }) {
  try {
    yield call(updateAssetRepairHistory, { body });
    const { assetId } = body;
    yield put(Creators.getAssetRepairHistoryRequest({ assetId }));
    yield put(ToastCreators.success());
  }
  catch (error) {
    yield put(ToastCreators.error({ error }));
  }
}

function* getAssetChangeEventInfoRequest({ assetId, langKey }) {
  try {
    const { data } = yield call(getAssetChangeEventInfo, { assetId, langKey });
    yield put(Creators.getAssetChangeEventInfoSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getAssetChangeEventInfoFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchUpdateAssetRequest() {
  yield takeLatest(Types.UPDATE_ASSET_REQUEST, updateAssetRequest);
}

function* watchAssetDetailRequest() {
  yield takeLatest(Types.ASSET_DETAIL_REQUEST, AssetDetailRequest);
}

function* watchAssetHistoryRequest() {
  yield takeLatest(Types.ASSET_HISTORY_REQUEST, AssetHistoryRequest);
}

function* watchGetAssetRepairHistoryRequest() {
  yield takeLatest(Types.GET_ASSET_REPAIR_HISTORY_REQUEST, getAssetRepairHistoryRequest);
}

function* watchCreateAssetRepairHistoryRequest() {
  yield takeLatest(Types.CREATE_ASSET_REPAIR_HISTORY_REQUEST, createAssetRepairHistoryRequest);
}

function* watchUpdateAssetRepairHistoryRequest() {
  yield takeLatest(Types.UPDATE_ASSET_REPAIR_HISTORY_REQUEST, updateAssetRepairHistoryRequest);
}

function* watchGetAssetChangeEventInfoRequest() {
  yield takeLatest(Types.GET_ASSET_CHANGE_EVENT_INFO_REQUEST, getAssetChangeEventInfoRequest);
}

export default function* assetNewRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchUpdateAssetRequest),
      fork(watchAssetDetailRequest),
      fork(watchAssetHistoryRequest),
      fork(watchGetAssetRepairHistoryRequest),
      fork(watchCreateAssetRepairHistoryRequest),
      fork(watchUpdateAssetRepairHistoryRequest),
      fork(watchGetAssetChangeEventInfoRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
