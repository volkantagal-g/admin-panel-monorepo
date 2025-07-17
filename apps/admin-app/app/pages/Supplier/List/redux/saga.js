import { all, call, cancel, fork, put, take, takeLatest } from 'redux-saga/effects';

import { getSuppliers } from '@shared/api/supplier';
import { Types, Creators } from './actions';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';

function* getSuppliersRequest() {
  try {
    const { suppliers: data } = yield call(getSuppliers);
    yield put(Creators.getSuppliersSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getSuppliersFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchSuppliersRequest() {
  yield takeLatest(Types.GET_SUPPLIERS_REQUEST, getSuppliersRequest);
}

export default function* suppliersRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchSuppliersRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
