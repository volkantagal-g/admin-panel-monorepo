/* eslint-disable */
import { testSaga } from 'redux-saga-test-plan';
import { describe, it } from '@jest/globals';

import {
  getMarketProductCategoryByIdRequest,
  getMarketProductCategorySlugsRequest,
  updateMarketProductCategoryRequest,
  updateMarketProductCategoryImageUrlRequest,
  watchGetMarketProductCategoryByIdRequest,
  watchUpdateMarketProductCategoryRequest,
  updateMarketProductCategoryAdditionalInfoRequest,
  watchUpdateMarketProductCategoryImageUrlRequest,
  activateMarketProductCategoryRequest,
  deactivateMarketProductCategoryRequest,
  watchGetMarketProductCategorySlugsRequest,
  watchDeactivateMarketProductCategoryRequest,
  watchActivateMarketProductCategoryRequest,
  watchUpdateMarketProductCategoryAdditionalInfoRequest,
} from '@app/pages/MarketProduct/Category/Detail/redux/saga';
import { Creators, Types } from '@app/pages/MarketProduct/Category/Detail/redux/actions';
import { Creators as ToastCreators } from '@app/redux/actions/toast';
import {
  createMarketProductCategoryImageUrl,
  getMarketProductCategoryById,
  updateMarketProductCategory,
  updateMarketProductCategoryAdditionalInfo,
  activateMarketProductCategory,
  deactivateMarketProductCategory,
} from '@app/api/marketProductCategory';
import { getMarketProductCategorySlugs } from '@app/api/marketProductCategorySlug';
import { uploadToS3SignedUrl } from '@app/api/public';

describe('MarketProduct/Category/Detail', () => {
  describe('saga #getMarketProductCategoryByIdRequest', () => {
    const fakeRequestData = { id: '123' };
    const fakeResponseData = { _id: '123', name: 'Category Name' };

    it('should call the getMarketProductCategoryByIdRequest (success)', () => {
      testSaga(getMarketProductCategoryByIdRequest, fakeRequestData)
        .next()
        .call(getMarketProductCategoryById, fakeRequestData)
        .next(fakeResponseData)
        .put(Creators.getMarketProductCategoryByIdSuccess({ data: fakeResponseData }))
        .next()
        .isDone();
    });

    it('should call the getMarketProductCategoryByIdRequest (failure)', () => {
      const fakeError = new Error('404 Not Found');
      testSaga(getMarketProductCategoryByIdRequest, fakeRequestData)
        .next()
        .call(getMarketProductCategoryById, fakeRequestData)
        .next(fakeResponseData)
        .throw(fakeError)
        .put(Creators.getMarketProductCategoryByIdFailure({ error: fakeError }))
        .next()
        .put(ToastCreators.error({ error: fakeError }))
        .next()
        .isDone();
    });
  });

  describe('saga #updateMarketProductCategoryRequest', () => {
    const fakeRequestData = { id: '123', body: { name: 'Category Name' } };
    const fakeResponseData = { _id: '123', name: 'Category Name' };

    it('should call the updateMarketProductCategoryRequest (success)', () => {
      testSaga(updateMarketProductCategoryRequest, fakeRequestData)
        .next()
        .call(updateMarketProductCategory, fakeRequestData)
        .next(fakeResponseData)
        .put(Creators.updateMarketProductCategorySuccess({ data: fakeResponseData }))
        .next()
        .put(Creators.getMarketProductCategoryByIdRequest({ id: '123' }))
        .next()
        .put(ToastCreators.success())
        .next()
        .isDone();
    });

    it('should call the updateMarketProductCategoryRequest (failure)', () => {
      const fakeError = new Error('404 Not Found');
      testSaga(updateMarketProductCategoryRequest, fakeRequestData)
        .next()
        .call(updateMarketProductCategory, fakeRequestData)
        .next(fakeResponseData)
        .throw(fakeError)
        .put(Creators.updateMarketProductCategoryFailure({ error: fakeError }))
        .next()
        .put(ToastCreators.error({ error: fakeError }))
        .next()
        .isDone();
    });
  });

  describe('saga #updateMarketProductCategoryAdditionalInfoRequest', () => {
    const fakeRequestData = { id: '123', body: { type: 'Regular' } };
    const fakeResponseData = { _id: '123', type: 'Regular' };

    it('should call the updateMarketProductCategoryAdditionalInfoRequest (success)', () => {
      testSaga(updateMarketProductCategoryAdditionalInfoRequest, fakeRequestData)
        .next()
        .call(updateMarketProductCategoryAdditionalInfo, fakeRequestData)
        .next(fakeResponseData)
        .put(Creators.updateMarketProductCategoryAdditionalInfoSuccess({ data: fakeResponseData }))
        .next()
        .put(Creators.getMarketProductCategoryByIdRequest({ id: '123' }))
        .next()
        .put(ToastCreators.success())
        .next()
        .isDone();
    });

    it('should call the updateMarketProductCategoryAdditionalInfoRequest (failure)', () => {
      const fakeError = new Error('404 Not Found');
      testSaga(updateMarketProductCategoryAdditionalInfoRequest, fakeRequestData)
        .next()
        .call(updateMarketProductCategoryAdditionalInfo, fakeRequestData)
        .next(fakeResponseData)
        .throw(fakeError)
        .put(Creators.updateMarketProductCategoryAdditionalInfoFailure({ error: fakeError }))
        .next()
        .put(ToastCreators.error({ error: fakeError }))
        .next()
        .isDone();
    });
  });

  describe('saga #activateMarketProductCategoryRequest', () => {
    const fakeRequestData = { id: '123' };
    const fakeResponseData = { _id: '123', status: 'Active' };

    it('should call the activateMarketProductCategoryRequest (success)', () => {
      testSaga(activateMarketProductCategoryRequest, fakeRequestData)
        .next()
        .call(activateMarketProductCategory, fakeRequestData)
        .next(fakeResponseData)
        .put(Creators.activateMarketProductCategorySuccess({ data: fakeResponseData }))
        .next()
        .put(Creators.getMarketProductCategoryByIdRequest({ id: '123' }))
        .next()
        .put(ToastCreators.success())
        .next()
        .isDone();
    });

    it('should call the activateMarketProductCategoryRequest (failure)', () => {
      const fakeError = new Error('404 Not Found');
      testSaga(activateMarketProductCategoryRequest, fakeRequestData)
        .next()
        .call(activateMarketProductCategory, fakeRequestData)
        .next(fakeResponseData)
        .throw(fakeError)
        .put(Creators.activateMarketProductCategoryFailure({ error: fakeError }))
        .next()
        .put(ToastCreators.error({ error: fakeError }))
        .next()
        .isDone();
    });
  });

  describe('saga #deactivateMarketProductCategoryRequest', () => {
    const fakeRequestData = { id: '123' };
    const fakeResponseData = { _id: '123', status: 'Active' };

    it('should call the deactivateMarketProductCategoryRequest (success)', () => {
      testSaga(deactivateMarketProductCategoryRequest, fakeRequestData)
        .next()
        .call(deactivateMarketProductCategory, fakeRequestData)
        .next(fakeResponseData)
        .put(Creators.deactivateMarketProductCategorySuccess({ data: fakeResponseData }))
        .next()
        .put(Creators.getMarketProductCategoryByIdRequest({ id: '123' }))
        .next()
        .put(ToastCreators.success())
        .next()
        .isDone();
    });

    it('should call the deactivateMarketProductCategoryRequest (failure)', () => {
      const fakeError = new Error('404 Not Found');
      testSaga(deactivateMarketProductCategoryRequest, fakeRequestData)
        .next()
        .call(deactivateMarketProductCategory, fakeRequestData)
        .next(fakeResponseData)
        .throw(fakeError)
        .put(Creators.deactivateMarketProductCategoryFailure({ error: fakeError }))
        .next()
        .put(ToastCreators.error({ error: fakeError }))
        .next()
        .isDone();
    });
  });

  describe('saga #getMarketProductCategorySlugsRequest', () => {
    const fakeRequestData = { id: '123' };
    const fakeResponseData = { _id: '123', name: 'Category Name' };

    it('should call the getMarketProductCategorySlugsRequest (success)', () => {
      testSaga(getMarketProductCategorySlugsRequest, fakeRequestData)
        .next()
        .call(getMarketProductCategorySlugs, fakeRequestData)
        .next(fakeResponseData)
        .put(Creators.getMarketProductCategorySlugsSuccess({ data: fakeResponseData }))
        .next()
        .isDone();
    });

    it('should call the getMarketProductCategorySlugsRequest (failure)', () => {
      const fakeError = new Error('404 Not Found');
      testSaga(getMarketProductCategorySlugsRequest, fakeRequestData)
        .next()
        .call(getMarketProductCategorySlugs, fakeRequestData)
        .next(fakeResponseData)
        .throw(fakeError)
        .put(Creators.getMarketProductCategorySlugsFailure({ error: fakeError }))
        .next()
        .put(ToastCreators.error({ error: fakeError }))
        .next()
        .isDone();
    });
  });

  describe('saga #updateMarketProductCategoryImageUrlRequest', () => {
    const fakeRequestData = {
      id: '123',
      loadedImage: 'data:image/png;...',
      extension: 'png',
    };

    const fakeCreatedCategoryImage = {
      signedUrl: 'https://getir-dev.s3.amazonaws.com/product/...6%3D%3D',
      cdnUrl: 'http://cdn-dev.getir.com/product/60ec09c9c8b....png',
    };

    it('should call the updateMarketProductCategoryImageUrlRequest (success)', () => {
      testSaga(updateMarketProductCategoryImageUrlRequest, fakeRequestData)
        .next()
        .call(createMarketProductCategoryImageUrl, { extension: fakeRequestData.extension })
        .next(fakeCreatedCategoryImage)
        .call(uploadToS3SignedUrl, { signedUrl: fakeCreatedCategoryImage.signedUrl, data: fakeRequestData.loadedImage })
        .next()
        .next(updateMarketProductCategoryRequest({ id: fakeRequestData.id, body: { picURL: fakeCreatedCategoryImage.cdnUrl } }))
        .put(Creators.updateMarketProductCategoryImageUrlSuccess())
        .next()
        .isDone();
    });

    it('should call the updateMarketProductCategoryImageUrlRequest (failure)', () => {
      const fakeError = new Error('404 Not Found');
      testSaga(updateMarketProductCategoryImageUrlRequest, fakeRequestData)
        .next()
        .call(createMarketProductCategoryImageUrl, { extension: fakeRequestData.extension })
        .next(fakeCreatedCategoryImage)
        .call(uploadToS3SignedUrl, { signedUrl: fakeCreatedCategoryImage.signedUrl, data: fakeRequestData.loadedImage })
        .next()
        .throw(fakeError)
        .put(Creators.updateMarketProductCategoryImageUrlFailure({ error: fakeError }))
        .next()
        .put(ToastCreators.error({ error: fakeError }))
        .next()
        .isDone();
    });
  });

  describe('saga #watchGetMarketProductCategoryByIdRequest', () => {
    it('should call the watchGetMarketProductCategoryByIdRequest', () => {
      testSaga(watchGetMarketProductCategoryByIdRequest)
        .next()
        .takeLatest(Types.GET_MARKET_PRODUCT_CATEGORY_BY_ID_REQUEST, getMarketProductCategoryByIdRequest)
        .next()
        .isDone();
    });
  });

  describe('saga #watchUpdateMarketProductCategoryRequest', () => {
    it('should call the watchUpdateMarketProductCategoryRequest', () => {
      testSaga(watchUpdateMarketProductCategoryRequest)
        .next()
        .takeLatest(Types.UPDATE_MARKET_PRODUCT_CATEGORY_REQUEST, updateMarketProductCategoryRequest)
        .next()
        .isDone();
    });
  });

  describe('saga #watchUpdateMarketProductCategoryImageUrlRequest', () => {
    it('should call the watchUpdateMarketProductCategoryImageUrlRequest', () => {
      testSaga(watchUpdateMarketProductCategoryImageUrlRequest)
        .next()
        .takeLatest(Types.UPDATE_MARKET_PRODUCT_CATEGORY_IMAGE_URL_REQUEST, updateMarketProductCategoryImageUrlRequest)
        .next()
        .isDone();
    });
  });

  describe('saga #watchGetMarketProductCategorySlugsRequest', () => {
    it('should call the watchGetMarketProductCategorySlugsRequest', () => {
      testSaga(watchGetMarketProductCategorySlugsRequest)
        .next()
        .takeLatest(Types.GET_MARKET_PRODUCT_CATEGORY_SLUGS_REQUEST, getMarketProductCategorySlugsRequest)
        .next()
        .isDone();
    });
  });

  describe('saga #watchUpdateMarketProductCategoryAdditionalInfoRequest', () => {
    it('should call the watchUpdateMarketProductCategoryAdditionalInfoRequest', () => {
      testSaga(watchUpdateMarketProductCategoryAdditionalInfoRequest)
        .next()
        .takeLatest(Types.UPDATE_MARKET_PRODUCT_CATEGORY_ADDITIONAL_INFO_REQUEST, updateMarketProductCategoryAdditionalInfoRequest)
        .next()
        .isDone();
    });
  });

  describe('saga #watchActivateMarketProductCategoryRequest', () => {
    it('should call the watchActivateMarketProductCategoryRequest', () => {
      testSaga(watchActivateMarketProductCategoryRequest)
        .next()
        .takeLatest(Types.ACTIVATE_MARKET_PRODUCT_CATEGORY_REQUEST, activateMarketProductCategoryRequest)
        .next()
        .isDone();
    });
  });

  describe('saga #watchDeactivateMarketProductCategoryRequest', () => {
    it('should call the watchDeactivateMarketProductCategoryRequest', () => {
      testSaga(watchDeactivateMarketProductCategoryRequest)
        .next()
        .takeLatest(Types.DEACTIVATE_MARKET_PRODUCT_CATEGORY_REQUEST, deactivateMarketProductCategoryRequest)
        .next()
        .isDone();
    });
  });
});
