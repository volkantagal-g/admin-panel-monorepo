import { all, takeEvery, call, cancel, fork, put, take } from 'redux-saga/effects';

import { getCallbackProperties } from '@shared/api/callbackProperty';
import { Types, Creators } from './actions';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';

function* getCallbackPropertiesRequest({ callbackType, serviceType, filters }) {
  try {
    const data = yield call(getCallbackProperties, { callbackType, serviceType, filters });
    yield put(Creators.getCallbackPropertiesSuccess({ data, callbackType }));
  }
  catch (error) {
    yield put(Creators.getCallbackPropertiesFailure({ error, callbackType }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchGetCallbackPropertiesRequest() {
  yield takeEvery(Types.GET_CALLBACK_PROPERTIES_REQUEST, getCallbackPropertiesRequest);
}

export default function* pushNotificationRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchGetCallbackPropertiesRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
