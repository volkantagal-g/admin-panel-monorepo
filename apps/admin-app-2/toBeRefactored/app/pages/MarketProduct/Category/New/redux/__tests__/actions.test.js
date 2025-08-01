/* eslint-disable */
import { describe, it, expect } from '@jest/globals';

import { Creators, Types } from '@app/pages/MarketProduct/Category/New/redux/actions';

describe('MaeketProduct/Category/New', () => {
  describe('action-creator #getMarketProductCategoriesRequest', () => {
    it('receiveAction should be equal to expectedAction', () => {
      const receiveAction = Creators.getMarketProductCategoriesRequest();
      const expectedAction = { type: Types.GET_MARKET_PRODUCT_CATEGORIES_REQUEST };
      expect(receiveAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #getMarketProductCategoriesSuccess', () => {
    it('receiveAction should be equal to expectedAction (without data)', () => {
      const receiveAction = Creators.getMarketProductCategoriesSuccess();
      const expectedAction = { type: Types.GET_MARKET_PRODUCT_CATEGORIES_SUCCESS, data: [] };
      expect(receiveAction).toEqual(expectedAction);
    });

    it('receiveAction should be equal to expectedAction (with data)', () => {
      const receiveAction = Creators.getMarketProductCategoriesSuccess({ data: [{ name: 'Category Name' }] });
      const expectedAction = { type: Types.GET_MARKET_PRODUCT_CATEGORIES_SUCCESS, data: [{ name: 'Category Name' }] };
      expect(receiveAction).toEqual(expectedAction);
    });
  });
  describe('action-creator #getMarketProductCategoriesFailure', () => {
    it('receiveAction should be equal to expectedAction (without args)', () => {
      const receiveAction = Creators.getMarketProductCategoriesFailure();
      const expectedAction = { type: Types.GET_MARKET_PRODUCT_CATEGORIES_FAILURE, error: null };
      expect(receiveAction).toEqual(expectedAction);
    });

    it('receiveAction should be equal to expectedAction (with args)', () => {
      const receiveAction = Creators.getMarketProductCategoriesFailure({ error: new Error('404 Not Found') });
      const expectedAction = { type: Types.GET_MARKET_PRODUCT_CATEGORIES_FAILURE, error: new Error('404 Not Found') };
      expect(receiveAction).toEqual(expectedAction);
    });

    it('should ignore extra args', () => {
      const receivedAction = Creators.getMarketProductCategoriesFailure({
        error: new Error('404 Not Found'),
        wrongArg: "I'am not a arg. of this func",
      });
      const expectedAction = { type: Types.GET_MARKET_PRODUCT_CATEGORIES_FAILURE, error: new Error('404 Not Found') };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #createMarketProductCategoryRequest', () => {
    it('receiveAction should be equal to expectedAction (with args', () => {
      const receiveAction = Creators.createMarketProductCategoryRequest();
      const expectedAction = { type: Types.CREATE_MARKET_PRODUCT_CATEGORY_REQUEST, body: null };
      expect(receiveAction).toEqual(expectedAction);
    });

    it('receiveAction should be equal to expectedAction (with args', () => {
      const receiveAction = Creators.createMarketProductCategoryRequest();
      const expectedAction = { type: Types.CREATE_MARKET_PRODUCT_CATEGORY_REQUEST, body: null };
      expect(receiveAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #createMarketProductCategorySuccess', () => {
    it('receiveAction should be equal to expectedAction (without args)', () => {
      const receiveAction = Creators.createMarketProductCategorySuccess();
      const expectedAction = { type: Types.CREATE_MARKET_PRODUCT_CATEGORY_SUCCESS, data: [] };
      expect(receiveAction).toEqual(expectedAction);
    });

    it('receiveAction should be equal to expectedAction (with args)', () => {
      const receiveAction = Creators.createMarketProductCategorySuccess({ data: [{ name: 'Category Name' }] });
      const expectedAction = { type: Types.CREATE_MARKET_PRODUCT_CATEGORY_SUCCESS, data: [{ name: 'Category Name' }] };
      expect(receiveAction).toEqual(expectedAction);
    });
  });
  describe('action-creator #createMarketProductCategoryFailure', () => {
    it('receiveAction should be equal to expectedAction (without args)', () => {
      const receiveAction = Creators.createMarketProductCategoryFailure();
      const expectedAction = { type: Types.CREATE_MARKET_PRODUCT_CATEGORY_FAILURE, error: null };
      expect(receiveAction).toEqual(expectedAction);
    });

    it('receiveAction should be equal to expectedAction (with args)', () => {
      const receiveAction = Creators.createMarketProductCategoryFailure({ error: new Error('404 Not Found') });
      const expectedAction = { type: Types.CREATE_MARKET_PRODUCT_CATEGORY_FAILURE, error: new Error('404 Not Found') };
      expect(receiveAction).toEqual(expectedAction);
    });

    it('should ignore extra args', () => {
      const receivedAction = Creators.createMarketProductCategoryFailure({
        error: new Error('404 Not Found'),
        wrongArg: "I'am not a arg. of this func",
      });
      const expectedAction = { type: Types.CREATE_MARKET_PRODUCT_CATEGORY_FAILURE, error: new Error('404 Not Found') };
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
