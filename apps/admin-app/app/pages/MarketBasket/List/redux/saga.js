import {
  all,
  call,
  cancel,
  fork,
  put,
  take,
  takeLatest,
} from 'redux-saga/effects';
import moment from 'moment-timezone';

import { getMarketBaskets } from '@shared/api/marketAdminPanel';

import { Types, Creators } from './actions';
import { removeEmptyOrNullValues } from '@app/pages/MarketOrder/OrderFilter/utils';
import { getDeviceTypes } from '@app/pages/MarketOrder/OrderFilter/components/Filter/utils';

function* getMarketBasketsRequest({
  cityId,
  deviceTypes,
  domainType,
  endDateTime,
  startDateTime,
  statuses,
  clientId,
  limit,
  page,
}) {
  try {
    const basketFilters = removeEmptyOrNullValues({
      cityId,
      deviceTypes,
      domainType,
      endDateTime,
      startDateTime,
      statuses,
      clientId,
      limit,
      page,
    });
    if (basketFilters?.deviceTypes) {
      Object.assign(basketFilters, { deviceTypes: getDeviceTypes(basketFilters?.deviceTypes)?.map(deviceType => deviceType?.toLowerCase()) });
    }
    if (basketFilters?.statuses) {
      Object.assign(basketFilters, { statuses: statuses?.map(status => Number(status)) });
    }
    const { baskets } = yield call(getMarketBaskets, {
      ...basketFilters,
      domainType: Number(basketFilters?.domainType),
    });
    yield put(Creators.getMarketBasketsSuccess({ data: baskets }));
    yield put(
      Creators.setFilters({
        filters: {
          cityId,
          deviceTypes,
          domainType,
          statuses,
          clientId,
          selectedDateRange: {
            startDate: moment(startDateTime),
            endDate: moment(endDateTime),
          },
          pagination: {
            currentPage: basketFilters?.page,
            rowsPerPage: basketFilters?.limit,
          },
        },
      }),
    );
  }
  catch (error) {
    yield put(Creators.getMarketBasketsFailure({ error }));
  }
}

function* watchGetMarketBasketsRequest() {
  yield takeLatest(Types.GET_MARKET_BASKETS_REQUEST, getMarketBasketsRequest);
}

export default function* marketBasketListPagePageRootSaga() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([fork(watchGetMarketBasketsRequest)]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
