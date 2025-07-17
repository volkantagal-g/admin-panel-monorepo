import { all, call, cancel, fork, put, take, takeLatest } from 'redux-saga/effects';

import { getQuestionGroupDetail, updateKdsQuestionGroup } from '@shared/api/kds/questionGroup';
import { Types, Creators } from './actions';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';

function* getKdsQuestionGroupDetailRequest({ id }) {
  try {
    const data = yield call(getQuestionGroupDetail, { id });
    yield put(Creators.getKdsQuestionGroupDetailSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getKdsQuestionGroupDetailFailure({ error }));
  }
}

function* updateKdsQuestionGroupRequest({ data }) {
  try {
    yield call(updateKdsQuestionGroup, { data });
    window.location.reload();
  }
  catch (error) {
    yield put(Creators.updateKdsQuestionGroupFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchGetKdsQuestionGroupDetailRequest() {
  yield takeLatest(Types.GET_KDS_QUESTION_GROUP_DETAIL_REQUEST, getKdsQuestionGroupDetailRequest);
}

function* watchUpdateKdsQuestionGroupRequest() {
  yield takeLatest(Types.UPDATE_KDS_QUESTION_GROUP_REQUEST, updateKdsQuestionGroupRequest);
}

export default function* getKdsQuestionGroupDetailRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchGetKdsQuestionGroupDetailRequest),
      fork(watchUpdateKdsQuestionGroupRequest),
    ]);
    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
