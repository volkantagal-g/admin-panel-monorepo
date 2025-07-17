import { all, takeLatest, call, cancel, fork, put, take } from 'redux-saga/effects';

import { getLocalsMerchantTypes } from '@shared/api/banner';

import { Types, Creators } from './actions';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';

function* getLocalsMerchantTypesRequest({ body }) {
  try {
    const data = yield call(getLocalsMerchantTypes, { body });
    yield put(Creators.getLocalsMerchantTypesSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getLocalsMerchantTypesFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchGetLocalsMerchantTypesRequest() {
  yield takeLatest(Types.GET_LOCALS_MERCHANT_TYPES_REQUEST, getLocalsMerchantTypesRequest);
}

export default function* pushNotificationRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchGetLocalsMerchantTypesRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
