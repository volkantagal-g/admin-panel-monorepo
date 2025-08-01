import { all, call, cancel, fork, put, take, takeLatest } from 'redux-saga/effects';

import { getContractListApi as getContractTypeListApi } from '@shared/api/personContractType';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { Types, Creators } from './actions';

function* getContractRequest() {
  try {
    const data = yield call(getContractTypeListApi);
    yield put(Creators.getContractSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getContractFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchContractRequest() {
  yield takeLatest(Types.GET_CONTRACT_REQUEST, getContractRequest);
}

export default function* contractTypeRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([fork(watchContractRequest)]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
