import {
  all,
  call,
  cancel,
  fork,
  put, select,
  take,
  takeLatest,
} from 'redux-saga/effects';

import {
  getWarehouseProposal as getWarehouseProposalApi,
  updateWarehouseProposal as updateWarehouseProposalApi,
  updateWarehouseProposalStatus as updateWarehouseProposalStatusApi,
  getUploadSignedUrl as getUploadSignedUrlApi,
} from '@shared/api/warehouseProposal';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import history from '@shared/utils/history';
import { Types, Creators } from './actions';
import { warehouseProposalsSelector } from './selectors';
import { t } from '@shared/i18n';
import { uploadToS3 } from '@shared/api/upload';

function* getWarehouseProposal({ id }) {
  if (id) {
    try {
      const warehouseProposal = yield call(getWarehouseProposalApi, { id });
      yield put(Creators.getWarehouseProposalSuccess({ warehouseProposal }));
    }
    catch (error) {
      yield put(Creators.getWarehouseProposalFailure({ error }));
      yield put(ToastCreators.error({ error }));
    }
  }
}

function* updateStatus({ status }) {
  try {
    const { id } = yield select(warehouseProposalsSelector.getProposalCommonData);
    yield call(updateWarehouseProposalStatusApi, { id, status });
    history.go(0);
  }
  catch (error) {
    yield put(Creators.getWarehouseProposalFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* updateWarehouseProposal({ id, warehouseProposal, firstPhotosState }) {
  try {
    const signedPhotos = [];

    if (firstPhotosState && firstPhotosState.length > 0) {
      firstPhotosState.forEach(oldPhoto => {
        const stillExists = warehouseProposal.photos.some(
          newPhoto => newPhoto.url === oldPhoto.url &&
                      newPhoto.name === oldPhoto.name &&
                      newPhoto.type === oldPhoto.type,
        );

        if (stillExists) {
          signedPhotos.push({
            url: oldPhoto.url,
            name: oldPhoto.name,
            type: oldPhoto.type,
          });
        }
      });
    }

    const newPhotos = warehouseProposal.photos.filter(newPhoto => {
      return newPhoto.thumbUrl && !firstPhotosState.some(
        oldPhoto => oldPhoto.url === newPhoto.url &&
                    oldPhoto.name === newPhoto.name &&
                    oldPhoto.type === newPhoto.type,
      );
    });

    const requestBody = {
      ...warehouseProposal,
      photos: newPhotos,
    };

    if (requestBody?.photos && requestBody.photos.length > 0) {
      const signedUrlPromises = requestBody.photos.map(photo => call(
        getUploadSignedUrlApi,
        {
          contentType: photo?.type,
          fileName: `${photo?.originFileObj?.name}_warehouseProposal_${Date.now()}`,
          // Date.now() added because the name needs to be unique
          folderPath: 'images',
          bucketName: 'getir',
          loadedImage: photo?.thumbUrl,
        },
      ));
      const results = yield all(signedUrlPromises);

      const uploadS3Promises = results.map((res, idx) => call(
        uploadToS3,
        { signedUrl: res.url, data: requestBody.photos[idx].thumbUrl },
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

    const updatedWarehouseProposal = {
      ...warehouseProposal,
      photos: signedPhotos,
    };

    yield call(updateWarehouseProposalApi, { id, warehouseProposal: updatedWarehouseProposal });
    yield put(Creators.updateWarehouseProposalSuccess());
    yield put(ToastCreators.success({ message: t('warehouseProposalPage:WAREHOUSE_PROPOSAL_UPDATED_SUCCESS') }));
    window.location.reload();
  }
  catch (error) {
    yield put(Creators.updateWarehouseProposalFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchGetWarehouseProposalRequest() {
  yield takeLatest(Types.GET_WAREHOUSE_PROPOSAL_REQUEST, getWarehouseProposal);
}

function* watchUpdateWarehouseProposalRequest() {
  yield takeLatest(Types.UPDATE_WAREHOUSE_PROPOSAL_REQUEST, updateWarehouseProposal);
}

function* watchUpdateWarehouseProposalStatusRequest() {
  yield takeLatest(Types.UPDATE_WAREHOUSE_PROPOSAL_STATUS_REQUEST, updateStatus);
}

export default function* warehouseProposalDetailSagaRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchGetWarehouseProposalRequest),
      fork(watchUpdateWarehouseProposalRequest),
      fork(watchUpdateWarehouseProposalStatusRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
