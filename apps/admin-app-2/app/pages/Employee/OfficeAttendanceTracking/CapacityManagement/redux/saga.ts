import moment from 'moment';
import {
  all,
  call,
  cancel,
  fork,
  put,
  select,
  take,
  takeLatest,
  SelectEffect,
  ForkEffect,
  PutEffect,
  CallEffect,
  TakeEffect,
  CancelEffect,
  AllEffect,
} from 'redux-saga/effects';

import {
  getCapacityTemplateData as getCapacityTemplateDataApi,
  getPublicHolidays as getPublicHolidaysApi,
  uploadCapacity as uploadCapacityApi,
} from '@shared/api/employee';
import { exportExcel } from '@shared/utils/common';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { t } from '@shared/i18n';

import { Types, Creators } from './actions';
import { capacityTemplateFiltersSelector } from './selectors';

import { getFormattedCapacityTemplateData } from '../utils';

function* getPublicHolidays(): Generator<PutEffect | CallEffect | SelectEffect | void> {
  try {
    const apiResponse = (yield call(getPublicHolidaysApi)) as {
      publicHolidays: {name: string, date: Date, repeatsExactlySameDayInEveryYear: boolean}[]
    };
    yield put(Creators.getPublicHolidaysSuccess({ data: apiResponse.publicHolidays }));
  }
  catch (error) {
    yield put(Creators.getPublicHolidaysFailure());
    yield put(ToastCreators.error({ error }));
  }
}

function* watchGetPublicHolidays(): Generator<ForkEffect> {
  yield takeLatest(Types.GET_PUBLIC_HOLIDAYS_REQUEST as any, getPublicHolidays);
}

function* getCapacityTemplateData({ reqData }: { reqData: object }) : Generator<PutEffect | CallEffect | SelectEffect | void> {
  try {
    const employees = yield call(getCapacityTemplateDataApi as any, { reqData });
    yield put(Creators.getCapacityTemplateDataSuccess({ data: { employees } }));

    const filters = yield select(capacityTemplateFiltersSelector.getFilters);
    const { formattedData, columns } = getFormattedCapacityTemplateData({ employees, filters });

    exportExcel(formattedData, `capacityTemplate_${moment().format('YYYY.MM.DD')}.csv`, columns);
  }
  catch (error) {
    yield put(Creators.getCapacityTemplateDataFailure());
  }
}

function* watchGetCapacityTemplateData() : Generator<ForkEffect> {
  yield takeLatest(Types.GET_CAPACITY_TEMPLATE_DATA_REQUEST as any, getCapacityTemplateData);
}

function* uploadCapacityData({ reqData } : any) : Generator<PutEffect | CallEffect> {
  try {
    yield put(ToastCreators.pending());
    const { invalidEmails } = yield call(uploadCapacityApi as any, { reqData });

    yield put(ToastCreators.success({
      message: t('officeAttendanceTracking:CAPACITY_SUCCESSFULLY_UPLOADED'),
      toastOptions: { autoClose: 3000 },
    }));
    yield put(Creators.uploadCapacityDataSuccess({ invalidEmails }));
  }
  catch (error) {
    yield put(Creators.uploadCapacityDataFailure());
    yield put(ToastCreators.error({ error }));
  }
}

function* watchUploadCapacityData() : Generator<ForkEffect> {
  yield takeLatest(Types.UPLOAD_CAPACITY_DATA_REQUEST as any, uploadCapacityData);
}

export default function* employeeOfficeAttendanceTrackingCapacityManagementPageRootSaga()
  : Generator<TakeEffect | ForkEffect | AllEffect<ForkEffect> | CancelEffect, void, any> {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchGetCapacityTemplateData),
      fork(watchUploadCapacityData),
      fork(watchGetPublicHolidays),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
