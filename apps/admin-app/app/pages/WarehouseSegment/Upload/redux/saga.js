import { all, takeLatest, call, cancel, fork, put, take } from 'redux-saga/effects';

import history from '@shared/utils/history';
import { uploadToS3 } from '@shared/api/upload';
import {
  getUploadSignedUrlDeliveryFee,
  getUploadSignedUrlProductPricing,
  triggerProductPricingSegmentMatching,
  triggerDeliveryFeeSegmentMatching,
} from '@shared/api/warehouse';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { Types, Creators } from './actions';
import { DELIVERY_FEE, PRODUCT_PRICING } from '../../constants';

function* uploadWarehouseSegmentMatchingRequest({ data, fileName, contentType, segmentType }) {
  try {
    if (segmentType === PRODUCT_PRICING) {
      const { url, fileKey } = yield call(getUploadSignedUrlProductPricing, {
        fileName,
        contentType,
      });
      yield call(uploadToS3, { signedUrl: url, data });
      yield call(triggerProductPricingSegmentMatching, { fileName: fileKey });
    }
    if (segmentType === DELIVERY_FEE) {
      const { url, fileKey } = yield call(getUploadSignedUrlDeliveryFee, {
        fileName,
        contentType,
      });
      yield call(uploadToS3, { signedUrl: url, data });
      yield call(triggerDeliveryFeeSegmentMatching, { fileName: fileKey });
    }
    yield put(Creators.uploadWarehouseSegmentMatchingSuccess());
    yield put(ToastCreators.success());

    history.push('/warehouseSegment/list');
  }
  catch (error) {
    yield put(Creators.uploadWarehouseSegmentMatchingFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchUploadWarehouseSegmentMatchingRequest() {
  yield takeLatest(Types.UPLOAD_WAREHOUSE_SEGMENT_MATCHING_REQUEST, uploadWarehouseSegmentMatchingRequest);
}

export default function* uploadWarehouseSegmenMatchingtRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([fork(watchUploadWarehouseSegmentMatchingRequest)]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
