import { all, call, cancel, fork, put, take, takeLatest } from 'redux-saga/effects';

import { getKdsQuestionGroupList as getKdsQuestionGroupListApi } from '@shared/api/kds/questionGroup';
import { Types, Creators } from './actions';

function* questionGroupListRequest() {
  try {
    const { data } = yield call(getKdsQuestionGroupListApi, { limit: undefined, offset: undefined });
    yield put(Creators.getQuestionGroupListSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getQuestionGroupListFailure({ error }));
  }
}

function* watchQuestionGroupListRequest() {
  yield takeLatest(Types.GET_QUESTION_GROUP_LIST_REQUEST, questionGroupListRequest);
};

export default function* getQuestionGroupListRoot() {
  while (yield take(Types.INIT_CONTAINER)) {
    const backgroundTasks = yield all([
      fork(watchQuestionGroupListRequest),
    ]);
    yield take(Types.DESTROY_CONTAINER);
    yield cancel(backgroundTasks);
  }
}
