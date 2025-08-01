/* eslint-disable */
import { testSaga } from 'redux-saga-test-plan';
import { describe, it } from '@jest/globals';

import {
  getBadgesRequest,
  getMarketProductBadgesRequest,
  watchGetBadgesRequest,
  updateMarketProductBadgesBulkRequest,
  watchGetMarketProductBadgesRequest,
  watchUpdateMarketProductBadgesBulkRequest,
  setSelectedBadge,
  watchSetSelectedBadge,
} from '@app/pages/MarketProduct/Badge/List/redux/saga';
import { Creators, Types } from '@app/pages/MarketProduct/Badge/List/redux/actions';
import { Creators as ToastCreators } from '@app/redux/actions/toast';
import { getBadges, getMarketProductBadges, updateMarketProductBadgesBulk } from '@app/api/marketProductBadge';

describe('MarketProduct/Badge/List', () => {
  describe('saga #getBadgesRequest', () => {
    const fakeRequestData = { limit: 1, offset: 0 };
    const fakeResponseData = [{ _id: '123', name: 'BadgeName' }];

    it('should call the getBadgesRequest (success)', () => {
      testSaga(getBadgesRequest, fakeRequestData)
        .next()
        .call(getBadges, fakeRequestData)
        .next(fakeResponseData)
        .put(Creators.getBadgesSuccess({ data: fakeResponseData }))
        .next()
        .isDone();
    });

    it('should call the getBadgesRequest (failure)', () => {
      const fakeError = new Error('404 Not Found');
      testSaga(getBadgesRequest, fakeRequestData)
        .next()
        .call(getBadges, fakeRequestData)
        .next(fakeResponseData)
        .throw(fakeError)
        .put(Creators.getBadgesFailure({ error: fakeError }))
        .next()
        .put(ToastCreators.error({ error: fakeError }))
        .next()
        .isDone();
    });
  });

  describe('saga #getMarketProductBadgesRequest', () => {
    const fakeRequestData = { badgeId: '123' };
    const fakeResponseData = { _id: '123', name: 'BadgeName' };

    it('should call the getMarketProductBadgesRequest (success)', () => {
      testSaga(getMarketProductBadgesRequest, fakeRequestData)
        .next()
        .call(getMarketProductBadges, fakeRequestData)
        .next(fakeResponseData)
        .put(Creators.getMarketProductBadgesSuccess({ data: fakeResponseData }))
        .next()
        .isDone();
    });

    it('should call the getMarketProductBadgesRequest (failure)', () => {
      const fakeError = new Error('404 Not Found');
      testSaga(getMarketProductBadgesRequest, fakeRequestData)
        .next()
        .call(getMarketProductBadges, fakeRequestData)
        .next(fakeResponseData)
        .throw(fakeError)
        .put(Creators.getMarketProductBadgesFailure({ error: fakeError }))
        .next()
        .put(ToastCreators.error({ error: fakeError }))
        .next()
        .isDone();
    });
  });
  describe('saga #updateMarketProductBadgesBulkRequest', () => {
    const fakeRequestData = { badgeId: '123', productIds: [] };
    const fakeResponseData = { _id: '123', productIds: [] };

    it('should call the updateMarketProductBadgesBulkRequest (success)', () => {
      testSaga(updateMarketProductBadgesBulkRequest, fakeRequestData)
        .next()
        .call(updateMarketProductBadgesBulk, fakeRequestData)
        .next(fakeResponseData)
        .put(Creators.updateMarketProductBadgesBulkSuccess({ data: fakeResponseData }))
        .next()
        .put(Creators.getMarketProductBadgesRequest({ badgeId: '123' }))
        .next()
        .isDone();
    });

    it('should call the updateMarketProductBadgesBulkRequest (failure)', () => {
      const fakeError = new Error('404 Not Found');
      testSaga(updateMarketProductBadgesBulkRequest, fakeRequestData)
        .next()
        .call(updateMarketProductBadgesBulk, fakeRequestData)
        .next(fakeResponseData)
        .throw(fakeError)
        .put(Creators.updateMarketProductBadgesBulkFailure({ error: fakeError }))
        .next()
        .put(ToastCreators.error({ error: fakeError }))
        .next()
        .isDone();
    });
  });
  describe('saga #setSelectedBadge', () => {
    const fakeRequestData = { badge: '123' };
    const fakeResponseData = { badge: '123' };

    it('should call the setSelectedBadge', () => {
      testSaga(setSelectedBadge, fakeRequestData)
        .next(fakeResponseData)
        .put(Creators.setSelectedBadge(fakeResponseData))
        .next()
        .isDone();
    });
  });

  describe('saga #watchGetBadgesRequest', () => {
    it('should call the watchGetBadgesRequest', () => {
      testSaga(watchGetBadgesRequest)
        .next()
        .takeLatest(Types.GET_BADGES_REQUEST, getBadgesRequest)
        .next()
        .isDone();
    });
  });

  describe('saga #watchGetMarketProductBadgesRequest', () => {
    it('should call the watchGetMarketProductBadgesRequest', () => {
      testSaga(watchGetMarketProductBadgesRequest)
        .next()
        .takeLatest(Types.GET_MARKET_PRODUCT_BADGES_REQUEST, getMarketProductBadgesRequest)
        .next()
        .isDone();
    });
  });

  describe('saga #watchUpdateMarketProductBadgesBulkRequest', () => {
    it('should call the watchUpdateMarketProductBadgesBulkRequest', () => {
      testSaga(watchUpdateMarketProductBadgesBulkRequest)
        .next()
        .takeLatest(Types.UPDATE_MARKET_PRODUCT_BADGES_BULK_REQUEST, updateMarketProductBadgesBulkRequest)
        .next()
        .isDone();
    });
  });
});
