import { all, cancel, call, fork, put, take, takeLatest } from 'redux-saga/effects';

import {
  getAnnouncementDetail, getBrands, updateAnnouncement, getAnnouncements, uploadCampaignImage, getVendors,
  getProductsByVendorIds,
} from '@shared/api/water';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';

import { Types, Creators } from './actions';

function* getAnnouncementDetailRequest({ announcementId }) {
  try {
    const data = yield call(getAnnouncementDetail, { announcementId });
    yield put(Creators.getAnnouncementDetailSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getAnnouncementDetailFailure({ error }));
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

function* updateAnnouncementRequest({ data, announcementId }) {
  try {
    const announcements = yield call(updateAnnouncement, { ...data, id: announcementId });
    yield put(ToastCreators.success());
    yield put(Creators.updateAnnouncementSuccess({ announcements }));
  }
  catch (error) {
    yield put(Creators.updateAnnouncementFailure({ error }));
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

function* watchBrandsRequest() {
  yield takeLatest(Types.GET_BRANDS_REQUEST, getBrandsRequest);
}

function* watchVendorsRequest() {
  yield takeLatest(Types.GET_VENDORS_REQUEST, getVendorsRequest);
}

function* watchGetAnnouncementDetailRequest() {
  yield takeLatest(Types.GET_ANNOUNCEMENT_DETAIL_REQUEST, getAnnouncementDetailRequest);
}

function* watchUpdateAnnouncementRequest() {
  yield takeLatest(Types.UPDATE_ANNOUNCEMENT_REQUEST, updateAnnouncementRequest);
}

function* watchGetAnnouncementsRequest() {
  yield takeLatest(Types.GET_ANNOUNCEMENTS_REQUEST, getAnnouncementsRequest);
}

export function* watchCampaignImageUrlRequest() {
  yield takeLatest(Types.CAMPAIGN_IMAGE_URL_REQUEST, campaignImageUrlRequest);
}

function* watchVendorsProductsRequest() {
  yield takeLatest(Types.VENDORS_PRODUCTS_REQUEST, vendorsProductsRequest);
}

export default function* announcementsRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchGetAnnouncementDetailRequest),
      fork(watchVendorsRequest),
      fork(watchBrandsRequest),
      fork(watchUpdateAnnouncementRequest),
      fork(watchGetAnnouncementsRequest),
      fork(watchCampaignImageUrlRequest),
      fork(watchVendorsProductsRequest),

    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
