import { all, call, cancel, fork, put, take, takeLatest } from 'redux-saga/effects';

import { t } from '@shared/i18n';
import { uploadToS3 } from '@shared/api/upload';
import { Types, Creators } from './actions';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import {
  createWarehouseProposal as createWarehouseProposalApi,
  getUploadSignedUrl as getUploadSignedUrlApi,
} from '@shared/api/warehouseProposal';

import history from '@shared/utils/history';
import { ROUTE } from '@app/routes';

function* createWarehouseProposalReq({ requestBody }) {
  try {
    const signedPhotos = [];

    if (requestBody?.photos) {
      const signedUrlPromises = requestBody.photos.map(photo => call(
        getUploadSignedUrlApi,
        {
          contentType: photo?.type,
          fileName: `${photo?.originFileObj?.name}_warehouseProposal_${Date.now()}`,
          // Date.now() added because the name needs to be unique
          folderPath: 'images',
          bucketName: 'getir',
          loadedImage: photo?.originalBase64,
        },
      ));
      const results = yield all(signedUrlPromises);

      const uploadS3Promises = results.map((res, idx) => call(
        uploadToS3,
        { signedUrl: res.url, data: requestBody.photos[idx].originalBase64 },
      ));

      yield all(uploadS3Promises);

      signedPhotos.push(...results.map((result, idx) => {
        const photo = requestBody.photos[idx];
        const photoData = {
          url: result.cdnUrl,
          name: photo?.originFileObj?.name,
          type: photo?.type,
        };
        return photoData;
      }));
    }

    yield call(createWarehouseProposalApi, { ...requestBody, photos: signedPhotos });
    yield put(Creators.createWarehouseProposalSuccess());
    yield put(ToastCreators.success({ message: t('warehouseProposalPage:WAREHOUSE_PROPOSAL_CREATED_SUCCESS') }));
    yield call(history.push, ROUTE.WAREHOUSE_PROPOSAL_LIST.path);
  }
  catch (error) {
    yield put(ToastCreators.error({ message: t('warehouseProposalPage:WAREHOUSE_PROPOSAL_CREATED_ERROR') }));
  }
}

function* uploadWarehouseProposalImageRequest({
  contentType,
  fileName,
  folderPath,
  bucketName,
  loadedImage,
}) {
  try {
    const { url: signedUrl } = yield call(
      getUploadSignedUrlApi,
      {
        contentType,
        fileName,
        folderPath,
        bucketName,
      },
    );
    yield call(uploadToS3, { signedUrl, data: loadedImage });
  }
  catch (error) {
    yield put(Creators.uploadWarehouseProposalImageFailure({ error }));
  }
}

function* watchCreateWarehouseProposalRequest() {
  yield takeLatest(Types.CREATE_WAREHOUSE_PROPOSAL_REQUEST, createWarehouseProposalReq);
  yield takeLatest(Types.UPLOAD_WAREHOUSE_PROPOSAL_IMAGE_REQUEST, uploadWarehouseProposalImageRequest);
}

export default function* root() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchCreateWarehouseProposalRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
