import { all, call, cancel, fork, put, take, takeLatest } from 'redux-saga/effects';

import {
  createCampaign,
  createSegment,
  getBrands,
  getClientCountBySegment,
  getProducts,
  getVendors,
  uploadCampaignImage,
} from '@shared/api/water';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { ROUTE } from '@app/routes';
import history from '@shared/utils/history';
import { Creators, Types } from './actions';

function* createCampaignRequest({ data }) {
  try {
    const campaigns = yield call(createCampaign, { ...data });
    yield put(ToastCreators.success());
    yield put(Creators.createCampaignSuccess({ campaigns }));
    const { path } = ROUTE.GETIR_WATER_CAMPAIGNS_LIST;
    history.push(path);
  }
  catch (error) {
    yield put(Creators.createCampaignFailure({ error }));
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

function* watchCreateCampaignRequest() {
  yield takeLatest(Types.CREATE_CAMPAIGN_REQUEST, createCampaignRequest);
}

function* watchVendorsRequest() {
  yield takeLatest(Types.GET_VENDORS_REQUEST, getVendorsRequest);
}

function* watchBrandsRequest() {
  yield takeLatest(Types.GET_BRANDS_REQUEST, getBrandsRequest);
}

function* watchGetProductsRequest() {
  yield takeLatest(Types.GET_PRODUCTS_REQUEST, getProductsRequest);
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
      fork(watchCreateCampaignRequest),
      fork(watchVendorsRequest),
      fork(watchBrandsRequest),
      fork(watchGetProductsRequest),
      fork(watchCampaignImageUrlRequest),
      fork(watchCreateSegmentRequest),
      fork(watchGetClientCountBySegmentRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
