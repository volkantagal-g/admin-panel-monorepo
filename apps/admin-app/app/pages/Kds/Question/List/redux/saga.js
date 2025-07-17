import { all, call, cancel, fork, put, take, takeLatest } from 'redux-saga/effects';

import { getKdsQuestionListRequest as getKdsQuestionListRequestApi } from '@shared/api/kds/question';

import { Types, Creators } from './actions';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';

function* getKdsQuestionRequestList({ limit, offset }) {
  try {
    const { data, totalCount } = yield call(getKdsQuestionListRequestApi, {
      limit,
      offset,
    });
    yield put(Creators.getKdsQuestionListSuccess({ data, total: totalCount }));
  }
  catch (error) {
    yield put(Creators.getKdsQuestionListFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchKdsQuestionListRequest() {
  yield takeLatest(Types.GET_KDS_QUESTION_LIST_REQUEST, getKdsQuestionRequestList);
}

export default function* kdsQuestionListRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchKdsQuestionListRequest),
    ]);
    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
