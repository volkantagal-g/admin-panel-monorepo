import { all, call, cancel, cancelled, fork, put, take, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

import { getManagerOfEmployee as getManagerOfEmployeeApi } from '@shared/api/employee';
import { Creators, Types } from './actions';

export function* getManagerOfEmployee({
  employeeId,
  fields,
}) {
  const { CancelToken } = axios;
  const cancelSource = CancelToken.source();

  try {
    const requestBody = {
      employeeId,
      fields,
    };

    const data = yield call(getManagerOfEmployeeApi, { ...requestBody, cancelSource });
    yield put(Creators.getManagerOfEmployeeSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getManagerOfEmployeeFailure({ error }));
  }
  finally {
    if (yield cancelled()) {
      yield call(cancelSource.cancel);
    }
  }
}

export function* watchManagerOfEmployeeRequest() {
  yield takeLatest(Types.GET_MANAGER_OF_EMPLOYEE_REQUEST, getManagerOfEmployee);
}

export default function* getManagerOfEmployeeRoot() {
  while (yield take(Types.INIT_CONTAINER)) {
    const backgroundTasks = yield all([
      fork(watchManagerOfEmployeeRequest),
    ]);

    yield take(Types.DESTROY_CONTAINER);
    yield cancel(backgroundTasks);
  }
}
