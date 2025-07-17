import { all, call, cancel, fork, put, take, takeLatest } from 'redux-saga/effects';

import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { Types, Creators } from './actions';
import { deleteFranchiseConfigType, getFranchiseConfigType } from '@shared/api/franchiseDynamicConfig';
import { t } from '@shared/i18n';

function* getFranchiseConfigTypeListRequest({ limit, offset }) {
  try {
    const { data, total } = yield call(getFranchiseConfigType, { limit, offset });
    yield put(Creators.getFranchiseConfigTypeListSuccess({ data, total }));
  }
  catch (error) {
    yield put(Creators.getFranchiseConfigTypeListFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* franchiseConfigTypeListRequest() {
  yield takeLatest(Types.GET_FRANCHISE_CONFIG_TYPE_LIST_REQUEST, getFranchiseConfigTypeListRequest);
}

function* deleteFranchiseConfigTypeRequest({ id }) {
  try {
    yield call(deleteFranchiseConfigType, { id });
    yield put(Creators.deleteFranchiseConfigTypeSuccess({ id }));
    yield put(ToastCreators.success({ message: t('franchiseConfigType:LIST.DELETION_SUCCESS') }));
  }
  catch (error) {
    yield put(Creators.deleteFranchiseConfigTypeFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* franchiseConfigTypeDeleteRequest() {
  yield takeLatest(Types.DELETE_FRANCHISE_CONFIG_TYPE_REQUEST, deleteFranchiseConfigTypeRequest);
}

export default function* franchiseConfigTypeListRequestRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(franchiseConfigTypeListRequest),
      fork(franchiseConfigTypeDeleteRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
