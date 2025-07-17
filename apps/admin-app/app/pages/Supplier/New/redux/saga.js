import { all, takeLatest, call, cancel, fork, put, take } from 'redux-saga/effects';
import _get from 'lodash/get';

import history from '@shared/utils/history';
import { createSupplier } from '@shared/api/supplier';
import { Types, Creators } from './actions';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { ROUTE } from '@app/routes';

function* createSupplierRequest({ body }) {
  try {
    const data = yield call(createSupplier, { body });
    yield put(Creators.createSupplierSuccess({ data }));
    yield put(ToastCreators.success());
    const supplierId = _get(data, '_id', '');
    const path = ROUTE.SUPPLIER_DETAIL.path.replace(':id', supplierId);
    history.push(path);
  }
  catch (error) {
    yield put(Creators.createSupplierFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchCreateSupplierRequest() {
  yield takeLatest(Types.CREATE_SUPPLIER_REQUEST, createSupplierRequest);
}

export default function* supplierNewRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchCreateSupplierRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
