import { all, takeLatest, call, cancel, fork, put, take } from 'redux-saga/effects';
import axios from 'axios';

import { Types, Creators } from './actions';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { finishMentorship as finishMentorshipApi } from '@shared/api/mentorship';
import history from '@shared/utils/history';
import { ROUTE } from '@app/routes';

export function* finishMentorshipRequest({ body }) {
  try {
    const { CancelToken } = axios;
    const cancelSource = CancelToken.source();
    const requestBody = { ...body, cancelSource };
    const data = yield call(finishMentorshipApi, requestBody);
    yield put(Creators.finishMentorshipSuccess({ data }));
    yield put(ToastCreators.success());

    const path = ROUTE.MENTORSHIP_PROFILE.path.replace(':id', data?._id);
    history.push(path);
  }
  catch (error) {
    yield put(Creators.finishMentorshipFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* watchFinishMentorshipRequest() {
  yield takeLatest(Types.FINISH_MENTORSHIP_REQUEST, finishMentorshipRequest);
}

export default function* finishMentorshipRootSaga() {
  while (yield take(Types.OPEN_MODAL)) {
    const backgroundTasks = yield all([
      fork(watchFinishMentorshipRequest),
    ]);

    yield take(Types.FINISH_MENTORSHIP_SUCCESS);
    yield put(Creators.closeModal());
    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
