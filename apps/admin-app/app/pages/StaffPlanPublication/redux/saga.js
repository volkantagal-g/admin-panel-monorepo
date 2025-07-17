import {
  all,
  call,
  cancel,
  fork,
  put,
  select,
  take,
  takeLatest,
} from 'redux-saga/effects';

import {
  publishCourierPlan,
  publishStoreAssistantPlan,
  getPickerPlanFileSignedUploadUrl,
  exportCourierSlotCapacityExcel,
} from '@shared/api/courierPlanPublication';
import { uploadToS3 } from '@shared/api/upload';
import { Types, Creators } from './actions';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { courierPlanTypeSelector } from './selectors';
import { COURIER_PLAN_TYPE_KEYS } from '../constants';
import { t } from '@shared/i18n';

async function readFileContent(file) {
  const params = {};
  const reader = new FileReader();
  reader.readAsDataURL(file);
  return new Promise((resolve, reject) => {
    reader.onload = e => {
      const fileData = e?.target?.result;
      params.file = fileData;
      params.key = file.name;
      resolve(params);
    };
    reader.onerror = reject;
  });
}

function* publishCourierPlanRequest({ courierPlans }) {
  try {
    const currentCourierPlanType = yield select(
      courierPlanTypeSelector.getData,
    );

    switch (currentCourierPlanType) {
      case COURIER_PLAN_TYPE_KEYS.STANDARD:
        yield call(publishCourierPlan.standard, { courierPlans });
        break;
      case COURIER_PLAN_TYPE_KEYS.SCHEDULED:
        yield call(publishCourierPlan.scheduled, { courierPlans });
        break;
      case COURIER_PLAN_TYPE_KEYS.SLOT_CAPACITY:
        yield call(publishCourierPlan.slotCapacity, { data: courierPlans });
        break;
      default:
        break;
    }
    yield put(Creators.publishCourierPlanSuccess());
    yield put(ToastCreators.success());
  }
  catch (error) {
    yield put(Creators.publishCourierPlanFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* publishStoreAssistantPlanRequest({ file, timezone }) {
  try {
    const { file: fileData, key: fileKey } = yield call(readFileContent, file);
    const { url, fileName } = yield call(getPickerPlanFileSignedUploadUrl, { key: fileKey });
    yield call(uploadToS3, { signedUrl: url, data: fileData });
    yield call(publishStoreAssistantPlan, { timezone, excelKey: fileName });
    yield put(Creators.publishStoreAssistantPlanSuccess());
    yield put(ToastCreators.success());
  }
  catch (error) {
    yield put(Creators.publishStoreAssistantPlanFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* exportCourierSlotCapacityExcelRequest({ startDate, endDate }) {
  try {
    const { url } = yield call(exportCourierSlotCapacityExcel, {
      startDate,
      endDate,
    });
    if (!url) {
      throw new Error(t('courierPlanPublication:NO_SLOT_CAPACITY_PLAN_FOUND'));
    }
    yield put(Creators.exportCourierSlotCapacityExcelSuccess());
    window.open(url);
  }
  catch (error) {
    yield put(Creators.exportCourierSlotCapacityExcelFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchPublishCourierPlanRequest() {
  yield takeLatest(
    Types.PUBLISH_COURIER_PLAN_REQUEST,
    publishCourierPlanRequest,
  );
}

function* watchPublishStoreAssistantPlanRequest() {
  yield takeLatest(
    Types.PUBLISH_STORE_ASSISTANT_PLAN_REQUEST,
    publishStoreAssistantPlanRequest,
  );
}

function* watchExportCourierSlotCapacityExcelRequest() {
  yield takeLatest(
    Types.EXPORT_COURIER_SLOT_CAPACITY_EXCEL_REQUEST,
    exportCourierSlotCapacityExcelRequest,
  );
}

export default function* root() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchPublishCourierPlanRequest),
      fork(watchPublishStoreAssistantPlanRequest),
      fork(watchExportCourierSlotCapacityExcelRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
