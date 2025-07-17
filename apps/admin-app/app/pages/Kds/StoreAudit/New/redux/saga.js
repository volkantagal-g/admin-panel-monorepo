import { all, call, cancel, fork, put, take, takeLatest } from 'redux-saga/effects';

import { ROUTE } from '@app/routes';
import { createStoreAudit } from '@shared/api/kds/auditForm';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import history from '@shared/utils/history';
import { Types, Creators } from './actions';

function* createStoreAuditRequest({
  auditorId,
  franchiseId,
  warehouseId,
  auditFormTypeId,
  round,
}) {
  try {
    yield call(createStoreAudit, { auditorId, franchiseId, warehouseId, auditFormTypeId, round });

    yield put(Creators.createStoreAuditSuccess());
    yield put(ToastCreators.success());
    history.push(ROUTE.STORE_AUDIT_LIST.path);
  }
  catch (error) {
    yield put(Creators.createStoreAuditFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchCreateStoreAuditRequest() {
  yield takeLatest(Types.CREATE_STORE_AUDIT_REQUEST, createStoreAuditRequest);
}

export default function* createStoreAuditRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchCreateStoreAuditRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
