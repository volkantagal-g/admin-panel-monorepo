import { all, call, cancel, fork, put, select, take, takeLatest } from 'redux-saga/effects';
import moment from 'moment';

import { Creators, Types } from './actions';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import {
  approveOrCancelRoleRequest,
  createRoleRequest,
  getRoleRequest,
  getRoleRequestsForApprovalByRoleOwner,
  getUserRoleRequests,
  updateRoleRequest,
} from '@shared/api/roleRequest';
import { getEmployeesFilter, getEmployeesPure } from '@shared/api/employee';
import { getUserById } from '@shared/api/user';
import { ROLE_REQUEST_STATES, ROLE_REQUEST_STATUSES } from '@app/pages/Role/List/constants';
import { t } from '@shared/i18n';
import { getRoles, getRolesOfTeammates } from '@shared/api/role';
import { getSelectedLanguage } from '@shared/redux/selectors/languageSelection';
import { exportExcel } from '@shared/utils/common';

const MOMENT_DAY_FORMAT = 'YYYY-MM-DD';

export function* exportRolesExcel() {
  try {
    const roles: RoleType[] = yield call(getRoles, { limit: 10000, populateOwners: true });
    const language: keyof MinLangObjectType = yield select(getSelectedLanguage);

    const dataToExport = roles.map(role => ({
      roleId: role._id,
      name: role.name,
      description: role.description[language],
      activeness: role.isActive ? t('global:ACTIVE') : t('global:INACTIVE'),
      roleOwners: (role.roleOwners as RoleOwner[])?.map(({ email, name }) => `${name} - (${email})`).join(', '),
      createdAt: role.createdAt ? moment(role.createdAt).format(MOMENT_DAY_FORMAT) : '',
    }));

    const date = moment();
    exportExcel(dataToExport, `AllRolesList_${date.format(MOMENT_DAY_FORMAT)}`, [
      {
        title: t('rolePage:ROLE_EXPORT.ROLE_ID'),
        key: 'roleId',
      },
      {
        title: t('rolePage:ROLE_EXPORT.ROLE_NAME'),
        key: 'name',
      },
      {
        title: t('rolePage:ROLE_EXPORT.DESCRIPTION'),
        key: 'description',
      },
      {
        title: t('global:ACTIVENESS'),
        key: 'activeness',
      },
      {
        title: t('rolePage:ROLE_OWNERS'),
        key: 'roleOwners',
      },
      {
        title: t('rolePage:ROLE_EXPORT.CREATION_DATE'),
        key: 'createdAt',
      },
    ]);
  }
  catch (error) {
    yield put(Creators.exportRolesExcelFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchExportRolesExcel() {
  yield takeLatest(Types.EXPORT_ROLES_EXCEL, exportRolesExcel);
}

export function* requestRoleRequest({
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
    yield call(createRoleRequest, {
      roleId,
      requestReason,
      timeLimit,
      durationType,
      durationDays,
      endDate,
    });
    yield put(ToastCreators.success());

    yield put(Creators.getUserRoleRequestsRequest());
  }
  catch (error) {
    yield put(Creators.requestRoleFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchRequestRoleRequest() {
  yield takeLatest(Types.REQUEST_ROLE_REQUEST as any, requestRoleRequest);
}

export function* getUserRoleRequestsRequest() {
  try {
    const roleRequests: RoleRequestType[] = yield call(getUserRoleRequests);
    yield put(Creators.getUserRoleRequestsSuccess({ roleRequests }));
  }
  catch (error) {
    yield put(Creators.getUserRoleRequestsFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchGetUserRoleRequestsRequest() {
  yield takeLatest(Types.GET_USER_ROLE_REQUESTS_REQUEST, getUserRoleRequestsRequest);
}

export function* getRoleRequestsForApprovalByRoleOwnerRequest() {
  try {
    const roleRequests: RoleRequestType[] = yield call(getRoleRequestsForApprovalByRoleOwner);
    yield put(Creators.getRoleRequestsForApprovalByRoleOwnerSuccess({ roleRequests }));
  }
  catch (error) {
    yield put(Creators.getRoleRequestsForApprovalByRoleOwnerFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchGetRoleRequestsForApprovalByRoleOwnerRequest() {
  yield takeLatest(Types.GET_ROLE_REQUESTS_FOR_APPROVAL_BY_ROLE_OWNER_REQUEST, getRoleRequestsForApprovalByRoleOwnerRequest);
}

export function* getRoleRequestByIdRequest({ id }: { id: MongoIDType }) {
  try {
    const roleRequest: RoleRequestType = yield call(getRoleRequest, { id });
    yield put(Creators.getRoleRequestByIdSuccess({ roleRequest }));
  }
  catch (error) {
    yield put(Creators.getRoleRequestByIdFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchGetRoleRequestByIdRequest() {
  yield takeLatest(Types.GET_ROLE_REQUEST_BY_ID_REQUEST, getRoleRequestByIdRequest);
}

export function* cancelRoleRequestRequest({ roleRequestId }: { roleRequestId: MongoIDType }) {
  try {
    yield call(updateRoleRequest, {
      roleRequestId,
      requestState: ROLE_REQUEST_STATES.USER_CANCELED,
      status: ROLE_REQUEST_STATUSES.CANCELED,
    });

    yield put(Creators.getUserRoleRequestsRequest());
  }
  catch (error) {
    yield put(Creators.cancelRoleRequestFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchCancelRoleRequestRequest() {
  yield takeLatest(Types.CANCEL_ROLE_REQUEST_REQUEST, cancelRoleRequestRequest);
}

export function* approveRoleRequestRequest({
  roleRequestId,
  responseReason,
  timeLimit,
  durationType,
  durationDays,
  endDate,
}: {
  roleRequestId: MongoIDType,
  responseReason: string,
  timeLimit: string,
  durationType: string,
  durationDays: number,
  endDate: Date
}) {
  try {
    yield call(approveOrCancelRoleRequest, {
      roleRequestId,
      requestState: ROLE_REQUEST_STATES.APPROVED,
      status: ROLE_REQUEST_STATUSES.COMPLETED,
      responseReason,
      timeLimit,
      durationType,
      durationDays,
      endDate,
    });
    yield put(ToastCreators.success());

    yield put(Creators.getRoleRequestsForApprovalByRoleOwnerRequest());
  }
  catch (error) {
    yield put(Creators.approveRoleRequestFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchApproveRoleRequestRequest() {
  yield takeLatest(Types.APPROVE_ROLE_REQUEST_REQUEST, approveRoleRequestRequest);
}

export function* rejectRoleRequestRequest({ roleRequestId, responseReason }: { roleRequestId: MongoIDType, responseReason: string }) {
  try {
    yield call(approveOrCancelRoleRequest, {
      roleRequestId,
      requestState: ROLE_REQUEST_STATES.REJECTED,
      status: ROLE_REQUEST_STATUSES.CANCELED,
      responseReason,
    });
    yield put(ToastCreators.success());

    yield put(Creators.getRoleRequestsForApprovalByRoleOwnerRequest());
  }
  catch (error) {
    yield put(Creators.rejectRoleRequestFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchRejectRoleRequestRequest() {
  yield takeLatest(Types.REJECT_ROLE_REQUEST_REQUEST, rejectRoleRequestRequest);
}

export function* getExtendedUserInfoRequest({ user }: { user: MongoIDType }) {
  try {
    const userById: UserType = yield call(getUserById, { id: user });
    const { employees: [employee] } = yield call(getEmployeesFilter, { workEmail: [userById.email] });
    if (!employee) {
      yield put(Creators.getExtendedUserInfoSuccess({ user: userById }));
      return;
    }

    if (employee.supervisor) {
      const { employees: [supervisor] } = yield call(getEmployeesPure, { employeeIds: [employee.supervisor] });
      employee.supervisor = supervisor;
    }
    yield put(Creators.getExtendedUserInfoSuccess({ user: { ...userById, employee } }));
  }
  catch (error) {
    yield put(Creators.getExtendedUserInfoFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchGetExtendedUserInfoRequest() {
  yield takeLatest(Types.GET_EXTENDED_USER_INFO_REQUEST, getExtendedUserInfoRequest);
}

export function* getRolesOfTeammatesRequest({ limit, offset, queryText, isActive, sortOptions }:
  { limit: number, offset: number, queryText: string, isActive: boolean, sortOptions?: {} }) {
  try {
    const data: RoleType[] = yield call(getRolesOfTeammates, { limit, offset, queryText, isActive, sortOptions });
    yield put(Creators.getRolesOfTeammatesSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getRolesOfTeammatesFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchGetRolesOfTeammatesRequest() {
  yield takeLatest(Types.GET_ROLES_OF_TEAMMATES_REQUEST, getRolesOfTeammatesRequest);
}

export default function* roleRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchExportRolesExcel),
      fork(watchRequestRoleRequest),
      fork(watchGetUserRoleRequestsRequest),
      fork(watchGetRoleRequestsForApprovalByRoleOwnerRequest),
      fork(watchGetRoleRequestByIdRequest),
      fork(watchCancelRoleRequestRequest),
      fork(watchApproveRoleRequestRequest),
      fork(watchRejectRoleRequestRequest),
      fork(watchGetExtendedUserInfoRequest),
      fork(watchGetRolesOfTeammatesRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
