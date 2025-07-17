import { all, call, cancel, fork, put, take, takeLatest } from 'redux-saga/effects';

import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { getByFilters } from '@shared/api/serviceAvailablityArea';
import { getSelectedCountry } from '@shared/redux/selectors/countrySelection';

import { Types, Creators } from './actions';
import { getFormattedFilterRequestBody } from '../../utils';

function* getSaasRequest({ domainType }) {
  const country = getSelectedCountry();
  const body = getFormattedFilterRequestBody({ domainType, country });

  try {
    const dataFetched = yield call(getByFilters, body);

    yield put(Creators.getSaasSuccess({ data: dataFetched }));
  }
  catch (error) {
    yield put(Creators.getSaasFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}
function* watchSaasRequest() {
  yield takeLatest(Types.GET_SAAS_REQUEST, getSaasRequest);
}

export default function* root() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([fork(watchSaasRequest)]);
    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
