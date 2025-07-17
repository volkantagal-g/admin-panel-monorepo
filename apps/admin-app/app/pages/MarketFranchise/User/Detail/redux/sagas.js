import { all, call, cancel, fork, put, take, takeLatest } from 'redux-saga/effects';

import {
  getMarketFranchiseUserDetail as getMarketFranchiseUserDetailApi,
  updateMarketFranchiseUser as updateMarketFranchiseUserApi,
  updateMarketFranchiseUserRoleGroups as updateMarketFranchiseUserRoleGroupsApi,
  updateMarketFranchiseUserFranchise as updateMarketFranchiseUserFranchiseApi,
  updateMarketFranchiseUserRole as updateMarketFranchiseUserRoleApi,
  updateMarketFranchiseUserReports as updateMarketFranchiseUserReportsApi,
} from '@shared/api/marketFranchise/user';
import {
  getMarketFranchiseUserRoleGroupList as getRoleGroupsApi,
  getFranchiseGenericReports as getFranchiseGenericReportsApi,
} from '@shared/api/marketFranchise/user/roleGroup';
import { getMarketFranchiseUserRoleListAll as getMarketFranchiseUserRoleListAllApi } from '@shared/api/marketFranchise/user/role';
import { getMarketFranchises as getMarketFranchisesApi } from '@shared/api/marketFranchise/';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { Types, Creators } from './actions';

function* getFranchiseUserDetailRequest({ userId }) {
  try {
    const franchiseUser = yield call(getMarketFranchiseUserDetailApi, { userId });
    yield put(Creators.getFranchiseUserDetailSuccess({ data: franchiseUser }));
  }
  catch (error) {
    yield put(Creators.getFranchiseUserDetailFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* updateFranchiseUserRequest({ userId, updateData }) {
  try {
    yield call(updateMarketFranchiseUserApi, { userId, updateData });
    const franchiseUser = yield call(getMarketFranchiseUserDetailApi, { userId });
    yield put(Creators.updateFranchiseUserSuccess());
    yield put(Creators.getFranchiseUserDetailSuccess({ data: franchiseUser }));
    yield put(ToastCreators.success());
  }
  catch (error) {
    yield put(Creators.updateFranchiseUserFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* getRoleGroupsRequest() {
  try {
    const roleGroups = yield call(getRoleGroupsApi, {});
    yield put(Creators.getRoleGroupsSuccess({ data: roleGroups.records }));
  }
  catch (error) {
    yield put(Creators.getRoleGroupsFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* updateFranchiseUserRoleGroupsRequest({ userId, roleGroups }) {
  try {
    yield call(updateMarketFranchiseUserRoleGroupsApi, { userId, roleGroups });
    const franchiseUser = yield call(getMarketFranchiseUserDetailApi, { userId });
    yield put(Creators.updateFranchiseUserRoleGroupsSuccess());
    yield put(Creators.getFranchiseUserDetailSuccess({ data: franchiseUser }));
    yield put(ToastCreators.success());
  }
  catch (error) {
    yield put(Creators.updateFranchiseUserRoleGroupsFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* getFranchisesRequest() {
  try {
    const data = yield call(getMarketFranchisesApi, {});
    yield put(Creators.getFranchisesSuccess({ data: data.franchises }));
  }
  catch (error) {
    yield put(Creators.getFranchisesFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* updateFranchiseUserFranchiseRequest({ userId, franchiseId }) {
  try {
    yield call(updateMarketFranchiseUserFranchiseApi, { userId, franchise: franchiseId });
    const franchiseUser = yield call(getMarketFranchiseUserDetailApi, { userId });
    yield put(Creators.updateFranchiseUserFranchiseSuccess());
    yield put(Creators.getFranchiseUserDetailSuccess({ data: franchiseUser }));
    yield put(ToastCreators.success());
  }
  catch (error) {
    yield put(Creators.updateFranchiseUserFranchiseFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* getRolesRequest() {
  try {
    const data = yield call(getMarketFranchiseUserRoleListAllApi, {});
    yield put(Creators.getRolesSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getRolesFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* updateFranchiseUserRoleRequest({ userId, roles }) {
  try {
    yield call(updateMarketFranchiseUserRoleApi, { userId, roles });
    const franchiseUser = yield call(getMarketFranchiseUserDetailApi, { userId });
    yield put(Creators.updateFranchiseUserRoleSuccess());
    yield put(Creators.getFranchiseUserDetailSuccess({ data: franchiseUser }));
    yield put(ToastCreators.success());
  }
  catch (error) {
    yield put(Creators.updateFranchiseUserRoleFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* getReportsRequest() {
  try {
    const data = yield call(getFranchiseGenericReportsApi, {});
    yield put(Creators.getReportsSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getReportsFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* updateFranchiseUserReportsRequest({ userId, reports }) {
  try {
    yield call(updateMarketFranchiseUserReportsApi, { userId, reports });
    const franchiseUser = yield call(getMarketFranchiseUserDetailApi, { userId });
    yield put(Creators.updateFranchiseUserReportsSuccess());
    yield put(Creators.getFranchiseUserDetailSuccess({ data: franchiseUser }));
    yield put(ToastCreators.success());
  }
  catch (error) {
    yield put(Creators.updateFranchiseUserReportsFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchGetFranchiseUserDetailRequest() {
  yield takeLatest(Types.GET_FRANCHISE_USER_DETAIL_REQUEST, getFranchiseUserDetailRequest);
}

function* watchUpdateFranchiseUserRequest() {
  yield takeLatest(Types.UPDATE_FRANCHISE_USER_REQUEST, updateFranchiseUserRequest);
}

function* watchGetRoleGroupsRequest() {
  yield takeLatest(Types.GET_ROLE_GROUPS_REQUEST, getRoleGroupsRequest);
}

function* watchUpdateFranchiseUserRoleGroupsRequest() {
  yield takeLatest(Types.UPDATE_FRANCHISE_USER_ROLE_GROUPS_REQUEST, updateFranchiseUserRoleGroupsRequest);
}

function* watchGetFranchisesRequest() {
  yield takeLatest(Types.GET_FRANCHISES_REQUEST, getFranchisesRequest);
}

function* watchUpdateFranchiseUserFranchiseRequest() {
  yield takeLatest(Types.UPDATE_FRANCHISE_USER_FRANCHISE_REQUEST, updateFranchiseUserFranchiseRequest);
}

function* watchGetRolesRequest() {
  yield takeLatest(Types.GET_ROLES_REQUEST, getRolesRequest);
}

function* watchUpdateFranchiseUserRoleRequest() {
  yield takeLatest(Types.UPDATE_FRANCHISE_USER_ROLE_REQUEST, updateFranchiseUserRoleRequest);
}

function* watchGetReportsRequest() {
  yield takeLatest(Types.GET_REPORTS_REQUEST, getReportsRequest);
}

function* watchUpdateFranchiseUserReportsRequest() {
  yield takeLatest(Types.UPDATE_FRANCHISE_USER_REPORTS_REQUEST, updateFranchiseUserReportsRequest);
}

export default function* createMarketFranchiseUserRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchGetFranchiseUserDetailRequest),
      fork(watchUpdateFranchiseUserRequest),
      fork(watchGetRoleGroupsRequest),
      fork(watchUpdateFranchiseUserRoleGroupsRequest),
      fork(watchGetFranchisesRequest),
      fork(watchUpdateFranchiseUserFranchiseRequest),
      fork(watchGetRolesRequest),
      fork(watchUpdateFranchiseUserRoleRequest),
      fork(watchGetReportsRequest),
      fork(watchUpdateFranchiseUserReportsRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
