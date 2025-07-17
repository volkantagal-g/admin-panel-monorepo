import { all, takeLatest, call, cancel, fork, put, take, takeEvery } from 'redux-saga/effects';

import { communicationServiceCredentialsSave, getConfig, getProvider } from '@shared/api/communicationServiceCredentials';
import { Types, Creators } from './actions';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { providersObj } from '@app/pages/CommunicationServiceCredentials/constantValues';

function* communicationServiceCredentialsSaveRequest({ body, serviceType }) {
  try {
    const data = yield call(communicationServiceCredentialsSave, { body, serviceType });
    yield put(Creators.communicationServiceCredentialsSaveSuccess({ data }));
    yield put(ToastCreators.success());
  }
  catch (error) {
    const errorMessageToastModel = error?.response?.data?.errors?.map(item => item.message);
    const errorMessage = { message: errorMessageToastModel?.toString() };
    yield put(Creators.communicationServiceCredentialsSaveFailure({ error: errorMessage }));
    yield put(ToastCreators.error({ error: errorMessage }));
  }
}

export function* getConfigRequest({ clientLanguage, serviceType }) {
  try {
    const results = yield call(getConfig, { clientLanguage, serviceType });
    yield put(Creators.getConfigSuccess({ data: results }));
  }
  catch (error) {
    yield put(Creators.getConfigFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* getProviderRequest({ clientLanguage, providerType }) {
  try {
    const suffix = providersObj[providerType].name;
    const result = yield call(getProvider, { clientLanguage, suffix });
    yield put(Creators.getProviderSuccess({ data: result, providerType }));
  }
  catch (error) {
    yield put(Creators.getProviderFailure({ error, providerType }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchCommunicationServiceCredentialsSaveRequest() {
  yield takeLatest(Types.COMMUNICATION_SERVICE_CREDENTIALS_SAVE_REQUEST, communicationServiceCredentialsSaveRequest);
}

function* watchGetConfigRequest() {
  yield takeLatest(Types.GET_CONFIG_REQUEST, getConfigRequest);
}

function* watchGetProviderRequest() {
  yield takeEvery(Types.GET_PROVIDER_REQUEST, getProviderRequest);
}

export default function* communicationServiceCredentialsRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchCommunicationServiceCredentialsSaveRequest),
      fork(watchGetConfigRequest),
      fork(watchGetProviderRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
