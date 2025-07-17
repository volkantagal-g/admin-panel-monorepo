import { all, call, cancel, fork, put, take, takeLatest } from 'redux-saga/effects';

import {
  getMarketFranchiseUserList as getMarketFranchiseUserListApi,
  exportFranchiseUsers as exportFranchiseUsersApi,
} from '@shared/api/marketFranchise/user';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { Types, Creators } from './actions';

function* getFranchiseUserListRequest({ limit, offset, active, filter }) {
  try {
    const { data, count } = yield call(getMarketFranchiseUserListApi, { limit, offset, active, filter });
    yield put(Creators.getFranchiseUserListSuccess({ data, count }));
  }
  catch (error) {
    yield put(Creators.getFranchiseUserListFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* exportFranchiseUsersRequest() {
  try {
    const { url } = yield call(exportFranchiseUsersApi);
    yield window.open(url);
    yield put(Creators.exportFranchiseUsersSuccess());
    yield put(ToastCreators.success());
  }
  catch (error) {
    yield put(Creators.exportFranchiseUsersFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchGetFranchiseUserListRequest() {
  yield takeLatest(Types.GET_FRANCHISE_USER_LIST_REQUEST, getFranchiseUserListRequest);
}

function* watchExportFranchiseUsersRequest() {
  yield takeLatest(Types.EXPORT_FRANCHISE_USERS_REQUEST, exportFranchiseUsersRequest);
}

export default function* createMarketFranchiseUserRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchGetFranchiseUserListRequest),
      fork(watchExportFranchiseUsersRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
