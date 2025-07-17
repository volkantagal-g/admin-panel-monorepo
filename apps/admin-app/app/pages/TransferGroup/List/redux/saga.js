import { all, call, cancel, fork, put, take, takeLatest } from 'redux-saga/effects';

import { getTransferGroups } from '@shared/api/transferGroup';
import { Types, Creators } from './actions';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';

function* getTransferGroupsRequest({ limit, offset }) {
  try {
    const { transferGroups: data, total } = yield call(getTransferGroups, { limit, offset });
    yield put(Creators.getTransferGroupsSuccess({ data, total }));
  }
  catch (error) {
    yield put(Creators.getTransferGroupsFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchTransferGroupsRequest() {
  yield takeLatest(Types.GET_TRANSFER_GROUPS_REQUEST, getTransferGroupsRequest);
}

export default function* transferGroupsRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchTransferGroupsRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
