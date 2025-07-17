import { all, call, cancel, fork, put, take, takeLatest } from 'redux-saga/effects';

import { getKdsQuestionGroupList as getKdsQuestionGroupListApi } from '@shared/api/kds/questionGroup';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { Types, Creators } from './actions';

function* getKdsQuestionGroupListRequest({ limit, offset }) {
  try {
    const { data, totalCount } = yield call(getKdsQuestionGroupListApi, { limit, offset });
    yield put(Creators.getKdsQuestionGroupListSuccess({ data, total: totalCount }));
  }
  catch (error) {
    yield put(Creators.getKdsQuestionGroupListFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* kdsQuestionGroupListRequest() {
  yield takeLatest(Types.GET_KDS_QUESTION_GROUP_LIST_REQUEST, getKdsQuestionGroupListRequest);
}

export default function* kdsQuestionGroupListRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(kdsQuestionGroupListRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
