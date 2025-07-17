/* eslint-disable */
import { describe, it, expect } from '@jest/globals';

import { Creators, Types } from '@app/pages/MarketProduct/Category/List/redux/actions';

describe('MarketProduct/Category/List', () => {
  describe('action-creator #getMarketProductCategoriesRequest', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.getMarketProductCategoriesRequest({});
      const expectedAction = { type: Types.GET_MARKET_PRODUCT_CATEGORIES_REQUEST, limit: 10, offset: 0, queryText: '', status: undefined };
      expect(receivedAction).toEqual(expectedAction);
    });

    it('receivedAction should equal to expectedAction (with args)', () => {
      const receivedAction = Creators.getMarketProductCategoriesRequest({ limit: 10, offset: 0, queryText: '', status: undefined });
      const expectedAction = { type: Types.GET_MARKET_PRODUCT_CATEGORIES_REQUEST, limit: 10, offset: 0, queryText: '', status: undefined };
      expect(receivedAction).toEqual(expectedAction);
    });
  });
  describe('action-creator #getMarketProductCategoriesSuccess', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.getMarketProductCategoriesSuccess();
      const expectedAction = { type: Types.GET_MARKET_PRODUCT_CATEGORIES_SUCCESS, data: [] };
      expect(receivedAction).toEqual(expectedAction);
    });

    it('receivedAction should equal to expectedAction (with args)', () => {
      const receivedAction = Creators.getMarketProductCategoriesSuccess({ data: [{ name: 'CategoryName' }] });
      const expectedAction = { type: Types.GET_MARKET_PRODUCT_CATEGORIES_SUCCESS, data: [{ name: 'CategoryName' }] };
      expect(receivedAction).toEqual(expectedAction);
    });

    it('should ignore extra args', () => {
      const receivedAction = Creators.getMarketProductCategoriesSuccess({
        data: [{ name: 'CategoryName' }],
        wrongArg: "I'am not a arg. of this func",
      });
      const expectedAction = { type: Types.GET_MARKET_PRODUCT_CATEGORIES_SUCCESS, data: [{ name: 'CategoryName' }] };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #getMarketProductCategoriesFailure', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.getMarketProductCategoriesFailure();
      const expectedAction = { type: Types.GET_MARKET_PRODUCT_CATEGORIES_FAILURE, error: null };
      expect(receivedAction).toEqual(expectedAction);
    });

    it('receivedAction should equal to expectedAction (with args)', () => {
      const receivedAction = Creators.getMarketProductCategoriesFailure({ error: new Error('404 Not Found') });
      const expectedAction = { type: Types.GET_MARKET_PRODUCT_CATEGORIES_FAILURE, error: new Error('404 Not Found') };
      expect(receivedAction).toEqual(expectedAction);
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

  describe('action-creator #getMarketProductSubCategoriesRequest', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.getMarketProductSubCategoriesRequest({});
      const expectedAction = {
        type: Types.GET_MARKET_PRODUCT_SUB_CATEGORIES_REQUEST,
        limit: 10,
        offset: 0,
        queryText: '',
        status: undefined,
      };
      expect(receivedAction).toEqual(expectedAction);
    });

    it('receivedAction should equal to expectedAction (with args)', () => {
      const receivedAction = Creators.getMarketProductSubCategoriesRequest({ limit: 10, offset: 0, queryText: '', status: undefined });
      const expectedAction = {
        type: Types.GET_MARKET_PRODUCT_SUB_CATEGORIES_REQUEST,
        limit: 10,
        offset: 0,
        queryText: '',
        status: undefined,
      };
      expect(receivedAction).toEqual(expectedAction);
    });

    it('should ignore extra args', () => {
      const receivedAction = Creators.getMarketProductSubCategoriesRequest({
        limit: 10,
        offset: 0,
        queryText: '',
        status: undefined,
        wrongArg: "I'am not a arg. of this func",
      });
      const expectedAction = {
        type: Types.GET_MARKET_PRODUCT_SUB_CATEGORIES_REQUEST,
        limit: 10,
        offset: 0,
        queryText: '',
        status: undefined,
      };
      expect(receivedAction).toEqual(expectedAction);
    });
  });
  describe('action-creator #getMarketProductSubCategoriesSuccess', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.getMarketProductSubCategoriesSuccess();
      const expectedAction = { type: Types.GET_MARKET_PRODUCT_SUB_CATEGORIES_SUCCESS, data: [] };
      expect(receivedAction).toEqual(expectedAction);
    });

    it('receivedAction should equal to expectedAction (with args)', () => {
      const receivedAction = Creators.getMarketProductSubCategoriesSuccess({ data: [{ name: 'Category Name' }] });
      const expectedAction = { type: Types.GET_MARKET_PRODUCT_SUB_CATEGORIES_SUCCESS, data: [{ name: 'Category Name' }] };
      expect(receivedAction).toEqual(expectedAction);
    });

    it('should ignore extra args', () => {
      const receivedAction = Creators.getMarketProductSubCategoriesSuccess({
        data: [{ name: 'Category Name' }],
        wrongArg: "I'am not a arg. of this func",
      });
      const expectedAction = { type: Types.GET_MARKET_PRODUCT_SUB_CATEGORIES_SUCCESS, data: [{ name: 'Category Name' }] };
      expect(receivedAction).toEqual(expectedAction);
    });
  });
  describe('action-creator #getMarketProductSubCategoriesFailure', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.getMarketProductSubCategoriesFailure();
      const expectedAction = { type: Types.GET_MARKET_PRODUCT_SUB_CATEGORIES_FAILURE, error: null };
      expect(receivedAction).toEqual(expectedAction);
    });

    it('receivedAction should equal to expectedAction (with args)', () => {
      const receivedAction = Creators.getMarketProductSubCategoriesFailure({ error: new Error('404 Not Found') });
      const expectedAction = { type: Types.GET_MARKET_PRODUCT_SUB_CATEGORIES_FAILURE, error: new Error('404 Not Found') };
      expect(receivedAction).toEqual(expectedAction);
    });

    it('should ignore extra args', () => {
      const receivedAction = Creators.getMarketProductSubCategoriesFailure({
        error: new Error('404 Not Found'),
        wrongArg: "I'am not a arg. of this func",
      });
      const expectedAction = { type: Types.GET_MARKET_PRODUCT_SUB_CATEGORIES_FAILURE, error: new Error('404 Not Found') };
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
