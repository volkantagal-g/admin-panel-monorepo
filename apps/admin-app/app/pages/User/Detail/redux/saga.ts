import { all, takeLatest, call, cancel, fork, put, take } from 'redux-saga/effects';

import {
  getUserById, updateUser,
  activateUser, inactivateUser, addRolesToUser, updateUserRoleMembership, removeRoleFromUser,
} from '@shared/api/user';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { Creators as CommonCreators } from '@shared/redux/actions/common';
import { getUserTotalPermissions } from '@shared/api/permission';
import { getLangKey } from '@shared/i18n';
import { Types, Creators } from './actions';

function* getUserByIdRequest({ id }: { id: MongoIDType }) {
  try {
    const data: UserType = yield call(getUserById, { id });
    yield put(Creators.getUserByIdSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getUserByIdFailure({ error }));
    const specialMessage = error?.response?.data?.data?.[getLangKey()];
    yield put(ToastCreators.error({ error, message: specialMessage }));
  }
}

function* updateUserRequest({ id, updateData, afterSuccess }: { id: MongoIDType, updateData: Partial<UserType>, afterSuccess: () => void }) {
  let success = false;
  try {
    const data: UserType = yield call(updateUser, { id, updateData });
    success = true;
    yield put(Creators.updateUserSuccess({ data }));
    yield put(ToastCreators.success());
  }
  catch (error) {
    yield put(Creators.updateUserFailure({ error }));
    const specialMessage = error?.response?.data?.data?.[getLangKey()];
    yield put(ToastCreators.error({ error, message: specialMessage }));
  }
  if (success) {
    if (afterSuccess) {
      afterSuccess();
    }
    yield put(Creators.getUserByIdRequest({ id }));
  }
}

function* activateUserRequest({ id }: { id: MongoIDType }) {
  let success = false;
  try {
    const data: UserType = yield call(activateUser, { id });
    success = true;
    yield put(Creators.activateUserSuccess({ data }));
    yield put(ToastCreators.success());
  }
  catch (error) {
    yield put(Creators.activateUserFailure({ error }));
    const specialMessage = error?.response?.data?.data?.[getLangKey()];
    yield put(ToastCreators.error({ error, message: specialMessage }));
  }

  if (success) {
    yield put(Creators.getUserByIdRequest({ id }));
  }
}

function* inActivateUserRequest({ id, refetchRoles }: { id: MongoIDType, refetchRoles: boolean }) {
  let success = false;
  try {
    const data: UserType = yield call(inactivateUser, { id });
    success = true;
    yield put(Creators.inActivateUserSuccess({ data }));
    yield put(ToastCreators.success());
  }
  catch (error) {
    yield put(Creators.inActivateUserFailure({ error }));

    const specialMessage = error?.response?.data?.data?.[getLangKey()];
    yield put(ToastCreators.error({ error, message: specialMessage }));
  }
  if (success) {
    yield put(Creators.getUserByIdRequest({ id }));
    if (refetchRoles) {
      yield put(CommonCreators.getUserRolesRequest({ userId: id }));
    }
  }
}

function* addRolesToUserRequest({
  userId,
  roleIds,
  afterSuccess,
}: { userId: MongoIDType, roleIds: MongoIDType[], afterSuccess: () => void }) {
  let success = false;
  try {
    const data: UserType = yield call(addRolesToUser, { userId, roleIds });
    success = true;
    yield put(Creators.addRolesToUserSuccess({ data }));
    yield put(ToastCreators.success());
  }
  catch (error) {
    yield put(Creators.addRolesToUserFailure({ error }));
    const specialMessage = error?.response?.data?.data?.[getLangKey()];
    yield put(ToastCreators.error({ error, message: specialMessage }));
  }
  if (success) {
    if (afterSuccess) {
      yield afterSuccess();
    }
    yield put(CommonCreators.getUserRolesRequest({ userId }));
  }
}

function* updateRoleMemberTypeRequest({
  roleId,
  userId,
  memberType,
  expiryDate,
  afterSuccess,
}: { roleId: MongoIDType, userId: MongoIDType, memberType: number, expiryDate: Date, afterSuccess: () => void }) {
  let success = false;
  try {
    const data: UserType = yield call(updateUserRoleMembership, { roleId, userId, memberType, expiryDate });
    success = true;
    yield put(Creators.updateRoleMemberTypeSuccess({ data }));
    yield put(ToastCreators.success());
  }
  catch (error) {
    yield put(Creators.updateRoleMemberTypeFailure({ error }));
    const specialMessage = error?.response?.data?.data?.[getLangKey()];
    yield put(ToastCreators.error({ error, message: specialMessage }));
  }
  if (success) {
    if (afterSuccess) {
      yield afterSuccess();
    }
    yield put(CommonCreators.getUserRolesRequest({ userId }));
  }
}

function* deleteRoleMembershipRequest({ roleId, userId }: { roleId: MongoIDType, userId: MongoIDType }) {
  let success = false;
  try {
    const data: RoleType = yield call(removeRoleFromUser, { roleId, userId });
    success = true;
    yield put(Creators.deleteRoleMembershipSuccess({ data }));
    yield put(ToastCreators.success());
  }
  catch (error) {
    yield put(Creators.deleteRoleMembershipFailure({ error }));
    const specialMessage = error?.response?.data?.data?.[getLangKey()];
    yield put(ToastCreators.error({ error, message: specialMessage }));
  }
  if (success) {
    yield put(CommonCreators.getUserRolesRequest({ userId }));
  }
}

function* getUserTotalPermissionsRequest({ userId }: { userId: MongoIDType }) {
  try {
    const data: PageType = yield call(getUserTotalPermissions, { userId });
    yield put(Creators.getUserTotalPermissionsSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getUserTotalPermissionsFailure({ error }));
    const specialMessage = error?.response?.data?.data?.[getLangKey()];
    yield put(ToastCreators.error({ error, message: specialMessage }));
  }
}

function* watchGetUserByIdRequest() {
  yield takeLatest(Types.GET_USER_BY_ID_REQUEST, getUserByIdRequest);
}

function* watchUpdateUserByIdRequest() {
  yield takeLatest(Types.UPDATE_USER_REQUEST, updateUserRequest);
}

function* watchActivateUserRequest() {
  yield takeLatest(Types.ACTIVATE_USER_REQUEST, activateUserRequest);
}

function* watchInActivateUserRequestRequest() {
  yield takeLatest(Types.IN_ACTIVATE_USER_REQUEST, inActivateUserRequest);
}

function* watchAddRolesToUserRequest() {
  yield takeLatest(Types.ADD_ROLES_TO_USER_REQUEST, addRolesToUserRequest);
}

function* watchUpdateRoleMemberTypeRequest() {
  yield takeLatest(Types.UPDATE_ROLE_MEMBER_TYPE_REQUEST, updateRoleMemberTypeRequest);
}

function* watchRemoveRoleFromUserRequest() {
  yield takeLatest(Types.DELETE_ROLE_MEMBERSHIP_REQUEST, deleteRoleMembershipRequest);
}

function* watchGetUserTotalPermissionsRequest() {
  yield takeLatest(Types.GET_USER_TOTAL_PERMISSIONS_REQUEST, getUserTotalPermissionsRequest);
}

export default function* userDetailRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchGetUserByIdRequest),
      fork(watchUpdateUserByIdRequest),
      fork(watchActivateUserRequest),
      fork(watchInActivateUserRequestRequest),
      fork(watchAddRolesToUserRequest),
      fork(watchUpdateRoleMemberTypeRequest),
      fork(watchRemoveRoleFromUserRequest),
      fork(watchGetUserTotalPermissionsRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);

    yield put(CommonCreators.getUserRolesReset());
    yield put(CommonCreators.getUserOwnedPagesReset());
  }
}
