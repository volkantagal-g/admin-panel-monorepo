/* eslint-disable */
import { describe, it, expect } from '@jest/globals';

import { Creators, Types } from '@app/pages/MarketProduct/Category/Detail/redux/actions';

describe('MarketProduct/Category/Detail', () => {
  describe('action-creator #getMarketProductCategoryByIdRequest', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.getMarketProductCategoryByIdRequest();
      const expectedAction = { type: Types.GET_MARKET_PRODUCT_CATEGORY_BY_ID_REQUEST, id: null };
      expect(receivedAction).toEqual(expectedAction);
    });

    it('receivedAction should equal to expectedAction (with args)', () => {
      const receivedAction = Creators.getMarketProductCategoryByIdRequest({ id: '123' });
      const expectedAction = { type: Types.GET_MARKET_PRODUCT_CATEGORY_BY_ID_REQUEST, id: '123' };
      expect(receivedAction).toEqual(expectedAction);
    });

    it('should ignore extra args', () => {
      const receivedAction = Creators.getMarketProductCategoryByIdRequest({ id: '123', wrongArg: "I'am not a arg. of this func" });
      const expectedAction = { type: Types.GET_MARKET_PRODUCT_CATEGORY_BY_ID_REQUEST, id: '123' };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #getMarketProductCategoryByIdSuccess', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.getMarketProductCategoryByIdSuccess();
      const expectedAction = { type: Types.GET_MARKET_PRODUCT_CATEGORY_BY_ID_SUCCESS, data: {} };
      expect(receivedAction).toEqual(expectedAction);
    });

    it('receivedAction should equal to expectedAction (with args)', () => {
      const receivedAction = Creators.getMarketProductCategoryByIdSuccess({ data: { name: 'Category Name' } });
      const expectedAction = { type: Types.GET_MARKET_PRODUCT_CATEGORY_BY_ID_SUCCESS, data: { name: 'Category Name' } };
      expect(receivedAction).toEqual(expectedAction);
    });

    it('should ignore extra args', () => {
      const receivedAction = Creators.getMarketProductCategoryByIdSuccess({
        data: { name: 'Category Name' },
        wrongArg: "I'am not a arg. of this func",
      });
      const expectedAction = { type: Types.GET_MARKET_PRODUCT_CATEGORY_BY_ID_SUCCESS, data: { name: 'Category Name' } };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #getMarketProductCategoryByIdFailure', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.getMarketProductCategoryByIdFailure();
      const expectedAction = { type: Types.GET_MARKET_PRODUCT_CATEGORY_BY_ID_FAILURE, error: null };
      expect(receivedAction).toEqual(expectedAction);
    });

    it('receivedAction should equal to expectedAction (with args)', () => {
      const receivedAction = Creators.getMarketProductCategoryByIdFailure({ error: new Error('404 Not Found') });
      const expectedAction = { type: Types.GET_MARKET_PRODUCT_CATEGORY_BY_ID_FAILURE, error: new Error('404 Not Found') };
      expect(receivedAction).toEqual(expectedAction);
    });

    it('should ignore extra args', () => {
      const receivedAction = Creators.getMarketProductCategoryByIdFailure({
        error: new Error('404 Not Found'),
        wrongArg: "I'am not a arg. of this func",
      });
      const expectedAction = { type: Types.GET_MARKET_PRODUCT_CATEGORY_BY_ID_FAILURE, error: new Error('404 Not Found') };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #updateMarketProductCategoryRequest', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.updateMarketProductCategoryRequest();
      const expectedAction = { type: Types.UPDATE_MARKET_PRODUCT_CATEGORY_REQUEST, id: null, body: null };
      expect(receivedAction).toEqual(expectedAction);
    });

    it('receivedAction should equal to expectedAction (with args)', () => {
      const receivedAction = Creators.updateMarketProductCategoryRequest({ id: '123', body: { name: 'Update Category Name' } });
      const expectedAction = { type: Types.UPDATE_MARKET_PRODUCT_CATEGORY_REQUEST, id: '123', body: { name: 'Update Category Name' } };
      expect(receivedAction).toEqual(expectedAction);
    });

    it('should ignore extra args', () => {
      const receivedAction = Creators.updateMarketProductCategoryRequest({ id: '123', body: {}, wrongArg: "I'am not a arg. of this func" });
      const expectedAction = { type: Types.UPDATE_MARKET_PRODUCT_CATEGORY_REQUEST, id: '123', body: {} };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #updateMarketProductCategorySuccess', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.updateMarketProductCategorySuccess();
      const expectedAction = { type: Types.UPDATE_MARKET_PRODUCT_CATEGORY_SUCCESS, data: {} };
      expect(receivedAction).toEqual(expectedAction);
    });

    it('receivedAction should equal to expectedAction (with data)', () => {
      const receivedAction = Creators.updateMarketProductCategorySuccess({ data: { id: '123', body: { name: 'Update Category Name' } } });
      const expectedAction = {
        type: Types.UPDATE_MARKET_PRODUCT_CATEGORY_SUCCESS,
        data: { id: '123', body: { name: 'Update Category Name' } },
      };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #updateMarketProductCategoryFailure', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.updateMarketProductCategoryFailure();
      const expectedAction = { type: Types.UPDATE_MARKET_PRODUCT_CATEGORY_FAILURE, error: null };
      expect(receivedAction).toEqual(expectedAction);
    });

    it('receivedAction should equal to expectedAction (with args)', () => {
      const receivedAction = Creators.updateMarketProductCategoryFailure({ error: new Error('404 Not Found') });
      const expectedAction = { type: Types.UPDATE_MARKET_PRODUCT_CATEGORY_FAILURE, error: new Error('404 Not Found') };
      expect(receivedAction).toEqual(expectedAction);
    });

    it('should ignore extra args', () => {
      const receivedAction = Creators.updateMarketProductCategoryFailure({
        error: new Error('404 Not Found'),
        wrongArg: "I'am not a arg. of this func",
      });
      const expectedAction = { type: Types.UPDATE_MARKET_PRODUCT_CATEGORY_FAILURE, error: new Error('404 Not Found') };
      expect(receivedAction).toEqual(expectedAction);
    });
  });
  describe('action-creator #updateMarketProductCategoryAdditionalInfoRequest', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.updateMarketProductCategoryAdditionalInfoRequest();
      const expectedAction = { type: Types.UPDATE_MARKET_PRODUCT_CATEGORY_ADDITIONAL_INFO_REQUEST, id: null, body: null };
      expect(receivedAction).toEqual(expectedAction);
    });

    it('receivedAction should equal to expectedAction (with args)', () => {
      const receivedAction = Creators.updateMarketProductCategoryAdditionalInfoRequest({
        id: '123',
        body: { type: 'Regular' },
      });
      const expectedAction = {
        type: Types.UPDATE_MARKET_PRODUCT_CATEGORY_ADDITIONAL_INFO_REQUEST,
        id: '123',
        body: { type: 'Regular' },
      };
      expect(receivedAction).toEqual(expectedAction);
    });

    it('should ignore extra args', () => {
      const receivedAction = Creators.updateMarketProductCategoryAdditionalInfoRequest({
        id: '123',
        body: {},
        wrongArg: "I'am not a arg. of this func",
      });
      const expectedAction = { type: Types.UPDATE_MARKET_PRODUCT_CATEGORY_ADDITIONAL_INFO_REQUEST, id: '123', body: {} };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #updateMarketProductCategoryAdditionalInfoSuccess', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.updateMarketProductCategoryAdditionalInfoSuccess();
      const expectedAction = { type: Types.UPDATE_MARKET_PRODUCT_CATEGORY_ADDITIONAL_INFO_SUCCESS, data: {} };
      expect(receivedAction).toEqual(expectedAction);
    });

    it('receivedAction should equal to expectedAction (with data)', () => {
      const receivedAction = Creators.updateMarketProductCategoryAdditionalInfoSuccess({
        data: {
          id: '123',
          body: { type: 'Update Category type' },
        },
      });
      const expectedAction = {
        type: Types.UPDATE_MARKET_PRODUCT_CATEGORY_ADDITIONAL_INFO_SUCCESS,
        data: { id: '123', body: { type: 'Update Category type' } },
      };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #updateMarketProductCategoryAdditionalInfoFailure', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.updateMarketProductCategoryAdditionalInfoFailure();
      const expectedAction = { type: Types.UPDATE_MARKET_PRODUCT_CATEGORY_ADDITIONAL_INFO_FAILURE, error: null };
      expect(receivedAction).toEqual(expectedAction);
    });

    it('receivedAction should equal to expectedAction (with args)', () => {
      const receivedAction = Creators.updateMarketProductCategoryAdditionalInfoFailure({ error: new Error('404 Not Found') });
      const expectedAction = { type: Types.UPDATE_MARKET_PRODUCT_CATEGORY_ADDITIONAL_INFO_FAILURE, error: new Error('404 Not Found') };
      expect(receivedAction).toEqual(expectedAction);
    });

    it('should ignore extra args', () => {
      const receivedAction = Creators.updateMarketProductCategoryAdditionalInfoFailure({
        error: new Error('404 Not Found'),
        wrongArg: "I'am not a arg. of this func",
      });
      const expectedAction = { type: Types.UPDATE_MARKET_PRODUCT_CATEGORY_ADDITIONAL_INFO_FAILURE, error: new Error('404 Not Found') };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #updateMarketProductCategoryImageUrlRequest', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.updateMarketProductCategoryImageUrlRequest();
      const expectedAction = {
        type: Types.UPDATE_MARKET_PRODUCT_CATEGORY_IMAGE_URL_REQUEST,
        id: null,
        loadedImage: null,
        extension: null,
        body: null,
        imagePath: null,
        isAppliedToOtherLanguanges: false,
      };
      expect(receivedAction).toEqual(expectedAction);
    });

    it('receivedAction should equal to expectedAction (with args)', () => {
      const receivedAction = Creators.updateMarketProductCategoryImageUrlRequest({
        id: '123',
        loadedImage: 'test.png',
        extension: 'png',
        body: {},
        imagePath: 'picURL',
        isAppliedToOtherLanguanges: false,
      });
      const expectedAction = {
        type: Types.UPDATE_MARKET_PRODUCT_CATEGORY_IMAGE_URL_REQUEST,
        id: '123',
        loadedImage: 'test.png',
        extension: 'png',
        body: {},
        imagePath: 'picURL',
        isAppliedToOtherLanguanges: false,
      };
      expect(receivedAction).toEqual(expectedAction);
    });

    it('should ignore extra args', () => {
      const receivedAction = Creators.updateMarketProductCategoryImageUrlRequest({
        id: '123',
        loadedImage: 'test.png',
        extension: 'png',
        body: {},
        imagePath: 'picURL',
        isAppliedToOtherLanguanges: false,
        wrongArg: "I'am not a arg. of this func",
      });
      const expectedAction = {
        type: Types.UPDATE_MARKET_PRODUCT_CATEGORY_IMAGE_URL_REQUEST,
        id: '123',
        loadedImage: 'test.png',
        extension: 'png',
        body: {},
        imagePath: 'picURL',
        isAppliedToOtherLanguanges: false,
      };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #updateMarketProductCategoryImageUrlSuccess', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.updateMarketProductCategoryImageUrlSuccess();
      const expectedAction = { type: Types.UPDATE_MARKET_PRODUCT_CATEGORY_IMAGE_URL_SUCCESS, data: {} };
      expect(receivedAction).toEqual(expectedAction);
    });

    it('should ignore any args', () => {
      const receivedAction = Creators.updateMarketProductCategoryImageUrlSuccess({ data: { imageURL: 'test/image.png' } });
      const expectedAction = { type: Types.UPDATE_MARKET_PRODUCT_CATEGORY_IMAGE_URL_SUCCESS, data: { imageURL: 'test/image.png' } };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #updateMarketProductCategoryImageUrlFailure', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.updateMarketProductCategoryImageUrlFailure();
      const expectedAction = { type: Types.UPDATE_MARKET_PRODUCT_CATEGORY_IMAGE_URL_FAILURE, error: null };
      expect(receivedAction).toEqual(expectedAction);
    });

    it('receivedAction should equal to expectedAction (with args)', () => {
      const receivedAction = Creators.updateMarketProductCategoryImageUrlFailure({ error: new Error('404 Not Found') });
      const expectedAction = { type: Types.UPDATE_MARKET_PRODUCT_CATEGORY_IMAGE_URL_FAILURE, error: new Error('404 Not Found') };
      expect(receivedAction).toEqual(expectedAction);
    });

    it('should ignore extra args', () => {
      const receivedAction = Creators.updateMarketProductCategoryImageUrlFailure({
        error: new Error('404 Not Found'),
        wrongArg: "I'am not a arg. of this func",
      });
      const expectedAction = { type: Types.UPDATE_MARKET_PRODUCT_CATEGORY_IMAGE_URL_FAILURE, error: new Error('404 Not Found') };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #activateMarketProductCategoryRequest', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.activateMarketProductCategoryRequest();
      const expectedAction = { type: Types.ACTIVATE_MARKET_PRODUCT_CATEGORY_REQUEST, id: null };
      expect(receivedAction).toEqual(expectedAction);
    });

    it('receivedAction should equal to expectedAction (with args)', () => {
      const receivedAction = Creators.activateMarketProductCategoryRequest({ id: '123' });
      const expectedAction = { type: Types.ACTIVATE_MARKET_PRODUCT_CATEGORY_REQUEST, id: '123' };
      expect(receivedAction).toEqual(expectedAction);
    });

    it('should ignore extra args', () => {
      const receivedAction = Creators.activateMarketProductCategoryRequest({
        id: '123',
        wrongArg: "I'am not a arg. of this func",
      });
      const expectedAction = { type: Types.ACTIVATE_MARKET_PRODUCT_CATEGORY_REQUEST, id: '123' };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #activateMarketProductCategorySuccess', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.activateMarketProductCategorySuccess();
      const expectedAction = { type: Types.ACTIVATE_MARKET_PRODUCT_CATEGORY_SUCCESS, data: {} };
      expect(receivedAction).toEqual(expectedAction);
    });

    it('receivedAction should equal to expectedAction (with data)', () => {
      const receivedAction = Creators.activateMarketProductCategorySuccess({ data: { id: '123', body: { name: 'Update Category Name' } } });
      const expectedAction = {
        type: Types.ACTIVATE_MARKET_PRODUCT_CATEGORY_SUCCESS,
        data: { id: '123', body: { name: 'Update Category Name' } },
      };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #activateMarketProductCategoryFailure', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.activateMarketProductCategoryFailure();
      const expectedAction = { type: Types.ACTIVATE_MARKET_PRODUCT_CATEGORY_FAILURE, error: null };
      expect(receivedAction).toEqual(expectedAction);
    });

    it('receivedAction should equal to expectedAction (with args)', () => {
      const receivedAction = Creators.activateMarketProductCategoryFailure({ error: new Error('404 Not Found') });
      const expectedAction = { type: Types.ACTIVATE_MARKET_PRODUCT_CATEGORY_FAILURE, error: new Error('404 Not Found') };
      expect(receivedAction).toEqual(expectedAction);
    });

    it('should ignore extra args', () => {
      const receivedAction = Creators.activateMarketProductCategoryFailure({
        error: new Error('404 Not Found'),
        wrongArg: "I'am not a arg. of this func",
      });
      const expectedAction = { type: Types.ACTIVATE_MARKET_PRODUCT_CATEGORY_FAILURE, error: new Error('404 Not Found') };
      expect(receivedAction).toEqual(expectedAction);
    });
  });
  describe('action-creator #deactivateMarketProductCategoryRequest', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.deactivateMarketProductCategoryRequest();
      const expectedAction = { type: Types.DEACTIVATE_MARKET_PRODUCT_CATEGORY_REQUEST, id: null };
      expect(receivedAction).toEqual(expectedAction);
    });

    it('receivedAction should equal to expectedAction (with args)', () => {
      const receivedAction = Creators.deactivateMarketProductCategoryRequest({ id: '123' });
      const expectedAction = { type: Types.DEACTIVATE_MARKET_PRODUCT_CATEGORY_REQUEST, id: '123' };
      expect(receivedAction).toEqual(expectedAction);
    });

    it('should ignore extra args', () => {
      const receivedAction = Creators.deactivateMarketProductCategoryRequest({
        id: '123',
        wrongArg: "I'am not a arg. of this func",
      });
      const expectedAction = { type: Types.DEACTIVATE_MARKET_PRODUCT_CATEGORY_REQUEST, id: '123' };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #deactivateMarketProductCategorySuccess', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.deactivateMarketProductCategorySuccess();
      const expectedAction = { type: Types.DEACTIVATE_MARKET_PRODUCT_CATEGORY_SUCCESS, data: {} };
      expect(receivedAction).toEqual(expectedAction);
    });

    it('receivedAction should equal to expectedAction (with data)', () => {
      const receivedAction = Creators.deactivateMarketProductCategorySuccess({
        data: {
          id: '123',
          body: { name: 'Update Category Name' },
        },
      });
      const expectedAction = {
        type: Types.DEACTIVATE_MARKET_PRODUCT_CATEGORY_SUCCESS,
        data: { id: '123', body: { name: 'Update Category Name' } },
      };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #deactivateMarketProductCategoryFailure', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.deactivateMarketProductCategoryFailure();
      const expectedAction = { type: Types.DEACTIVATE_MARKET_PRODUCT_CATEGORY_FAILURE, error: null };
      expect(receivedAction).toEqual(expectedAction);
    });

    it('receivedAction should equal to expectedAction (with args)', () => {
      const receivedAction = Creators.deactivateMarketProductCategoryFailure({ error: new Error('404 Not Found') });
      const expectedAction = { type: Types.DEACTIVATE_MARKET_PRODUCT_CATEGORY_FAILURE, error: new Error('404 Not Found') };
      expect(receivedAction).toEqual(expectedAction);
    });

    it('should ignore extra args', () => {
      const receivedAction = Creators.deactivateMarketProductCategoryFailure({
        error: new Error('404 Not Found'),
        wrongArg: "I'am not a arg. of this func",
      });
      const expectedAction = { type: Types.DEACTIVATE_MARKET_PRODUCT_CATEGORY_FAILURE, error: new Error('404 Not Found') };
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

  describe('action-creator #getMarketProductCategorySlugsRequest', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.getMarketProductCategorySlugsRequest();
      const expectedAction = { type: Types.GET_MARKET_PRODUCT_CATEGORY_SLUGS_REQUEST, id: null };
      expect(receivedAction).toEqual(expectedAction);
    });

    it('receivedAction should equal to expectedAction (with args)', () => {
      const receivedAction = Creators.getMarketProductCategorySlugsRequest({ id: '123' });
      const expectedAction = { type: Types.GET_MARKET_PRODUCT_CATEGORY_SLUGS_REQUEST, id: '123' };
      expect(receivedAction).toEqual(expectedAction);
    });

    it('should ignore extra args', () => {
      const receivedAction = Creators.getMarketProductCategorySlugsRequest({ id: '123', wrongArg: "I'am not a arg. of this func" });
      const expectedAction = { type: Types.GET_MARKET_PRODUCT_CATEGORY_SLUGS_REQUEST, id: '123' };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #getMarketProductCategorySlugsSuccess', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.getMarketProductCategorySlugsSuccess();
      const expectedAction = { type: Types.GET_MARKET_PRODUCT_CATEGORY_SLUGS_SUCCESS, data: {} };
      expect(receivedAction).toEqual(expectedAction);
    });

    it('receivedAction should equal to expectedAction (with args)', () => {
      const receivedAction = Creators.getMarketProductCategorySlugsSuccess({ data: { slug: 'Category Name' } });
      const expectedAction = { type: Types.GET_MARKET_PRODUCT_CATEGORY_SLUGS_SUCCESS, data: { slug: 'Category Name' } };
      expect(receivedAction).toEqual(expectedAction);
    });

    it('should ignore extra args', () => {
      const receivedAction = Creators.getMarketProductCategorySlugsSuccess({
        data: { slug: 'Category Name' },
        wrongArg: "I'am not a arg. of this func",
      });
      const expectedAction = { type: Types.GET_MARKET_PRODUCT_CATEGORY_SLUGS_SUCCESS, data: { slug: 'Category Name' } };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #getMarketProductCategorySlugsFailure', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.getMarketProductCategorySlugsFailure();
      const expectedAction = { type: Types.GET_MARKET_PRODUCT_CATEGORY_SLUGS_FAILURE, error: null };
      expect(receivedAction).toEqual(expectedAction);
    });

    it('receivedAction should equal to expectedAction (with args)', () => {
      const receivedAction = Creators.getMarketProductCategorySlugsFailure({ error: new Error('404 Not Found') });
      const expectedAction = { type: Types.GET_MARKET_PRODUCT_CATEGORY_SLUGS_FAILURE, error: new Error('404 Not Found') };
      expect(receivedAction).toEqual(expectedAction);
    });

    it('should ignore extra args', () => {
      const receivedAction = Creators.getMarketProductCategorySlugsFailure({
        error: new Error('404 Not Found'),
        wrongArg: "I'am not a arg. of this func",
      });
      const expectedAction = { type: Types.GET_MARKET_PRODUCT_CATEGORY_SLUGS_FAILURE, error: new Error('404 Not Found') };
      expect(receivedAction).toEqual(expectedAction);
    });
  });
});
