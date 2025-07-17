import {
  all,
  call,
  cancel,
  cancelled,
  fork,
  put,
  take,
  takeLatest,
} from 'redux-saga/effects';
import axios from 'axios';
import { uniqBy as _uniqBy } from 'lodash';

import { getEmployeesForSelectComponent } from '@shared/api/employee';
import { Creators, Types } from './actions';

export function* getEmployees({
  filters: {
    name,
    fields,
    limit,
    offset,
    employmentStatuses,
    employeeIds,
    shouldPopulateInitialValues,
    initialEmployeeIdValues,
  },
}) {
  const { CancelToken } = axios;
  const cancelSource = CancelToken.source();

  try {
    const requestBody = {
      name,
      fields,
      limit,
      offset,
      employmentStatuses,
      cancelSource,
      employeeIds,
    };
    const responseValue = [];
    const responseOne = yield call(getEmployeesForSelectComponent, requestBody) || {};
    responseValue.push(...(responseOne?.employees || []));
    if (shouldPopulateInitialValues) {
      const responseTwo = yield call(getEmployeesForSelectComponent, {
        employeeIds: initialEmployeeIdValues,
        fields,
        cancelSource,
      }) || {};
      responseValue.unshift(...(responseTwo?.employees || []));
    }

    yield put(Creators.getEmployeesSuccess({ data: _uniqBy(responseValue, '_id') }));
  }
  catch (error) {
    yield put(Creators.getEmployeesFailure({ error }));
  }
  finally {
    if (yield cancelled()) {
      yield call(cancelSource.cancel);
    }
  }
}

export function* watchEmployeesRequest() {
  yield takeLatest(Types.GET_EMPLOYEES_REQUEST, getEmployees);
}

export default function* getEmployeesRoot() {
  while (yield take(Types.INIT_CONTAINER)) {
    const backgroundTasks = yield all([fork(watchEmployeesRequest)]);

    yield take(Types.DESTROY_CONTAINER);
    yield cancel(backgroundTasks);
  }
}
