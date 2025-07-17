import {
  all,
  call,
  cancel,
  fork,
  put,
  take,
  takeLatest,
} from 'redux-saga/effects';

import { getRunners } from '@shared/api/runner';
import { Types, Creators } from './actions';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';

function* getRunnersRequest({
  size,
  page,
  searchQuery,
  shoppingMallId,
  companyId,
}) {
  try {
    const body = {};
    const query = { size, page };

    if (searchQuery) {
      body.nameSurname = searchQuery;
    }

    if (companyId) {
      body.companyId = companyId;
    }

    if (shoppingMallId) {
      body.shoppingMallId = shoppingMallId;
    }

    const { data } = yield call(getRunners, { body, query });
    yield put(Creators.getRunnersSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getRunnersFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchGetRunnersRequest() {
  yield takeLatest(Types.GET_RUNNERS_REQUEST, getRunnersRequest);
}

export default function* userRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([fork(watchGetRunnersRequest)]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
