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
  exportCourierCrisesLogs as exportCourierCrisesLogsApi,
  getCourierCrisesLogs as getCourierCrisesLogsApi,
} from '@shared/api/courierCrisis';
import { getLangKey } from '@shared/i18n';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { getLimitAndOffset } from '@shared/utils/common';
import { formatLogFilters } from '../../../helpers';
import { Creators, Types } from './actions';

function* getCourierCrisesLogs({ filters, pagination }) {
  try {
    const body = formatLogFilters(filters, getLimitAndOffset(pagination));
    const data = yield call(getCourierCrisesLogsApi, body);
    yield put(
      Creators.getCourierCrisesLogsSuccess({
        data: data.records,
        count: data.totalCount,
      }),
    );
  }
  catch (error) {
    yield put(Creators.getCourierCrisesLogsFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchGetCourierCrisesLogsRequest() {
  yield takeLatest(Types.GET_COURIER_CRISES_LOGS_REQUEST, getCourierCrisesLogs);
}

function* exportCourierCrisesLogs({ filters }) {
  try {
    const body = {
      lang: getLangKey(),
      utcOffset: moment().utcOffset(),
      filters: formatLogFilters(filters),
    };
    const { url } = yield call(exportCourierCrisesLogsApi, body);
    window.open(url);
    yield put(Creators.exportCourierCrisesLogsSuccess());
  }
  catch (error) {
    yield put(Creators.exportCourierCrisesLogsFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchExportCourierCrisesLogsRequest() {
  yield takeLatest(
    Types.EXPORT_COURIER_CRISES_LOGS_REQUEST,
    exportCourierCrisesLogs,
  );
}

export default function* courierCrisesPageRootSaga() {
  while (yield take(Types.INIT_CONTAINER)) {
    const backgroundTasks = yield all([
      fork(watchGetCourierCrisesLogsRequest),
      fork(watchExportCourierCrisesLogsRequest),
    ]);

    yield take(Types.DESTROY_CONTAINER);
    yield cancel(backgroundTasks);
  }
}
