import { all, takeLatest, call, cancel, fork, put, take, takeEvery } from 'redux-saga/effects';

import {
  getS3UploadUrl,
  getRestaurantDetailsByIds,
  getS3ImageUploadUrl,
  getNotification,
  getChainBranchesById,
  notificationUpdate,
  sendTestPushNotification,
  getSampleUserList,
  getTotalUserCount,
  getStatistics,
  deleteNotifEvents,
} from '@shared/api/pushNotification';
import {
  getRestaurantsByName,
  searchChainRestaurants,
  getChainRestaurantBranches,
} from '@shared/api/foodRestaurant';
import { uploadToS3 } from '@shared/api/upload';
import { Types, Creators } from './actions';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { convertSelectOptions } from '@shared/utils/common';
import { getRestaurantOptions } from '@app/pages/PushNotification/utils';
import { FILE_UPLOAD_TYPE } from '@app/pages/PushNotification/constants';
import { t } from '@shared/i18n';

function* getNotificationRequest({ notificationId }) {
  try {
    const { data } = yield call(getNotification, { id: notificationId });
    yield put(Creators.getNotificationSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getNotificationFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

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

function* getRestaurantDetailsByIdsRequest({ restaurants, setSelectedRestaurants, stateStoreType }) {
  try {
    const data = yield call(getRestaurantDetailsByIds, { body: { restaurantIds: restaurants, populateFields: '', projection: '' } });
    if (setSelectedRestaurants) {
      yield put(Creators.setSelectedRestaurants({ selectedRestaurants: getRestaurantOptions(data) }));
    }
    yield put(Creators.getRestaurantDetailsByIdsSuccess({ restaurantDetails: getRestaurantOptions(data), stateStoreType }));
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

function* getChainRestaurantDetailRequest({ chainRestaurantId }) {
  try {
    const data = yield call(getChainBranchesById, { id: chainRestaurantId });
    yield put(Creators.getChainRestaurantDetailSuccess({ chainRestaurant: data }));
  }
  catch (error) {
    // yield put(Creators.getChainRestaurantDetailFailure({ error }));
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

function* updateNotificationRequest({ id, body }) {
  try {
    const { data } = yield call(notificationUpdate, { id, body });
    yield put(Creators.updateNotificationSuccess({ data }));
    yield put(ToastCreators.success());
  }
  catch (error) {
    let errResponse;
    if (error.response?.data.errors) {
      errResponse = { message: error.response?.data.errors?.map(item => item.message).toString() };
    }
    else {
      errResponse = error;
    }
    yield put(Creators.updateNotificationFailure({ errResponse }));
    yield put(ToastCreators.error({ error: errResponse }));
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

function* sendTestPushNotificationRequest({ body }) {
  try {
    const { data } = yield call(sendTestPushNotification, { body });
    yield put(ToastCreators.success());
    yield put(Creators.sendTestPushNotificationSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.sendTestPushNotificationFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* getSampleUserListRequest({ notificationId }) {
  try {
    const data = yield call(getSampleUserList, { notificationId });
    yield put(Creators.getSampleUserListSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getSampleUserListFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* getTotalUserCountRequest({ notificationId }) {
  try {
    const data = yield call(getTotalUserCount, { id: notificationId });
    yield put(Creators.getTotalUserCountSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getTotalUserCountFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* getStatisticsRequest({ notificationId }) {
  try {
    const data = yield call(getStatistics, { notificationId });
    yield put(Creators.getStatisticsSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getStatisticsFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* deleteNotifEventsRequest({ notificationId }) {
  try {
    yield call(deleteNotifEvents, { notificationId });
    yield put(Creators.getNotificationRequest({ notificationId }));
  }
  catch (error) {
    yield put(Creators.deleteNotifEventsFailure({ error }));
  }
}

function* watchGetNotificationRequest() {
  yield takeLatest(Types.GET_NOTIFICATION_REQUEST, getNotificationRequest);
}

function* watchUpdateNotificationRequest() {
  yield takeLatest(Types.UPDATE_NOTIFICATION_REQUEST, updateNotificationRequest);
}

function* cancelPromoRequest() {
  const task = yield fork(watchCancelPromoRequest);
  yield cancel(task);
}

function* watchCancelPromoRequest() {
  yield takeLatest(Types.CANCEL_PROMO_REQUEST, cancelPromoRequest);
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
  yield takeEvery(Types.GET_RESTAURANT_DETAILS_BY_IDS_REQUEST, getRestaurantDetailsByIdsRequest);
}

function* watchUploadFilesToS3Request() {
  yield takeLatest(Types.UPLOAD_FILES_TO_S3_REQUEST, uploadFilesToS3Request);
}

function* watchUploadTemplateNotificationCsvRequest() {
  yield takeLatest(Types.UPLOAD_TEMPLATE_NOTIFICATION_CSV_REQUEST, uploadTemplateNotificationCsvRequest);
}

function* watchGetS3SignedImageUrlRequest() {
  yield takeLatest(Types.GET_S3_SIGNED_IMAGE_URL_REQUEST, getS3SignedImageUrlRequest);
}

function* watchSendTestPushNotificationRequest() {
  yield takeLatest(Types.SEND_TEST_PUSH_NOTIFICATION_REQUEST, sendTestPushNotificationRequest);
}

function* watchGetSampleUserListRequest() {
  yield takeLatest(Types.GET_SAMPLE_USER_LIST_REQUEST, getSampleUserListRequest);
}

function* watchGetTotalUserCountRequest() {
  yield takeLatest(Types.GET_TOTAL_USER_COUNT_REQUEST, getTotalUserCountRequest);
}

function* watchGetStatisticsRequest() {
  yield takeLatest(Types.GET_STATISTICS_REQUEST, getStatisticsRequest);
}

function* watchGetChainRestaurantDetailRequest() {
  yield takeLatest(Types.GET_CHAIN_RESTAURANT_DETAIL_REQUEST, getChainRestaurantDetailRequest);
}

function* watchDeleteNotifEventsRequest() {
  yield takeLatest(Types.DELETE_NOTIF_EVENTS_REQUEST, deleteNotifEventsRequest);
}

export default function* pushNotificationRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchGetNotificationRequest),
      fork(watchUpdateNotificationRequest),
      fork(watchGetChainRestaurantDetailRequest),
      fork(watchGetRestaurantsByNameRequest),
      fork(watchGetRestaurantDetailsByIdsRequest),
      fork(watchGetChainRestaurantsRequest),
      fork(watchUploadFilesToS3Request),
      fork(watchUploadTemplateNotificationCsvRequest),
      fork(watchGetChainRestaurantBranchesRequest),
      fork(watchGetS3SignedImageUrlRequest),
      fork(watchSendTestPushNotificationRequest),
      fork(watchGetSampleUserListRequest),
      fork(watchGetTotalUserCountRequest),
      fork(watchGetStatisticsRequest),
      fork(watchDeleteNotifEventsRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
