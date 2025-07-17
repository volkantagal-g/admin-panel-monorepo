import { all, call, cancel, fork, put, take, takeLatest } from 'redux-saga/effects';

import {
  getMarketFranchiseUserRoleGroupDetail,
  updateMarketFranchiseUserRoleGroup,
  getFranchiseGenericReports,
} from '@shared/api/marketFranchise/user/roleGroup';
import { getMarketFranchiseUserRoleListAll } from '@shared/api/marketFranchise/user/role';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { Types, Creators } from './actions';

function* getMarketFranchiseUserRoleGroupDetailRequest({ id }) {
  try {
    const data = yield call(getMarketFranchiseUserRoleGroupDetail, { id });
    yield put(Creators.getFranchiseUserRoleGroupDetailSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getFranchiseUserRoleGroupDetailFailure({ error }));
  }
}

function* updateMarketFranchiseUserRoleGroupDetailRequest({ data, id }) {
  try {
    yield call(updateMarketFranchiseUserRoleGroup, { updateOptions: data, id });
    yield put(ToastCreators.success());
    window.location.reload();
  }
  catch (error) {
    yield put(Creators.updateFranchiseUserRoleGroupFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* getMarketFranchiseUserRoleListRequest() {
  try {
    const data = yield call(getMarketFranchiseUserRoleListAll);
    yield put(Creators.getFranchiseUserRoleListSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getFranchiseUserRoleListFailure({ error }));
  }
}

function* getMarketFranchiseReportListRequest() {
  try {
    const data = yield call(getFranchiseGenericReports);
    yield put(Creators.getFranchiseReportListSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getFranchiseReportListFailure({ error }));
  }
}

function* watchGetMarketFranchiseUserRoleGroupDetailRequest() {
  yield takeLatest(Types.GET_FRANCHISE_USER_ROLE_GROUP_DETAIL_REQUEST, getMarketFranchiseUserRoleGroupDetailRequest);
}

function* watchUpdateMarketFranchiseUserRoleGroupRequest() {
  yield takeLatest(Types.UPDATE_FRANCHISE_USER_ROLE_GROUP_REQUEST, updateMarketFranchiseUserRoleGroupDetailRequest);
}

function* watchGetMarketFranchiseUserRoleListRequest() {
  yield takeLatest(Types.GET_FRANCHISE_USER_ROLE_LIST_REQUEST, getMarketFranchiseUserRoleListRequest);
}

function* watchGetMarketFranchiseReportListRequest() {
  yield takeLatest(Types.GET_FRANCHISE_REPORT_LIST_REQUEST, getMarketFranchiseReportListRequest);
}

export default function* getMarketFranchiseUserRoleGroupDetailRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchGetMarketFranchiseUserRoleGroupDetailRequest),
      fork(watchUpdateMarketFranchiseUserRoleGroupRequest),
      fork(watchGetMarketFranchiseUserRoleListRequest),
      fork(watchGetMarketFranchiseReportListRequest),
    ]);
    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
