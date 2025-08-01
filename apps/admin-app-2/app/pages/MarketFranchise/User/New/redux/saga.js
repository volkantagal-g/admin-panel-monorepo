import { all, call, cancel, fork, put, take, takeLatest } from 'redux-saga/effects';

import { createMarketFranchiseUser as createMarketFranchiseUserApi } from '@shared/api/marketFranchise/user';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import history from '@shared/utils/history';
import { Types, Creators } from './actions';

function* createMarketFranchiseUserRequest({ requestBody }) {
  try {
    yield call(createMarketFranchiseUserApi, requestBody);

    yield put(Creators.createMarketFranchiseUserSuccess());
    yield put(ToastCreators.success());
    history.push('/marketFranchise/user/list');
  }
  catch (error) {
    yield put(Creators.createMarketFranchiseUserFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchCreateMarketFranchiseUserRequest() {
  yield takeLatest(Types.CREATE_MARKET_FRANCHISE_USER_REQUEST, createMarketFranchiseUserRequest);
}

export default function* createMarketFranchiseUserRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchCreateMarketFranchiseUserRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
