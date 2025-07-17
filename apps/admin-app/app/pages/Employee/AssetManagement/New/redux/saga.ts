import { all, call, cancel, fork, put, take, takeLatest } from 'redux-saga/effects';

import { isFunction as _isFunction } from 'lodash';

import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { Types, Creators } from './actions';
import { getAssetTypeById as getAssetTypeByIdApi, createAsset as createAssetApi } from '@shared/api/employeeAssetManagement/asset';
import { t } from '@shared/i18n.ts';

function* getAssetTypeByIdRequest({ assetId }: { assetId: MongoIDType }): any {
  try {
    const assetType = yield call(getAssetTypeByIdApi, { assetId });
    yield put(Creators.getAssetTypeByIdSuccess({ assetType }));
  }
  catch (error: any) {
    yield put(Creators.getAssetTypeByIdFailure());
    yield put(ToastCreators.error({ error }));
  }
}

function* createAssetRequest({ asset, onSuccess }: { asset: any, onSuccess: Function }): any {
  try {
    const { id: createdAssetId } = yield call(createAssetApi, asset);
    yield put(Creators.createAssetSuccess());

    if (_isFunction(onSuccess)) {
      onSuccess(createdAssetId);
    }

    yield put(ToastCreators.success());
  }
  catch (error: any) {
    const errorCode = error?.response?.data?.code;
    const errorMessage = errorCode && t(`assetManagement:ASSET_SERVICE_ERROR_CODE.${errorCode}`);
    yield put(ToastCreators.error(errorMessage ? { message: errorMessage } : { error }));
    yield put(Creators.createAssetFailure());
  }
}

function* watchGetAssetTypeByIdRequest() {
  yield takeLatest(Types.GET_ASSET_TYPE_BY_ID_REQUEST as any, getAssetTypeByIdRequest);
}

function* watchCreateAssetRequest() {
  yield takeLatest(Types.CREATE_ASSET_REQUEST as any, createAssetRequest);
}

export default function* assetNewPageRootSaga(): any {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchGetAssetTypeByIdRequest),
      fork(watchCreateAssetRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
