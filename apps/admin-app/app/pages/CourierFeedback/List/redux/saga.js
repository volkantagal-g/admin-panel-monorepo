import { all, call, cancel, fork, put, take, takeLatest } from 'redux-saga/effects';

import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import {
  getFeedbackOptions as getFeedbackOptionsApi,
  getFeedbackChartData as getFeedbackChartDataApi,
  filterFeedbacks as filterFeedbacksApi,
} from '@shared/api/courier';
import { Types, Creators } from './actions';

export function* filterCourierFeedback({ filterOptions, language, pageNumber, limit }) {
  try {
    const response = yield call(filterFeedbacksApi, { filterOptions, language, pageNumber, limit });
    yield put(Creators.filterCourierFeedbackSuccess({ data: response }));
  }
  catch (error) {
    yield put(Creators.filterCourierFeedbackFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* getFeedbackOptions({ feedbackType }) {
  try {
    const { feedbackOptions } = yield call(getFeedbackOptionsApi, { feedbackType });
    yield put(Creators.getFeedbackOptionsSuccess({ data: feedbackOptions }));
  }
  catch (error) {
    yield put(Creators.getFeedbackOptionsFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* getFeedbackChartData({ filterOptions, language }) {
  try {
    const { feedbackOptions } = yield call(getFeedbackChartDataApi, { filterOptions, language });
    yield put(Creators.getFeedbackChartDataSuccess({ data: feedbackOptions }));
  }
  catch (error) {
    yield put(Creators.getFeedbackChartDataFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* watchFilterCourierFeedbackRequest() {
  yield takeLatest(Types.FILTER_COURIER_FEEDBACK_REQUEST, filterCourierFeedback);
}

export function* watchGetFeedbackOptionsRequest() {
  yield takeLatest(Types.GET_FEEDBACK_OPTIONS_REQUEST, getFeedbackOptions);
}

export function* watchGetFeedbackChartDataRequest() {
  yield takeLatest(Types.GET_FEEDBACK_CHART_DATA_REQUEST, getFeedbackChartData);
}

export default function* courierFeedbackListPageRootSaga() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchFilterCourierFeedbackRequest),
      fork(watchGetFeedbackOptionsRequest),
      fork(watchGetFeedbackChartDataRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
