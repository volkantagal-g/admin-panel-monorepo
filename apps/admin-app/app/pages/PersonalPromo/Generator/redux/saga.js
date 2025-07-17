import axios from 'axios';
import {
  all,
  call,
  cancel,
  fork,
  put,
  take,
  takeLatest,
} from 'redux-saga/effects';
import moment from 'moment';

import { getDepartmentsPure as getDepartmentsApi } from '@shared/api/employee';
import { createPersonalPromosBulk as createPersonalPromosBulkApi } from '@shared/api/promo';
import { DEFAULT_DATE_FORMAT } from '@shared/shared/constants';
import { exportExcel } from '@shared/utils/common';
import { Creators, Types } from './actions';

function* createPersonalPromosBulk({ body }) {
  try {
    const { promoCode } = yield call(createPersonalPromosBulkApi, body);
    const dataToExport = promoCode?.map(code => ({ code }));
    const date = moment();
    exportExcel(
      dataToExport,
      `personal_promo_codes_${date.format(DEFAULT_DATE_FORMAT)}`,
      [
        {
          title: 'CODE',
          key: 'code',
        },
      ],
    );
    yield put(Creators.createPersonalPromosBulkSuccess({ data: promoCode }));
  }
  catch (error) {
    yield put(Creators.createPersonalPromosBulkFailure({ error }));
  }
}

function* watchCreatePersonalPromosBulkRequest() {
  yield takeLatest(Types.CREATE_PERSONAL_PROMOS_BULK_REQUEST, createPersonalPromosBulk);
}

function* getDepartments() {
  const { CancelToken } = axios;
  const cancelSource = CancelToken.source();
  const requestBody = {
    cancelSource,
    fields: ['_id', 'name'],
    isActive: true,
  };

  try {
    const { departments } = yield call(getDepartmentsApi, requestBody);
    yield put(Creators.getDepartmentsSuccess({ data: departments }));
  }
  catch (error) {
    yield put(Creators.getDepartmentsFailure({ error }));
  }
}

function* watchGetDepartmentsRequest() {
  yield takeLatest(Types.GET_DEPARTMENTS_REQUEST, getDepartments);
}

export default function* personalPromoGeneratorPageRootSaga() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchCreatePersonalPromosBulkRequest),
      fork(watchGetDepartmentsRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
