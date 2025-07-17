import { all, call, cancel, fork, put, take, takeLatest } from 'redux-saga/effects';

import { getFranchiseBillDetail as getFranchiseBillDetailApi } from '@shared/api/franchiseBillManagement';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { Types, Creators } from './actions';

function* getFranchiseBillDetailRequest({ billId }) {
  try {
    const { url: data } = yield call(getFranchiseBillDetailApi, { billId });
    yield put(Creators.getFranchiseBillDetailSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getFranchiseBillDetailFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchGetFranchiseBillDetailRequest() {
  yield takeLatest(Types.GET_FRANCHISE_BILL_DETAIL_REQUEST, getFranchiseBillDetailRequest);
}

export default function* franchiseBillDetailRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchGetFranchiseBillDetailRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
