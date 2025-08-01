/* eslint-disable */
import { describe, it, expect } from '@jest/globals';

import { Creators, Types } from '@app/pages/MarketProduct/Badge/List/redux/actions';

describe('MarketProduct/Badge/List', () => {
  describe('action-creator #getBadgesRequest', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.getBadgesRequest({});
      const expectedAction = { type: Types.GET_BADGES_REQUEST, limit: 10, offset: 0 };
      expect(receivedAction).toEqual(expectedAction);
    });

    it('receivedAction should equal to expectedAction (with args)', () => {
      const receivedAction = Creators.getBadgesRequest({ limit: 5, offset: 0 });
      const expectedAction = { type: Types.GET_BADGES_REQUEST, limit: 5, offset: 0 };
      expect(receivedAction).toEqual(expectedAction);
    });
  });
  describe('action-creator #getBadgesSuccess', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.getBadgesSuccess();
      const expectedAction = { type: Types.GET_BADGES_SUCCESS, data: [] };
      expect(receivedAction).toEqual(expectedAction);
    });

    it('receivedAction should equal to expectedAction (with args)', () => {
      const receivedAction = Creators.getBadgesSuccess({ data: [{ name: 'BadgeName' }] });
      const expectedAction = { type: Types.GET_BADGES_SUCCESS, data: [{ name: 'BadgeName' }] };
      expect(receivedAction).toEqual(expectedAction);
    });

    it('should ignore extra args', () => {
      const receivedAction = Creators.getBadgesSuccess({ data: [{ name: 'BadgeName' }], wrongArg: "I'am not a arg. of this func" });
      const expectedAction = { type: Types.GET_BADGES_SUCCESS, data: [{ name: 'BadgeName' }] };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #getBadgesFailure', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.getBadgesFailure();
      const expectedAction = { type: Types.GET_BADGES_FAILURE, error: null };
      expect(receivedAction).toEqual(expectedAction);
    });

    it('receivedAction should equal to expectedAction (with args)', () => {
      const receivedAction = Creators.getBadgesFailure({ error: new Error('404 Not Found') });
      const expectedAction = { type: Types.GET_BADGES_FAILURE, error: new Error('404 Not Found') };
      expect(receivedAction).toEqual(expectedAction);
    });

    it('should ignore extra args', () => {
      const receivedAction = Creators.getBadgesFailure({ error: new Error('404 Not Found'), wrongArg: "I'am not a arg. of this func" });
      const expectedAction = { type: Types.GET_BADGES_FAILURE, error: new Error('404 Not Found') };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #getMarketProductBadgesRequest', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.getMarketProductBadgesRequest();
      const expectedAction = { type: Types.GET_MARKET_PRODUCT_BADGES_REQUEST, badgeId: null };
      expect(receivedAction).toEqual(expectedAction);
    });

    it('receivedAction should equal to expectedAction (with args)', () => {
      const receivedAction = Creators.getMarketProductBadgesRequest({ badgeId: '123' });
      const expectedAction = { type: Types.GET_MARKET_PRODUCT_BADGES_REQUEST, badgeId: '123' };
      expect(receivedAction).toEqual(expectedAction);
    });

    it('should ignore extra args', () => {
      const receivedAction = Creators.getMarketProductBadgesRequest({
        badgeId: '123',
        wrongArg: "I'am not a arg. of this func",
      });
      const expectedAction = { type: Types.GET_MARKET_PRODUCT_BADGES_REQUEST, badgeId: '123' };
      expect(receivedAction).toEqual(expectedAction);
    });
  });
  describe('action-creator #getMarketProductBadgesSuccess', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.getMarketProductBadgesSuccess();
      const expectedAction = { type: Types.GET_MARKET_PRODUCT_BADGES_SUCCESS, data: [] };
      expect(receivedAction).toEqual(expectedAction);
    });

    it('receivedAction should equal to expectedAction (with args)', () => {
      const receivedAction = Creators.getMarketProductBadgesSuccess({ data: [{ name: 'Badge Name' }] });
      const expectedAction = { type: Types.GET_MARKET_PRODUCT_BADGES_SUCCESS, data: [{ name: 'Badge Name' }] };
      expect(receivedAction).toEqual(expectedAction);
    });

    it('should ignore extra args', () => {
      const receivedAction = Creators.getMarketProductBadgesSuccess({
        data: [{ name: 'Badge Name' }],
        wrongArg: "I'am not a arg. of this func",
      });
      const expectedAction = { type: Types.GET_MARKET_PRODUCT_BADGES_SUCCESS, data: [{ name: 'Badge Name' }] };
      expect(receivedAction).toEqual(expectedAction);
    });
  });
  describe('action-creator #getMarketProductBadgesFailure', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.getMarketProductBadgesFailure();
      const expectedAction = { type: Types.GET_MARKET_PRODUCT_BADGES_FAILURE, error: null };
      expect(receivedAction).toEqual(expectedAction);
    });

    it('receivedAction should equal to expectedAction (with args)', () => {
      const receivedAction = Creators.getMarketProductBadgesFailure({ error: new Error('404 Not Found') });
      const expectedAction = { type: Types.GET_MARKET_PRODUCT_BADGES_FAILURE, error: new Error('404 Not Found') };
      expect(receivedAction).toEqual(expectedAction);
    });

    it('should ignore extra args', () => {
      const receivedAction = Creators.getMarketProductBadgesFailure({
        error: new Error('404 Not Found'),
        wrongArg: "I'am not a arg. of this func",
      });
      const expectedAction = { type: Types.GET_MARKET_PRODUCT_BADGES_FAILURE, error: new Error('404 Not Found') };
      expect(receivedAction).toEqual(expectedAction);
    });
  });
  describe('action-creator #updateMarketProductBadgesBulkRequest', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.updateMarketProductBadgesBulkRequest();
      const expectedAction = { type: Types.UPDATE_MARKET_PRODUCT_BADGES_BULK_REQUEST, badgeId: null, productIds: [] };
      expect(receivedAction).toEqual(expectedAction);
    });

    it('receivedAction should equal to expectedAction (with args)', () => {
      const receivedAction = Creators.updateMarketProductBadgesBulkRequest({ badgeId: '123' });
      const expectedAction = { type: Types.UPDATE_MARKET_PRODUCT_BADGES_BULK_REQUEST, badgeId: '123', productIds: [] };
      expect(receivedAction).toEqual(expectedAction);
    });

    it('should ignore extra args', () => {
      const receivedAction = Creators.updateMarketProductBadgesBulkRequest({
        badgeId: '123',
        wrongArg: "I'am not a arg. of this func",
      });
      const expectedAction = { type: Types.UPDATE_MARKET_PRODUCT_BADGES_BULK_REQUEST, badgeId: '123', productIds: [] };
      expect(receivedAction).toEqual(expectedAction);
    });
  });
  describe('action-creator #updateMarketProductBadgesBulkSuccess', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.updateMarketProductBadgesBulkSuccess();
      const expectedAction = { type: Types.UPDATE_MARKET_PRODUCT_BADGES_BULK_SUCCESS, data: {} };
      expect(receivedAction).toEqual(expectedAction);
    });

    it('receivedAction should equal to expectedAction (with args)', () => {
      const receivedAction = Creators.updateMarketProductBadgesBulkSuccess({ data: { _id: '123', name: 'Badge Name' } });
      const expectedAction = { type: Types.UPDATE_MARKET_PRODUCT_BADGES_BULK_SUCCESS, data: { _id: '123', name: 'Badge Name' } };
      expect(receivedAction).toEqual(expectedAction);
    });

    it('should ignore extra args', () => {
      const receivedAction = Creators.updateMarketProductBadgesBulkSuccess({
        data: { _id: '123', name: 'Badge Name' },
        wrongArg: "I'am not a arg. of this func",
      });
      const expectedAction = { type: Types.UPDATE_MARKET_PRODUCT_BADGES_BULK_SUCCESS, data: { _id: '123', name: 'Badge Name' } };
      expect(receivedAction).toEqual(expectedAction);
    });
  });
  describe('action-creator #updateMarketProductBadgesBulkFailure', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.updateMarketProductBadgesBulkFailure();
      const expectedAction = { type: Types.UPDATE_MARKET_PRODUCT_BADGES_BULK_FAILURE, error: null };
      expect(receivedAction).toEqual(expectedAction);
    });

    it('receivedAction should equal to expectedAction (with args)', () => {
      const receivedAction = Creators.updateMarketProductBadgesBulkFailure({ error: new Error('404 Not Found') });
      const expectedAction = { type: Types.UPDATE_MARKET_PRODUCT_BADGES_BULK_FAILURE, error: new Error('404 Not Found') };
      expect(receivedAction).toEqual(expectedAction);
    });

    it('should ignore extra args', () => {
      const receivedAction = Creators.updateMarketProductBadgesBulkFailure({
        error: new Error('404 Not Found'),
        wrongArg: "I'am not a arg. of this func",
      });
      const expectedAction = { type: Types.UPDATE_MARKET_PRODUCT_BADGES_BULK_FAILURE, error: new Error('404 Not Found') };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #setSelectedBadge', () => {
    it('receivedAction should equal to expectedAction', () => {
      const receivedAction = Creators.setSelectedBadge({ badge: 'Badge Name' });
      const expectedAction = { type: Types.SET_SELECTED_BADGE, badge: 'Badge Name' };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #initPage', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.initPage();
      const expectedAction = { type: Types.INIT_PAGE };
      expect(receivedAction).toEqual(expectedAction);
    });

    it('should ignore any args', () => {
      const receivedAction = Creators.initPage({ wrongArg: "I'am not a arg. of this func" });
      const expectedAction = { type: Types.INIT_PAGE };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #destroyPage', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.destroyPage();
      const expectedAction = { type: Types.DESTROY_PAGE };
      expect(receivedAction).toEqual(expectedAction);
    });

    it('should ignore any args', () => {
      const receivedAction = Creators.destroyPage({ wrongArg: "I'am not a arg. of this func" });
      const expectedAction = { type: Types.DESTROY_PAGE };
      expect(receivedAction).toEqual(expectedAction);
    });
  });
});
