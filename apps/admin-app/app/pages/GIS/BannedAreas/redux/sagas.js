import { all, call, cancel, fork, put, select, take, takeLatest } from 'redux-saga/effects';
import { get, isEmpty } from 'lodash';

import { Types, Creators } from './actions';
import { bannedAreaPageSelector } from './selectors';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { deactivatePolygon, createBannedPolygon, createMultiBannedPolygon } from '@shared/api/polygon';
import { createCourierBan, createForbiddenRoutes, deleteCourierBan, getGPolygons } from '@shared/api/gis/gpolygon';

import { createScheduledBannedArea, getAllScheduledBans, deleteScheduledBannedArea } from '@shared/api/gis/scheduledBan';
import { getPolygonRequestBody, informResponseStatus } from '@app/pages/GIS/BannedAreas/utils/helper';
import { BANNED_COURIERS_POLYGON_TYPE, FORBIDDEN_COURIER_ROUTES_POLYGON_TYPE } from '@shared/shared/constants';

function* getBannedAreasRequest() {
  try {
    const filters = yield select(bannedAreaPageSelector.getFilters);
    const requestBody = getPolygonRequestBody({ filters });

    const { polygons: data } = yield call(getGPolygons, { requestBody });
    yield put(Creators.getBannedAreasSuccess({ data }));
  }
  catch (error) {
    const errorMessage = get(error, 'response.data.details.0.message');
    yield put(ToastCreators.error({ message: errorMessage }));
  }
}

function* watchBannedAreasRequest() {
  yield takeLatest(Types.GET_BANNED_AREAS_REQUEST, getBannedAreasRequest);
}

function* createBannedAreaRequest({ reqBody }) {
  try {
    if (reqBody.polygonType === BANNED_COURIERS_POLYGON_TYPE) {
      yield call(createCourierBan, { requestBody: reqBody });
    }
    if (reqBody.polygonType === FORBIDDEN_COURIER_ROUTES_POLYGON_TYPE) {
      yield call(createForbiddenRoutes, { requestBody: reqBody });
    }
    else {
      yield call(createBannedPolygon, { requestBody: reqBody });
    }
    yield put(Creators.createBannedAreaSuccess());
    yield put(Creators.setTempGeoJson({ tempGeoJson: null }));
    yield put(Creators.getBannedAreasRequest());
    yield put(ToastCreators.success());
  }
  catch (error) {
    const errorMessage = get(error, 'response.data.details.0.message');
    yield put(ToastCreators.error({ message: errorMessage }));
  }
}

function* watchCreateBannedAreaRequest() {
  yield takeLatest(Types.CREATE_BANNED_AREA_REQUEST, createBannedAreaRequest);
}

function* createMultiBannedAreaRequest({ features }) {
  const reqBody = { data: features };
  try {
    const data = yield call(createMultiBannedPolygon, { features: reqBody });
    yield put(Creators.createMultiBannedAreaSuccess({ data }));
    yield put(Creators.setTempGeoJson({ tempGeoJson: null }));
    yield put(Creators.getBannedAreasRequest());
    yield put(ToastCreators.success());
    const errorArray = informResponseStatus(data);
    if (!isEmpty(errorArray)) {
      yield put(ToastCreators.error({ message: `${errorArray}. items can not be created` }));
    }
  }
  catch (error) {
    const errorMessage = get(error, 'response.data.details.0.message');
    yield put(ToastCreators.error({ message: errorMessage }));
  }
}

function* watchCreateMultiBannedAreaRequest() {
  yield takeLatest(Types.CREATE_MULTI_BANNED_AREA_REQUEST, createMultiBannedAreaRequest);
}

function* deactivateBannedAreaRequest({ id, polygonType }) {
  try {
    if (
      polygonType === BANNED_COURIERS_POLYGON_TYPE
      ||
      polygonType === FORBIDDEN_COURIER_ROUTES_POLYGON_TYPE) {
      yield call(deleteCourierBan, { requestBody: { id } });
    }
    else {
      yield call(deactivatePolygon, { id });
    }
    yield put(Creators.deactivateBannedAreaSuccess());
    yield put(Creators.getBannedAreasRequest());
    yield put(Creators.getScheduledBannedAreasRequest());
    yield put(ToastCreators.success());
  }
  catch (error) {
    const errorMessage = get(error, 'response.data.details.0.message');
    yield put(ToastCreators.error({ message: errorMessage }));
  }
}

function* watchDeactivateBannedAreaRequest() {
  yield takeLatest(Types.DEACTIVATE_BANNED_AREA_REQUEST, deactivateBannedAreaRequest);
}

function* getScheduledBannedAreasRequest() {
  try {
    const requestBody = { isGeoJson: true };

    const data = yield call(getAllScheduledBans, { requestBody });
    yield put(Creators.getScheduledBannedAreasSuccess({ data }));
  }
  catch (error) {
    const errorMessage = get(error, 'response.data.details.0.message');
    yield put(ToastCreators.error({ message: errorMessage }));
  }
}

function* watchGetScheduledBannedAreasRequest() {
  yield takeLatest(Types.GET_SCHEDULED_BANNED_AREAS_REQUEST, getScheduledBannedAreasRequest);
}

function* createScheduledBannedAreaRequest({ reqBody }) {
  try {
    yield call(createScheduledBannedArea, { requestBody: reqBody });
    yield put(Creators.createScheduledBannedAreaSuccess());
    yield put(Creators.setTempGeoJson({ tempGeoJson: null }));
    yield put(Creators.setGeometry({ geometry: null }));
    yield put(Creators.getScheduledBannedAreasRequest());
    yield put(ToastCreators.success());
  }
  catch (error) {
    const errorMessage = get(error, 'response.data.details.0.message');
    yield put(ToastCreators.error({ message: errorMessage }));
  }
}

function* watchCreateScheduledBannedAreaRequest() {
  yield takeLatest(Types.CREATE_SCHEDULED_BANNED_AREA_REQUEST, createScheduledBannedAreaRequest);
}

function* deactivateScheduledBannedAreaRequest({ scheduledBannedAreaId }) {
  try {
    yield call(deleteScheduledBannedArea, { scheduledBannedAreaId });
    yield put(Creators.deactivateScheduledBannedAreaSuccess());
    yield put(Creators.getScheduledBannedAreasRequest());
    yield put(Creators.getBannedAreasRequest());
    yield put(ToastCreators.success());
  }
  catch (error) {
    const errorMessage = get(error, 'response.data.details.0.message');
    yield put(ToastCreators.error({ message: errorMessage }));
  }
}

function* watchDeactivateScheduledBannedAreaRequest() {
  yield takeLatest(Types.DEACTIVATE_SCHEDULED_BANNED_AREA_REQUEST, deactivateScheduledBannedAreaRequest);
}

function* getG10PolygonsRequest() {
  try {
    const formValues = yield select(bannedAreaPageSelector.getFormValues);
    const selectedCity = formValues.cityId;

    const requestBody = {
      domainTypes: [1],
      polygonTypes: [1],
      subregionIntervalTypes: [1100],
      city: selectedCity,
    };

    const { polygons: data } = yield call(getGPolygons, { requestBody });
    yield put(Creators.getG10PolygonsSuccess({ data }));
  }
  catch (error) {
    const errorMessage = get(error, 'response.data.details.0.message');
    yield put(ToastCreators.error({ message: errorMessage }));
  }
}

function* watchGetG10PolygonsRequest() {
  yield takeLatest(Types.GET_G10_POLYGONS_REQUEST, getG10PolygonsRequest);
}

function* getGbPolygonsRequest() {
  try {
    const formValues = yield select(bannedAreaPageSelector.getFormValues);
    const selectedCity = formValues.cityId;
    const requestBody = {
      domainTypes: [3],
      polygonTypes: [1],
      subregionIntervalTypes: [1100],
      city: selectedCity,
    };
    const { polygons: data } = yield call(getGPolygons, { requestBody });
    yield put(Creators.getGbPolygonsSuccess({ data }));
  }
  catch (error) {
    const errorMessage = get(error, 'response.data.details.0.message');
    yield put(ToastCreators.error({ message: errorMessage }));
  }
}

function* watchGetGbPolygonsRequest() {
  yield takeLatest(Types.GET_GB_POLYGONS_REQUEST, getGbPolygonsRequest);
}

function* getGsPolygonsRequest() {
  try {
    const formValues = yield select(bannedAreaPageSelector.getFormValues);
    const selectedCity = formValues.cityId;
    const requestBody = {
      domainTypes: [4],
      polygonTypes: [1],
      subregionIntervalTypes: [1100],
      city: selectedCity,
    };
    const { polygons: data } = yield call(getGPolygons, { requestBody });
    yield put(Creators.getGsPolygonsSuccess({ data }));
  }
  catch (error) {
    const errorMessage = get(error, 'response.data.details.0.message');
    yield put(ToastCreators.error({ message: errorMessage }));
  }
}

function* watchGetGsPolygonsRequest() {
  yield takeLatest(Types.GET_GS_POLYGONS_REQUEST, getGsPolygonsRequest);
}

export default function* gisBannedAreasRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchBannedAreasRequest),
      fork(watchDeactivateBannedAreaRequest),
      fork(watchCreateBannedAreaRequest),
      fork(watchCreateMultiBannedAreaRequest),
      fork(watchGetScheduledBannedAreasRequest),
      fork(watchDeactivateScheduledBannedAreaRequest),
      fork(watchCreateScheduledBannedAreaRequest),
      fork(watchGetG10PolygonsRequest),
      fork(watchGetGbPolygonsRequest),
      fork(watchGetGsPolygonsRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
