import { all, call, cancel, fork, put, take, takeLatest } from 'redux-saga/effects';
import _ from 'lodash';

import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import {
  updateCampaign,
  getBrands,
  getProducts,
  getCampaignDetail,
  getPromoUsageDetail,
  updateCampaignStatus,
  uploadCampaignImage,
  createSegment,
  getClientCountBySegment,
  getVendors,
} from '@shared/api/water';

import { Types, Creators } from './actions';

function* updateCampaignRequest({ data, campaignId }) {
  try {
    const campaigns = yield call(updateCampaign, { data, campaignId });
    yield put(ToastCreators.success());
    yield put(Creators.updateCampaignSuccess({ campaigns }));
  }
  catch (error) {
    yield put(Creators.updateCampaignFailure({ error }));
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

function* getCampaignDetailRequest({ campaignId }) {
  try {
    const result = yield call(getCampaignDetail, { campaignId });
    yield put(Creators.getCampaignDetailSuccess({ data: result.data }));
  }
  catch (error) {
    yield put(Creators.getCampaignDetailFailure({ error }));
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

function* getProductsRequest() {
  try {
    const data = yield call(getProducts);
    yield put(Creators.getProductsSuccess({ data: data.payload }));
  }
  catch (error) {
    yield put(Creators.getProductsFailure({ error }));
  }
}

function* getPromoUsageDetailRequest({ campaignId }) {
  try {
    const result = yield call(getPromoUsageDetail, { campaignId });
    yield put(Creators.getPromoUsageDetailSuccess({ data: result.data }));
  }
  catch (error) {
    yield put(Creators.getPromoUsageDetailFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* updateCampaignStatusRequest({ data, campaignId }) {
  try {
    const campaigns = yield call(updateCampaignStatus, { data, campaignId });
    const currentCampaignId = _.get(campaigns, 'payload.campaignId');
    if (currentCampaignId) {
      yield put(ToastCreators.success());
      yield put(Creators.updateCampaignStatusSuccess({ campaigns }));

      return;
    }
    yield put(ToastCreators.error({ message: _.get(campaigns, 'payload.message', '') }));
    yield put(Creators.updateCampaignStatusSuccess({ campaigns }));
  }
  catch (error) {
    yield put(Creators.updateCampaignStatusFailure({ error }));
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

export function* createSegmentRequest({ data }) {
  const { file, type, onSuccess } = data;
  try {
    const result = yield call(createSegment, { data: { file, type } });
    yield put(Creators.createSegmentSuccess({ data: { segmentId: result.data } }));
    onSuccess({ payload: result.payload });
  }
  catch (error) {
    yield put(Creators.createSegmentFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* getClientCountBySegmentRequest({ data }) {
  try {
    const result = yield call(getClientCountBySegment, { data });
    const { includeSegmentCount, excludeSegmentCount } = result;
    yield put(Creators.getClientCountBySegmentSuccess({ data: { includeSegmentCount, excludeSegmentCount } }));
  }
  catch (error) {
    yield put(Creators.getClientCountBySegmentFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchUpdateCampaignRequest() {
  yield takeLatest(Types.UPDATE_CAMPAIGN_REQUEST, updateCampaignRequest);
}

function* watchVendorsRequest() {
  yield takeLatest(Types.GET_VENDORS_REQUEST, getVendorsRequest);
}

function* watchGetCampaignDetailRequest() {
  yield takeLatest(Types.GET_CAMPAIGN_DETAIL_REQUEST, getCampaignDetailRequest);
}

function* watchBrandsRequest() {
  yield takeLatest(Types.GET_BRANDS_REQUEST, getBrandsRequest);
}

function* watchGetProductsRequest() {
  yield takeLatest(Types.GET_PRODUCTS_REQUEST, getProductsRequest);
}

function* watchGetPromoUsageDetailRequest() {
  yield takeLatest(Types.GET_PROMO_USAGE_DETAIL_REQUEST, getPromoUsageDetailRequest);
}

function* watchUpdateCampaignStatusRequest() {
  yield takeLatest(Types.UPDATE_CAMPAIGN_STATUS_REQUEST, updateCampaignStatusRequest);
}

export function* watchCampaignImageUrlRequest() {
  yield takeLatest(Types.CAMPAIGN_IMAGE_URL_REQUEST, campaignImageUrlRequest);
}

function* watchCreateSegmentRequest() {
  yield takeLatest(Types.CREATE_SEGMENT_REQUEST, createSegmentRequest);
}

function* watchGetClientCountBySegmentRequest() {
  yield takeLatest(Types.GET_CLIENT_COUNT_BY_SEGMENT_REQUEST, getClientCountBySegmentRequest);
}

export default function* campaignsRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchUpdateCampaignRequest),
      fork(watchGetCampaignDetailRequest),
      fork(watchVendorsRequest),
      fork(watchBrandsRequest),
      fork(watchGetProductsRequest),
      fork(watchGetPromoUsageDetailRequest),
      fork(watchUpdateCampaignStatusRequest),
      fork(watchCampaignImageUrlRequest),
      fork(watchCreateSegmentRequest),
      fork(watchGetClientCountBySegmentRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
