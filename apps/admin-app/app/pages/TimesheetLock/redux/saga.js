import { all, call, cancel, fork, put, take, takeLatest } from 'redux-saga/effects';

import {
  filterLockedTimesheets as filterLockedTimesheetsApi,
  lockTimesheets as lockTimesheetsApi,
  unlockTimesheets as unlockTimesheetsApi,
} from '@shared/api/timesheet';

import { Types, Creators } from './actions';

function* filterLockedTimesheets({ minDate, maxDate, countryCode }) {
  try {
    const data = yield call(filterLockedTimesheetsApi, { minDate, maxDate, countryCode });
    yield put(Creators.filterLockedTimesheetsSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.filterLockedTimesheetsFailure({ error }));
  }
}

function* lockTimesheets({ dates, countryCode }) {
  try {
    yield call(lockTimesheetsApi, { dates, countryCode });
    yield put(Creators.lockTimesheetsSuccess());
  }
  catch (error) {
    yield put(Creators.lockTimesheetsFailure({ error }));
  }
}

function* unlockTimesheets({ dates, countryCode }) {
  try {
    yield call(unlockTimesheetsApi, { dates, countryCode });
    yield put(Creators.unlockTimesheetsSuccess());
  }
  catch (error) {
    yield put(Creators.unlockTimesheetsFailure({ error }));
  }
}

function* watchFilterLockedTimesheetsRequest() {
  yield takeLatest(Types.FILTER_LOCKED_TIMESHEETS_REQUEST, filterLockedTimesheets);
}

function* watchLockTimesheetsRequest() {
  yield takeLatest(Types.LOCK_TIMESHEETS_REQUEST, lockTimesheets);
}

function* watchUnlockTimesheetsRequest() {
  yield takeLatest(Types.UNLOCK_TIMESHEETS_REQUEST, unlockTimesheets);
}

export default function* timesheetLockPageRootSaga() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchFilterLockedTimesheetsRequest),
      fork(watchLockTimesheetsRequest),
      fork(watchUnlockTimesheetsRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
