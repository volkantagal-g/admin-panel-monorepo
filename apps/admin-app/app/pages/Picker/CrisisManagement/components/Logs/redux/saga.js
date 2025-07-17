import moment from 'moment';
import {
  all,
  call,
  cancel,
  fork,
  put,
  take,
  takeLatest,
} from 'redux-saga/effects';

import {
  exportPickerCrisesLogs as exportPickerCrisesLogsApi,
  getPickerCrisesLogs as getPickerCrisesLogsApi,
} from '@shared/api/pickerCrisis';
import { getLangKey } from '@shared/i18n';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { getLimitAndOffset } from '@shared/utils/common';
import { formatLogFilters } from '../../../helpers';
import { Creators, Types } from './actions';

function* getPickerCrisesLogs({ filters, pagination }) {
  try {
    const body = formatLogFilters(filters, getLimitAndOffset(pagination));
    const data = yield call(getPickerCrisesLogsApi, body);
    yield put(
      Creators.getPickerCrisesLogsSuccess({
        data: data.records,
        count: data.totalCount,
      }),
    );
  }
  catch (error) {
    yield put(Creators.getPickerCrisesLogsFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchGetPickerCrisesLogsRequest() {
  yield takeLatest(Types.GET_PICKER_CRISES_LOGS_REQUEST, getPickerCrisesLogs);
}

function* exportPickerCrisesLogs({ filters }) {
  try {
    const body = {
      lang: getLangKey(),
      utcOffset: moment().utcOffset(),
      filters: formatLogFilters(filters),
    };
    const { url } = yield call(exportPickerCrisesLogsApi, body);
    window.open(url);
    yield put(Creators.exportPickerCrisesLogsSuccess());
  }
  catch (error) {
    yield put(Creators.exportPickerCrisesLogsFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchExportPickerCrisesLogsRequest() {
  yield takeLatest(
    Types.EXPORT_PICKER_CRISES_LOGS_REQUEST,
    exportPickerCrisesLogs,
  );
}

export default function* pickerCrisesPageRootSaga() {
  while (yield take(Types.INIT_CONTAINER)) {
    const backgroundTasks = yield all([
      fork(watchGetPickerCrisesLogsRequest),
      fork(watchExportPickerCrisesLogsRequest),
    ]);

    yield take(Types.DESTROY_CONTAINER);
    yield cancel(backgroundTasks);
  }
}
