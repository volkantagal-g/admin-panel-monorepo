import { all, call, cancel, fork, put, take, takeLatest } from 'redux-saga/effects';

import { Types, Creators } from './actions';
import { getCourierGamificationTasks as getCourierGamificationTasksApi } from '@shared/api/courierGamification';

function* getCourierGamificationTasks({ limit, offset, filters }) {
  try {
    const { tasks, totalCount } = yield call(getCourierGamificationTasksApi, { limit, offset, ...filters });
    yield put(Creators.getCourierGamificationTasksSuccess({ data: tasks, totalCount }));
  }
  catch (error) {
    yield put(Creators.getCourierGamificationTasksFailure({ error }));
  }
}

function* watchGetCourierGamificationTasksRequest() {
  yield takeLatest(Types.GET_COURIER_GAMIFICATION_TASKS_REQUEST, getCourierGamificationTasks);
}

export default function* root() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchGetCourierGamificationTasksRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
