import { call, all, cancel, fork, put, take, takeLatest } from 'redux-saga/effects';
import moment from 'moment';

import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { getComparisonStatsBetweenTwoDateRanges } from '@shared/api/artisanOrder';
import { Types, Creators } from './actions';

const dateFormat = 'YYYY-MM-DD';
const timeFormat = 'HH:mm';

function* getComparisonDataRequest({ data: dataIn }) {
  const { selectedDate1, selectedDate2, selectedTimeRange, selectedCity } = dataIn;

  const body = {
    startDate1: selectedDate1.startDate.format(dateFormat),
    // end dates are start of next day
    endDate1: moment(selectedDate1.endDate).add(1, 'day').format(dateFormat),
    startDate2: selectedDate2.startDate.format(dateFormat),
    endDate2: moment(selectedDate2.endDate).add(1, 'day').format(dateFormat),
    selectedCity: selectedCity || undefined,
    startTime: selectedTimeRange.startTime.format(timeFormat),
    endTime: selectedTimeRange.endTime.format(timeFormat),
  };
  try {
    const data = yield call(getComparisonStatsBetweenTwoDateRanges, body);
    yield put(Creators.getComparisonDataSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getComparisonDataFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchGetComparisonDataRequest() {
  yield takeLatest(Types.GET_COMPARISON_DATA_REQUEST, getComparisonDataRequest);
}

export default function* dataTrackingOrderRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([fork(watchGetComparisonDataRequest)]);
    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
