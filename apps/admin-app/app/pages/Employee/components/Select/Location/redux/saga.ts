import { all, call, cancel, cancelled, fork, put, take, takeLatest } from 'redux-saga/effects';
import axios, { CancelTokenSource } from 'axios';
import { isFunction as _isFunction } from 'lodash';

import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { getLocationsForSelectComponent } from '@shared/api/employee';
import { Types } from './actions';

type ActionWithTypeType<T> = {
  type: string;
} & T;

type getLocationsRequestPropsType = ActionWithTypeType<{
  filters: {
    searchTerm: string;
    fields?: string[];
    limit: number;
    offset: number;
  };
  onSuccess: Function;
  onError: Function;
}>;
function* getLocations({
  filters: {
    searchTerm,
    fields,
    limit,
    offset,
  },
  onSuccess,
  onError,
}: getLocationsRequestPropsType): Generator {
  const cancelSource = axios.CancelToken.source() as CancelTokenSource;

  try {
    const requestBody = {
      cancelSource,
      searchTerm,
      fields,
      limit,
      offset,
    };

    // @ts-ignore
    const { locations } = yield call(getLocationsForSelectComponent, requestBody);
    if (_isFunction(onSuccess)) {
      onSuccess(locations);
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

function* watchGetLocationsRequest() {
  // @ts-ignore
  yield takeLatest(Types.GET_LOCATIONS_REQUEST, getLocations);
}

export default function* locationSelectComponentRootSaga(): Generator {
  while (yield take(Types.INIT_CONTAINER)) {
    const backgroundTasks: unknown = yield all([
      fork(watchGetLocationsRequest),
    ]);

    yield take(Types.DESTROY_CONTAINER);
    // @ts-ignore
    yield all(backgroundTasks.map(task => cancel(task)));
  }
}
