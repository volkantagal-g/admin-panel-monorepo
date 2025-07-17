import { all, call, cancel, fork, put, take, takeLatest } from 'redux-saga/effects';

import { getAuditFormTypeRequest as getAuditFormTypeRequestApi } from '@shared/api/kds/auditFormType';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { Types, Creators } from './actions';

function* getKdsAuditFormTypeList({ limit, offset }) {
  try {
    const { data, totalCount } = yield call(getAuditFormTypeRequestApi, { limit, offset });
    yield put(Creators.getKdsAuditFormTypeListSuccess({ data, total: totalCount }));
  }
  catch (error) {
    yield put(Creators.getKdsAuditFormTypeListFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchKdsAuditFormTypeListRequest() {
  yield takeLatest(Types.GET_KDS_AUDIT_FORM_TYPE_LIST_REQUEST, getKdsAuditFormTypeList);
}

export default function* kdsAuditFormTypeListRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchKdsAuditFormTypeListRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
