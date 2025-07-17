import { all, call, cancel, fork, put, take, takeLatest } from 'redux-saga/effects';

import { createKdsAuditFormType as createKdsAuditFormTypeApi } from '@shared/api/kds/auditFormType';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import history from '@shared/utils/history';
import { Types, Creators } from './actions';

function* createKdsAuditFormTypeRequest({ name, isSendToFranchise }) {
  try {
    yield call(createKdsAuditFormTypeApi, { name, isSendToFranchise });

    yield put(Creators.createKdsAuditFormTypeSuccess());
    yield put(ToastCreators.success());
    history.push('/kds/AuditFormType/list');
  }
  catch (error) {
    yield put(Creators.createKdsAuditFormTypeFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchCreateKdsAuditFormTypeRequest() {
  yield takeLatest(Types.CREATE_KDS_AUDIT_FORM_TYPE_REQUEST, createKdsAuditFormTypeRequest);
}

export default function* createKdsAuditFormTypeRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchCreateKdsAuditFormTypeRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
