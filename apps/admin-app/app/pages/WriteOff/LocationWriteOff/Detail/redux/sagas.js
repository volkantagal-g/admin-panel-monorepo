import { all, call, cancel, fork, put, take, takeLatest } from 'redux-saga/effects';
import _ from 'lodash';

import {
  getLocationWriteOffDetail,
  approveLocationWriteOff,
  cancelLocationWriteOff,
} from '@shared/api/locationWriteOff';

import { Types, Creators } from './action';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';

function* getLocationWriteOffRequest({ locationWriteOffId }) {
  try {
    const data = yield call(getLocationWriteOffDetail, locationWriteOffId);
    yield put(Creators.getLocationWriteOffSuccess({ data }));
  }
  catch (error) {
    const errorMessage = _.get(error, 'response.data.message');
    yield put(ToastCreators.error({ message: errorMessage }));
  }
}

function* approveLocationWriteOffRequest({ locationWriteOffId }) {
  try {
    yield call(approveLocationWriteOff, locationWriteOffId);
    yield call(getLocationWriteOffRequest, { locationWriteOffId });
    yield put(ToastCreators.success());
  }
  catch (error) {
    const errorMessage = _.get(error, 'response.data.message');
    yield put(ToastCreators.error({ message: errorMessage }));
    yield call(getLocationWriteOffRequest, { locationWriteOffId });
  }
}

function* cancelLocationWriteOffRequest({ locationWriteOffId }) {
  try {
    yield call(cancelLocationWriteOff, locationWriteOffId);
    yield call(getLocationWriteOffRequest, { locationWriteOffId });
    yield put(ToastCreators.success());
  }
  catch (error) {
    const errorMessage = _.get(error, 'response.data.message');
    yield put(ToastCreators.error({ message: errorMessage }));
    yield call(getLocationWriteOffRequest, { locationWriteOffId });
  }
}

function* watchGetLocationWriteOffRequest() {
  yield takeLatest(Types.GET_LOCATION_WRITE_OFF_REQUEST, getLocationWriteOffRequest);
}

function* watchApproveLocationWriteOffRequest() {
  yield takeLatest(Types.APPROVE_LOCATION_WRITE_OFF_REQUEST, approveLocationWriteOffRequest);
}

function* watchCancelLocationWriteOffRequest() {
  yield takeLatest(Types.CANCEL_LOCATION_WRITE_OFF_REQUEST, cancelLocationWriteOffRequest);
}

export default function* locationWriteOffRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchGetLocationWriteOffRequest),
      fork(watchApproveLocationWriteOffRequest),
      fork(watchCancelLocationWriteOffRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
