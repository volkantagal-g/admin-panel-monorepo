import { testSaga } from 'redux-saga-test-plan';

import {
  getMarketProductsRequest,
  watchGetMarketProductsRequest,
} from '@app/pages/MarketProduct/ListV2/redux/saga';
import { Creators, Types } from '@app/pages/MarketProduct/ListV2/redux/actions';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { getMarketProducts } from '@shared/api/marketProduct';
import { PROJECT_FIELDS_FOR_TABLE } from '@app/pages/MarketProduct/ListV2/constants';

describe('MarketProduct/List', () => {
  describe('saga #getMarketProductsRequest', () => {
    const fakeRequestData = {
      limit: 1,
      offset: 0,
      queryText: 'Apple',
      statusList: undefined,
      filterOptions: {},
      ids: [],
      fields: PROJECT_FIELDS_FOR_TABLE,
      hasTotalCount: true,
    };

    const fakeResponseData = [{ _id: '123', name: 'Name' }];

    it('should call the getMarketProductsRequest (success)', () => {
      testSaga(getMarketProductsRequest, fakeRequestData)
        .next()
        .call(getMarketProducts, fakeRequestData)
        .next(fakeResponseData)
        .put(Creators.getMarketProductsSuccess({ data: fakeResponseData }))
        .next()
        .isDone();
    });

    it('should call the getMarketProductsRequest (failure)', () => {
      const fakeError = new Error('404 Not Found');
      testSaga(getMarketProductsRequest, fakeRequestData)
        .next()
        .call(getMarketProducts, fakeRequestData)
        .next(fakeResponseData)
        .throw(fakeError)
        .put(Creators.getMarketProductsFailure({ error: fakeError }))
        .next()
        .put(ToastCreators.error({ error: fakeError }))
        .next()
        .isDone();
    });
  });

  describe('saga #watchGetMarketProductsRequest', () => {
    it('should call the watchGetMarketProductsRequest', () => {
      testSaga(watchGetMarketProductsRequest)
        .next()
        .takeLatest(Types.GET_MARKET_PRODUCTS_REQUEST, getMarketProductsRequest)
        .next()
        .isDone();
    });
  });
});
