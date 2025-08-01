import { all, call, cancel, fork, put, take, takeLatest } from 'redux-saga/effects';
import { isFunction as _isFunction } from 'lodash';

import { t } from '@shared/i18n';
import {
  getAssetById,
  updateAsset,
  assignAsset as assignAssetAPI,
  unassignAsset as unassignAssetAPI,
} from '@shared/api/employeeAssetManagement/asset';

import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { Types, Creators } from './actions';

function* getAssetByIdRequest({ assetId }: { assetId: MongoIDType }): any {
  try {
    const asset = yield call(getAssetById, { assetId });
    yield put(Creators.getAssetByIdSuccess({
      asset: {
        ...asset,
        fieldValues: {
          ...asset.fieldValues,
          uniqueIdentifier: asset?.uniqueIdentifier,
        },
      },
    }));
  }
  catch (error : any) {
    yield put(Creators.getAssetByIdFailure());
    yield put(ToastCreators.error({ error }));
  }
}
function* watchGetAssetByIdRequest() {
  yield takeLatest(Types.GET_ASSET_BY_ID_REQUEST as any, getAssetByIdRequest);
}

function* updateAssetRequest({
  assetId,
  updateData,
  typeData,
  onSuccess,
}: { assetId: MongoIDType,
  typeData: MongoIDType,
  updateData: any,
  onSuccess: Function,
}): any {
  try {
    const updatedAsset = yield call(updateAsset, { assetId, type: typeData, updateData });
    yield put(Creators.updateAssetSuccess({ asset: updatedAsset }));
    if (_isFunction(onSuccess)) {
      onSuccess(assetId);
    }
  }
  catch (error: any) {
    yield put(Creators.updateAssetFailure());
    yield put(ToastCreators.error({ error }));
  }
}
function* watchUpdateAssetRequest() {
  yield takeLatest(Types.UPDATE_ASSET_REQUEST as any, updateAssetRequest);
}

function* assignAssetRequest({
  assetId,
  employeeId,
  assignmentStartDate,
  assignmentEndDate,
  assignmentPeriodType,
  note,
  onSuccess,
}: any) {
  try {
    yield call(assignAssetAPI, {
      assetId,
      employeeId,
      assignmentStartDate,
      assignmentEndDate,
      assignmentPeriodType,
      note,
    });

    yield put(Creators.assignAssetSuccess({}));
    if (_isFunction(onSuccess)) {
      onSuccess(assetId);
    }
  }
  catch (error: any) {
    const errorCode = error?.response?.data?.code;
    // @ts-ignore
    yield put(ToastCreators.error(errorCode ? { message: t(`assetManagement:ASSET_SERVICE_ERROR_CODE.${errorCode}`) } : { error }));
    yield put(Creators.assignAssetFailure({}));
  }
}

function* watchAssignAssetRequest() {
  yield takeLatest(Types.ASSIGN_ASSET_REQUEST as any, assignAssetRequest);
}

function* unassignAssetRequest({
  assetId,
  assignmentReturnDate,
  assignableStatus,
  assignableStatusReason,
  note,
  onSuccess,
}: any) {
  try {
    yield call(unassignAssetAPI, {
      assetId,
      assignmentReturnDate,
      note,
      assignableStatus,
      assignableStatusReason,
    });

    yield put(Creators.assignAssetSuccess({}));
    if (_isFunction(onSuccess)) {
      onSuccess(assetId);
    }
  }
  catch (error: any) {
    const errorCode = error?.response?.data?.code;
    // @ts-ignore
    yield put(ToastCreators.error(errorCode ? { message: t(`assetManagement:ASSET_SERVICE_ERROR_CODE.${errorCode}`) } : { error }));
    yield put(Creators.assignAssetFailure({}));
  }
}

function* watchUnassignAssetRequest() {
  yield takeLatest(Types.UNASSIGN_ASSET_REQUEST as any, unassignAssetRequest);
}

export default function* assetDetailPageRootSaga(): any {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchGetAssetByIdRequest),
      fork(watchUpdateAssetRequest),
      fork(watchAssignAssetRequest),
      fork(watchUnassignAssetRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
