import { all, call, cancel, fork, put, take, takeLatest } from 'redux-saga/effects';

import history from '@shared/utils/history';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { createReportTag } from '@shared/api/report';
import { ROUTE } from '@app/routes';

import { Types, Creators } from './actions';

function* createReportTagRequest({ data }) {
  try {
    const newReportTag = yield call(createReportTag, data);
    yield put(Creators.createReportTagSuccess({ newReportTag }));
    history.push(ROUTE.REPORT_TAGS_DETAIL.path.replace(':id', newReportTag._id));
  }
  catch (error) {
    yield put(Creators.createReportTagFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchCreateReportTagRequest() {
  yield takeLatest(Types.CREATE_REPORT_TAG_REQUEST, createReportTagRequest);
}

export default function* root() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([fork(watchCreateReportTagRequest)]);
    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
