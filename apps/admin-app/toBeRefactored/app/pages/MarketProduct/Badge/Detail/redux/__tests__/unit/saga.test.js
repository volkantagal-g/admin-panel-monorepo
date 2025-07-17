/* eslint-disable */
import { testSaga } from 'redux-saga-test-plan';
import { describe, it } from '@jest/globals';
import _ from 'lodash';

import {
  getBadgeRequest,
  updateBadgeRequest,
  updateBadgeImageUrlRequest,
  watchGetBadgeRequest,
  watchUpdateBadgeRequest,
  watchUpdateBadgeImageUrlRequest,
} from '@app/pages/MarketProduct/Badge/Detail/redux/saga';
import { Creators, Types } from '@app/pages/MarketProduct/Badge/Detail/redux/actions';
import { Creators as ToastCreators } from '@app/redux/actions/toast';
import { createBadgeImageUrl, getBadge, updateBadge } from '@app/api/marketProductBadge';
import { uploadToS3SignedUrl } from '@app/api/public';

describe('MarketProduct/Badge/Detail', () => {
  describe('saga #getBadgeRequest', () => {
    const fakeRequestData = { id: '123' };
    const fakeResponseData = { _id: '123', name: 'BadgeName' };

    it('should call the getBadgeRequest (success)', () => {
      testSaga(getBadgeRequest, fakeRequestData)
        .next()
        .call(getBadge, fakeRequestData)
        .next(fakeResponseData)
        .put(Creators.getBadgeSuccess({ data: fakeResponseData }))
        .next()
        .isDone();
    });

    it('should call the getBadgeRequest (failure)', () => {
      const fakeError = new Error('404 Not Found');
      testSaga(getBadgeRequest, fakeRequestData)
        .next()
        .call(getBadge, fakeRequestData)
        .next(fakeResponseData)
        .throw(fakeError)
        .put(Creators.getBadgeFailure({ error: fakeError }))
        .next()
        .put(ToastCreators.error({ error: fakeError }))
        .next()
        .isDone();
    });
  });

  describe('saga #updateBadgeRequest', () => {
    const fakeRequestData = { id: '123', body: { name: 'BadgeName' } };
    const fakeResponseData = { _id: '123', name: 'BadgeName' };

    it('should call the updateBadgeRequest (success)', () => {
      testSaga(updateBadgeRequest, fakeRequestData)
        .next()
        .call(updateBadge, fakeRequestData)
        .next(fakeResponseData)
        .put(Creators.updateBadgeSuccess({ data: fakeResponseData }))
        .next()
        .put(Creators.getBadgeRequest({ id: '123' }))
        .next()
        .put(ToastCreators.success())
        .next()
        .isDone();
    });

    it('should call the updateBadgeRequest (failure)', () => {
      const fakeError = new Error('404 Not Found');
      testSaga(updateBadgeRequest, fakeRequestData)
        .next()
        .call(updateBadge, fakeRequestData)
        .next(fakeResponseData)
        .throw(fakeError)
        .put(Creators.updateBadgeFailure({ error: fakeError }))
        .next()
        .put(ToastCreators.error({ error: fakeError }))
        .next()
        .isDone();
    });
  });

  describe('saga #updateBadgeImageUrlRequest', () => {
    const fakeRequestData = {
      id: '123',
      loadedImage: 'data:image/png;...',
      extension: 'png',
      body: {
        picUrl: {
          tr: 'http://cdn-dev.getir.com/product/...3.png',
          en: 'http://cdn-dev.getir.com/product/...d.jpeg',
        },
      },
      imagePath: 'picUrl.tr',
      isAppliedToOtherLanguanges: false,
    };

    const fakeCreatedBadgeImage = {
      signedUrl: 'https://getir-dev.s3.amazonaws.com/product/...6%3D%3D',
      cdnUrl: 'http://cdn-dev.getir.com/product/60ec09c9c8b....png',
    };

    it('should call the updateBadgeImageUrlRequest (success)', () => {
      testSaga(updateBadgeImageUrlRequest, fakeRequestData)
        .next()
        .call(createBadgeImageUrl, { extension: fakeRequestData.extension })
        .next(fakeCreatedBadgeImage)
        .call(uploadToS3SignedUrl, { signedUrl: fakeCreatedBadgeImage.signedUrl, data: fakeRequestData.loadedImage })
        .next()
        .call(_.set, fakeRequestData.body, fakeRequestData.imagePath, fakeCreatedBadgeImage.cdnUrl)
        .next()
        .put(Creators.updateBadgeRequest({ id: fakeRequestData.id, body: fakeRequestData.body }))
        .next()
        .put(Creators.updateBadgeImageUrlSuccess())
        .next()
        .isDone();
    });

    it('should call the updateBadgeImageUrlRequest (failure)', () => {
      const fakeError = new Error('404 Not Found');
      testSaga(updateBadgeImageUrlRequest, fakeRequestData)
        .next()
        .call(createBadgeImageUrl, { extension: fakeRequestData.extension })
        .next(fakeCreatedBadgeImage)
        .call(uploadToS3SignedUrl, { signedUrl: fakeCreatedBadgeImage.signedUrl, data: fakeRequestData.loadedImage })
        .next()
        .throw(fakeError)
        .put(Creators.updateBadgeImageUrlFailure({ error: fakeError }))
        .next()
        .put(ToastCreators.error({ error: fakeError }))
        .next()
        .isDone();
    });
  });

  describe('saga #watchGetBadgeRequest', () => {
    it('should call the watchGetBadgeRequest', () => {
      testSaga(watchGetBadgeRequest)
        .next()
        .takeLatest(Types.GET_BADGE_REQUEST, getBadgeRequest)
        .next()
        .isDone();
    });
  });

  describe('saga #watchUpdateBadgeRequest', () => {
    it('should call the watchUpdateBadgeRequest', () => {
      testSaga(watchUpdateBadgeRequest)
        .next()
        .takeLatest(Types.UPDATE_BADGE_REQUEST, updateBadgeRequest)
        .next()
        .isDone();
    });
  });

  describe('saga #watchUpdateBadgeImageUrlRequest', () => {
    it('should call the watchUpdateBadgeImageUrlRequest', () => {
      testSaga(watchUpdateBadgeImageUrlRequest)
        .next()
        .takeLatest(Types.UPDATE_BADGE_IMAGE_URL_REQUEST, updateBadgeImageUrlRequest)
        .next()
        .isDone();
    });
  });
});
