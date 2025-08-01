import { all, call, cancel, fork, put, take, takeLatest } from 'redux-saga/effects';

import { getMarketFranchiseUserRoleDetail, updateMarketFranchiseUserRole } from '@shared/api/marketFranchise/user/role';
import { Types, Creators } from './actions';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';

function* getMarketFranchiseUserRoleDetailRequest({ id }) {
  try {
    const data = yield call(getMarketFranchiseUserRoleDetail, { id });
    yield put(Creators.getFranchiseUserRoleDetailSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getFranchiseUserRoleDetailFailure({ error }));
  }
}

function* updateMarketFranchiseUserRoleDetailRequest({ data, id }) {
  try {
    yield call(updateMarketFranchiseUserRole, { data, id });
    window.location.reload();
  }
  catch (error) {
    yield put(Creators.updateFranchiseUserRoleFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchGetMarketFranchiseUserRoleDetailRequest() {
  yield takeLatest(Types.GET_FRANCHISE_USER_ROLE_DETAIL_REQUEST, getMarketFranchiseUserRoleDetailRequest);
}

function* watchUpdateMarketFranchiseUserRoleRequest() {
  yield takeLatest(Types.UPDATE_FRANCHISE_USER_ROLE_REQUEST, updateMarketFranchiseUserRoleDetailRequest);
}

export default function* getMarketFranchiseUserRoleDetailRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchGetMarketFranchiseUserRoleDetailRequest),
      fork(watchUpdateMarketFranchiseUserRoleRequest),
    ]);
    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
