import { all, call, cancel, fork, put, take, takeLatest } from 'redux-saga/effects';

import moment from 'moment';

import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { Types, Creators } from './actions';
import {
  getHighLevelDysPoints,
  exportHighLevelDysPoints,
  getHighLevelLineChartPoints,
  getHighLevelBarChartPoints,
} from '@shared/api/dys';
import { getLangKey } from '@shared/i18n';
import { getDateType } from '../utils';

function* getHighLevelDysListRequest({ limit, offset, filters }) {
  try {
    const {
      dysPeriod,
      serviceType,
      performanceSystem,
      cities,
    } = filters;

    const data = yield call(getHighLevelDysPoints, {
      limit,
      offset,
      startDate: getDateType(dysPeriod[0]),
      endDate: getDateType(dysPeriod[1]),
      serviceType,
      performanceSystem,
      cities,
    });

    yield put(Creators.getHighLevelDysListSuccess({ data, total: data.total }));
  }
  catch (error) {
    yield put(Creators.getHighLevelDysListFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchHighLevelDysListRequest() {
  yield takeLatest(Types.GET_HIGH_LEVEL_DYS_LIST_REQUEST, getHighLevelDysListRequest);
}

function* exportHighLevelDysListRequest({ filters }) {
  try {
    const {
      dysPeriod,
      serviceType,
      performanceSystem,
      cities,
    } = filters;

    const payload = {
      serviceType,
      performanceSystem,
      cities,
      lang: getLangKey(),
      utc: moment().utcOffset(),
      startDate: moment.utc(dysPeriod[0].format('YYYY-MM-DD')).toISOString(),
      endDate: moment.utc(dysPeriod[1].format('YYYY-MM-DD')).toISOString(),
    };

    const { url } = yield call(exportHighLevelDysPoints, { ...payload });
    window.open(url, '_blank');
    yield put(Creators.exportHighLevelDysListSuccess());
    yield put(ToastCreators.success());
  }
  catch (error) {
    yield put(Creators.exportHighLevelDysListFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchExportHighLevelDysListRequest() {
  yield takeLatest(Types.EXPORT_HIGH_LEVEL_DYS_LIST_REQUEST, exportHighLevelDysListRequest);
}

function* getHighLevelLineChartListRequest({ filters }) {
  try {
    const {
      dysPeriod,
      performanceSystem,
      serviceType,
      cities,
    } = filters;

    const payload = {
      performanceSystem,
      serviceType,
      cities,
      startDate: getDateType(dysPeriod[0]),
      endDate: getDateType(dysPeriod[1]),
    };

    const { data } = yield call(getHighLevelLineChartPoints, { ...payload });

    yield put(Creators.getHighLevelLineChartListSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getHighLevelLineChartListFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchHighLevelLineChartListRequest() {
  yield takeLatest(Types.GET_HIGH_LEVEL_LINE_CHART_LIST_REQUEST, getHighLevelLineChartListRequest);
}

function* getHighLevelBarChartListRequest({ filters }) {
  try {
    const {
      dysPeriod,
      performanceSystem,
      cities,
    } = filters;

    const payload = {
      performanceSystem,
      cities,
      startDate: getDateType(dysPeriod[0]),
      endDate: getDateType(dysPeriod[1]),
    };

    const data = yield call(getHighLevelBarChartPoints, { ...payload });

    yield put(Creators.getHighLevelBarChartListSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getHighLevelBarChartListFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchHighLevelBarChartListRequest() {
  yield takeLatest(Types.GET_HIGH_LEVEL_BAR_CHART_LIST_REQUEST, getHighLevelBarChartListRequest);
}

export default function* highLevelDysListRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchHighLevelDysListRequest),
      fork(watchExportHighLevelDysListRequest),
      fork(watchHighLevelLineChartListRequest),
      fork(watchHighLevelBarChartListRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
