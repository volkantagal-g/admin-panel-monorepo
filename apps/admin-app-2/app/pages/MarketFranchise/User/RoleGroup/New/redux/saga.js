import { all, takeLatest, call, cancel, fork, put, take } from 'redux-saga/effects';

import history from '@shared/utils/history';
import { ROUTE } from '@app/routes';

import { createMarketFranchiseUserRoleGroup } from '@shared/api/marketFranchise/user/roleGroup';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { Types, Creators } from './actions';

function* createMarketFranchiseUserRoleGroupRequest({ name, description, countries, hasGlobalAccess }) {
  try {
    yield call(createMarketFranchiseUserRoleGroup, { name, description, countries, hasGlobalAccess });
    yield put(Creators.createMarketFranchiseUserRoleGroupSuccess());
    yield put(ToastCreators.success());

    history.push(ROUTE.MARKET_FRANCHISE_USER_ROLE_GROUP_LIST.path);
  }
  catch (error) {
    yield put(Creators.createMarketFranchiseUserRoleGroupFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchMarketFranchiseUserRoleGroupRequest() {
  yield takeLatest(Types.CREATE_MARKET_FRANCHISE_USER_ROLE_GROUP_REQUEST, createMarketFranchiseUserRoleGroupRequest);
}

export default function* createMarketFranchiseUserRoleGroupRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchMarketFranchiseUserRoleGroupRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
