import {
  all,
  call,
  cancel,
  fork,
  put,
  select,
  take,
  takeLatest,
} from 'redux-saga/effects';

import {
  getCities as getCitiesApi,
  getDistricts as getDistrictsApi,
  getWarehouseProposals as getWarehouseProposalsApi,
  getWarehouseProposalsReport as getWarehouseProposalsReportApi,
} from '@shared/api/warehouseProposal';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { getLangKey } from '@shared/i18n';
import { Types, Creators } from './actions';
import { filtersSelector } from './selectors';
import { getWarehouseProposalsRequestBody } from '../utils';

function* getWarehouseProposals() {
  try {
    const filters = yield select(filtersSelector.getFilters);
    const requestBody = getWarehouseProposalsRequestBody({ filters });
    const { warehouseProposals, totalCount } = yield call(getWarehouseProposalsApi, { requestBody });
    yield put(Creators.getWarehouseProposalsSuccess({ warehouseProposals, totalCount }));
  }
  catch (error) {
    yield put(Creators.getWarehouseProposalsFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* getWarehouseProposalsReport() {
  try {
    const filters = yield select(filtersSelector.getFilters);
    const requestBody = getWarehouseProposalsRequestBody({ filters });
    requestBody.lang = getLangKey();
    const { url } = yield call(getWarehouseProposalsReportApi, { requestBody });
    window.open(url);
    yield put(Creators.getWarehouseProposalsReportSuccess());
  }
  catch (error) {
    yield put(Creators.getWarehouseProposalsReportFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* getCities() {
  try {
    const { cities } = yield call(getCitiesApi);
    yield put(Creators.getCitiesSuccess({ data: cities }));
  }
  catch (error) {
    yield put(Creators.getCitiesFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* getDistricts({ city }) {
  try {
    if (city) {
      const { districts } = yield call(getDistrictsApi, { city });
      yield put(Creators.getDistrictsSuccess({ data: districts }));
    }
  }
  catch (error) {
    yield put(Creators.getDistrictsFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchGetWarehouseProposalsRequest() {
  yield takeLatest(Types.GET_WAREHOUSE_PROPOSALS_REQUEST, getWarehouseProposals);
}

function* watchGetWarehouseProposalsReportRequest() {
  yield takeLatest(Types.GET_WAREHOUSE_PROPOSALS_REPORT_REQUEST, getWarehouseProposalsReport);
}

function* watchGetCitiesRequest() {
  yield takeLatest(Types.GET_CITIES_REQUEST, getCities);
}

function* watchGetDistrictsRequest() {
  yield takeLatest(Types.GET_DISTRICTS_REQUEST, getDistricts);
}

export default function* warehouseProposalFilterSagaRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchGetWarehouseProposalsRequest),
      fork(watchGetWarehouseProposalsReportRequest),
      fork(watchGetCitiesRequest),
      fork(watchGetDistrictsRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
