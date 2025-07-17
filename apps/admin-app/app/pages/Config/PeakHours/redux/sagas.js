import { all, call, cancel, fork, put, select, take, takeLatest } from 'redux-saga/effects';
import _ from 'lodash';

import { Types, Creators } from './actions';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import {
  CITY_BASE_PEAK_HOURS,
  GETIR_MARKET_DOMAIN_TYPES,
  REGION_BASE_PEAK_HOURS,
} from '@shared/shared/constants';
import { filtersSelector } from './selectors';
import { operationalCountriesSelector as countriesSelector } from '@shared/redux/selectors/common';
import { createBasePeakHoursRequestBody } from '@shared/utils/warehouse';
import { createPeakHours, getPeakHours, updatePeakHours, updatePeakHoursMessage } from '@shared/api/peakHours';

function* getPeakHoursRequest({ peakHoursType, cityId, regionId }) {
  try {
    const requestBody = { types: [peakHoursType] };
    switch (peakHoursType) {
      case CITY_BASE_PEAK_HOURS:
        requestBody.cityIds = [cityId];
        break;
      case REGION_BASE_PEAK_HOURS:
        requestBody.regionIds = [regionId];
        break;
      default:
        break;
    }
    const { peakHours: data } = yield call(getPeakHours, requestBody);
    yield put(Creators.getPeakHoursSuccess({ data }));
    yield put(ToastCreators.success());
  }
  catch (error) {
    const errorMessage = _.get(error, 'response.data.details.0.message');
    yield put(ToastCreators.error({ message: errorMessage }));
  }
}

function* watchGetPeakHoursRequest() {
  yield takeLatest(Types.GET_PEAK_HOURS_REQUEST, getPeakHoursRequest);
}

function* watchUpdatePeakHoursRequest() {
  yield takeLatest(Types.UPDATE_PEAK_HOURS_REQUEST, updatePeakHoursRequest);
}

function* createPeakHoursRequest(params) {
  try {
    const { peakHours, ...rest } = params;
    const getirMarketDomainTypes = new Set(GETIR_MARKET_DOMAIN_TYPES);
    const mappedPeakHours = new Set(peakHours.map(peakHour => {
      return peakHour.domainType;
    }));

    const countries = yield select(countriesSelector.getData);
    // @TODO should be update
    const selectedTimezone = _.get(countries, '0.timezones.0.timezone', '');
    yield all(GETIR_MARKET_DOMAIN_TYPES.map(domainType => {
      if (!mappedPeakHours.has(domainType) && getirMarketDomainTypes.has(domainType)) {
        const payload = createBasePeakHoursRequestBody({
          ...rest,
          domainType,
          timezone: selectedTimezone,
        });
        // eslint-disable-next-line consistent-return
        return call(createPeakHours, { requestBody: payload });
      }
      return false;
    }));
    yield call(getPeakHoursRequest, params);
    yield put(Creators.createPeakHoursSuccess());
  }
  catch (error) {
    const errorMessage = _.get(error, 'response.data.message');
    yield put(ToastCreators.error({ message: errorMessage }));
    yield put(Creators.createPeakHoursFailure(error));
  }
}

function* watchCreatePeakHoursRequest() {
  yield takeLatest(Types.CREATE_PEAK_HOURS_REQUEST, createPeakHoursRequest);
}

function* updatePeakHoursMessageRequest({ id, updateData }) {
  try {
    yield call(updatePeakHoursMessage, { id, updateData });
    yield put(ToastCreators.success());
    const { peakHoursType, cityId, regionId } = yield select(filtersSelector.getData);
    yield put(Creators.getPeakHoursRequest({ peakHoursType, cityId, regionId }));
    yield put(Creators.updatePeakHoursMessageSuccess());
  }
  catch (error) {
    const errorMessage = _.get(error, 'response.data.details.0.message');
    yield put(ToastCreators.error({ message: errorMessage }));
    yield put(Creators.updatePeakHoursMessageFailure(error));
  }
}

function* watchUpdatePeakHoursMessageRequest() {
  yield takeLatest(Types.UPDATE_PEAK_HOURS_MESSAGE_REQUEST, updatePeakHoursMessageRequest);
}

function* updatePeakHoursRequest({ id, updateData }) {
  try {
    yield call(updatePeakHours, { id, updateData });
    yield put(ToastCreators.success());
    const { peakHoursType, cityId, regionId } = yield select(filtersSelector.getData);
    yield put(Creators.getPeakHoursRequest({ peakHoursType, cityId, regionId }));
    yield put(Creators.updatePeakHoursSuccess());
  }
  catch (error) {
    const errorMessage = _.get(error, 'response.data.details.0.message');
    yield put(ToastCreators.error({ message: errorMessage }));
  }
}

export default function* peakHoursRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchGetPeakHoursRequest),
      fork(watchUpdatePeakHoursRequest),
      fork(watchUpdatePeakHoursMessageRequest),
      fork(watchCreatePeakHoursRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
