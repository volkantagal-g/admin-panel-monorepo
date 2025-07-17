import { all, call, cancel, fork, put, take, takeLatest } from 'redux-saga/effects';

import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { filterInformationEditRequest } from '@shared/api/person';
import { Types, Creators } from './actions';

function* getInformationEditRequestList({
  person,
  franchise,
  status,
  startDate,
  endDate,
  limit,
  offset,
}) {
  try {
    const { records, totalCount } = yield call(filterInformationEditRequest, {
      person,
      franchise,
      status,
      startDate,
      endDate,
      limit,
      offset,
    });
    yield put(Creators.getInformationEditRequestListSuccess({ data: records, total: totalCount }));
  }
  catch (error) {
    yield put(Creators.getInformationEditRequestListFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchInformationEditRequestListRequest() {
  yield takeLatest(Types.GET_INFORMATION_EDIT_REQUEST_LIST_REQUEST, getInformationEditRequestList);
}

export default function* informationEditRequestListRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchInformationEditRequestListRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
