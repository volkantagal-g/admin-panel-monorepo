import { all, takeLatest, call, cancel, fork, put, take } from 'redux-saga/effects';
import axios from 'axios';

import { Types, Creators } from './actions';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { requestMentorshipRequest as requestMentorshipRequestApi } from '@shared/api/mentorship';
import { MENTORSHIP_REQUEST_STATUSES } from '@app/pages/Mentorship/constants';
import { ROUTE } from '@app/routes';
import history from '@shared/utils/history';

export function* requestMentorshipRequest({ body }) {
  try {
    const { CancelToken } = axios;
    const cancelSource = CancelToken.source();
    const { request: { _id: courseId }, requestReason } = body;
    const requestBody = { courseId, requestReason, cancelSource };
    const data = yield call(requestMentorshipRequestApi, requestBody);
    yield put(Creators.closeModal());
    history.push(`${ROUTE.MENTORSHIP_PROFILE.path}?scrollToTab=requests&requestStatusFilter=${MENTORSHIP_REQUEST_STATUSES.PENDING}`);
    yield put(Creators.requestMentorshipSuccess({ data }));
    yield put(ToastCreators.success());
  }
  catch (error) {
    yield put(Creators.requestMentorshipFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* watchRequestMentorshipRequest() {
  yield takeLatest(Types.REQUEST_MENTORSHIP_REQUEST, requestMentorshipRequest);
}

export default function* requestMentorshipRootSaga() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchRequestMentorshipRequest),
    ]);

    yield take(Types.REQUEST_MENTORSHIP_SUCCESS);
    yield cancel(backgroundTasks);
    yield put(Creators.closeModal());
    yield take(Types.DESTROY_PAGE);
  }
}
