import { all, call, fork, put, take, takeLatest } from 'redux-saga/effects';
import { isFunction } from 'lodash';

import { t } from '@shared/i18n';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { ActionWithType } from '@shared/containers/AssetManagementModules/types';
import { getAssigneesOfAsset as getAssigneesOfAssetAPI, updateAssetHistory as updateAssetHistoryAPI } from '@shared/api/employeeAssetManagement/asset';
import { Creators, Types } from './actions';

export function* getAssigneesRequest(
  { asset }: ActionWithType<{asset: string}>,
): Generator {
  try {
    const payload = { asset };

    // @ts-ignore
    const { assetHistories } = yield call(getAssigneesOfAssetAPI, payload);
    yield put(Creators.getAssigneesSuccess({ data: assetHistories }));
  }
  catch (error: any) {
    const errorCode = error?.response?.data?.code;
    const errorMessage = errorCode && t(`assetManagement:ASSET_SERVICE_ERROR_CODE.${errorCode}`);
    // @ts-ignore
    yield put(ToastCreators.error(errorMessage ? { message: errorMessage } : { error }));
    yield put(Creators.getAssigneesFailure({ error }));
  }
}

export function* updateAssetHistoryRequest(
  {
    assetId,
    historyId,
    updateData,
    onSuccess,
  }: ActionWithType<{assetId: string, historyId: string, updateData: any, onSuccess: Function}>,
): Generator {
  try {
    // @ts-ignore
    yield call(updateAssetHistoryAPI, { historyId, updateData });
    yield put(Creators.updateAssetHistorySuccess({}));
    if (isFunction(onSuccess)) {
      onSuccess();
    }
    yield put(Creators.getAssigneesRequest({ asset: assetId }));
  }
  catch (error: any) {
    const errorCode = error?.response?.data?.code;
    const errorMessage = errorCode && t(`assetManagement:ASSET_SERVICE_ERROR_CODE.${errorCode}`);
    // @ts-ignore
    yield put(ToastCreators.error(errorMessage ? { message: errorMessage } : { error }));
    yield put(Creators.updateAssetHistoryFailure({ error }));
  }
}

export function* watchGetAssigneesRequest() {
  yield takeLatest(Types.GET_ASSIGNEES_REQUEST, getAssigneesRequest);
}

export function* watchUpdateAssetHistoryRequest() {
  yield takeLatest(Types.UPDATE_ASSET_HISTORY_REQUEST, updateAssetHistoryRequest);
}

// Root Saga
export default function* complianceRecordRootSaga(): Generator {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchGetAssigneesRequest),
      fork(watchUpdateAssetHistoryRequest),
    ]);

    yield (take(Types.DESTROY_PAGE));

    // @ts-ignore
    yield all(backgroundTasks.map(task => task.cancel()));
  }
}
