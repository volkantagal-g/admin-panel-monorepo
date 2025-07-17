import { all, cancel, fork, put, take, takeLatest } from 'redux-saga/effects';
import moment from 'moment-timezone';

import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { Types, Creators } from './actions';
import { DATE_TYPE } from '@shared/shared/constants';

function* setSelectedDateTypeOnDateRangeChange({ selectedDateRange }) {
  try {
    const { startDate } = selectedDateRange;
    const today = moment().startOf('day');

    if (today.diff(startDate, 'days') >= DATE_TYPE.LOG_SUMMARY_DATE_TYPE_1_WEEK) {
      yield put(Creators.setDateType({ dateType: DATE_TYPE.LOG_SUMMARY_DATE_TYPE_1_WEEK }));
    }
  }
  catch (error) {
    yield put(ToastCreators.error({ error }));
  }
}

function* watchSetSelectedDateRange() {
  yield takeLatest(Types.SET_SELECTED_DATE_RANGE, setSelectedDateTypeOnDateRangeChange);
}

export default function* root() {
  while (yield take(Types.INIT_FILTER)) {
    const backgroundTasks = yield all([
      fork(watchSetSelectedDateRange),
    ]);
    yield take(Types.DESTROY_FILTER);
    yield cancel(backgroundTasks);
  }
}
