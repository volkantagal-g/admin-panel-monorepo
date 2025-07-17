import { all, call, cancel, fork, put, take, takeLatest } from 'redux-saga/effects';

import { getAuditFormTypeDetail, updateKdsAuditFormType } from '@shared/api/kds/auditFormType';
import { Types, Creators } from './actions';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';

function* getKdsAuditFormTypeDetailRequest({ id }) {
  try {
    const data = yield call(getAuditFormTypeDetail, { id });
    yield put(Creators.getKdsAuditFormTypeDetailSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getKdsAuditFormTypeDetailFailure({ error }));
  }
}

function* updateKdsAuditFormTypeRequest({ data }) {
  try {
    yield call(updateKdsAuditFormType, { data });
    window.location.reload();
  }
  catch (error) {
    yield put(Creators.updateKdsAuditFormTypeFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchGetKdsAuditFormTypeDetailRequest() {
  yield takeLatest(Types.GET_KDS_AUDIT_FORM_TYPE_DETAIL_REQUEST, getKdsAuditFormTypeDetailRequest);
}

function* watchUpdateKdsAuditFormTypeRequest() {
  yield takeLatest(Types.UPDATE_KDS_AUDIT_FORM_TYPE_REQUEST, updateKdsAuditFormTypeRequest);
}

export default function* getKdsAuditFormTypeDetailRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchGetKdsAuditFormTypeDetailRequest),
      fork(watchUpdateKdsAuditFormTypeRequest),
    ]);
    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
