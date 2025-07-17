import { TFunction } from 'react-i18next';
import { all, call, cancel, fork, put, take, takeLatest } from 'redux-saga/effects';

import {
  getUsers,
  getUserRoles,
  getUserById,
} from '@shared/api/user';
import { exportEmployeeUserTable } from '../utils/index';
import { getDepartmentsPure, getEmployeesFilter } from '@shared/api/employee';
import { Types, Creators } from './actions';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { Creators as CommonCreators } from '@shared/redux/actions/common';
import { EMPLOYEE_DEPARTMENT_LEVELS } from '@shared/shared/constants';

const MAIN_DEPARTMENT = 0;

function* getUsersRequest({
  limit,
  offset,
  queryText,
  id,
  isActive,
  sortOptions,
}: {
    limit: number,
    offset: number,
    queryText: string,
    id: MongoIDType,
    isActive: boolean,
    sortOptions: {[key: string]: number
  }}) {
  try {
    if (id) {
      const user: UserType = yield call(getUserById, { id });
      yield put(Creators.getUsersSuccess({ data: user ? [user] : [] }));
      return;
    }

    const getUsersParams = (
      { limit, offset, isActive, sortOptions } as { limit: number, offset: number, queryText?: string, sortOptions: {[key: string]: number } }
    );

    if (queryText) {
      getUsersParams.queryText = queryText;
    }
    const { users: data }: { users: UserType[] } = yield call(getUsers, getUsersParams);
    yield put(Creators.getUsersSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getUsersFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* getUserRolesRequest({ userId }: { userId: MongoIDType }) {
  try {
    const roles: RoleType[] = yield call(getUserRoles, { userId });
    yield put(Creators.getUserRolesSuccess({ data: roles }));
  }
  catch (error) {
    yield put(Creators.getUserRolesFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* getDepartmentsRequest() {
  try {
    const data: { departments: DepartmentType[] } = yield call(getDepartmentsPure, {
      levels: [EMPLOYEE_DEPARTMENT_LEVELS.MAIN_DEPARTMENT],
      isActive: true,
    });

    yield put(Creators.getDepartmentsSuccess({ data: data?.departments }));
  }
  catch (error) {
    yield put(Creators.getDepartmentsFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* getUsersForExcelTableRequest({
  t,
  isActive,
  countries,
  filters,
}: { t: TFunction, isActive: boolean, countries: ICountry[], filters: { statuses: string[], departments: DepartmentType[] } }) {
  try {
    const { users }: { users: UserType[] } = yield call(getUsers, { isActive });
    const workEmail = users?.map(item => item.email);
    const employeeData: { employees: EmployeeType[] } = yield call(getEmployeesFilter, { workEmail, departmentIds: filters?.departments });
    const departmentData: { departments: DepartmentType[] } = yield call(getDepartmentsPure, {
      levels: [EMPLOYEE_DEPARTMENT_LEVELS.MAIN_DEPARTMENT],
      isActive: true,
      departmentIds: filters?.departments,
    });
    exportEmployeeUserTable({ users, employeeData, departmentData, countries, filters, isActive, t });
    yield put(Creators.getUsersForExcelTableSuccess({ data: users }));
  }
  catch (error) {
    yield put(Creators.getUsersForExcelTableFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchGetUsersRequest() {
  yield takeLatest(Types.GET_USERS_REQUEST, getUsersRequest);
}

function* watchGetUserRolesRequest() {
  yield takeLatest(Types.GET_USER_ROLES_REQUEST, getUserRolesRequest);
}

function* watchGetDepartmentsRequest() {
  yield takeLatest(Types.GET_DEPARTMENTS_REQUEST, getDepartmentsRequest);
}

function* watchGetUsersForExcelTableRequest() {
  yield takeLatest(Types.GET_USERS_FOR_EXCEL_TABLE_REQUEST, getUsersForExcelTableRequest);
}

export default function* userRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchGetUsersRequest),
      fork(watchGetUserRolesRequest),
      fork(watchGetDepartmentsRequest),
      fork(watchGetUsersForExcelTableRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);

    yield put(CommonCreators.getUserRolesReset());
  }
}
