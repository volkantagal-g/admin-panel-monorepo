import { all, call, fork, put, take } from 'redux-saga/effects';

import { Creators, Types } from '@shared/redux/actions/planogram';
import { getSizeList, getDemographyList } from '@shared/api/planogram';

function* watchGetPlanogramSizeListRequest() {
  while (true) {
    try {
      yield take(Types.GET_PLANOGRAM_SIZE_LIST_REQUEST);
      const data = yield call(getSizeList);
      yield put(Creators.getPlanogramSizeListSuccess({ data }));
    }
    catch (error) {
      yield put(Creators.getPlanogramSizeListFailure({ error }));
    }
  }
}
function* watchGetPlanogramDemographyListRequest() {
  while (true) {
    try {
      yield take(Types.GET_PLANOGRAM_DEMOGRAPHY_LIST_REQUEST);
      const data = yield call(getDemographyList);
      yield put(Creators.getPlanogramDemographyListSuccess({ data }));
    }
    catch (error) {
      yield put(Creators.getPlanogramDemographyListFailure({ error }));
    }
  }
}

export default function* planogramRoot() {
  yield all([
    fork(watchGetPlanogramSizeListRequest),
    fork(watchGetPlanogramDemographyListRequest),
  ]);
}
