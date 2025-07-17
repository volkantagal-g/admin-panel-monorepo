import { all, call, cancel, fork, put, take, takeLatest } from 'redux-saga/effects';

import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import {
  getInformationEditRequestDetail as getInformationEditRequestDetailApi,
  acceptInformationEditRequest as acceptInformationEditRequestApi,
  rejectInformationEditRequest as rejectInformationEditRequestApi,
} from '@shared/api/person';
import { Types, Creators } from './actions';

function* getInformationEditRequestDetail({ approvalId, description }) {
  try {
    const data = yield call(getInformationEditRequestDetailApi, { approvalId, description });
    yield put(Creators.getInformationEditRequestDetailSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getInformationEditRequestDetailFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* acceptInformationEditRequestDetail({ approvalId, description }) {
  try {
    const data = yield call(acceptInformationEditRequestApi, { approvalId, description });
    yield put(Creators.acceptInformationEditRequestDetailSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.acceptInformationEditRequestDetailFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* rejectInformationEditRequestDetail({ approvalId, description }) {
  try {
    const data = yield call(rejectInformationEditRequestApi, { approvalId, description });
    yield put(Creators.rejectInformationEditRequestDetailSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.rejectInformationEditRequestDetailFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchInformationEditRequestDetailRequest() {
  yield takeLatest(Types.GET_INFORMATION_EDIT_REQUEST_DETAIL_REQUEST, getInformationEditRequestDetail);
}

function* watchAcceptInformationEditRequestDetailRequest() {
  yield takeLatest(Types.ACCEPT_INFORMATION_EDIT_REQUEST_DETAIL_REQUEST, acceptInformationEditRequestDetail);
}

function* watchRejectInformationEditRequestDetailRequest() {
  yield takeLatest(Types.REJECT_INFORMATION_EDIT_REQUEST_DETAIL_REQUEST, rejectInformationEditRequestDetail);
}

export default function* informationEditRequestDetailRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchInformationEditRequestDetailRequest),
      fork(watchAcceptInformationEditRequestDetailRequest),
      fork(watchRejectInformationEditRequestDetailRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
