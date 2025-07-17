import { all, takeLatest, call, cancel, fork, put, take } from 'redux-saga/effects';

import history from '@shared/utils/history';
import { createThirdPartyCompany } from '@shared/api/thirdPartyCompany';
import { Types, Creators } from './actions';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { ROUTE } from '@app/routes';

export function* createThirdPartyCompanyRequest({ body }) {
  try {
    const data = yield call(createThirdPartyCompany, { body });
    yield put(Creators.createThirdPartyCompanySuccess({ thirdPartyCompany: data }));
    yield put(ToastCreators.success());
    history.push(ROUTE.THIRD_PARTY_COMPANY_LIST.path);
  }
  catch (error) {
    yield put(Creators.createThirdPartyCompanyFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* watchCreateThirdPartyCompanyRequest() {
  yield takeLatest(Types.CREATE_THIRD_PARTY_COMPANY_REQUEST, createThirdPartyCompanyRequest);
}

export default function* thirdPartyCompanyNewRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchCreateThirdPartyCompanyRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
