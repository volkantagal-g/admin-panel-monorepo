import { all, call, cancel, fork, put, take, takeLatest } from 'redux-saga/effects';
import _ from 'lodash';

import { uploadBulkServiceFees } from '@shared/api/warehouse';
import { Types } from './actions';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { getLangKey } from '@shared/i18n';

function* serviceFeeBulkUploadRequest({ requestBody: serviceFees }) {
  try {
    yield call(uploadBulkServiceFees, serviceFees);
    yield put(ToastCreators.success());
  }
  catch (error) {
    const errorMessage = _.get(error, 'response.data');
    yield put(ToastCreators.error({ message: errorMessage[getLangKey()] }));
  }
}

function* watchserviceFeeBulkUploadRequest() {
  yield takeLatest(Types.SERVICE_FEE_BULK_UPLOAD_REQUEST, serviceFeeBulkUploadRequest);
}

export default function* serviceFeeBulkUploadRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([fork(watchserviceFeeBulkUploadRequest)]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
