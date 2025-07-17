import { all, call, cancel, fork, put, take, takeLatest } from 'redux-saga/effects';

import {
  getKdsScoreMappingList as getKdsScoreMappingListApi,
  updateScoreMappingGroup as updateScoreMappingGroupApi,
} from '@shared/api/kds/scoreMapping';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { Types, Creators } from './actions';

function* getKdsScoreMappingRequest({ questionType }) {
  try {
    const data = yield call(getKdsScoreMappingListApi, { questionType });
    yield put(Creators.getKdsScoreMappingSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getKdsScoreMappingFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* updateKdsScoreMappingRequest({ data }) {
  try {
    yield call(updateScoreMappingGroupApi, { data });
    window.location.reload();
  }
  catch (error) {
    yield put(Creators.updateKdsScoreMappingFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchKdsGetScoreMappingRequest() {
  yield takeLatest(Types.GET_KDS_SCORE_MAPPING_REQUEST, getKdsScoreMappingRequest);
}

function* watchUpdateKdsScoreMappingRequest() {
  yield takeLatest(Types.UPDATE_KDS_SCORE_MAPPING_REQUEST, updateKdsScoreMappingRequest);
}

export default function* kdsScoreMappingRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchKdsGetScoreMappingRequest),
      fork(watchUpdateKdsScoreMappingRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
