/* eslint-disable */
import { testSaga } from 'redux-saga-test-plan';

import { Creators, Types } from '../../actions';
import { Creators as ToastCreators } from '@app/redux/actions/toast';
import { createMarketProductCategoryAvailableTime } from '@app/api/marketProductCategoryAvailableTime';
import { createMarketProductCategoryAvailableTimeRequest, watchCreateMarketProductCategoryAvailableTimeRequest } from '../../saga';
import history from '@app/utils/history';
import { ROUTE } from '@app/routes';

describe('MarketProduct/Category/Visibility/New', () => {
  describe('#createMarketProductCategoryAvailableTimeRequest', () => {
    const fakeRequestData = { body: { name: 'Name' } };
    const fakeResponseData = { body: { name: 'Name' } };

    it('should call the createMarketProductCategoryAvailableTimeRequest (success)', () => {
      testSaga(createMarketProductCategoryAvailableTimeRequest, fakeRequestData)
        .next()
        .call(createMarketProductCategoryAvailableTime, fakeRequestData)
        .next(fakeResponseData)
        .put(ToastCreators.success())
        .next()
        .call(history.push, ROUTE.MARKET_PRODUCT_CATEGORY_VISIBILITY_LIST.path)
        .next()
        .put(Creators.createMarketProductCategoryAvailableTimeSuccess({ data: fakeResponseData }))
        .next()
        .isDone();
    });

    it('should call the createMarketProductCategoryAvailableTimeRequest (failure)', () => {
      const fakeError = new Error('Error occurred during creation');
      testSaga(createMarketProductCategoryAvailableTimeRequest, fakeRequestData)
        .next()
        .call(createMarketProductCategoryAvailableTime, fakeRequestData)
        .next(fakeResponseData)
        .throw(fakeError)
        .put(Creators.createMarketProductCategoryAvailableTimeFailure({ error: fakeError }))
        .next()
        .put(ToastCreators.error({ error: fakeError }))
        .next()
        .isDone();
    });
  });

  describe('saga #watchCreateMarketProductCategoryAvailableTimeRequest', () => {
    it('should call the watchCreateMarketProductCategoryAvailableTimeRequest', () => {
      testSaga(watchCreateMarketProductCategoryAvailableTimeRequest)
        .next()
        .takeLatest(Types.CREATE_MARKET_PRODUCT_CATEGORY_AVAILABLE_TIME_REQUEST, createMarketProductCategoryAvailableTimeRequest)
        .next()
        .isDone();
    });
  });
});
