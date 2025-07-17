import { all, call, cancel, fork, put, take, takeLatest } from 'redux-saga/effects';

import { getPeople } from '@shared/api/person';
import { Types, Creators } from './actions';

function* peopleRequest({ franchiseId }) {
  try {
    const data = yield call(getPeople, { franchiseId, fields: 'name _id' });
    yield put(Creators.getPeopleSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getPeopleFailure({ error }));
  }
}

function* watchPeopleRequest() {
  yield takeLatest(Types.GET_PEOPLE_REQUEST, peopleRequest);
}

export default function* getPeopleRoot() {
  while (yield take(Types.INIT_CONTAINER)) {
    const backgroundTasks = yield all([
      fork(watchPeopleRequest),
    ]);

    yield take(Types.DESTROY_CONTAINER);
    yield cancel(backgroundTasks);
  }
}
