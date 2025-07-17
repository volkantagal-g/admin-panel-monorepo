import { all, call, cancel, fork, put, take, takeLatest } from 'redux-saga/effects';

import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { createAnnouncement, getBrands, getVendors, getAnnouncements, uploadCampaignImage, getProductsByVendorIds } from '@shared/api/water';
import { ROUTE } from '@app/routes';
import history from '@shared/utils/history';

import { Types, Creators } from './actions';

function* createAnnouncementRequest({ data }) {
  try {
    const announcements = yield call(createAnnouncement, { ...data });
    yield put(ToastCreators.success());
    yield put(Creators.createAnnouncementSuccess({ announcements }));
    const { path } = ROUTE.GETIR_WATER_ANNOUNCEMENTS_LIST;
    history.push(path);
  }
  catch (error) {
    yield put(Creators.createAnnouncementFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* getVendorsRequest({ data }) {
  try {
    const result = yield call(getVendors, data);
    const { payload } = result;
    yield put(Creators.getVendorsSuccess({ data: payload }));
  }
  catch (error) {
    yield put(Creators.getVendorsFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* vendorsProductsRequest({ data }) {
  try {
    const result = yield call(getProductsByVendorIds, data);

    const { payload } = result;
    yield put(Creators.vendorsProductsSuccess({ data: payload }));
  }
  catch (error) {
    yield put(Creators.vendorsProductsFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* getBrandsRequest() {
  try {
    const data = yield call(getBrands);
    const { payload } = data;
    yield put(Creators.getBrandsSuccess({ data: payload }));
  }
  catch (error) {
    yield put(Creators.getBrandsFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* getAnnouncementsRequest() {
  try {
    const data = yield call(getAnnouncements);
    yield put(Creators.getAnnouncementsSuccess({ data: data.payload }));
  }
  catch (error) {
    yield put(Creators.getAnnouncementsFailure({ error }));
  }
}

export function* campaignImageUrlRequest({ loadedImage, onSuccess }) {
  try {
    const result = yield call(uploadCampaignImage, { loadedImage });
    yield put(Creators.campaignImageUrlSuccess({ data: result.payload }));
    onSuccess({ payload: result.payload });
  }
  catch (error) {
    yield put(Creators.campaignImageUrlFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchVendorsProductsRequest() {
  yield takeLatest(Types.VENDORS_PRODUCTS_REQUEST, vendorsProductsRequest);
}

function* watchCreateAnnouncementRequest() {
  yield takeLatest(Types.CREATE_ANNOUNCEMENT_REQUEST, createAnnouncementRequest);
}
function* watchVendorsRequest() {
  yield takeLatest(Types.GET_VENDORS_REQUEST, getVendorsRequest);
}

function* watchBrandsRequest() {
  yield takeLatest(Types.GET_BRANDS_REQUEST, getBrandsRequest);
}

function* watchGetAnnouncementsRequest() {
  yield takeLatest(Types.GET_ANNOUNCEMENTS_REQUEST, getAnnouncementsRequest);
}

export function* watchCampaignImageUrlRequest() {
  yield takeLatest(Types.CAMPAIGN_IMAGE_URL_REQUEST, campaignImageUrlRequest);
}

export default function* announcementsRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchCreateAnnouncementRequest),
      fork(watchBrandsRequest),
      fork(watchVendorsRequest),
      fork(watchGetAnnouncementsRequest),
      fork(watchCampaignImageUrlRequest),
      fork(watchVendorsProductsRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
