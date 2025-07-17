import { testSaga } from 'redux-saga-test-plan';

import { Creators, Types } from '@app/pages/MarketOrder/OrderFilter/redux/actions';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { mockedMarketOrders } from '@shared/api/marketOrderAnalytics/index.mock.data';
import { getOrdersByFilters } from '@shared/api/marketOrderAnalytics';
import { getFilteredOrdersRequest, watchGetFilteredOrdersRequest } from '@app/pages/MarketOrder/OrderFilter/redux/saga';
import { removeEmptyOrNullValues } from '../utils';

describe('OrderFilter', () => {
  describe('saga #getFilteredOrdersRequest', () => {
    const fakeRequestData = {
      city: null,
      errorCode: null,
      deviceTypes: null,
      domainType: 1,
      warehouse: null,
      client: null,
      statuses: [],
      createdAtStart: new Date(),
      createdAtEnd: new Date(),
      limit: 10,
      offset: 0,
      referenceId: null,
      integrationType: null,
      initialStatusForSuccessDuration: null,
      minDuration: null,
      maxDuration: null,
      isSlottedDelivery: false,
      doNotSortByUpdatedAt: true,
      sortOptions: { checkoutDateL: -1, status: 1 },
    };
    const fakeResponseData = mockedMarketOrders;
    const payload = removeEmptyOrNullValues(fakeRequestData);

    it('should call the getFilteredOrdersRequest (success)', () => {
      testSaga(getFilteredOrdersRequest, fakeRequestData)
        .next()
        .call(getOrdersByFilters, payload)
        .next(fakeResponseData)
        .put(
          Creators.getFilteredOrdersSuccess({ data: fakeResponseData }),
        )
        .next()
        .put((Creators.setLastUsedFilters({ lastUsedFilters: { statuses: [], initialStatusForSuccessDuration: null } })))
        .next()
        .isDone();
    });

    it('should call the getFilteredOrdersRequest (failure)', () => {
      const fakeError = new Error('404 Not Found');
      testSaga(getFilteredOrdersRequest, fakeRequestData)
        .next()
        .call(getOrdersByFilters, payload)
        .next(fakeResponseData)
        .throw(fakeError)
        .put(Creators.getFilteredOrdersFailure({ error: fakeError }))
        .next()
        .put(ToastCreators.error({ error: fakeError }))
        .next()
        .isDone();
    });
  });

  describe('saga #watchGetFilteredOrdersRequest', () => {
    it('should call the watchGetFilteredOrdersRequest', () => {
      testSaga(watchGetFilteredOrdersRequest)
        .next()
        .takeLatest(
          Types.GET_FILTERED_ORDERS_REQUEST,
          getFilteredOrdersRequest,
        )
        .next()
        .isDone();
    });
  });
});
