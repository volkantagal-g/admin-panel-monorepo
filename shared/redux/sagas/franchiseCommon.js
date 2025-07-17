import { call, put, fork, all, takeLatest } from 'redux-saga/effects';

import { getFranchiseAreas } from '@shared/api/marketFranchise';

import { Types, Creators } from '../actions/franchiseCommon';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';

function* getFranchiseAreasRequest({ franchiseId }) {
  try {
    const data = yield call(getFranchiseAreas, { franchiseId });
    yield put(Creators.getFranchiseAreasSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getFranchiseAreasFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* watchGetFranchiseAreasRequest() {
  yield takeLatest(Types.GET_FRANCHISE_AREAS_REQUEST, getFranchiseAreasRequest);
}

export default function* franchiseCommon() {
  yield all([
    fork(watchGetFranchiseAreasRequest),
  ]);
}
