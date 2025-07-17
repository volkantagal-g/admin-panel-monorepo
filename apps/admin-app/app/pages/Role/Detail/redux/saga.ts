import { all, takeLatest, call, cancel, fork, put, take, select } from 'redux-saga/effects';
import moment from 'moment';
import { TFunction } from 'react-i18next';

import {
  getRoleById,
  updateRole,
  getRoleUsers,
  updatePermissionOfRole,
  updateRolePages,
  deleteRole,
  removePermissionOfRole,
  getRoleHierarchy as getRoleHierarchyApi,
} from '@shared/api/role';
import { ROUTE } from '@app/routes';
import { t as tCommon } from '@shared/i18n';
import history from '@shared/utils/history';
import { createRoleRequest, getUserRoleRequests } from '@shared/api/roleRequest';
import { updateComponent } from '@shared/api/component';
import { getEmployeesFilter } from '@shared/api/employee';
import { getPageAndComponentPermissionsOfRole } from '@shared/api/permission';
import { removeRoleFromUserByRoleOwner, addRoleToUsersByRoleOwner, updateUserRoleMembership, removeRoleFromUsers } from '@shared/api/user';
import { getReportTagsByRoles, getReportTypes } from '@shared/api/report';
import { exportEmployeeUserTable } from '../components/utils/index';
import { Types, Creators } from './actions';
import { Creators as CommonCreators } from '@shared/redux/actions/common';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { countriesSelector } from '@shared/redux/selectors/common';
import { getSelectedLanguage } from '@shared/redux/selectors/languageSelection';
import { exportExcel } from '@shared/utils/common';
import { formatPagesForExcelExport, MOMENT_DAY_FORMAT, PAGES_EXPORT_COLUMNS } from '@shared/utils/pagesExcelExport';

function* getRoleByIdRequest({ id }: { id: MongoIDType }) {
  try {
    const data: RoleType = yield call(getRoleById, { id, isPopulateRoleOwners: true });
    yield put(Creators.getRoleByIdSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getRoleByIdFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* updateRoleRequest({
  id,
  updateData,
  deleteParent,
  afterSuccess,
}: {
  id: MongoIDType,
  updateData: Partial<Omit<RoleType, '_id'>>,
  deleteParent: boolean,
  afterSuccess: () => void,
}) {
  let success = false;
  try {
    const data: RoleType = yield call(updateRole, { id, updateData, deleteParent });
    success = true;
    yield put(Creators.updateRoleSuccess({ data }));
    yield put(ToastCreators.success());
  }
  catch (error) {
    yield put(Creators.updateRoleFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
  if (success) {
    yield put(Creators.getRoleByIdRequest({ id }));
    if (afterSuccess) {
      yield call(afterSuccess);
    }
  }
}

function* updateRoleMemberTypeRequest({
  roleId,
  userId,
  memberType,
  expiryDate,
}: {
  roleId: MongoIDType,
  userId: MongoIDType,
  memberType: number,
  expiryDate: Date
}) {
  try {
    const data: UserType = yield call(updateUserRoleMembership, { roleId, userId, memberType, expiryDate });
    yield put(Creators.updateRoleMemberTypeSuccess({ data }));
    yield put(CommonCreators.getRoleUsersRequest({ roleId, isActive: true, populateEmployeeInfo: true }));
    yield put(ToastCreators.success());
  }
  catch (error) {
    yield put(Creators.updateRoleMemberTypeFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* removeUsersFromRoleRequest({
  roleId,
  userIds,
  afterSuccess,
}: {
  roleId: MongoIDType,
  userIds: MongoIDType[],
  afterSuccess: () => void
}) {
  let success = false;
  try {
    const data: { success: boolean } = yield call(removeRoleFromUsers, { roleId, userIds });
    success = true;
    yield put(Creators.removeUsersFromRoleSuccess({ data }));
    yield put(CommonCreators.getRoleUsersRequest({ roleId, isActive: true, populateEmployeeInfo: true }));
    yield put(ToastCreators.success());
  }
  catch (error) {
    yield put(Creators.removeUsersFromRoleFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }

  if (success && afterSuccess) {
    yield call(afterSuccess);
  }
}

function* watchRemoveUsersFromRoleRequest() {
  yield takeLatest(Types.REMOVE_USERS_FROM_ROLE_REQUEST, removeUsersFromRoleRequest);
}

function* removeRoleFromUserByRoleOwnerRequest({ user, roleId }: { user: UserType, roleId: MongoIDType }) {
  try {
    yield call(removeRoleFromUserByRoleOwner, { userId: user?._id, roleId });
    yield put(CommonCreators.getRoleUsersRequest({ roleId, isActive: true, populateEmployeeInfo: true }));
    yield put(ToastCreators.success());
  }
  catch (error) {
    yield put(ToastCreators.error({ error }));
  }
}

function* addRoleToUsersByRoleOwnerRequest({
  users,
  expiryDate,
  roleId,
}: {
  users: MongoIDType[],
  expiryDate: Date,
  roleId: MongoIDType
}) {
  try {
    yield call(addRoleToUsersByRoleOwner, { userIds: users, expiryDate, roleId });
    yield put(CommonCreators.getRoleUsersRequest({ roleId, isActive: true, populateEmployeeInfo: true }));
    yield put(ToastCreators.success());
  }
  catch (error) {
    yield put(ToastCreators.error({ error }));
  }
}

function* updateRolePagesRequest({
  roleId,
  permKeys,
  countryIds,
  hasGlobalAccess,
}: {
  roleId: MongoIDType,
  permKeys: string[],
  countryIds: MongoIDType[],
  hasGlobalAccess: boolean
}) {
  try {
    yield call(updateRolePages, { roleId, permKeys, countryIds, hasGlobalAccess });
    yield put(CommonCreators.getRolePermissionsRequest({ roleId }));
    yield put(ToastCreators.success());
  }
  catch (error) {
    yield put(ToastCreators.error({ error }));
  }
}

function* getRoleUsersForExcelTableRequest({
  roleId,
  isActive,
  countries,
}: {
  roleId: MongoIDType,
  isActive: boolean,
  countries: ICountry[],
}) {
  try {
    const data: UserType[] = yield call(getRoleUsers, { roleId, isActive });

    if (!data || !data.length) {
      yield put(ToastCreators.error({ message: tCommon('NO_DATA') }));
    }
    else {
      const roleData: RoleType = yield call(getRoleById, { id: roleId, isPopulateRoleOwners: true });
      const workEmail = data?.filter(item => !!item.isActive).map(item => item.email) as string[];
      const employeeData: { employees: EmployeeType[] } = yield call(getEmployeesFilter, { workEmail });
      exportEmployeeUserTable(data, employeeData, roleData, countries);
      yield put(Creators.getRoleUsersForExcelTableSuccess({ data }));
    }
  }
  catch (error) {
    yield put(Creators.getRoleUsersForExcelTableFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* updateRolePageComponentsRequest({
  id,
  countries,
  hasGlobalAccess,
}: {
  id: MongoIDType,
  countries: ICountry[],
  hasGlobalAccess: boolean,
}) {
  try {
    yield call(updateComponent, { id, updateData: { countries, hasGlobalAccess } });
    yield put(CommonCreators.getAllPagesRequest());
    // yield put(CommonCreators.getRolePermissionsRequest({ roleId }));
    yield put(ToastCreators.success());
  }
  catch (error) {
    yield put(ToastCreators.error({ error }));
  }
}

function* updatePermissionOfRoleRequest({
  roleId,
  permKeys,
  countryIds,
  hasGlobalAccess,
}: {
  roleId: MongoIDType,
  permKeys: string[],
  countryIds: MongoIDType[],
  hasGlobalAccess: boolean,
}) {
  try {
    yield call(updatePermissionOfRole, { roleId, permKeys, countryIds, hasGlobalAccess });
    yield put(Creators.getPageAndComponentPermissionsOfRoleRequest({ roleId }));
    yield put(ToastCreators.success());
  }
  catch (error) {
    yield put(ToastCreators.error({ error }));
  }
}

function* removePermissionFromRoleRequest({ roleId, permKey }: { roleId: MongoIDType, permKey: string }) {
  try {
    yield call(removePermissionOfRole, { role: roleId, permKey });
    yield put(Creators.getPageAndComponentPermissionsOfRoleRequest({ roleId }));
    yield put(ToastCreators.success());
  }
  catch (error) {
    yield put(ToastCreators.error({ error }));
  }
}

function* getPageAndComponentPermissionsOfRoleRequest({ roleId }: { roleId: MongoIDType }) {
  try {
    const data: PageType[] = yield call(getPageAndComponentPermissionsOfRole, { roleId });
    yield put(Creators.getPageAndComponentPermissionsOfRoleSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getPageAndComponentPermissionsOfRoleFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* requestUserRoleRequest({
  roleId,
  requestReason,
  timeLimit,
  durationType,
  durationDays,
  endDate,
}: {
  roleId: MongoIDType,
} & Pick<RoleRequestType, 'requestReason' | 'timeLimit' | 'durationType' | 'durationDays' | 'endDate'>) {
  try {
    const data: RoleRequestType = yield call(createRoleRequest, {
      roleId,
      requestReason,
      timeLimit,
      durationType,
      durationDays,
      endDate,
    });
    yield put(Creators.requestUserRoleSuccess({ data }));
    yield put(Creators.getUserRoleRequestsRequest());
    yield put(ToastCreators.success());
  }
  catch (error) {
    yield put(Creators.requestUserRoleFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* getUserRoleRequestsRequest() {
  try {
    const roleRequests: RoleRequestType[] = yield call(getUserRoleRequests);
    yield put(Creators.getUserRoleRequestsSuccess({ roleRequests }));
  }
  catch (error) {
    yield put(Creators.getUserRoleRequestsFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchGetRoleUsersForExcelTableRequest() {
  yield takeLatest(Types.GET_ROLE_USERS_FOR_EXCEL_TABLE_REQUEST, getRoleUsersForExcelTableRequest);
}

function* watchGetRoleByIdRequest() {
  yield takeLatest(Types.GET_ROLE_BY_ID_REQUEST, getRoleByIdRequest);
}

function* watchUpdateRoleByIdRequest() {
  yield takeLatest(Types.UPDATE_ROLE_REQUEST, updateRoleRequest);
}

function* watchUpdateRoleMemberTypeRequest() {
  yield takeLatest(Types.UPDATE_ROLE_MEMBER_TYPE_REQUEST, updateRoleMemberTypeRequest);
}

function* watchRemoveRoleFromUserByRoleOwnerRequest() {
  yield takeLatest(Types.REMOVE_ROLE_FROM_USER_BY_ROLE_OWNER_REQUEST, removeRoleFromUserByRoleOwnerRequest);
}

function* watchUpdatePermissionOfRoleRequest() {
  yield takeLatest(Types.UPDATE_PERMISSION_OF_ROLE_REQUEST, updatePermissionOfRoleRequest);
}

function* watchUpdateRolePageComponentsRequest() {
  yield takeLatest(Types.UPDATE_ROLE_PAGE_COMPONENTS_REQUEST, updateRolePageComponentsRequest);
}

function* watchUpdateRolePagesRequest() {
  yield takeLatest(Types.UPDATE_ROLE_PAGES_REQUEST, updateRolePagesRequest);
}

function* watchRemovePermissionFromRoleRequest() {
  yield takeLatest(Types.REMOVE_PERMISSION_FROM_ROLE_REQUEST, removePermissionFromRoleRequest);
}

function* watchAddRoleToUsersByRoleOwnerRequest() {
  yield takeLatest(Types.ADD_ROLE_TO_USERS_BY_ROLE_OWNER_REQUEST, addRoleToUsersByRoleOwnerRequest);
}

function* watchGetPageAndComponentPermissionsOfRoleRequest() {
  yield takeLatest(Types.GET_PAGE_AND_COMPONENT_PERMISSIONS_OF_ROLE_REQUEST, getPageAndComponentPermissionsOfRoleRequest);
}

function* watchRequestUserRoleRequest() {
  yield takeLatest(Types.REQUEST_USER_ROLE_REQUEST, requestUserRoleRequest);
}

function* watchGetUserRoleRequestsRequest() {
  yield takeLatest(Types.GET_USER_ROLE_REQUESTS_REQUEST, getUserRoleRequestsRequest);
}

export function* exportAccessGrantedPagesExcel({ t, role }: { t: TFunction, role: RoleType }) {
  try {
    const pages: PageType[] = yield call(getPageAndComponentPermissionsOfRole, { roleId: role._id });
    const language: keyof MinLangObjectType = yield select(getSelectedLanguage);
    const countries: ICountry[] = yield select(countriesSelector.getData);

    const dataToExport = formatPagesForExcelExport({ t, pages, countries, language });

    const date = moment();
    const roleName = role.name.replace(/ /g, '-');
    exportExcel(dataToExport, `AllAccessGrantedPagesList_${roleName}_${date.format(MOMENT_DAY_FORMAT)}.csv`, PAGES_EXPORT_COLUMNS(t));
  }
  catch (error) {
    yield put(Creators.exportAccessGrantedPagesExcelFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchExportAccessGrantedPagesExcel() {
  yield takeLatest(Types.EXPORT_ACCESS_GRANTED_PAGES_EXCEL, exportAccessGrantedPagesExcel);
}

function* getReportTagsByRolesRequest({ data: dataIn }: { data: { roleIds: MongoIDType[] } }) {
  try {
    const data: ReportType[] = yield call(getReportTagsByRoles, dataIn);
    yield put(Creators.getReportTagsByRolesSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getReportTagsByRolesFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchReportTagsByRolesRequest() {
  yield takeLatest(Types.GET_REPORT_TAGS_BY_ROLES_REQUEST, getReportTagsByRolesRequest);
}

export function* getReportTypesRequest({ data: dataIn }: { data: { limit: number, offset: number, filter: string } }) {
  yield put(Creators.updateReportTagReportTypesMap({ request: dataIn, isPending: true }));
  try {
    const data: ReportType[] = yield call(getReportTypes, { ...dataIn, fields: { name: 1, description: 1 } });
    yield put(Creators.getReportTypesSuccess({ data }));
    yield put(Creators.updateReportTagReportTypesMap({ request: dataIn, response: data, isPending: false }));
  }
  catch (error) {
    yield put(Creators.getReportTypesFailure({ error }));
    yield put(ToastCreators.error({ error }));
    yield put(Creators.updateReportTagReportTypesMap({ request: dataIn, isPending: false }));
  }
}

export function* watchReportTypesRequest() {
  yield takeLatest(Types.GET_REPORT_TYPES_REQUEST, getReportTypesRequest);
}

function* deleteRoleRequest({ id }: { id: MongoIDType }) {
  try {
    yield call(deleteRole, { id });
    yield put(Creators.deleteRoleSuccess());
    yield put(ToastCreators.success({ message: 'Role deleted successfully.' }));
    yield call(history.push, ROUTE.ROLE_LIST.menuPath);
  }
  catch (error) {
    yield put(Creators.deleteRoleFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* watchDeleteRoleRequest() {
  yield takeLatest(Types.DELETE_ROLE_REQUEST, deleteRoleRequest);
}

function* getRoleHierarchy({ id }: { id: MongoIDType }) {
  try {
    const hierarchy: RoleType = yield call(getRoleHierarchyApi, { id });
    yield put(Creators.getRoleHierarchySuccess({ data: [hierarchy] }));
  }
  catch (error) {
    yield put(Creators.getRoleHierarchyFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* watchGetRoleHierarchy() {
  yield takeLatest(Types.GET_ROLE_HIERARCHY_REQUEST, getRoleHierarchy);
}

export default function* roleDetailRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchGetRoleByIdRequest),
      fork(watchUpdateRoleByIdRequest),
      fork(watchUpdateRoleMemberTypeRequest),
      fork(watchRemoveUsersFromRoleRequest),
      fork(watchRemoveRoleFromUserByRoleOwnerRequest),
      fork(watchAddRoleToUsersByRoleOwnerRequest),
      fork(watchUpdatePermissionOfRoleRequest),
      fork(watchUpdateRolePagesRequest),
      fork(watchUpdateRolePageComponentsRequest),
      fork(watchRemovePermissionFromRoleRequest),
      fork(watchGetPageAndComponentPermissionsOfRoleRequest),
      fork(watchGetRoleUsersForExcelTableRequest),
      fork(watchExportAccessGrantedPagesExcel),
      fork(watchRequestUserRoleRequest),
      fork(watchGetUserRoleRequestsRequest),
      fork(watchReportTagsByRolesRequest),
      fork(watchReportTypesRequest),
      fork(watchDeleteRoleRequest),
      fork(watchGetRoleHierarchy),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);

    yield put(CommonCreators.getRolePermissionsReset());
    yield put(CommonCreators.getRoleUsersReset());
    yield put(Creators.getPageAndComponentPermissionsOfRoleReset());
    yield put(Creators.getReportTagsByRolesReset());
  }
}
