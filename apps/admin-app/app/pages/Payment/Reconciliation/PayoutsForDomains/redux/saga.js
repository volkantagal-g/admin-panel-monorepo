import { all, call, cancel, fork, put, select, take, takeLatest } from 'redux-saga/effects';

import { getFoodPayoutReportsApi, getLocalPayoutReportsApi, getTipPayoutReportsApi, getWaterPayoutReportsApi } from '@shared/api/payoutsForDomains';

import { Types, Creators } from './actions';
import { domainTabSelector } from './selectors';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';

export function* getPayoutReportsRequest({ filters }) {
  try {
    const domainApis = {
      Food: getFoodPayoutReportsApi,
      Tip: getTipPayoutReportsApi,
      Local: getLocalPayoutReportsApi,
      Water: getWaterPayoutReportsApi,
    };
    const selectedDomain = yield select(domainTabSelector.getDomain);
    const selectedApi = domainApis[selectedDomain || 'Food'];
    const { data } = yield call(selectedApi, { ...filters });
    yield put(Creators.getPayoutReportsSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getPayoutReportsFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* submitFilters({ filters }) {
  yield put(Creators.getPayoutReportsRequest({ filters }));
}

export function* handleDomainTabChange() {
  // reset listed data when tab change
  yield put(Creators.getPayoutReportsSuccess({ data: {} }));
}

function* watchSubmitFilters() {
  yield takeLatest(Types.SUBMIT_FILTERS, submitFilters);
}

function* watchGetPayoutReports() {
  yield takeLatest(Types.GET_PAYOUT_REPORTS_REQUEST, getPayoutReportsRequest);
}

function* watchHandleDomainTab() {
  yield takeLatest(Types.HANDLE_DOMAIN_TAB, handleDomainTabChange);
}

export default function* payoutsForDomainsPageRootSaga() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchSubmitFilters),
      fork(watchGetPayoutReports),
      fork(watchHandleDomainTab),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
