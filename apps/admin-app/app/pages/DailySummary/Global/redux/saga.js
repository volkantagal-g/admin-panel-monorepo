import { all, call, cancel, fork, put, take, takeEvery } from 'redux-saga/effects';

import { Types, Creators } from './actions';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';

function* getGlobalDailySummaryDataRequest({ config, tableKey, dateRanges }) {
  try {
    const { endpoint, customRequestBody, errorMsg } = config;
    const requestBody = { ...customRequestBody, filters: { ...customRequestBody.filters, dateRanges } };

    const { successData, errors } = yield call(endpoint, requestBody);

    if (errors?.length) {
      yield put(ToastCreators.error({ message: errorMsg, toastOptions: { autoClose: 4000 } }));
    }
    yield put(Creators.setLastSuccessfulDateRanges({ dateRanges }));
    yield put(Creators.getGlobalDailySummaryDataSuccess({ config, tableKey, data: successData }));
  }
  catch (error) {
    yield put(Creators.getGlobalDailySummaryDataFailure({ config, tableKey, error }));
    const { errorMsg } = config;
    yield put(ToastCreators.error({ message: errorMsg, error }));
  }
}

function* watchGetGlobalDailySummaryData() {
  yield takeEvery(Types.GET_GLOBAL_DAILY_SUMMARY_DATA_REQUEST, getGlobalDailySummaryDataRequest);
}

export default function* root() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([fork(watchGetGlobalDailySummaryData)]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
