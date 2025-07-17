import { all, call, cancel, fork, put, take, takeLatest } from 'redux-saga/effects';

import { Types, Creators } from './actions';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { getChainsShops } from '@shared/api/marketing';

function* getChainsShopsRequest({ chainId, onSuccess }) {
  try {
    const data = yield call(getChainsShops, { chainId });
    if (onSuccess) {
      onSuccess(data);
    }
    yield put(Creators.getChainsShopsSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getChainsShopsFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchGetChainsShopsRequest() {
  yield takeLatest(Types.GET_CHAINS_SHOPS_REQUEST, getChainsShopsRequest);
}

export default function* root() {
  while (yield take(Types.INIT_CONTAINER)) {
    const backgroundTasks = yield all([
      fork(watchGetChainsShopsRequest),
    ]);
    yield take(Types.DESTROY_CONTAINER);
    yield cancel(backgroundTasks);
  }
}
