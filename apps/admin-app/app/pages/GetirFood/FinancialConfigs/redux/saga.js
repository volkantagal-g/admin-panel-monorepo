import { all, call, cancel, fork, put, select, take, takeEvery, takeLatest } from 'redux-saga/effects';

import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { Types, Creators } from './actions';
import {
  getFinancialConfigsDomain,
  getFinancialConfigsDomainsByVertical,
  getFinancialConfigsVerticals,
  updateFinancialConfigValues,
} from '@shared/api/foodFinancialConfigs';
import { financialConfigsSelector } from './selectors';
import { convertConfigValues } from '../utils';
import { t } from '@shared/i18n';

function* getFinancialConfigsVerticalsRequest() {
  try {
    const { data } = yield call(getFinancialConfigsVerticals);

    yield put(Creators.getFinancialConfigsVerticalsSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getFinancialConfigsVerticalsFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchGetFinancialConfigsVerticalsRequest() {
  yield takeLatest(Types.GET_FINANCIAL_CONFIGS_VERTICALS_REQUEST, getFinancialConfigsVerticalsRequest);
}

function* getFinancialConfigsDomainsByVerticalRequest({ vertical }) {
  try {
    const { data } = yield call(getFinancialConfigsDomainsByVertical, { vertical });
    yield put(Creators.getFinancialConfigsDomainsByVerticalSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getFinancialConfigsDomainsByVerticalFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchGetFinancialConfigsDomainsByVertical() {
  yield takeLatest(Types.GET_FINANCIAL_CONFIGS_DOMAINS_BY_VERTICAL_REQUEST, getFinancialConfigsDomainsByVerticalRequest);
}

function* getFinancialConfigsDomainRequest({ vertical, domain }) {
  try {
    const { data } = yield call(getFinancialConfigsDomain, { vertical, domain });
    const domainState = yield select(financialConfigsSelector.getDomain);
    if (data?.length) {
      const convertedData = convertConfigValues(data);

      yield put(Creators.getFinancialConfigsDomainSuccess({
        data: {
          ...domainState,
          [domain]: [...convertedData],
        },
      }));
    }
  }
  catch (error) {
    yield put(Creators.getFinancialConfigsDomainFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchGetFinancialConfigsDomain() {
  yield takeEvery(Types.GET_FINANCIAL_CONFIGS_DOMAIN_REQUEST, getFinancialConfigsDomainRequest);
}

function* updateFinancialConfigValuesRequest({ updateConfigRequests }) {
  try {
    const data = yield call(updateFinancialConfigValues, { updateConfigRequests });
    yield put(Creators.updateFinancialConfigValuesSuccess({ data }));
    yield put(ToastCreators.success({ message: t('foodFinancialConfigsPage:UPDATE_CONFIG_SUCCESS') }));

    const { vertical, domain } = updateConfigRequests[0];
    yield put(Creators.getFinancialConfigsDomainRequest({ vertical, domain }));
  }
  catch (error) {
    yield put(Creators.updateFinancialConfigValuesFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchUpdateFinancialConfigValues() {
  yield takeEvery(Types.UPDATE_FINANCIAL_CONFIG_VALUES_REQUEST, updateFinancialConfigValuesRequest);
}

export default function* brandsRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchGetFinancialConfigsVerticalsRequest),
      fork(watchGetFinancialConfigsDomainsByVertical),
      fork(watchGetFinancialConfigsDomain),
      fork(watchUpdateFinancialConfigValues),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
