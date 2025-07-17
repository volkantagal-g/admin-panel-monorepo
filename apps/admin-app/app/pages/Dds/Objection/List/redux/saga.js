import { all, call, cancel, fork, put, take, takeLatest } from 'redux-saga/effects';

import { filterDdsObjections } from '@shared/api/dds';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { Types, Creators } from './actions';

function* getDdsObjectionList({
  franchiseId,
  warehouseIds,
  statuses,
  criterionNames,
  startDate,
  endDate,
  limit,
  offset,
}) {
  try {
    const { ddsObjections, totalCount } = yield call(filterDdsObjections, {
      franchiseId,
      warehouseIds,
      statuses,
      criterionNames,
      startDate,
      endDate,
      limit,
      offset,
    });
    yield put(Creators.getDdsObjectionListSuccess({ data: ddsObjections, total: totalCount }));
  }
  catch (error) {
    yield put(Creators.getDdsObjectionListFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchDdsObjectionListRequest() {
  yield takeLatest(Types.GET_DDS_OBJECTION_LIST_REQUEST, getDdsObjectionList);
}

export default function* ddsObjectionListRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchDdsObjectionListRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
