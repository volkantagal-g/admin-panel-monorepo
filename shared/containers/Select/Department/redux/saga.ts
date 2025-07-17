import { all, call, cancel, cancelled, fork, put, take, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { isFunction as _isFunction } from 'lodash';

import { getDepartmentsPure as getDepartmentsPureAPI } from '@shared/api/employee';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { Types } from '@shared/containers/Select/Department/redux/actions';

type ActionWithTypeType<T> = {
  type: string;
} & T;

type getDepartmentsRequestPropsType = ActionWithTypeType<{
  filters: {
    fields?: string[];
    isActive?: boolean;
    levels: string[];
  },
  onSuccess: Function;
  onError: Function;
}>;
export function* getDepartments({
  filters: {
    fields,
    isActive,
    levels,
  },
  onSuccess,
  onError,
}: getDepartmentsRequestPropsType): Generator {
  const { CancelToken } = axios;
  const cancelSource = CancelToken.source();

  try {
    const requestBody = {
      cancelSource,
      fields,
      isActive,
      levels,
    };

    // @ts-ignore
    const { departments } = yield call(getDepartmentsPureAPI, requestBody);
    if (_isFunction(onSuccess)) {
      onSuccess(departments);
    }
  }
  catch (error) {
    yield put(ToastCreators.error({ error }));
    if (_isFunction(onError)) {
      onError();
    }
  }
  finally {
    if (yield cancelled()) {
      yield call(cancelSource.cancel);
    }
  }
}

export function* watchDepartmentsRequest(): Generator {
  // @ts-ignore
  yield takeLatest(Types.GET_DEPARTMENTS_REQUEST, getDepartments);
}

export default function* departmentSelectComponentRootSaga(): Generator {
  while (yield take(Types.INIT_CONTAINER)) {
    const backgroundTasks: unknown = yield all([
      fork(watchDepartmentsRequest),
    ]);

    yield take(Types.DESTROY_CONTAINER);
    // @ts-ignore
    yield all(backgroundTasks.map((task: any) => cancel(task)));
  }
}
