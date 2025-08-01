import { all, call, cancel, fork, put, take, takeLatest } from 'redux-saga/effects';

import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { getReportTags, getReportTypes } from '@shared/api/report';

import { Types, Creators } from './actions';

export function* getReportTypesRequest({ data: dataIn }) {
  try {
    const data = yield call(getReportTypes, { ...dataIn, fields: { permittedUsers: 0, __v: 0, parameters: 0 } });
    yield put(Creators.getReportTypesSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getReportTypesFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* watchReportTypesRequest() {
  yield takeLatest(Types.GET_REPORT_TYPES_REQUEST, getReportTypesRequest);
}

export function* getAllReportTagsRequest({ data: dataIn }) {
  try {
    const data = yield call(getReportTags, dataIn);
    yield put(Creators.getAllReportTagsSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getAllReportTagsFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* watchAllReportTagsRequest() {
  yield takeLatest(Types.GET_ALL_REPORT_TAGS_REQUEST, getAllReportTagsRequest);
}

export default function* root() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchReportTypesRequest),
      fork(watchAllReportTagsRequest),
    ]);
    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
