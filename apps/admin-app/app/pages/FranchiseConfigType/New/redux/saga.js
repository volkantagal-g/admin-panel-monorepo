import { all, call, cancel, fork, put, take, takeLatest } from 'redux-saga/effects';

import { isArray } from 'lodash';

import history from '@shared/utils/history';
import { createFranchiseConfigType } from '@shared/api/franchiseDynamicConfig';
import { Types, Creators } from './actions';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { ROUTE } from '@app/routes';

function* createFranchiseConfigTypeRequest({ name, description, fields }) {
  try {
    yield call(createFranchiseConfigType, { name, description, fields });

    yield put(Creators.createFranchiseConfigTypeSuccess());
    yield put(ToastCreators.success());
    history.push(ROUTE.FRANCHISE_CONFIG_TYPE_LIST.path);
  }
  catch (error) {
    yield put(Creators.createFranchiseConfigTypeFailure({ error }));
    yield put(ToastCreators.error({
      error: error.message,
      message: isArray(error.response.data.message) ? error.response.data.message[0] : error.response.data.message,
    }));
  }
}

function* watchCreateFranchiseConfigTypeRequest() {
  yield takeLatest(Types.CREATE_FRANCHISE_CONFIG_TYPE_REQUEST, createFranchiseConfigTypeRequest);
}

export default function* franchiseConfigTypeRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchCreateFranchiseConfigTypeRequest),
    ]);
    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
