import { all, call, cancel, fork, put, take, takeLatest, takeEvery } from 'redux-saga/effects';

import { Types, Creators } from './actions';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { getClientDrafts, getClientDraftDetail } from '@shared/api/marketing';

export function* getClientDraftsRequest({ searchString }) {
  try {
    const data = yield call(getClientDrafts, searchString);
    yield put(Creators.getClientDraftsSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getClientDraftsFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* getClientDraftDetailRequest({ draftId }) {
  try {
    const data = yield call(getClientDraftDetail, { clientListTemplateId: draftId });
    yield put(Creators.getClientDraftDetailSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getClientDraftDetailFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchGetClientDraftsRequest() {
  yield takeLatest(Types.GET_CLIENT_DRAFTS_REQUEST, getClientDraftsRequest);
}

function* watchGetClientDraftDetailRequest() {
  yield takeEvery(Types.GET_CLIENT_DRAFT_DETAIL_REQUEST, getClientDraftDetailRequest);
}

export default function* root() {
  while (yield take(Types.INIT_CONTAINER)) {
    const backgroundTasks = yield all([
      fork(watchGetClientDraftsRequest),
      fork(watchGetClientDraftDetailRequest),
    ]);
    yield take(Types.DESTROY_CONTAINER);
    yield cancel(backgroundTasks);
  }
}
