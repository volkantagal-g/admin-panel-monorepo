import { all, call, cancel, fork, put, take, takeLatest, select } from 'redux-saga/effects';

import { v4 as uuidv4 } from 'uuid';

import { Types, Creators } from '@app/pages/PushNotification/List/redux/actions';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import {
  getResults,
  getGlobalRuleset,
  createGlobalRuleset,
  pauseNotification,
  resumeNotification,
  cancelNotification,
  duplicateNotification,
  pauseAllByCountry,
  resumeAllByCountry,
  deleteNotification,
  downloadSuccessListNotification,
} from '@shared/api/pushNotification';
import history from '@shared/utils/history';
import {
  createIcon,
  deleteIcon,
  getDefaultIconUrl,
  getIcons, setDefaultIconUrl,
  updateIcon,
  uploadIconImageToS3,
} from '@shared/api/notificationCenter';
import { notificationIconSelector } from '@app/pages/PushNotification/List/redux/selectors';
import { uploadToS3 } from '@shared/api/upload';
import { t } from '@shared/i18n';

function* getResultsRequest({ data }) {
  try {
    const results = yield call(getResults, data);
    yield put(Creators.getResultsSuccess({ data: results }));
  }
  catch (error) {
    yield put(Creators.getResultsFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* getGlobalRulesetRequest() {
  try {
    const results = yield call(getGlobalRuleset);
    yield put(Creators.getGlobalRulesetSuccess({ data: results?.data }));
  }
  catch (error) {
    yield put(Creators.getGlobalRulesetFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* createGlobalRulesetRequest({ data }) {
  try {
    const results = yield call(createGlobalRuleset, data);
    yield put(Creators.createGlobalRulesetSuccess({ data: results }));
    yield put(ToastCreators.success());
  }
  catch (error) {
    yield put(Creators.createGlobalRulesetFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* pauseNotificationRequest({ data, filters }) {
  try {
    yield call(pauseNotification, data);
    yield put(ToastCreators.success());
    yield call(getResultsRequest, { data: filters });
  }
  catch (error) {
    yield put(ToastCreators.error({ error }));
  }
}

function* resumeNotificationRequest({ data, filters }) {
  try {
    yield call(resumeNotification, data);
    yield put(ToastCreators.success());
    yield call(getResultsRequest, { data: filters });
  }
  catch (error) {
    yield put(ToastCreators.error({ error }));
  }
}

function* cancelNotificationRequest({ data, filters }) {
  try {
    yield call(cancelNotification, data);
    yield put(ToastCreators.success());
    yield call(getResultsRequest, { data: filters });
  }
  catch (error) {
    yield put(ToastCreators.error({ error }));
  }
}

function* duplicateNotificationRequest({ data }) {
  try {
    const result = yield call(duplicateNotification, data);
    yield put(ToastCreators.success());
    history.push(`/pushNotification/detail/${result.data}`);
  }
  catch (error) {
    yield put(ToastCreators.error({ error }));
  }
}

function* pauseAllNotificationsRequest() {
  try {
    yield call(pauseAllByCountry);
    yield put(ToastCreators.success());
    yield call(getGlobalRulesetRequest);
  }
  catch (error) {
    yield put(ToastCreators.error({ error }));
  }
}

function* resumeAllNotificationsRequest() {
  try {
    yield call(resumeAllByCountry);
    yield put(ToastCreators.success());
    yield call(getGlobalRulesetRequest);
  }
  catch (error) {
    yield put(ToastCreators.error({ error }));
  }
}

function* deleteNotificationRequest({ data, filters }) {
  try {
    yield call(deleteNotification, data);
    yield put(ToastCreators.success());
    yield call(getResultsRequest, { data: filters });
  }
  catch (error) {
    yield put(ToastCreators.error({ error }));
  }
}

function* downloadSuccessNotificationListRequest({ data }) {
  try {
    yield put(Creators.closeDownloadListModal());
    yield call(downloadSuccessListNotification, data);
    yield put(ToastCreators.success());
  }
  catch (error) {
    yield put(Creators.downloadSuccessNotificationListFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

// Icon Magagement Crud Sagas
function* getIconsRequest() {
  try {
    const results = yield call(getIcons);
    yield put(Creators.getIconsSuccess(results));
  }
  catch (error) {
    yield put(ToastCreators.error({ error }));
  }
}

export function* createIconRequest({ formValues, onSuccess }) {
  try {
    const currentIconList = yield select(notificationIconSelector.getIconList);
    if (currentIconList.find(icon => icon.notificationCategory === formValues.notificationCategory)) {
      throw new Error(t('marketing:RECORD_ALREADY_EXISTS'));
    }

    const { data } = yield call(createIcon, { formValues });

    if (onSuccess) {
      onSuccess({ icon: data });
    }
    yield put(ToastCreators.success({ toastOptions: { position: 'bottom-center' } }));
    yield put(Creators.createIconSuccess({ icon: data }));
  }
  catch (error) {
    yield put(ToastCreators.error({ message: error?.message, toastOptions: { position: 'bottom-center' } }));
    yield put(Creators.createIconFailure({ error }));
  }
}

export function* updateIconRequest({ formValues, iconId }) {
  try {
    const { data } = yield call(updateIcon, { formValues, iconId });
    yield put(ToastCreators.success({ toastOptions: { position: 'bottom-center' } }));
    yield put(Creators.updateIconSuccess({ icon: data }));
  }
  catch (error) {
    yield put(Creators.updateIconFailure({ error }));
    yield put(ToastCreators.error({ message: error?.message, toastOptions: { position: 'bottom-center' } }));
  }
}

export function* deleteIconRequest({ iconId }) {
  try {
    yield call(deleteIcon, { iconId });
    yield put(ToastCreators.success({ toastOptions: { position: 'bottom-center' } }));
    yield put(Creators.deleteIconSuccess({ iconId }));
  }
  catch (error) {
    yield put(Creators.deleteIconFailure({ error }));
    yield put(ToastCreators.error({ message: error?.message, toastOptions: { position: 'bottom-center' } }));
  }
}

function* uploadIconImageToS3Request({ file, cb, isDefault }) {
  try {
    const imageName = `${uuidv4()}.${file.type.split('/')[1]}`;
    const { data } = yield call(uploadIconImageToS3, { imageName });
    yield call(uploadToS3, { signedUrl: data.signedUrl, data: file.base64 });
    if (isDefault) {
      const iconPayload = yield call(setDefaultIconUrl, { url: data.cdnUrl });
      yield put(Creators.setDefaultIconUrl({ url: iconPayload?.data.url }));
    }
    if (cb) {
      cb({ cdnUrl: data.cdnUrl });
    }
    yield put(ToastCreators.success({ toastOptions: { position: 'bottom-center' } }));
    yield put(Creators.uploadIconImageToS3Success());
  }
  catch (error) {
    yield put(Creators.uploadIconImageToS3Fail({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* getDefaultIconUrlRequest() {
  try {
    const { data } = yield call(getDefaultIconUrl);
    yield put(Creators.getDefaultIconUrlSuccess({ url: data.url }));
  }
  catch (error) {
    yield put(Creators.getDefaultIconUrlFail({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchResultsRequest() {
  yield takeLatest(Types.GET_RESULTS_REQUEST, getResultsRequest);
}

function* watchGetGlobalRulesetRequest() {
  yield takeLatest(Types.GET_GLOBAL_RULESET_REQUEST, getGlobalRulesetRequest);
}

function* watchCreateGlobalRulesetRequest() {
  yield takeLatest(Types.CREATE_GLOBAL_RULESET_REQUEST, createGlobalRulesetRequest);
}

function* watchPauseNotificationRequest() {
  yield takeLatest(Types.PAUSE_NOTIFICATION_REQUEST, pauseNotificationRequest);
}

function* watchCancelNotificationRequest() {
  yield takeLatest(Types.CANCEL_NOTIFICATION_REQUEST, cancelNotificationRequest);
}

function* watchResumeNotificationRequest() {
  yield takeLatest(Types.RESUME_NOTIFICATION_REQUEST, resumeNotificationRequest);
}

function* watchDuplicateNotificationRequest() {
  yield takeLatest(Types.DUPLICATE_NOTIFICATION_REQUEST, duplicateNotificationRequest);
}

function* watchPauseAllNotificationsRequest() {
  yield takeLatest(Types.PAUSE_ALL_NOTIFICATIONS_REQUEST, pauseAllNotificationsRequest);
}

function* watchResumeAllNotificationsRequest() {
  yield takeLatest(Types.RESUME_ALL_NOTIFICATIONS_REQUEST, resumeAllNotificationsRequest);
}

function* watchDeleteNotificationsRequest() {
  yield takeLatest(Types.DELETE_NOTIFICATION_REQUEST, deleteNotificationRequest);
}

function* watchDownloadSuccessNotificationListRequest() {
  yield takeLatest(Types.DOWNLOAD_SUCCESS_NOTIFICATION_LIST_REQUEST, downloadSuccessNotificationListRequest);
}

// Icon Management Crud Watchers
function* watchGetIconsRequest() {
  yield takeLatest(Types.GET_ICONS_REQUEST, getIconsRequest);
}

function* watchCreateIconRequest() {
  yield takeLatest(Types.CREATE_ICON_REQUEST, createIconRequest);
}

function* watchUpdateIconRequest() {
  yield takeLatest(Types.UPDATE_ICON_REQUEST, updateIconRequest);
}

function* watchDeleteIconRequest() {
  yield takeLatest(Types.DELETE_ICON_REQUEST, deleteIconRequest);
}

function* watchUploadIconImageToS3Request() {
  yield takeLatest(Types.UPLOAD_ICON_IMAGE_TO_S3_REQUEST, uploadIconImageToS3Request);
}

function* watchGetDefaultIconUrlRequest() {
  yield takeLatest(Types.GET_DEFAULT_ICON_URL_REQUEST, getDefaultIconUrlRequest);
}

export default function* pushNotificationListSagaRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchResultsRequest),
      fork(watchGetGlobalRulesetRequest),
      fork(watchCreateGlobalRulesetRequest),
      fork(watchPauseNotificationRequest),
      fork(watchResumeNotificationRequest),
      fork(watchCancelNotificationRequest),
      fork(watchDuplicateNotificationRequest),
      fork(watchPauseAllNotificationsRequest),
      fork(watchResumeAllNotificationsRequest),
      fork(watchDeleteNotificationsRequest),
      fork(watchDownloadSuccessNotificationListRequest),

      // Icon Management Watchers
      fork(watchGetIconsRequest),
      fork(watchCreateIconRequest),
      fork(watchUpdateIconRequest),
      fork(watchDeleteIconRequest),
      fork(watchUploadIconImageToS3Request),
      fork(watchGetDefaultIconUrlRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
