import { all, call, cancel, fork, put, take, takeLatest } from 'redux-saga/effects';

import {
  uploadLastMileDeliveryCost as uploadLastMileDeliveryCostApi,
  uploadLogisticCost as uploadLogisticCostApi,
  uploadOtherCost as uploadOtherCostApi,
} from '@shared/api/lmdAndOtherExpenses';
import { Types, Creators } from './actions';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { t } from '@shared/i18n';

function* uploadLastMileDeliveryCost({ data }: {data: any}): Generator<any, void, any> {
  try {
    const response = yield call(uploadLastMileDeliveryCostApi, { data });
    yield put(Creators.uploadLastMileDeliveryCostSuccess());
    yield put(ToastCreators.success({
      message:
        t('lmdAndOtherExpensesUploadPage:SUCCESS_MESSAGES.UPLOAD_CSV', { uploadedMonth: response?.uploadedMonth, uploadedYear: response.uploadedYear }),
    }));
  }
  catch (err) {
    yield put(Creators.uploadLastMileDeliveryCostFailed());
    yield put(ToastCreators.error({ err }));
  }
}

function* uploadLogisticCost({ data }: {data: any}): Generator<any, void, any> {
  try {
    const response = yield call(uploadLogisticCostApi, { data });
    yield put(Creators.uploadLogisticCostSuccess());
    yield put(ToastCreators.success({
      message:
        t('lmdAndOtherExpensesUploadPage:SUCCESS_MESSAGES.UPLOAD_CSV', { uploadedMonth: response?.uploadedMonth, uploadedYear: response.uploadedYear }),
    }));
  }
  catch (err) {
    yield put(Creators.uploadLogisticCostFailed());
    yield put(ToastCreators.error({ err }));
  }
}

function* uploadOtherCost({ data }: { data: any}): Generator<any, void, any> {
  try {
    const response = yield call(uploadOtherCostApi, { data });
    yield put(Creators.uploadOtherCostSuccess());
    yield put(ToastCreators.success({
      message:
        t('lmdAndOtherExpensesUploadPage:SUCCESS_MESSAGES.UPLOAD_CSV', { uploadedMonth: response?.uploadedMonth, uploadedYear: response.uploadedYear }),
    }));
  }
  catch (err) {
    yield put(Creators.uploadOtherCostFailed());
    yield put(ToastCreators.error({ err }));
  }
}

function* watchUploadLastMileDeliveryCostRequest() {
  yield takeLatest(Types.UPLOAD_LAST_MILE_DELIVERY_COST_REQUEST as any, uploadLastMileDeliveryCost);
}

function* watchUploadLogisticCostRequest() {
  yield takeLatest(Types.UPLOAD_LOGISTIC_COST_REQUEST as any, uploadLogisticCost);
}

function* watchUploadOtherCostRequest() {
  yield takeLatest(Types.UPLOAD_OTHER_COST_REQUEST as any, uploadOtherCost);
}

export default function* batAlertConditionListPageRootSaga(): any {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchUploadLastMileDeliveryCostRequest),
      fork(watchUploadLogisticCostRequest),
      fork(watchUploadOtherCostRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
