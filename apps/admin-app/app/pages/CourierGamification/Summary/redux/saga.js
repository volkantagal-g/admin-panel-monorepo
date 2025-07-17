import { all, call, cancel, fork, put, take, takeLatest } from 'redux-saga/effects';

import { getCourierGamificationTaskById as getCourierGamificationTaskByIdApi, getSummaryOfGMFCTaskById } from '@shared/api/courierGamification';
import { Types, Creators } from './actions';

function* getCourierGamificationTaskByIdRequest({ currId }) {
  try {
    const data = yield call(getCourierGamificationTaskByIdApi, currId);
    const taskDataApi = data?.task;
    const { courierCount, status, createdAt, updatedAt, id, ...taskData } = taskDataApi ?? {};

    yield put(Creators.detailCourierGamificationTaskByIdSuccess({
      taskData: { ...taskData },
      courierCount,
      status,
    }));
  }
  catch (error) {
    yield put(Creators.detailCourierGamificationTaskByIdFailure({ error }));
  }
}
function* getSummaryCourierGamificationByIdRequest({ requestBody, currId, offset, limit, sortKey, sortDirection }) {
  try {
    const data = yield call(getSummaryOfGMFCTaskById, { requestBody, id: currId, offset, limit, sortKey, sortDirection });
    yield put(Creators.getSummaryCourierGamificationByIdSuccess({ summaryData: data?.summary }));
  }
  catch (error) {
    yield put(Creators.getSummaryCourierGamificationByIdFailure({ error }));
  }
}

function* watchGetCourierGamificationTaskSummaryRequest() {
  yield takeLatest(Types.DETAIL_COURIER_GAMIFICATION_TASK_BY_ID_REQUEST, getCourierGamificationTaskByIdRequest);
  yield takeLatest(Types.GET_SUMMARY_COURIER_GAMIFICATION_BY_ID_REQUEST, getSummaryCourierGamificationByIdRequest);
}

export default function* root() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchGetCourierGamificationTaskSummaryRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
