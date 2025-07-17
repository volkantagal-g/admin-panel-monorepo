import { all, takeLatest, call, cancel, fork, put, take } from 'redux-saga/effects';

import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { Types, Creators } from './actions';
import { getThirdPartyCompanies } from '@shared/api/thirdPartyCompany';

export function* getThirdPartyCompaniesRequest() {
  try {
    const response = yield call(getThirdPartyCompanies);
    yield put(Creators.getThirdPartyCompaniesSuccess({ thirdPartyCompanies: response }));
  }
  catch (error) {
    yield put(Creators.getThirdPartyCompaniesFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* watchGetThirdPartyCompaniesRequest() {
  yield takeLatest(Types.GET_THIRD_PARTY_COMPANIES_REQUEST, getThirdPartyCompaniesRequest);
}

export default function* thirdPartyCompanyListRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchGetThirdPartyCompaniesRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
