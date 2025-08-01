import { all, call, cancel, fork, put, take, takeLatest } from 'redux-saga/effects';

import { getMarketFranchiseUserRoleGroupList } from '@shared/api/marketFranchise/user/roleGroup';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { Types, Creators } from './actions';
import { getMarketFranchiseUserRoleGroupRequestBody } from '@app/pages/MarketFranchise/User/RoleGroup/List/utils';

function* getMarketFranchiseUserRoleGroupListRequest({ limit, offset, filters }) {
  try {
    const requestBody = getMarketFranchiseUserRoleGroupRequestBody(limit, offset, filters);
    const { records, totalCount } = yield call(getMarketFranchiseUserRoleGroupList, { ...requestBody });
    yield put(Creators.getMarketFranchiseUserRoleGroupListSuccess({ data: records, total: totalCount }));
  }
  catch (error) {
    yield put(Creators.getMarketFranchiseUserRoleListFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* marketFranchiseUserRoleGroupRequest() {
  yield takeLatest(Types.GET_MARKET_FRANCHISE_USER_ROLE_GROUP_LIST_REQUEST, getMarketFranchiseUserRoleGroupListRequest);
}

export default function* marketFranchiseUserRoleGroupListRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(marketFranchiseUserRoleGroupRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
