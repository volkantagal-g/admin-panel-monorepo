import { all, takeLatest, call, cancel, fork, put, take } from 'redux-saga/effects';
import _ from 'lodash';

import { createRole } from '@shared/api/role';
import { Types, Creators } from './actions';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';

export function* createRoleRequest({ body, afterSuccess }: { body: Partial<RoleType>, afterSuccess: (roleId?: MongoIDType) => void }) {
  let roleId = null;
  try {
    const data: RoleType = yield call(createRole, { body });
    roleId = _.get(data, '_id');
    yield put(Creators.createRoleSuccess({ data }));
    yield put(ToastCreators.success());
  }
  catch (error) {
    yield put(Creators.createRoleFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }

  if (roleId && afterSuccess) {
    afterSuccess(roleId);
  }
}

function* watchCreateRoleRequest() {
  yield takeLatest(Types.CREATE_ROLE_REQUEST, createRoleRequest);
}

export default function* roleNewRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchCreateRoleRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
