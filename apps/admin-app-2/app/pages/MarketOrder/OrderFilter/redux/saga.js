import {
  all,
  call,
  cancel,
  fork,
  put,
  take,
  takeLatest,
} from 'redux-saga/effects';

import { getOrdersByFilters } from '@shared/api/marketOrderAnalytics';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { Creators, Types } from './actions';
import { setSelectedDomainTypeToLocalStorage } from './localStorage';
import { removeEmptyOrNullValues } from '../utils';

export function* getFilteredOrdersRequest({
  city,
  errorCode,
  deviceTypes,
  domainType,
  warehouse,
  client,
  statuses,
  createdAtStart,
  createdAtEnd,
  limit = 10,
  offset = 0,
  referenceId,
  integrationType,
  excludedIntegrationTypes,
  initialStatusForSuccessDuration,
  minDuration,
  maxDuration,
  isSlottedDelivery,
  isFresh,
}) {
  try {
    const payload = removeEmptyOrNullValues({
      domainType,
      offset,
      limit,
      city,
      warehouse,
      client,
      statuses,
      errorCode,
      deviceTypes,
      createdAtStart,
      createdAtEnd,
      referenceId,
      integrationType,
      excludedIntegrationTypes,
      initialStatusForSuccessDuration,
      isSlottedDelivery,
      isFresh,
      minDurationInMinutesForSuccessDuration: minDuration,
      maxDurationInMinutesForSuccessDuration: maxDuration,
      doNotSortByUpdatedAt: true,
      sortOptions: { checkoutDateL: -1, status: 1 },
    });
    const data = yield call(getOrdersByFilters, payload);
    yield put(Creators.getFilteredOrdersSuccess({ data }));
    yield put(Creators.setLastUsedFilters({
      lastUsedFilters: {
        // only need these, add others if needed
        statuses,
        initialStatusForSuccessDuration,
      },
    }));
  }
  catch (error) {
    yield put(Creators.getFilteredOrdersFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* setSelectedDomainType() {
  while (true) {
    const { domainType } = yield take(Types.SET_SELECTED_DOMAIN_TYPE);
    setSelectedDomainTypeToLocalStorage(domainType);
    yield put({ type: Types.SET_SELECTED_DOMAIN_TYPE, domainType });
  }
}

export function* setSelectedCity() {
  while (true) {
    const { city } = yield take(Types.SET_SELECTED_CITY);
    yield put({ type: Types.SET_SELECTED_CITY, city });
  }
}

export function* watchGetFilteredOrdersRequest() {
  yield takeLatest(
    Types.GET_FILTERED_ORDERS_REQUEST,
    getFilteredOrdersRequest,
  );
}

export default function* root() {
  const backgroundTasks = yield all([
    fork(watchGetFilteredOrdersRequest),
    fork(setSelectedDomainType),
    fork(setSelectedCity),
  ]);

  yield take(Types.DESTROY_PAGE);

  yield cancel(backgroundTasks);
}
