import { all, call, cancel, fork, put, take, takeLatest } from 'redux-saga/effects';
import { isEmpty } from 'lodash';

import { Types, Creators } from './actions';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { filterAlertConditions } from '@shared/api/businessAlertingTool/alertCondition';

function* filterAlertConditionsRequest({ filters }: { filters: { [x:string]: any }}) {
  try {
    const {
      statuses,
      createdBy,
      permittedRoles,
      notificationChannels,
      searchTerm,
      createdAtRange,
      limit,
      offset,
    } = filters;
    const { alertConditions, total }: { alertConditions: AlertCondition[], total: number } = yield call(filterAlertConditions, {
      statuses: statuses ? [statuses] : undefined,
      createdBy: createdBy || undefined,
      permittedRoles: !isEmpty(permittedRoles) ? permittedRoles?.map(({ value }: { value: any}) => value) : undefined,
      notificationChannels: !isEmpty(notificationChannels) ? notificationChannels : undefined,
      searchTerm: searchTerm || undefined,
      createdAtRangeStart: !isEmpty(createdAtRange) ? createdAtRange[0]?.startOf('day').toISOString() : undefined,
      createdAtRangeEnd: !isEmpty(createdAtRange) ? createdAtRange[1]?.endOf('day').toISOString() : undefined,
      limit,
      offset,
    });
    yield put(Creators.filterAlertConditionsSuccess({ data: alertConditions, total }));
  }
  catch (error) {
    yield put(Creators.filterAlertConditionsFailure({ error }));
    yield put(ToastCreators.error(error));
  }
}

function* watchFilterAlertConditionsRequest() {
  yield takeLatest(Types.FILTER_ALERT_CONDITIONS_REQUEST as any, filterAlertConditionsRequest);
}

export default function* batAlertConditionListPageRootSaga(): any {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchFilterAlertConditionsRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
