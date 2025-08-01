import { all, call, put, takeEvery } from 'redux-saga/effects';
import { isFunction as _isFunction } from 'lodash';

import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { getFilteredVehicleAssets } from '@shared/api/employeeAssetManagement/asset';
import { Types } from './actions';

type getUniqueIdentifiersRequestPropsType = {
  type: string;
  filters: {
    assetTypeId: MongoIDType;
    fields?: string[];
    limit: number;
    offset: number;
  };
  onSuccess: Function;
  onError: Function;
};

function* getUniqueIdentifierRequest({ filters: { assetTypeId }, onSuccess, onError }: getUniqueIdentifiersRequestPropsType): Generator {
  try {
    // @ts-ignore
    const { assets } = yield call(getFilteredVehicleAssets, { updatedPayload: { filterData: { assetTypeId } } });
    if (_isFunction(onSuccess)) {
      onSuccess(assets);
    }
  }
  catch (error) {
    yield put(ToastCreators.error({ error }));
    if (_isFunction(onError)) {
      onError();
    }
  }
}

function* watchGetUniqueIdentifierRequest(): Generator {
  yield takeEvery(Types.GET_UNIQUE_IDENTIFIER_REQUEST, getUniqueIdentifierRequest);
}

export default function* rootSaga(): Generator {
  yield all([
    watchGetUniqueIdentifierRequest(),
  ]);
}
