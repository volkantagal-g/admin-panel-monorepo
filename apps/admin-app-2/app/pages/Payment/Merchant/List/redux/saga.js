import { all, call, fork, cancel, put, take, takeLatest } from 'redux-saga/effects';

import { Types, Creators } from './actions';
import { getMerchants } from '@shared/api/payment';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';

function* getMerchantListRequest() {
  try {
    const data = yield call(getMerchants);
    yield put(Creators.getMerchantListSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getMerchantListFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchGetMerchantListRequest() {
  yield takeLatest(Types.GET_MERCHANT_LIST_REQUEST, getMerchantListRequest);
}

export default function* listPageRootSaga() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchGetMerchantListRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
