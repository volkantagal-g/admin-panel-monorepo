import { all, call, cancel, fork, put, take, takeLatest } from 'redux-saga/effects';

import { Types, Creators } from './actions';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { getJobPostDetail } from '@shared/api/marketing';

function* getPostDetailRequest({ id, onGetDetailSuccess, onGetDetailFail }) {
  try {
    const { data } = yield call(getJobPostDetail, { id });
    yield put(Creators.getPostDetailSuccess({ data }));
    onGetDetailSuccess({ jobType: data.type, jobPostTitle: data.name });
  }
  catch (error) {
    yield put(Creators.getPostDetailFailure({ error }));
    onGetDetailFail();
    yield put(ToastCreators.error({ error }));
  }
}

function* watchGetPostDetailRequest() {
  yield takeLatest(Types.GET_POST_DETAIL_REQUEST, getPostDetailRequest);
}

export default function* root() {
  while (yield take(Types.INIT_CONTAINER)) {
    const backgroundTasks = yield all([
      fork(watchGetPostDetailRequest),
    ]);
    yield take(Types.DESTROY_CONTAINER);
    yield cancel(backgroundTasks);
  }
}
