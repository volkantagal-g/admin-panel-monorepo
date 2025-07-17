import { all, takeLatest, call, cancel, fork, put, take } from 'redux-saga/effects';

import { communicationCallbackUrlsUpdate, communicationCallbackUrlsGet } from '@shared/api/communicationCallbackUrls';
import { Types, Creators } from './actions';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';

function* communicationCallbackUrlsGetRequest({ communicationCallbackUrlsId, serviceType }) {
  try {
    const data = yield call(communicationCallbackUrlsGet, { id: communicationCallbackUrlsId, serviceType });
    yield put(Creators.communicationCallbackUrlsGetSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.communicationCallbackUrlsGetFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* communicationCallbackUrlsUpdateRequest({ id, body, serviceType }) {
  try {
    const data = yield call(communicationCallbackUrlsUpdate, { id, body, serviceType });
    yield put(ToastCreators.success());
    yield put(Creators.communicationCallbackUrlsUpdateSuccess({ data }));
  }
  catch (error) {
    const errorMessageToastModel = error?.response?.data?.subErrors?.map(item => item.errorMessage);
    const errorMessage = { message: errorMessageToastModel?.toString() };
    yield put(Creators.communicationCallbackUrlsUpdateFailure({ error: errorMessage }));
    yield put(ToastCreators.error({ error: errorMessage }));
  }
}

function* watchCallbackUrlsUpdateRequest() {
  yield takeLatest(Types.COMMUNICATION_CALLBACK_URLS_UPDATE_REQUEST, communicationCallbackUrlsUpdateRequest);
}

function* watchCallbackUrlsGetRequest() {
  yield takeLatest(Types.COMMUNICATION_CALLBACK_URLS_GET_REQUEST, communicationCallbackUrlsGetRequest);
}

export default function* communicationCallbackUrlsRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchCallbackUrlsUpdateRequest),
      fork(watchCallbackUrlsGetRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
