import { all, call, cancel, fork, put, take, takeLatest } from 'redux-saga/effects';

import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { Types, Creators } from './actions';
import { getPageById } from '@shared/api/page';

function* getPageOwnersRequest({ pageId }) {
  try {
    const { pageOwners } = yield call(getPageById, { id: pageId, isPopulatePageOwners: true });
    yield put(Creators.getPageOwnersSuccess({ data: pageOwners }));
  }
  catch (error) {
    yield put(Creators.getPageOwnersFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchGetPageOwnersRequest() {
  yield takeLatest(Types.GET_PAGE_OWNERS_REQUEST, getPageOwnersRequest);
}

export default function* root() {
  while (yield take(Types.INIT_APP_LAYOUT)) {
    const backgroundTasks = yield all([
      fork(watchGetPageOwnersRequest),
    ]);
    yield take(Types.DESTROY_APP_LAYOUT);
    yield cancel(backgroundTasks);
  }
}
