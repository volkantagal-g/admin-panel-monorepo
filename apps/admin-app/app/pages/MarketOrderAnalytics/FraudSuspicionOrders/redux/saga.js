import { all, call, cancel, delay, fork, put, take, takeLatest } from 'redux-saga/effects';

import { getFraudSuspicionOrders } from '@shared/api/marketOrderAnalytics';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { Creators, Types } from './actions';
import { setSelectedDomainTypeToLocalStorage } from './localStorage';

function* fetchFraudSuspicionOrders({ domainType, limit, offset }) {
  const data = yield call(getFraudSuspicionOrders, { domainType, offset, limit });
  yield put(Creators.getFraudSuspicionOrdersSuccess({ data }));
}
function* getFraudSuspicionOrdersRequest({ domainType, limit = 10, offset = 0 }) {
  try {
    yield call(fetchFraudSuspicionOrders, { domainType, offset, limit });
  }
  catch (error) {
    yield put(Creators.getFraudSuspicionOrdersFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
  finally {
    while (true) {
      yield delay(10000);
      yield call(fetchFraudSuspicionOrders, { domainType, limit, offset });
    }
  }
}

function* setSelectedDomainType() {
  while (true) {
    const { domainType } = yield take(Types.SET_SELECTED_DOMAIN_TYPE);
    setSelectedDomainTypeToLocalStorage(domainType);
    yield put({ type: Types.SET_SELECTED_DOMAIN_TYPE, domainType });
  }
}

function* watchGetFraudSuspicionOrdersRequest() {
  yield takeLatest(Types.GET_FRAUD_SUSPICION_ORDERS_REQUEST, getFraudSuspicionOrdersRequest);
}

export default function* root() {
  const backgroundTasks = yield all([
    fork(watchGetFraudSuspicionOrdersRequest),
    fork(setSelectedDomainType),
  ]);
  yield take(Types.DESTROY_PAGE);
  yield cancel(backgroundTasks);
}
