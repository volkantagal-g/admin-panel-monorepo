import { all, call, cancel, fork, put, take, takeLatest } from 'redux-saga/effects';

import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { getReportTags } from '@shared/api/report';

import { Types, Creators } from './actions';

function* getReportTagsRequest({ data: dataIn }) {
  try {
    const data = yield call(getReportTags, dataIn);
    yield put(Creators.getReportTagsSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getReportTagsFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchReportTagsRequest() {
  yield takeLatest(Types.GET_REPORT_TAGS_REQUEST, getReportTagsRequest);
}

export default function* root() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([fork(watchReportTagsRequest)]);
    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
