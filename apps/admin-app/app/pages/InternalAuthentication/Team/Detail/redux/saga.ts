import { all, call, cancel, fork, put, take, takeLatest } from 'redux-saga/effects';

import {
  getTeamById as getTeamByIdApi,
  updateTeam as updateTeamApi,
  deleteTeam as deleteTeamApi,
  getTeamServices as getTeamServicesApi,
  createTeamService as createTeamServiceApi,
} from '@shared/api/internalAuthentication';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';

import { Types, Creators } from './actions';

function* getTeamById({ id } : { id: string; }) {
  try {
    const { data } = yield call(getTeamByIdApi, { id });
    yield put(Creators.getTeamByIdSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getTeamByIdFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchGetTeamByIdRequest() {
  yield takeLatest(Types.GET_TEAM_BY_ID_REQUEST, getTeamById);
}

type UpdateTeam = {
  id: string;
  name: string;
  description: string;
  active: boolean;
}
function* updateTeam({ team }: { team: UpdateTeam}) {
  try {
    const { data } = yield call(updateTeamApi, { id: team.id, name: team.name, description: team.description, active: team.active });
    yield put(Creators.updateTeamSuccess({ data }));
    yield put(Creators.getTeamByIdRequest({ id: team.id }));
  }
  catch (error) {
    yield put(Creators.updateTeamFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchUpdateTeamRequest() {
  yield takeLatest(Types.UPDATE_TEAM_REQUEST, updateTeam);
}

function* deleteTeam({ id, onSuccess } : { id: string; onSuccess: () => void; }) {
  try {
    const { data } = yield call(deleteTeamApi, { id });
    yield put(Creators.deleteTeamSuccess({ data }));
    yield call(onSuccess);
  }
  catch (error) {
    yield put(Creators.deleteTeamFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchDeleteTeamRequest() {
  yield takeLatest(Types.DELETE_TEAM_REQUEST, deleteTeam);
}

function* getTeamServices({ id } : { id: string;}) {
  try {
    const { data } = yield call(getTeamServicesApi, { id });
    yield put(Creators.getTeamServicesSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getTeamServicesFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchGetTeamServicesRequest() {
  yield takeLatest(Types.GET_TEAM_SERVICES_REQUEST, getTeamServices);
}

type TeamService = {
  teamId: string;
  name: string;
  description: string;
};
function* createTeamService({ service, onSuccess } : { service: TeamService; onSuccess: () => void; }) {
  try {
    const { data } = yield call(createTeamServiceApi, service);
    yield put(Creators.createTeamServiceSuccess({ data }));
    yield put(Creators.getTeamServicesRequest({ id: service.teamId }));
    yield call(onSuccess);
  }
  catch (error) {
    yield put(Creators.createTeamServiceFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchCreateTeamServiceRequest() {
  yield takeLatest(Types.CREATE_TEAM_SERVICE_REQUEST, createTeamService);
}

export default function* root() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchGetTeamByIdRequest),
      fork(watchUpdateTeamRequest),
      fork(watchDeleteTeamRequest),
      fork(watchGetTeamServicesRequest),
      fork(watchCreateTeamServiceRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
