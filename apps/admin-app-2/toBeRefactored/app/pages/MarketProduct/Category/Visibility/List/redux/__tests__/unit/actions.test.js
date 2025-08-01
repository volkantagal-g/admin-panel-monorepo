/* eslint-disable */
import { describe, it, expect } from '@jest/globals';

import { Creators, Types } from '@app/pages/MarketProduct/Category/Visibility/List/redux/actions';

describe('MarketProduct/Category/Visibility/List', () => {
  describe('action-creator #getMarketProductCategoryAvailableTimesRequest', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.getMarketProductCategoryAvailableTimesRequest();
      const expectedAction = { type: Types.GET_MARKET_PRODUCT_CATEGORY_AVAILABLE_TIMES_REQUEST, id: null };
      expect(receivedAction).toEqual(expectedAction);
    });

    it('receivedAction should equal to expectedAction (with args)', () => {
      const receivedAction = Creators.getMarketProductCategoryAvailableTimesRequest();
      const expectedAction = { type: Types.GET_MARKET_PRODUCT_CATEGORY_AVAILABLE_TIMES_REQUEST };
      expect(receivedAction).toEqual(expectedAction);
    });
  });
  describe('action-creator #getMarketProductCategoryAvailableTimesSuccess', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.getMarketProductCategoryAvailableTimesSuccess();
      const expectedAction = { type: Types.GET_MARKET_PRODUCT_CATEGORY_AVAILABLE_TIMES_SUCCESS, data: [] };
      expect(receivedAction).toEqual(expectedAction);
    });

    it('receivedAction should equal to expectedAction (with args)', () => {
      const receivedAction = Creators.getMarketProductCategoryAvailableTimesSuccess({ data: [{ name: 'Name' }] });
      const expectedAction = { type: Types.GET_MARKET_PRODUCT_CATEGORY_AVAILABLE_TIMES_SUCCESS, data: [{ name: 'Name' }] };
      expect(receivedAction).toEqual(expectedAction);
    });

    it('should ignore extra args', () => {
      const receivedAction = Creators.getMarketProductCategoryAvailableTimesSuccess({
        data: [{ name: 'Name' }],
        wrongArg: "I'am not a arg. of this func",
      });
      const expectedAction = { type: Types.GET_MARKET_PRODUCT_CATEGORY_AVAILABLE_TIMES_SUCCESS, data: [{ name: 'Name' }] };
      expect(receivedAction).toEqual(expectedAction);
    });
  });
  describe('action-creator #getMarketProductCategoryAvailableTimesFailure', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.getMarketProductCategoryAvailableTimesFailure();
      const expectedAction = { type: Types.GET_MARKET_PRODUCT_CATEGORY_AVAILABLE_TIMES_FAILURE, error: null };
      expect(receivedAction).toEqual(expectedAction);
    });

    it('receivedAction should equal to expectedAction (with args)', () => {
      const receivedAction = Creators.getMarketProductCategoryAvailableTimesFailure({ error: new Error('404 Not Found') });
      const expectedAction = { type: Types.GET_MARKET_PRODUCT_CATEGORY_AVAILABLE_TIMES_FAILURE, error: new Error('404 Not Found') };
      expect(receivedAction).toEqual(expectedAction);
    });

    it('should ignore extra args', () => {
      const receivedAction = Creators.getMarketProductCategoryAvailableTimesFailure({
        error: new Error('404 Not Found'),
        wrongArg: "I'am not a arg. of this func",
      });
      const expectedAction = { type: Types.GET_MARKET_PRODUCT_CATEGORY_AVAILABLE_TIMES_FAILURE, error: new Error('404 Not Found') };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #deactivateMarketProductCategoryAvailableTimeRequest', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.deactivateMarketProductCategoryAvailableTimeRequest();
      const expectedAction = { type: Types.DEACTIVATE_MARKET_PRODUCT_CATEGORY_AVAILABLE_TIME_REQUEST, id: null };
      expect(receivedAction).toEqual(expectedAction);
    });

    it('receivedAction should equal to expectedAction (with args)', () => {
      const receivedAction = Creators.deactivateMarketProductCategoryAvailableTimeRequest({ id: '123' });
      const expectedAction = { type: Types.DEACTIVATE_MARKET_PRODUCT_CATEGORY_AVAILABLE_TIME_REQUEST, id: '123' };
      expect(receivedAction).toEqual(expectedAction);
    });

    it('should ignore extra args', () => {
      const receivedAction = Creators.deactivateMarketProductCategoryAvailableTimeRequest({
        id: '123',
        wrongArg: "I'am not a arg. of this func",
      });
      const expectedAction = { type: Types.DEACTIVATE_MARKET_PRODUCT_CATEGORY_AVAILABLE_TIME_REQUEST, id: '123' };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #deactivateMarketProductCategoryAvailableTimeSuccess', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.deactivateMarketProductCategoryAvailableTimeSuccess();
      const expectedAction = { type: Types.DEACTIVATE_MARKET_PRODUCT_CATEGORY_AVAILABLE_TIME_SUCCESS };
      expect(receivedAction).toEqual(expectedAction);
    });

    it('should ignore extra args', () => {
      const receivedAction = Creators.deactivateMarketProductCategoryAvailableTimeSuccess({ wrongArg: "I'am not a arg. of this func" });
      const expectedAction = { type: Types.DEACTIVATE_MARKET_PRODUCT_CATEGORY_AVAILABLE_TIME_SUCCESS };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #deactivateMarketProductCategoryAvailableTimeFailure', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.deactivateMarketProductCategoryAvailableTimeFailure();
      const expectedAction = { type: Types.DEACTIVATE_MARKET_PRODUCT_CATEGORY_AVAILABLE_TIME_FAILURE, error: null };
      expect(receivedAction).toEqual(expectedAction);
    });

    it('receivedAction should equal to expectedAction (with args)', () => {
      const receivedAction = Creators.deactivateMarketProductCategoryAvailableTimeFailure({ error: new Error('404 Not Found') });
      const expectedAction = { type: Types.DEACTIVATE_MARKET_PRODUCT_CATEGORY_AVAILABLE_TIME_FAILURE, error: new Error('404 Not Found') };
      expect(receivedAction).toEqual(expectedAction);
    });

    it('should ignore extra args', () => {
      const receivedAction = Creators.deactivateMarketProductCategoryAvailableTimeFailure({
        error: new Error('404 Not Found'),
        wrongArg: "I'am not a arg. of this func",
      });
      const expectedAction = { type: Types.DEACTIVATE_MARKET_PRODUCT_CATEGORY_AVAILABLE_TIME_FAILURE, error: new Error('404 Not Found') };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #setFilters', () => {
    it('receivedAction should equal to expectedAction', () => {
      const filters = { city: '1234', warehouse: '12345' };
      const receivedAction = Creators.setFilters({ data: filters });
      const expectedAction = { type: Types.SET_FILTERS, data: filters };
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
