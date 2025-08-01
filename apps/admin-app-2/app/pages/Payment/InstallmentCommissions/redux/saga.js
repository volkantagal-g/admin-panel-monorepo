import { all, call, cancel, fork, put, select, take, takeLatest } from 'redux-saga/effects';

import { cloneDeep, isEmpty } from 'lodash';

import { getCardInstallmentCounts as getCardInstallmentCountsApi, updateCardInstallmentCounts as updateCardInstallmentCountsApi } from '@shared/api/payment';
import { Types, Creators } from './actions';
import { cardInstallmentCountsSelector, cardUserTypeSelector } from './selectors';
import { removeEmptyFieldsFromParams } from '@shared/utils/request';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';

function* getCardInstallmentCounts({
  installmentCount,
  posIca,
  status,
}) {
  try {
    const filters = {
      installmentCount,
      posIca,
      status,
    };
    const cleanFilter = removeEmptyFieldsFromParams(filters);
    const cardUserType = yield select(cardUserTypeSelector.getCardUserType);
    const requestBody = { filters: cleanFilter, cardUserType };
    const data = yield call(getCardInstallmentCountsApi, ({ ...requestBody }));
    yield put(Creators.getCardInstallmentCountsSuccess({ data }));

    // store initial data for update installments
    // all installments needs in update section
    if (isEmpty(cleanFilter)) {
      const clone = cloneDeep(data);
      yield put(Creators.setInitialCardInstallmentCounts({ data: clone }));
    }
  }
  catch (error) {
    yield put(Creators.getCardInstallmentCountsFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchGetCardInstallmentCountsRequest() {
  yield takeLatest(Types.GET_CARD_INSTALLMENT_COUNTS_REQUEST, getCardInstallmentCounts);
}

function* updateLocalInstallmentDataRequest({ updatedInstallments }) {
  const cardInstallmentCountsData = yield select(cardInstallmentCountsSelector.getData);
  const updatedData = { ...cardInstallmentCountsData, installments: updatedInstallments };
  yield put(Creators.getCardInstallmentCountsSuccess({ data: updatedData }));
}

function* watchUpdateLocalInstallmentDataRequest() {
  yield takeLatest(Types.UPDATE_LOCAL_INSTALLMENT_DATA_REQUEST, updateLocalInstallmentDataRequest);
}

function* updateCardInstallmentCounts({
  version,
  cardUserType,
  installments,
}) {
  try {
    const data = yield call(updateCardInstallmentCountsApi, ({
      version,
      cardUserType,
      installments,
    }));
    yield put(Creators.updateCardInstallmentCountsSuccess({ data }));
    yield put(Creators.resetFilters({}));
    yield put(ToastCreators.success());
  }
  catch (error) {
    yield put(Creators.updateCardInstallmentCountsFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchUpdateCardInstallmentCountsRequest() {
  yield takeLatest(Types.UPDATE_CARD_INSTALLMENT_COUNTS_REQUEST, updateCardInstallmentCounts);
}

export function* updateCardUserTypeTab({ cardUserType }) {
  yield put(Creators.updateCardUserTypeTabSuccess({ data: cardUserType }));
  yield put(Creators.resetFilters({}));
}

function* watchUpdateCardUserTypeTabRequest() {
  yield takeLatest(Types.UPDATE_CARD_USER_TYPE_TAB_REQUEST, updateCardUserTypeTab);
}

export default function* installmentCommissionsPageRootSaga() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchGetCardInstallmentCountsRequest),
      fork(watchUpdateLocalInstallmentDataRequest),
      fork(watchUpdateCardInstallmentCountsRequest),
      fork(watchUpdateCardUserTypeTabRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
