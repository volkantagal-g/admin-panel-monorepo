import { all, call, cancel, fork, put, take, takeLatest } from 'redux-saga/effects';

import { getAuditFormTypeRequest as getAuditFormTypeRequestApi } from '@shared/api/kds/auditFormType';
import { Types, Creators } from './actions';

function* getAuditFormTypeRequest() {
  try {
    const { data } = yield call(getAuditFormTypeRequestApi, { limit: undefined, offset: undefined });
    yield put(Creators.getAuditFormTypeSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getAuditFormTypeFailure({ error }));
  }
}

function* watchAuditFormTypeRequest() {
  yield takeLatest(Types.GET_AUDIT_FORM_TYPE_REQUEST, getAuditFormTypeRequest);
};

export default function* getAuditFormTypeRoot() {
  while (yield take(Types.INIT_CONTAINER)) {
    const backgroundTasks = yield all([
      fork(watchAuditFormTypeRequest),
    ]);
    yield take(Types.DESTROY_CONTAINER);
    yield cancel(backgroundTasks);
  }
}
