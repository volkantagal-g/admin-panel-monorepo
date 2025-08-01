import { all, call, cancel, cancelled, fork, put, take, takeLatest } from 'redux-saga/effects';
import axios, { CancelTokenSource } from 'axios';
import { isFunction as _isFunction } from 'lodash';

import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { getBusinessUnitsForSelectComponent as getBusinessUnitsForSelectComponentAPI } from '@shared/api/employee';
import { Types } from './actions';

type ActionWithTypeType<T> = {
  type: string;
} & T;

type getBusinessUnitsRequestPropsType = ActionWithTypeType<{
  filters: {
    searchTerm: string;
    fields?: string[];
    limit: number;
    offset: number;
    isActive: boolean;
  };
  onSuccess: Function;
  onError: Function;
}>;
function* getBusinessUnits({
  filters: {
    searchTerm,
    fields,
    limit,
    offset,
    isActive,
  },
  onSuccess,
  onError,
}: getBusinessUnitsRequestPropsType): Generator {
  const cancelSource = axios.CancelToken.source() as CancelTokenSource;

  try {
    const requestBody = {
      cancelSource,
      searchTerm,
      fields,
      limit,
      offset,
      isActive,
    };

    // @ts-ignore
    const { businessUnits } = yield call(getBusinessUnitsForSelectComponentAPI, requestBody);
    if (_isFunction(onSuccess)) {
      onSuccess(businessUnits);
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

function* watchGetBusinessUnitsRequest() {
  // @ts-ignore
  yield takeLatest(Types.GET_BUSINESS_UNITS_REQUEST, getBusinessUnits);
}

export default function* businessUnitSelectComponentRootSaga(): Generator {
  while (yield take(Types.INIT_CONTAINER)) {
    const backgroundTasks: unknown = yield all([
      fork(watchGetBusinessUnitsRequest),
    ]);

    yield take(Types.DESTROY_CONTAINER);
    // @ts-ignore
    yield all(backgroundTasks.map(task => cancel(task)));
  }
}
