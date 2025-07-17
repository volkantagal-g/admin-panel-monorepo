import { all, call, cancel, fork, put, take, takeLatest } from 'redux-saga/effects';

import { listPickers } from '@shared/api/picker'; // TODO fix it

import { Types, Creators } from './actions';

function* getPickerListRequest() {
  try {
    const { pickers } = yield call(listPickers);
    yield put(Creators.getPickerListSuccess({ data: pickers }));
  }
  catch (error) {
    yield put(Creators.getPickerListFailure({ error }));
  }
}

function* watchGetPickerListRequest() {
  yield takeLatest(Types.GET_PICKER_LIST_REQUEST, getPickerListRequest);
}

export default function* pickerListPageRootSaga() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchGetPickerListRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
