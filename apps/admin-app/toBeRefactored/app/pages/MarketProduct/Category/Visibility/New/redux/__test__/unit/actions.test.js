/* eslint-disable */
import { describe, it, expect } from '@jest/globals';

import { Creators, Types } from '@app/pages/MarketProduct/Category/Visibility/New/redux/actions';

describe('MarketProduct/Category/Visibility/New', () => {
  describe('action-creator #createMarketProductCategoryAvailableTimeRequest', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.createMarketProductCategoryAvailableTimeRequest();
      const expectedAction = { type: Types.CREATE_MARKET_PRODUCT_CATEGORY_AVAILABLE_TIME_REQUEST, body: null };
      expect(receivedAction).toEqual(expectedAction);
    });

    it('receivedAction should equal to expectedAction (with args)', () => {
      const receivedAction = Creators.createMarketProductCategoryAvailableTimeRequest({ body: { name: 'Name' } });
      const expectedAction = { type: Types.CREATE_MARKET_PRODUCT_CATEGORY_AVAILABLE_TIME_REQUEST, body: { name: 'Name' } };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #createMarketProductCategoryAvailableTimeSuccess', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.createMarketProductCategoryAvailableTimeSuccess({ data: [{ name: 'name' }] });
      const expectedAction = { type: Types.CREATE_MARKET_PRODUCT_CATEGORY_AVAILABLE_TIME_SUCCESS, data: [{ name: 'name' }] };
      expect(receivedAction).toEqual(expectedAction);
    });

    it('should return empty array if no arg provided', () => {
      const receivedAction = Creators.createMarketProductCategoryAvailableTimeSuccess();
      const expectedAction = { type: Types.CREATE_MARKET_PRODUCT_CATEGORY_AVAILABLE_TIME_SUCCESS, data: [] };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #createMarketProductCategoryAvailableTimeFailure', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.createMarketProductCategoryAvailableTimeFailure();
      const expectedAction = { type: Types.CREATE_MARKET_PRODUCT_CATEGORY_AVAILABLE_TIME_FAILURE, error: null };
      expect(receivedAction).toEqual(expectedAction);
    });

    it('receivedAction should equal to expectedAction (with args)', () => {
      const receivedAction = Creators.createMarketProductCategoryAvailableTimeFailure({ error: new Error('404 Not Found') });
      const expectedAction = { type: Types.CREATE_MARKET_PRODUCT_CATEGORY_AVAILABLE_TIME_FAILURE, error: new Error('404 Not Found') };
      expect(receivedAction).toEqual(expectedAction);
    });

    it('should ignore extra args', () => {
      const receivedAction = Creators.createMarketProductCategoryAvailableTimeFailure({
        error: new Error('404 Not Found'),
        wrongArg: "I'am not a arg. of this func",
      });
      const expectedAction = { type: Types.CREATE_MARKET_PRODUCT_CATEGORY_AVAILABLE_TIME_FAILURE, error: new Error('404 Not Found') };
      expect(receivedAction).toEqual(expectedAction);
    });
  });
  describe('action-creator #initPage', () => {
    it('receivedAction should equal to expectedAction', () => {
      const receivedAction = Creators.initPage();
      const expectedAction = { type: Types.INIT_PAGE };
      expect(receivedAction).toEqual(expectedAction);
    });
  });
  describe('action-creator #destroyPage', () => {
    it('receivedAction should equal to expectedAction', () => {
      const receivedAction = Creators.destroyPage();
      const expectedAction = { type: Types.DESTROY_PAGE };
      expect(receivedAction).toEqual(expectedAction);
    });
  });
});
