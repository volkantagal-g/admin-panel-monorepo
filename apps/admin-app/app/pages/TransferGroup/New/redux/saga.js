import { all, takeLatest, call, cancel, fork, put, take } from 'redux-saga/effects';
import _ from 'lodash';

import history from '@shared/utils/history';
import { createTransferGroup } from '@shared/api/transferGroup';
import { Types, Creators } from './actions';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { ROUTE } from '@app/routes';

function* createTransferGroupRequest({ name }) {
  try {
    const data = yield call(createTransferGroup, { name });
    yield put(Creators.createTransferGroupSuccess({ data }));
    yield put(ToastCreators.success());
    const transferGroupId = _.get(data, 'transferGroup._id', '');
    const path = ROUTE.TRANSFER_GROUP_DETAIL.path.replace(':id', transferGroupId);
    history.push(path);
  }
  catch (error) {
    yield put(Creators.createTransferGroupFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchCreateTransferGroupRequest() {
  yield takeLatest(Types.CREATE_TRANSFER_GROUP_REQUEST, createTransferGroupRequest);
}

export default function* transferGroupNewRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchCreateTransferGroupRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
