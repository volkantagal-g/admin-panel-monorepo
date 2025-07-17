import { all, call, select, cancel, fork, put, take, takeLatest } from 'redux-saga/effects';
import { isEmpty } from 'lodash';

import { getKdsScoreMappingList } from '@shared/api/kds/scoreMapping';
import { Types, Creators } from './actions';
import { scoreMappingSelector } from './selectors';

function* scoreMappingListRequest({ questionType }) {
  try {
    const scoreMappingData = yield select(scoreMappingSelector.getData);
    if (isEmpty(scoreMappingData) || scoreMappingData.questionType !== questionType) {
      const data = yield call(getKdsScoreMappingList, { questionType });
      yield put(Creators.getScoreMappingListSuccess({ data }));
    }
    else {
      yield put(Creators.getScoreMappingListSuccess({ data: scoreMappingData }));
    }
  }
  catch (error) {
    yield put(Creators.getScoreMappingListFailure({ error }));
  }
}

function* watchScoreMappingListRequest() {
  yield takeLatest(Types.GET_SCORE_MAPPING_LIST_REQUEST, scoreMappingListRequest);
};

export default function* getScoreMappingListRoot() {
  while (yield take(Types.INIT_CONTAINER)) {
    const backgroundTasks = yield all([
      fork(watchScoreMappingListRequest),
    ]);
    yield take(Types.DESTROY_CONTAINER);
    yield cancel(backgroundTasks);
  }
}
