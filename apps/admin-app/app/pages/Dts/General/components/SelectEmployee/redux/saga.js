import {
  all,
  cancel,
  call,
  fork,
  put,
  take,
  takeLatest,
} from 'redux-saga/effects';

import { getPersonList as getPersonListApi } from '@shared/api/person';

import { Types, Creators } from './actions';

export function* getEmployeeRequest({ name, id }) {
  const query = id ? { id, isActivated: true } : { name, isActivated: true };
  try {
    const data = yield call(getPersonListApi, {
      fields: 'name',
      query,
    });
    yield put(Creators.getEmployeeSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getEmployeeFailure({ error }));
  }
}

export function* watchEmployeeRequest() {
  yield takeLatest(Types.GET_EMPLOYEE_REQUEST, getEmployeeRequest);
}

export default function* getEmployeeRoot() {
  while (yield take(Types.INIT_CONTAINER)) {
    const backgroundTasks = yield all([fork(watchEmployeeRequest)]);
    yield take(Types.DESTROY_CONTAINER);
    yield cancel(backgroundTasks);
  }
}
