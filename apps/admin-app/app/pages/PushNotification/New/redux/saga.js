import { all, takeLatest, call, cancel, fork, put, take } from 'redux-saga/effects';
import _ from 'lodash';

import history from '@shared/utils/history';
import {
  getPromoData,
  notificationSave,
  getS3UploadUrl,
  getRestaurantDetailsByIds,
  getFoodPromosBySearchCode,
  getS3ImageUploadUrl,
} from '@shared/api/pushNotification';
import {
  getRestaurantsByName,
  searchChainRestaurants,
  getChainRestaurantBranches,
} from '@shared/api/foodRestaurant';
import { uploadToS3 } from '@shared/api/upload';
import { Types, Creators } from './actions';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { getSelectedCountry } from '@shared/redux/selectors/countrySelection';
import { convertSelectOptions, getRelativeRouteWithSlug } from '@shared/utils/common';
import { getRestaurantOptions } from '@app/pages/PushNotification/utils';
import { FILE_UPLOAD_TYPE } from '@app/pages/PushNotification/constants';
import { t } from '@shared/i18n';
import { ROUTE } from '@app/routes';

function* getRestaurantsByNameRequest({ searchString }) {
  try {
    const data = yield call(getRestaurantsByName, { name: searchString });
    yield put(Creators.getRestaurantsByNameSuccess({ data: convertSelectOptions(data, { valueKey: 'id', labelKey: 'name' }) }));
  }
  catch (error) {
    yield put(Creators.getRestaurantsByNameFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* getRestaurantDetailsByIdsRequest({ restaurants, setSelectedRestaurants }) {
  try {
    const data = yield call(getRestaurantDetailsByIds, { body: { restaurantIds: restaurants, populateFields: '', projection: '' } });
    if (setSelectedRestaurants) {
      yield put(Creators.setSelectedRestaurants({ selectedRestaurants: getRestaurantOptions(data) }));
    }
    yield put(Creators.getRestaurantDetailsByIdsSuccess({ data: getRestaurantOptions(data) }));
  }
  catch (error) {
    yield put(Creators.getRestaurantDetailsByIdsFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* getChainRestaurantsRequest({ searchString }) {
  try {
    const data = yield call(searchChainRestaurants, { searchString });
    yield put(Creators.getChainRestaurantsSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getChainRestaurantsFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* getChainRestaurantBranchesRequest({ chainRestaurantId }) {
  try {
    const data = yield call(getChainRestaurantBranches, chainRestaurantId);

    yield put(Creators.getChainRestaurantBranchesSuccess({ data: convertSelectOptions(data, { valueKey: 'id', labelKey: 'name' }) }));
  }
  catch (error) {
    yield put(Creators.getChainRestaurantBranchesFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* uploadFilesToS3Request({ file, fileStateKey }) {
  try {
    if (fileStateKey === FILE_UPLOAD_TYPE.DRAFT || FILE_UPLOAD_TYPE.EXCLUDED_DRAFT) {
      const urlData = yield call(getS3UploadUrl, { csvName: file.name });
      yield call(uploadToS3, { signedUrl: urlData, data: file.base64 });
    }
    yield put(ToastCreators.success({ message: t('marketing:UPLOAD_SUCCESS') }));
    yield put(Creators.uploadFilesToS3Success({ file: { name: file.name }, fileStateKey }));
  }
  catch (error) {
    yield put(Creators.uploadFilesToS3Failure({ error, fileStateKey }));
    yield put(ToastCreators.error({ error }));
  }
}

function* uploadTemplateNotificationCsvRequest({ csvContent, csvName }) {
  try {
    const urlData = yield call(getS3UploadUrl, { csvName });
    yield call(uploadToS3, { signedUrl: urlData, data: csvContent });
    yield put(ToastCreators.success());
    yield put(Creators.uploadTemplateNotificationCsvSuccess());
  }
  catch (error) {
    yield put(Creators.uploadTemplateNotificationCsvFailure());
    yield put(ToastCreators.error({ error }));
  }
}

function* notificationSaveRequest({ body }) {
  try {
    const { data } = yield call(notificationSave, body);
    yield put(Creators.notificationSaveSuccess({ data }));
    yield put(ToastCreators.success());
    history.push(getRelativeRouteWithSlug(ROUTE.PUSH_NOTIFICATION_DETAIL.path, { id: data.id }));
  }
  catch (error) {
    let errResponse;
    if (error.response?.data.errors) {
      errResponse = { message: error.response?.data.errors?.map(item => item.message).toString() };
    }
    else {
      errResponse = error;
    }
    yield put(Creators.notificationSaveFailure({ errResponse }));
    yield put(ToastCreators.error({ error: errResponse }));
  }
}

function* getPromoRequest() {
  try {
    const promos = yield call(getPromoData);
    const selectedCountry = getSelectedCountry();
    const selectedCountryCode = _.get(selectedCountry, ['code', 'alpha2']);
    const data = promos.filter(promo => promo.countryCode === selectedCountryCode && 'promoCode' in promo);
    yield put(Creators.getPromoSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getPromoFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* getFoodPromosBySearchCodeRequest({ params }) {
  try {
    const data = yield call(getFoodPromosBySearchCode, { params });
    yield put(Creators.getFoodPromosBySearchCodeSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getFoodPromosBySearchCodeFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* getS3SignedImageUrlRequest({ loadedImage, fileName, afterUpload }) {
  try {
    const { data } = yield call(getS3ImageUploadUrl, { fileName });
    const { cdnUrl, signedUrl } = data;
    yield call(uploadToS3, { signedUrl, data: loadedImage });
    yield call(afterUpload, { cdnUrl });
    yield put(Creators.getS3SignedImageUrlSuccess({ cdnUrl }));
  }
  catch (error) {
    yield put(Creators.getS3SignedImageUrlFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchGetRestaurantsByNameRequest() {
  yield takeLatest(Types.GET_RESTAURANTS_BY_NAME_REQUEST, getRestaurantsByNameRequest);
}

function* watchGetChainRestaurantBranchesRequest() {
  yield takeLatest(Types.GET_CHAIN_RESTAURANT_BRANCHES_REQUEST, getChainRestaurantBranchesRequest);
}

function* watchGetChainRestaurantsRequest() {
  yield takeLatest(Types.GET_CHAIN_RESTAURANTS_REQUEST, getChainRestaurantsRequest);
}

function* watchGetRestaurantDetailsByIdsRequest() {
  yield takeLatest(Types.GET_RESTAURANT_DETAILS_BY_IDS_REQUEST, getRestaurantDetailsByIdsRequest);
}

function* watchUploadFilesToS3Request() {
  yield takeLatest(Types.UPLOAD_FILES_TO_S3_REQUEST, uploadFilesToS3Request);
}

function* watchUploadTemplateNotificationCsvRequest() {
  yield takeLatest(Types.UPLOAD_TEMPLATE_NOTIFICATION_CSV_REQUEST, uploadTemplateNotificationCsvRequest);
}

function* watchNotificationSaveRequest() {
  yield takeLatest(Types.NOTIFICATION_SAVE_REQUEST, notificationSaveRequest);
}

function* watchGetPromoRequest() {
  yield takeLatest(Types.GET_PROMO_REQUEST, getPromoRequest);
}

function* watchGetFoodPromosBySearchCodeRequest() {
  yield takeLatest(Types.GET_FOOD_PROMOS_BY_SEARCH_CODE_REQUEST, getFoodPromosBySearchCodeRequest);
}

function* watchGetS3SignedImageUrlRequest() {
  yield takeLatest(Types.GET_S3_SIGNED_IMAGE_URL_REQUEST, getS3SignedImageUrlRequest);
}

export default function* pushNotificationRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchGetRestaurantsByNameRequest),
      fork(watchGetRestaurantDetailsByIdsRequest),
      fork(watchGetChainRestaurantsRequest),
      fork(watchUploadFilesToS3Request),
      fork(watchGetPromoRequest),
      fork(watchNotificationSaveRequest),
      fork(watchUploadTemplateNotificationCsvRequest),
      fork(watchGetFoodPromosBySearchCodeRequest),
      fork(watchGetChainRestaurantBranchesRequest),
      fork(watchGetS3SignedImageUrlRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
