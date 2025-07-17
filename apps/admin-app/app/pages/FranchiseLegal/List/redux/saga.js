import { all, call, cancel, fork, put, take, takeLatest } from 'redux-saga/effects';

import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { Types, Creators } from './actions';
import { changeFranchiseLegalAgreementStatus, getFranchiseLegalAgreementList } from '@shared/api/franchiseLegalAgreement';
import history from '@shared/utils/history';

function* getFranchiseLegalListRequest({ limit, offset }) {
  try {
    const { record: data, total } = yield call(getFranchiseLegalAgreementList, { limit, offset });
    yield put(Creators.getFranchiseLegalListSuccess({
      data,
      total,
    }));
  }
  catch (error) {
    yield put(Creators.getFranchiseLegalListFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* changeFranchiseLegalStatusRequest({ status, id }) {
  try {
    yield call(changeFranchiseLegalAgreementStatus, { status, agreementId: id });
    yield put(Creators.changeFranchiseLegalStatusSuccess());
    yield put(ToastCreators.success());
    history.go(0);
  }
  catch (error) {
    yield put(Creators.changeFranchiseLegalStatusFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* franchiseLegalListRequest() {
  yield takeLatest(Types.GET_FRANCHISE_LEGAL_LIST_REQUEST, getFranchiseLegalListRequest);
}

function* franchiseLegaStatusRequest() {
  yield takeLatest(Types.CHANGE_FRANCHISE_LEGAL_STATUS_REQUEST, changeFranchiseLegalStatusRequest);
}

export default function* franchiseLegalListRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(franchiseLegalListRequest),
      fork(franchiseLegaStatusRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
