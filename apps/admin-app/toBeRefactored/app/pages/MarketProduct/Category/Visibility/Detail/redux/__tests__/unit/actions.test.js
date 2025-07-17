/* eslint-disable */
import { describe, it, expect } from '@jest/globals';

import { Creators, Types } from '@app/pages/MarketProduct/Category/Visibility/Detail/redux/actions';

describe('MarketProduct/Category/Visibility/Detail', () => {
  describe('action-creator #getMarketProductCategoryAvailableTimeRequest', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.getMarketProductCategoryAvailableTimeRequest();
      const expectedAction = { type: Types.GET_MARKET_PRODUCT_CATEGORY_AVAILABLE_TIME_REQUEST, id: null };
      expect(receivedAction).toEqual(expectedAction);
    });

    it('receivedAction should equal to expectedAction (with args)', () => {
      const receivedAction = Creators.getMarketProductCategoryAvailableTimeRequest({ id: '123' });
      const expectedAction = { type: Types.GET_MARKET_PRODUCT_CATEGORY_AVAILABLE_TIME_REQUEST, id: '123' };
      expect(receivedAction).toEqual(expectedAction);
    });

    it('should ignore extra args', () => {
      const receivedAction = Creators.getMarketProductCategoryAvailableTimeRequest({
        id: '123',
        wrongArg: "I'am not a arg. of this func",
      });
      const expectedAction = { type: Types.GET_MARKET_PRODUCT_CATEGORY_AVAILABLE_TIME_REQUEST, id: '123' };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #getMarketProductCategoryAvailableTimeSuccess', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.getMarketProductCategoryAvailableTimeSuccess();
      const expectedAction = { type: Types.GET_MARKET_PRODUCT_CATEGORY_AVAILABLE_TIME_SUCCESS, data: {} };
      expect(receivedAction).toEqual(expectedAction);
    });

    it('receivedAction should equal to expectedAction (with args)', () => {
      const receivedAction = Creators.getMarketProductCategoryAvailableTimeSuccess({ data: { name: 'Name' } });
      const expectedAction = { type: Types.GET_MARKET_PRODUCT_CATEGORY_AVAILABLE_TIME_SUCCESS, data: { name: 'Name' } };
      expect(receivedAction).toEqual(expectedAction);
    });

    it('should ignore extra args', () => {
      const receivedAction = Creators.getMarketProductCategoryAvailableTimeSuccess({
        data: { name: 'Name' },
        wrongArg: "I'am not a arg. of this func",
      });
      const expectedAction = { type: Types.GET_MARKET_PRODUCT_CATEGORY_AVAILABLE_TIME_SUCCESS, data: { name: 'Name' } };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #getMarketProductCategoryAvailableTimeFailure', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.getMarketProductCategoryAvailableTimeFailure();
      const expectedAction = { type: Types.GET_MARKET_PRODUCT_CATEGORY_AVAILABLE_TIME_FAILURE, error: null };
      expect(receivedAction).toEqual(expectedAction);
    });

    it('receivedAction should equal to expectedAction (with args)', () => {
      const receivedAction = Creators.getMarketProductCategoryAvailableTimeFailure({ error: new Error('404 Not Found') });
      const expectedAction = { type: Types.GET_MARKET_PRODUCT_CATEGORY_AVAILABLE_TIME_FAILURE, error: new Error('404 Not Found') };
      expect(receivedAction).toEqual(expectedAction);
    });

    it('should ignore extra args', () => {
      const receivedAction = Creators.getMarketProductCategoryAvailableTimeFailure({
        error: new Error('404 Not Found'),
        wrongArg: "I'am not a arg. of this func",
      });
      const expectedAction = { type: Types.GET_MARKET_PRODUCT_CATEGORY_AVAILABLE_TIME_FAILURE, error: new Error('404 Not Found') };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #updateMarketProductCategoryAvailableTimeRequest', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.updateMarketProductCategoryAvailableTimeRequest();
      const expectedAction = { type: Types.UPDATE_MARKET_PRODUCT_CATEGORY_AVAILABLE_TIME_REQUEST, id: null, body: null };
      expect(receivedAction).toEqual(expectedAction);
    });

    it('receivedAction should equal to expectedAction (with args)', () => {
      const receivedAction = Creators.updateMarketProductCategoryAvailableTimeRequest({ id: '123', body: {} });
      const expectedAction = { type: Types.UPDATE_MARKET_PRODUCT_CATEGORY_AVAILABLE_TIME_REQUEST, id: '123', body: {} };
      expect(receivedAction).toEqual(expectedAction);
    });

    it('should ignore extra args', () => {
      const receivedAction = Creators.updateMarketProductCategoryAvailableTimeRequest({
        id: '123',
        body: {},
        wrongArg: "I'am not a arg. of this func",
      });
      const expectedAction = { type: Types.UPDATE_MARKET_PRODUCT_CATEGORY_AVAILABLE_TIME_REQUEST, id: '123', body: {} };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #updateMarketProductCategoryAvailableTimeSuccess', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.updateMarketProductCategoryAvailableTimeSuccess();
      const expectedAction = { type: Types.UPDATE_MARKET_PRODUCT_CATEGORY_AVAILABLE_TIME_SUCCESS };
      expect(receivedAction).toEqual(expectedAction);
    });

    it('should ignore any args', () => {
      const receivedAction = Creators.updateMarketProductCategoryAvailableTimeSuccess({ wrongArg: "I'am not a arg. of this func" });
      const expectedAction = { type: Types.UPDATE_MARKET_PRODUCT_CATEGORY_AVAILABLE_TIME_SUCCESS };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #updateMarketProductCategoryAvailableTimeFailure', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.updateMarketProductCategoryAvailableTimeFailure();
      const expectedAction = { type: Types.UPDATE_MARKET_PRODUCT_CATEGORY_AVAILABLE_TIME_FAILURE, error: null };
      expect(receivedAction).toEqual(expectedAction);
    });

    it('receivedAction should equal to expectedAction (with args)', () => {
      const receivedAction = Creators.updateMarketProductCategoryAvailableTimeFailure({ error: new Error('404 Not Found') });
      const expectedAction = { type: Types.UPDATE_MARKET_PRODUCT_CATEGORY_AVAILABLE_TIME_FAILURE, error: new Error('404 Not Found') };
      expect(receivedAction).toEqual(expectedAction);
    });

    it('should ignore extra args', () => {
      const receivedAction = Creators.updateMarketProductCategoryAvailableTimeFailure({
        error: new Error('404 Not Found'),
        wrongArg: "I'am not a arg. of this func",
      });
      const expectedAction = { type: Types.UPDATE_MARKET_PRODUCT_CATEGORY_AVAILABLE_TIME_FAILURE, error: new Error('404 Not Found') };
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
