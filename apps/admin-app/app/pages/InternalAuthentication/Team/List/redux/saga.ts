import { all, call, cancel, fork, put, take, takeLatest } from 'redux-saga/effects';

import { createTeam as createTeamApi, getTeams as getTeamsApi } from '@shared/api/internalAuthentication';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';

import { Types, Creators } from './actions';

function* getTeams() {
  try {
    const { data } = yield call(getTeamsApi);
    yield put(Creators.getTeamsSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getTeamsFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchGetTeamsRequest() {
  yield takeLatest(Types.GET_TEAMS_REQUEST, getTeams);
}

function* createTeam({ team, onSuccess } : { team: Team; onSuccess: () => void; }) {
  try {
    const { data } = yield call(createTeamApi, team);
    yield put(Creators.createTeamSuccess({ data }));
    yield call(onSuccess);
    yield put(Creators.getTeamsRequest());
  }
  catch (error) {
    yield put(Creators.createTeamFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchCreateTeamRequest() {
  yield takeLatest(Types.CREATE_TEAM_REQUEST, createTeam);
}

export default function* root() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchGetTeamsRequest),
      fork(watchCreateTeamRequest),
    ]);

    yield put(Creators.getTeamsRequest());

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
