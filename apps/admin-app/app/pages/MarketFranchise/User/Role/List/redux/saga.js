import { all, call, cancel, fork, put, take, takeLatest } from 'redux-saga/effects';

import { getMarketFranchiseUserRoleList } from '@shared/api/marketFranchise/user/role';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { Types, Creators } from './actions';
import { getMarketFranchiseUserRolesRequestBody } from '@app/pages/MarketFranchise/User/Role/List/utils';

function* getMarketFranchiseUserRoleListRequest({ limit, offset, filters }) {
  try {
    const requestBody = getMarketFranchiseUserRolesRequestBody(limit, offset, filters);
    const { data, totalCount } = yield call(getMarketFranchiseUserRoleList, { ...requestBody });
    yield put(Creators.getMarketFranchiseUserRoleListSuccess({ data, total: totalCount }));
  }
  catch (error) {
    yield put(Creators.getMarketFranchiseUserRoleListFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* marketFranchiseUserRoleRequest() {
  yield takeLatest(Types.GET_MARKET_FRANCHISE_USER_ROLE_LIST_REQUEST, getMarketFranchiseUserRoleListRequest);
}

export default function* marketFranchiseUserRoleListRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(marketFranchiseUserRoleRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
