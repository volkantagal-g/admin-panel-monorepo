import moment from 'moment';
import { all, call, fork, put, take, takeLatest } from 'redux-saga/effects';

import Excel from '@shared/utils/excel';
import { filterEmployeeLogs as filterEmployeeLogsAPI } from '@shared/api/employee/logs';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';

import { Creators, Types } from './actions';
import { EMPLOYEE_LOGS_COLUMNS, formatDataToExport } from '../utils';

type ActionWithTypeType<T> = {
  type: string;
} & T;

function* filterEmployeeLogsRequest({ filters }: ActionWithTypeType<{ filters: any; }>): Generator {
  try {
    const { dateRange, ...remainingFilters } = filters;
    const [startDate, endDate] = dateRange;
    const data = (yield call(filterEmployeeLogsAPI, {
      filters: {
        ...remainingFilters,
        startDate: moment(startDate).startOf('day').toISOString(),
        endDate: moment(endDate).endOf('day').toISOString(),
      },
    })) as { data: any };
    yield put(Creators.filterEmployeeLogsSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.filterEmployeeLogsFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchFilterEmployeeLogsRequest() {
  yield takeLatest(Types.FILTER_EMPLOYEE_LOGS_REQUEST, filterEmployeeLogsRequest);
}

function* exportLogsRequest({ filters, t }: ActionWithTypeType<{ filters: any; t: any }>): Generator {
  try {
    const { dateRange, ...remainingFilters } = filters;
    const [startDate, endDate] = dateRange;
    const data = (yield call(filterEmployeeLogsAPI, {
      filters: {
        ...remainingFilters,
        startDate: moment(startDate).startOf('day').toISOString(),
        endDate: moment(endDate).endOf('day').toISOString(),
      },
    })) as { data: any };
    const dataToExport = formatDataToExport(data);

    new Excel({
      name: 'Employee Logs',
      data: dataToExport,
      fields: EMPLOYEE_LOGS_COLUMNS(t),
    }).export();

    yield put(Creators.exportLogsSuccess());
  }
  catch (error) {
    yield put(ToastCreators.error({ error }));
    yield put(Creators.exportLogsFailure());
  }
}

function* watchExportLogsRequest() {
  yield takeLatest(Types.EXPORT_LOGS_REQUEST, exportLogsRequest);
}

export default function* employeeLogsPageRootSaga(): Generator {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks: unknown = yield all([
      fork(watchFilterEmployeeLogsRequest),
      fork(watchExportLogsRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    // @ts-ignore
    yield all(backgroundTasks.map(task => task.cancel()));
  }
}
