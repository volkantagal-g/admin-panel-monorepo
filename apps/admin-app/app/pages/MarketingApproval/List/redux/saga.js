import { all, call, cancel, fork, put, take, takeLatest, select } from 'redux-saga/effects';

import { filtersSelector } from '@app/pages/MarketingApproval/List/redux/selectors';
import { Types, Creators } from '@app/pages/MarketingApproval/List/redux/actions';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';

import { getFilteredGeneratedContent } from '@shared/api/aiContentGeneration';

export function* getResultsRequest() {
  try {
    const filters = yield select(filtersSelector.getFilters);
    const { data } = yield call(getFilteredGeneratedContent, filters);
    yield put(Creators.getResultsSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getResultsFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchResultsRequest() {
  yield takeLatest(Types.SET_TABLE_FILTERS, getResultsRequest);
}

export default function* marketingApprovalSagaRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchResultsRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
