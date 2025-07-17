import { all, takeLatest, call, cancel, fork, put, take } from 'redux-saga/effects';

import { communicationCallbackUrlsSave } from '@shared/api/communicationCallbackUrls';
import { Types, Creators } from './actions';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';

function* communicationCallbackUrlsSaveRequest({ body, serviceType }) {
  try {
    const data = yield call(communicationCallbackUrlsSave, { body, serviceType });
    yield put(Creators.communicationCallbackUrlsSaveSuccess({ data }));
    yield put(ToastCreators.success());
  }
  catch (error) {
    const errorMessageToastModel = error?.response?.data?.subErrors?.map(item => item.errorMessage);
    const errorMessage = { message: errorMessageToastModel?.toString() };
    yield put(Creators.communicationCallbackUrlsSaveFailure({ error: errorMessage }));
    yield put(ToastCreators.error({ error: errorMessage }));
  }
}

function* watchCallbackUrlsSaveRequest() {
  yield takeLatest(Types.COMMUNICATION_CALLBACK_URLS_SAVE_REQUEST, communicationCallbackUrlsSaveRequest);
}

export default function* communicationCallbackUrlsRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchCallbackUrlsSaveRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
