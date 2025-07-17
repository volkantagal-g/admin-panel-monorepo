import { all, takeLatest, call, cancel, fork, put, take } from 'redux-saga/effects';

import { get } from 'lodash';

import { Types, Creators } from './actions';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { createAsset } from '@shared/api/employee';
import history from '@shared/utils/history';
import { ROUTE } from '@app/routes';

function* createAssetRequest({ body }) {
  try {
    const data = yield call(createAsset, { body });
    yield put(Creators.createAssetSuccess({ data }));
    yield put(ToastCreators.success());

    const assetId = get(data, '_id', '');
    const path = ROUTE.EMPLOYEE_ASSET_DETAIL.path.replace(':assetId', assetId);
    history.push(path);
  }
  catch (error) {
    yield put(Creators.createAssetFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchCreateAssetRequest() {
  yield takeLatest(Types.CREATE_ASSET_REQUEST, createAssetRequest);
}

export default function* assetNewRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchCreateAssetRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
