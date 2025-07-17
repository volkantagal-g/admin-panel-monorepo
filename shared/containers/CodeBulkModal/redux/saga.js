import {
  all,
  takeLatest,
  call,
  cancel,
  fork,
  put,
  take,
} from 'redux-saga/effects';

import { codeBulkEdit } from '@shared/api/promo';

import { Types, Creators } from './actions';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';

function* codeBulkEditRequest({ body }) {
  try {
    const data = yield call(codeBulkEdit, { body });
    yield put(Creators.codeBulkEditSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.codeBulkEditFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchCodeBulkEditRequest() {
  yield takeLatest(Types.CODE_BULK_EDIT_REQUEST, codeBulkEditRequest);
}

export default function* promoDetailRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchCodeBulkEditRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
