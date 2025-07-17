import { all, call, cancel, fork, put, take, takeLatest, select } from 'redux-saga/effects';

import { filtersSelector } from '@app/pages/CommunicationServiceCredentials/List/redux/selectors';
import { Types, Creators } from '@app/pages/CommunicationServiceCredentials/List/redux/actions';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { getResults } from '@shared/api/communicationServiceCredentials';
import { getLangKey } from '@shared/i18n';

export function* getResultsRequest({ serviceType }) {
  try {
    const filters = yield select(filtersSelector.getFilters);
    const results = yield call(getResults, { ...filters, clientLanguage: getLangKey() }, serviceType);
    yield put(Creators.getResultsSuccess({ data: results }));
  }
  catch (error) {
    yield put(Creators.getResultsFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchResultsRequest() {
  yield takeLatest(Types.SET_TABLE_FILTERS, getResultsRequest);
}

export default function* communicationServiceCredentialsListSagaRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchResultsRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
