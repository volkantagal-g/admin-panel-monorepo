import { all, call, cancel, fork, put, take, takeLatest } from 'redux-saga/effects';

import { filterPermittedMetricGroups, getMetricGroupById } from '@shared/api/businessAlertingTool/metricGroup';

import { Types, Creators } from './actions';

function* filterPermittedMetricGroupsRequest({ limit, offset, fields }: FilterMetricGroupDTO) {
  try {
    const { metricGroups }: { metricGroups: ACMetricGroup[] } = yield call(filterPermittedMetricGroups, { limit, offset, fields });
    yield put(Creators.filterPermittedMetricGroupsSuccess({ data: metricGroups }));
  }
  catch (error) {
    yield put(Creators.filterPermittedMetricGroupsFailure({ error }));
  }
}

function* watchFilterMetricGroups() {
  yield takeLatest(Types.FILTER_PERMITTED_METRIC_GROUPS_REQUEST as any, filterPermittedMetricGroupsRequest);
}

function* getMetricGroupRequest({ metricGroupId }: GetMetricGroupDTO) {
  try {
    const { metricGroup }: { metricGroup: ACMetricGroup } = yield call(getMetricGroupById, { metricGroupId });
    yield put(Creators.getMetricGroupSuccess({ data: metricGroup }));
  }
  catch (error) {
    yield put(Creators.getMetricGroupFailure({ error }));
  }
}

function* watchGetMetricGroup() {
  yield takeLatest(Types.GET_METRIC_GROUP_REQUEST as any, getMetricGroupRequest);
}

export default function* batAlertConditionMetricGroupRootSaga(): any {
  while (yield take(Types.INIT_CONTAINER)) {
    const backgroundTasks = yield all([
      fork(watchFilterMetricGroups),
      fork(watchGetMetricGroup),
    ]);

    yield take(Types.DESTROY_CONTAINER);
    yield cancel(backgroundTasks);
  }
}
