import { all, call, cancel, fork, put, take, takeLatest } from 'redux-saga/effects';

import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { Types, Creators } from './actions';
import {
  getFranchiseLegalAgreementDetail,
  getFranchiseLegalAgreementTableDetail, notifyFranchises as notifyFranchisesAPI,
  getFranchiseLegalAgreementHistory,
} from '@shared/api/franchiseLegalAgreement';

function* getFranchiseLegalAgreementTableRequest({ limit, offset, filters, agreementId }) {
  try {
    const { data, totalCount } = yield call(getFranchiseLegalAgreementTableDetail, { limit, offset, filters, agreementId });
    yield put(Creators.getFranchiseLegalAgreementTableSuccess({
      data,
      total: totalCount,
    }));
  }
  catch (error) {
    yield put(Creators.getFranchiseLegalAgreementTableFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* getFranchiseLegalAgreementDetailRequest({ id }) {
  try {
    const data = yield call(getFranchiseLegalAgreementDetail, { agreementId: id });
    yield put(Creators.getFranchiseLegalAgreementDetailSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getFranchiseLegalAgreementDetailFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* notifyFranchisesRequest({ id }) {
  try {
    yield call(notifyFranchisesAPI, { agreementId: id });
    yield put(ToastCreators.success());
    yield put(Creators.notifyFranchisesSuccess());
    yield put(Creators.getLegalNotificationHistoryRequest({ id }));
  }
  catch (error) {
    yield put(Creators.notifyFranchisesFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* getLegalAgreementNotificationHistoryRequest({ id }) {
  try {
    const { notificationHistory: data } = yield call(getFranchiseLegalAgreementHistory, { agreementId: id });
    yield put(Creators.getLegalNotificationHistorySuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getLegalNotificationHistoryFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* franchiseLegalAgreementTableRequest() {
  yield takeLatest(Types.GET_FRANCHISE_LEGAL_AGREEMENT_TABLE_REQUEST, getFranchiseLegalAgreementTableRequest);
}

function* franchiseLegalAgrementDetail() {
  yield takeLatest(Types.GET_FRANCHISE_LEGAL_AGREEMENT_DETAIL_REQUEST, getFranchiseLegalAgreementDetailRequest);
}

function* notifyFranchises() {
  yield takeLatest(Types.NOTIFY_FRANCHISES_REQUEST, notifyFranchisesRequest);
}

function* getLegalAgreementNotificationHistory() {
  yield takeLatest(Types.GET_LEGAL_NOTIFICATION_HISTORY_REQUEST, getLegalAgreementNotificationHistoryRequest);
}

export default function* franchiseLegalDetailRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(franchiseLegalAgreementTableRequest),
      fork(franchiseLegalAgrementDetail),
      fork(notifyFranchises),
      fork(getLegalAgreementNotificationHistory),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
