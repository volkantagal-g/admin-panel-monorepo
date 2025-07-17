import { all, call, cancel, fork, put, take, takeLatest } from 'redux-saga/effects';

import { getLimitAndOffset } from '@shared/utils/common';
import { filterWorkforceGenericLogs } from '@shared/api/workforceGenericLog';
import { getPersonList as getPersonListApi } from '@shared/api/person';
import { getWarehouses as getWarehousesApi } from '@shared/api/warehouse';
import { getLeaveTypes as getLeaveTypesApi } from '@shared/api/leaveManagement';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { Types, Creators } from './actions';

function* getPersonList({ name }) {
  try {
    const data = yield call(getPersonListApi, { query: { name } });
    yield put(Creators.getPersonListSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getPersonListFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* getWarehouses() {
  try {
    const { warehouses: data } = yield call(getWarehousesApi, {});
    yield put(Creators.getWarehousesSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getWarehousesFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* getLeaveTypes() {
  try {
    const data = yield call(getLeaveTypesApi, {});
    yield put(Creators.getLeaveTypesSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getLeaveTypesFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* getTimesheetLogs({ startDate, endDate, personId, currentPage, rowsPerPage }) {
  try {
    const { limit, offset } = getLimitAndOffset({ currentPage, rowsPerPage });
    const { data } = yield call(filterWorkforceGenericLogs, { startDate, endDate, personId, entity: 'timesheets', limit, offset });
    yield put(Creators.getTimesheetLogsSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getTimesheetLogsFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchGetTimesheetLogs() {
  yield takeLatest(Types.GET_TIMESHEET_LOGS_REQUEST, getTimesheetLogs);
}

function* watchGetPersonList() {
  yield takeLatest(Types.GET_PERSON_LIST_REQUEST, getPersonList);
}

function* watchGetWarehouses() {
  yield takeLatest(Types.GET_WAREHOUSES_REQUEST, getWarehouses);
}

function* watchGetLeaveTypes() {
  yield takeLatest(Types.GET_LEAVE_TYPES_REQUEST, getLeaveTypes);
}

export default function* timesheetLockPageRootSaga() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchGetTimesheetLogs),
      fork(watchGetPersonList),
      fork(watchGetWarehouses),
      fork(watchGetLeaveTypes),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
