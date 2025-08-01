import { all, takeLatest, call, cancel, fork, put, take } from 'redux-saga/effects';

import history from '@shared/utils/history';
import { ROUTE } from '@app/routes';

import { createMarketFranchiseUserRole } from '@shared/api/marketFranchise/user/role';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { Types, Creators } from './actions';

function* createMarketFranchiseUserRoleRequest({ name, descriptions, permissions }) {
  try {
    yield call(createMarketFranchiseUserRole, { key: name, descriptions, permissions });
    yield put(Creators.createMarketFranchiseUserRoleSuccess());
    yield put(ToastCreators.success());

    history.push(ROUTE.MARKET_FRANCHISE_USER_ROLE_LIST.path);
  }
  catch (error) {
    yield put(Creators.createMarketFranchiseUserRoleFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchMarketFranchiseUserRoleRequest() {
  yield takeLatest(Types.CREATE_MARKET_FRANCHISE_USER_ROLE_REQUEST, createMarketFranchiseUserRoleRequest);
}

export default function* createMarketFranchiseUserRoleRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchMarketFranchiseUserRoleRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
