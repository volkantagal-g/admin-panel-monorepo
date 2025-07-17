import { all, call, cancel, fork, put, select, take, takeLatest } from 'redux-saga/effects';
import _ from 'lodash';

import { Types, Creators } from './actions';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { createWorkingHours, getWorkingHours, updateWorkingHours, updateWorkingHoursMessage } from '@shared/api/workingHours';
import {
  CITY_BASE_WORKING_HOURS,
  COUNTRY_BASE_WORKING_HOURS,
  GETIR_WORKING_HOURS_DOMAIN_TYPES,
  REGION_BASE_WORKING_HOURS,
} from '@shared/shared/constants';
import { createBaseWorkingHoursRequestBody } from '@shared/utils/warehouse';
import { operationalCountriesSelector as countriesSelector } from '@shared/redux/selectors/common';
import { filtersSelector } from './selectors';

function* getWorkingHoursRequest({ workingHoursType, countryId, cityId, regionId }) {
  try {
    const requestBody = { types: [workingHoursType] };
    switch (workingHoursType) {
      case COUNTRY_BASE_WORKING_HOURS:
        requestBody.countryIds = [countryId];
        break;
      case CITY_BASE_WORKING_HOURS:
        requestBody.cityIds = [cityId];
        break;
      case REGION_BASE_WORKING_HOURS:
        requestBody.regionIds = [regionId];
        break;
      default:
        break;
    }
    const { workingHours: data } = yield call(getWorkingHours, requestBody);
    yield put(Creators.getWorkingHoursSuccess({ data }));
    yield put(ToastCreators.success());
  }
  catch (error) {
    const errorMessage = _.get(error, 'response.data.details.0.message');
    yield put(ToastCreators.error({ message: errorMessage }));
  }
}

function* watchGetWorkingHoursRequest() {
  yield takeLatest(Types.GET_WORKING_HOURS_REQUEST, getWorkingHoursRequest);
}

function* updateWorkingHoursRequest({ id, updateData }) {
  try {
    yield call(updateWorkingHours, { id, updateData });
    yield put(ToastCreators.success());
    const { workingHoursType, countryId, cityId, regionId } = yield select(filtersSelector.getData);
    yield put(Creators.getWorkingHoursRequest({ workingHoursType, countryId, cityId, regionId }));
    yield put(Creators.updateWorkingHoursSuccess());
  }
  catch (error) {
    const errorMessage = _.get(error, 'response.data.details.0.message');
    yield put(ToastCreators.error({ message: errorMessage }));
  }
}

function* watchUpdateWorkingHoursRequest() {
  yield takeLatest(Types.UPDATE_WORKING_HOURS_REQUEST, updateWorkingHoursRequest);
}

function* updateWorkingHoursMessageRequest({ id, updateData }) {
  try {
    yield call(updateWorkingHoursMessage, { id, updateData });
    yield put(ToastCreators.success());
    const { workingHoursType, countryId, cityId, regionId } = yield select(filtersSelector.getData);
    yield put(Creators.getWorkingHoursRequest({ workingHoursType, countryId, cityId, regionId }));
    yield put(Creators.updateWorkingHoursMessageSuccess());
  }
  catch (error) {
    const errorMessage = _.get(error, 'response.data.details.0.message');
    yield put(ToastCreators.error({ message: errorMessage }));
    yield put(Creators.updateWorkingHoursMessageFailure(error));
  }
}

function* watchUpdateWorkingHoursMessageRequest() {
  yield takeLatest(Types.UPDATE_WORKING_HOURS_MESSAGE_REQUEST, updateWorkingHoursMessageRequest);
}

function* createWorkingHoursRequest(params) {
  try {
    const { workingHours, ...rest } = params;
    const getirMarketDomainTypes = new Set(GETIR_WORKING_HOURS_DOMAIN_TYPES);
    const mappedWorkingHours = new Set(workingHours.map(workingHour => {
      return workingHour.domainType;
    }));

    const countries = yield select(countriesSelector.getData);
    // @TODO should be update
    const selectedTimezone = _.get(countries, '0.timezones.0.timezone', '');
    yield all(GETIR_WORKING_HOURS_DOMAIN_TYPES.map(domainType => {
      if (!mappedWorkingHours.has(domainType) && getirMarketDomainTypes.has(domainType)) {
        const createRequestBody = createBaseWorkingHoursRequestBody({
          ...rest,
          domainType,
          timezone: selectedTimezone,
        });
        // eslint-disable-next-line consistent-return
        return call(createWorkingHours, { requestBody: createRequestBody });
      }
      return false;
    }));
    yield call(getWorkingHoursRequest, params);
    yield put(Creators.createWorkingHoursSuccess());
  }
  catch (error) {
    const errorMessage = _.get(error, 'response.data.message');
    yield put(ToastCreators.error({ message: errorMessage }));
    yield put(Creators.createWorkingHoursFailure(error));
  }
}

function* watchCreateWorkingHoursRequest() {
  yield takeLatest(Types.CREATE_WORKING_HOURS_REQUEST, createWorkingHoursRequest);
}

export default function* workingHoursRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchGetWorkingHoursRequest),
      fork(watchUpdateWorkingHoursRequest),
      fork(watchUpdateWorkingHoursMessageRequest),
      fork(watchCreateWorkingHoursRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
