import { all, call, cancel, fork, put, take, takeLatest } from 'redux-saga/effects';

import { t } from '@shared/i18n';
import { uploadToS3 } from '@shared/api/upload';
import { Types, Creators } from './actions';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { createCourierGamificationTask as createCourierGamificationTaskApi, getUploadSignedUrl } from '@shared/api/courierGamification';

import { filterCourier as filterCouriersApi } from '@shared/api/courierHandler';
import history from '@shared/utils/history';
import { ROUTE } from '@app/routes';
import { TASK_IMAGE_TYPES } from '@app/pages/CourierGamification/constant';

function* createCourierGamificationTaskReq({ requestBody }) {
  try {
    const data = yield call(createCourierGamificationTaskApi, requestBody);
    yield put(Creators.createCourierGamificationTaskSuccess({ resp: data }));
    yield call(history.push, ROUTE.COURIER_GAMIFICATION_TASK_LIST.path);
  }
  catch (error) {
    yield put(Creators.createCourierGamificationTaskFailure({ error }));
  }
}

export function* cleanPersonIds() {
  try {
    yield put(Creators.getPersonIdsListSuccess({ data: [] }));
  }
  catch (error) {
    yield put(ToastCreators.error({ message: t('courierGamificationPage:GETTING_COURIER_COUNT_FAIL_MSG') }));
  }
}

export function* getPersonIdsList(data) {
  try {
    const { couriers } = yield call(
      filterCouriersApi,
      { limit: 10000, offset: 0, reqParams: { fields: 'person', warehouseIds: data?.warehouseIds } },
    );
    const personIdsArr = couriers.map(item => item?.person);

    yield put(Creators.getPersonIdsListSuccess({ data: personIdsArr }));
  }
  catch (error) {
    yield put(ToastCreators.error({ message: t('courierGamificationPage:GETTING_COURIER_COUNT_FAIL_MSG') }));
    yield put(Creators.getCourierListFailure({ error }));
  }
}

function* uploadTaskImageRequest({
  contentType,
  fileName,
  folderPath,
  bucketName,
  loadedImage,
  imageType,
}) {
  try {
    const { url: signedUrl, cdnUrl } = yield call(
      getUploadSignedUrl,
      {
        contentType,
        fileName,
        folderPath,
        bucketName,
      },
    );
    yield call(uploadToS3, { signedUrl, data: loadedImage });
    const payload = imageType === TASK_IMAGE_TYPES.MAIN
      ? { uploadedImageCdnUrl: cdnUrl }
      : { uploadedThumbnailImageCdnUrl: cdnUrl };
    yield put(Creators.uploadCourierTaskImageSuccess(payload));
    yield put(ToastCreators.success({ message: t('courierGamificationPage:UPLOAD_SUCCESS') }));
  }
  catch (error) {
    yield put(Creators.uploadCourierTaskImageFailure({ error }));
    yield put(ToastCreators.error({ message: t('courierGamificationPage:UPLOAD_FAIL') }));
  }
}

function* watchCreateCourierGamificationTaskRequest() {
  yield takeLatest(Types.CREATE_COURIER_GAMIFICATION_TASK_REQUEST, createCourierGamificationTaskReq);
  yield takeLatest(Types.GET_PERSON_IDS_LIST_REQUEST, getPersonIdsList);
  yield takeLatest(Types.UPLOAD_COURIER_TASK_IMAGE_REQUEST, uploadTaskImageRequest);
  yield takeLatest(Types.CLEAN_PERSON_IDS, cleanPersonIds);
}

export default function* root() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchCreateCourierGamificationTaskRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
