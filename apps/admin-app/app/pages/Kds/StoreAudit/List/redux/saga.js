import { all, call, cancel, fork, put, take, takeLatest } from 'redux-saga/effects';

import { getStoreAuditList as getStoreAuditListApi } from '@shared/api/kds/auditForm';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { Types, Creators } from './actions';
import { getStoreAuditFilterRequestBody } from '../utils';

function* getKdsStoreAuditListRequest({ limit, offset, filters }) {
  const requestBody = getStoreAuditFilterRequestBody(filters);
  try {
    const { data, totalCount } = yield call(getStoreAuditListApi, { limit, offset, requestBody });
    yield put(Creators.getKdsStoreAuditListSuccess({ data, total: totalCount }));
  }
  catch (error) {
    yield put(Creators.getKdsStoreAuditListFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* kdsStoreAuditListRequest() {
  yield takeLatest(Types.GET_KDS_STORE_AUDIT_LIST_REQUEST, getKdsStoreAuditListRequest);
}

export default function* kdsStoreAuditListRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(kdsStoreAuditListRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
