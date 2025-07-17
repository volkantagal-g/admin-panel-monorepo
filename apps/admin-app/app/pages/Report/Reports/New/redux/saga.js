import { all, call, cancel, fork, put, take, takeLatest } from 'redux-saga/effects';
import moment from 'moment';

import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { getReportTypeById, createReport } from '@shared/api/report';
import { ROUTE } from '@app/routes';
import history from '@shared/utils/history';

import { Types, Creators } from './actions';
import { PARAMETER_TYPE } from '../../../constants';
import { REPORT_DATE_FORMAT } from '../../constants';

function* getReportTypeByIdRequest({ id }) {
  try {
    const data = yield call(getReportTypeById, id);
    yield put(Creators.getReportTypeByIdSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getReportTypeByIdFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchReportTypeByIdRequest() {
  yield takeLatest(Types.GET_REPORT_TYPE_BY_ID_REQUEST, getReportTypeByIdRequest);
}

function* createReportRequest({ data, shouldStayInTheSamePage }) {
  try {
    const cleanData = getCleanData(data);
    const newReport = yield call(createReport, cleanData);
    yield put(Creators.createReportSuccess({ data: newReport }));
    yield put(ToastCreators.success());
    if (!shouldStayInTheSamePage) {
      history.push(ROUTE.REPORTS.path);
    }
  }
  catch (error) {
    yield put(Creators.createReportFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchCreateReportRequest() {
  yield takeLatest(Types.CREATE_REPORT_REQUEST, createReportRequest);
}

export default function* root() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([fork(watchReportTypeByIdRequest), fork(watchCreateReportRequest)]);
    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}

function getCleanData(data) {
  const { name, params, reportType, reportTypeId } = data;
  if (params && reportType?.parameters?.length) {
    reportType.parameters.forEach(param => {
      const { type, variableName } = param;
      if (type === PARAMETER_TYPE.date) {
        params[variableName] = moment(params[variableName]).format(REPORT_DATE_FORMAT);
      }
      if (type === PARAMETER_TYPE.dateRange) {
        params[variableName] = params[variableName].map(d => moment(d).format(REPORT_DATE_FORMAT));
      }

      // NOTE: Data scripts expects empty string for empty value, so a workaround here
      if (type === PARAMETER_TYPE.dropdown && param.isOptional) {
        params[variableName] = params[variableName] === undefined ? '' : params[variableName];
      }
    });
  }

  return { name, params, reportType: reportTypeId };
}
