import { all, call, cancel, fork, put, take, takeLatest } from 'redux-saga/effects';
import _ from 'lodash';

import { uploadBulkDeliveryFees } from '@shared/api/warehouse';
import { Types } from './actions';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { getLangKey } from '@shared/i18n';

function* deliveryFeeBulkUploadRequest({ requestBody: deliveryFees }) {
  try {
    yield call(uploadBulkDeliveryFees, deliveryFees);
    yield put(ToastCreators.success());
  }
  catch (error) {
    const errorMessage = _.get(error, 'response.data');
    yield put(ToastCreators.error({ message: errorMessage[getLangKey()] }));
  }
}

function* watchdeliveryFeeBulkUploadRequest() {
  yield takeLatest(Types.DELIVERY_FEE_BULK_UPLOAD_REQUEST, deliveryFeeBulkUploadRequest);
}

export default function* deliveryFeeBulkUploadRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([fork(watchdeliveryFeeBulkUploadRequest)]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
