import { all, call, cancel, fork, put, take, takeLatest } from 'redux-saga/effects';

import {
  getServiceById as getServiceByIdApi,
  updateService as updateServiceApi,
  deleteService as deleteServiceApi,
  getSlackConfigurations as getSlackConfigurationsApi,
  updateSlackConfigurations as updateSlackConfigurationsApi,
  generateSlackToken as generateSlackTokenApi,
  testSlackMessage as testSlackMessageApi,
} from '@shared/api/internalAuthentication';

import { Types, Creators } from './actions';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';

function* getServiceById({ teamId, serviceId }) {
  try {
    const { data } = yield call(getServiceByIdApi, { teamId, serviceId });
    yield put(Creators.getServiceByIdSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getServiceByIdFailure({ error }));
  }
}

function* watchGetServiceByIdRequest() {
  yield takeLatest(Types.GET_SERVICE_BY_ID_REQUEST, getServiceById);
}

type UpdateService = {
  teamId: string;
  serviceId: string;
  name: string;
  description: string;
  active: boolean;
}
function* updateService({ service }: { service: UpdateService }) {
  try {
    const { data } = yield call(updateServiceApi, {
      teamId: service.teamId,
      serviceId: service.serviceId,
      name: service.name,
      description: service.description,
      active: service.active,
    });
    yield put(Creators.updateServiceSuccess({ data }));
    yield put(Creators.getServiceByIdRequest({ teamId: service.teamId, serviceId: service.serviceId }));
  }
  catch (error) {
    yield put(Creators.updateServiceFailure({ error }));
  }
}

function* watchUpdateServiceRequest() {
  yield takeLatest(Types.UPDATE_SERVICE_REQUEST, updateService);
}

type DeleteService = {
  teamId: string;
  serviceId: string;
  onSuccess: () => void;
}
function* deleteService({ teamId, serviceId, onSuccess }: DeleteService) {
  try {
    const { data } = yield call(deleteServiceApi, { teamId, serviceId });
    yield put(Creators.deleteServiceSuccess({ data }));
    yield call(onSuccess);
  }
  catch (error) {
    yield put(Creators.deleteServiceFailure({ error }));
  }
}

function* watchDeleteServiceRequest() {
  yield takeLatest(Types.DELETE_SERVICE_REQUEST, deleteService);
}

function* getSlackConfigurations({ teamId, serviceId }) {
  try {
    const { data } = yield call(getSlackConfigurationsApi, { teamId, serviceId });
    yield put(Creators.getSlackConfigurationsSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getSlackConfigurationsFailure({ error }));
  }
}

function* watchGetSlackConfigurationsRequest() {
  yield takeLatest(Types.GET_SLACK_CONFIGURATIONS_REQUEST, getSlackConfigurations);
}

function* updateSlackConfigurations({ teamId, serviceId, workspaceChannelNamePairs, workspaceDMConfigPairs, successCallback }) {
  try {
    const requestBody = {
      teamId,
      serviceId,
      ...(workspaceChannelNamePairs ? { workspaceChannelNamePairs } : undefined),
      ...(workspaceDMConfigPairs ? { workspaceDMConfigPairs } : undefined),
    };
    const { data } = yield call(updateSlackConfigurationsApi, requestBody);
    yield put(Creators.updateSlackConfigurationsSuccess({ data }));
    yield put(Creators.getSlackConfigurationsRequest({ teamId, serviceId }));
    if (successCallback) yield call(successCallback);
  }
  catch (error) {
    yield put(Creators.updateSlackConfigurationsFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchUpdateSlackConfigurationsRequest() {
  yield takeLatest(Types.UPDATE_SLACK_CONFIGURATIONS_REQUEST, updateSlackConfigurations);
}

function* generateSlackToken({ teamId, serviceId, failureCallback }) {
  try {
    const { data } = yield call(generateSlackTokenApi, { teamId, serviceId });
    yield put(Creators.generateSlackTokenSuccess({ data }));
    yield put(Creators.getSlackConfigurationsRequest({ teamId, serviceId }));
  }
  catch (error) {
    yield put(Creators.generateSlackTokenFailure({ error }));
    yield put(ToastCreators.error({ error }));
    yield call(failureCallback);
  }
}

function* testSlackMessage(
  { teamId, serviceId, workspaceName, channelName, dm }:
    { teamId: string, serviceId: string, workspaceName: string, channelName: string, dm: string },
) {
  try {
    yield put(ToastCreators.pending());
    const data = yield call(testSlackMessageApi, { teamId, serviceId, slackConfiguration: { workspaceName, channelName, dm } });
    const isSuccess = data?.isSuccess ?? false;
    const message = data?.message?.returnMessage;
    if (isSuccess) {
      yield put(ToastCreators.success({ message }));
    }
    else {
      yield put(ToastCreators.error({ message }));
    }
  }
  catch (error) {
    yield put(ToastCreators.error({ error }));
  }
}

function* watchGenerateSlackTokenRequest() {
  yield takeLatest(Types.GENERATE_SLACK_TOKEN_REQUEST, generateSlackToken);
}

function* watchTestSlackMessage() {
  yield takeLatest(Types.TEST_SLACK_MESSAGE, testSlackMessage);
}

export default function* root() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchGetServiceByIdRequest),
      fork(watchUpdateServiceRequest),
      fork(watchDeleteServiceRequest),
      fork(watchGetSlackConfigurationsRequest),
      fork(watchUpdateSlackConfigurationsRequest),
      fork(watchGenerateSlackTokenRequest),
      fork(watchTestSlackMessage),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
