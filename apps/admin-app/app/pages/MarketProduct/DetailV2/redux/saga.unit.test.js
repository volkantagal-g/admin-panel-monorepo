import { testSaga } from 'redux-saga-test-plan';

import { Creators, Types } from '@app/pages/MarketProduct/DetailV2/redux/actions';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { mockedMarketProductAllPrice, mockedUpdatingMarketProductPrice } from '@shared/api/marketProductPrice/index.mock.data';
import {
  getMarketProductAllPriceRequest,
  watchGetMarketProductAllPriceRequest,
  updateMarketProductPricingRequest,
  watchUpdateMarketProductPricingRequest,
  createMarketProductImageUrlRequest,
} from '@app/pages/MarketProduct/DetailV2/redux/saga';
import {
  getMarketProductAllPriceHandler,
  updateMarketProductPricingHandler,
} from '@shared/api/marketProductPrice/index.mock.handler';
import { getMarketProductAllPrice, updateMarketProductPricing } from '@shared/api/marketProductPrice';
import { createMarketProductImageUrl } from '@shared/api/marketProduct';
import { createMarketProductImageUrlMock } from '@shared/api/marketProduct/index.mock.handler';
import { uploadToS3SignedUrl } from '@shared/api/public';

describe('Market Product Detail', () => {
  describe('Gallery', () => {
    describe('saga #createMarketProductImageUrlRequest', () => {
      const fakeImageUploadData = {
        key: '0',
        loadedImage: 'MOCK_IMAGE_DATA',
        extension: 'webp',
      };

      const {
        cdnUrl: cdnUrlMock,
        signedUrl: signedUrlMock,
      } = createMarketProductImageUrlMock.successData;

      it('should call createMarketProductImageUrl and uploadToS3SignedUrl endpoints (success)', () => {
        testSaga(createMarketProductImageUrlRequest, fakeImageUploadData)
          .next()
          .call(createMarketProductImageUrl, { extension: fakeImageUploadData.extension })
          .next(createMarketProductImageUrlMock.successData)
          .call(uploadToS3SignedUrl, {
            signedUrl: signedUrlMock,
            data: fakeImageUploadData.loadedImage,
          })
          .next()
          .put(Creators.createMarketProductImageUrlSuccess({
            data: {
              key: fakeImageUploadData.key,
              signedUrl: signedUrlMock,
              cdnUrl: cdnUrlMock,
            },
          }));
      });

      it('should call createMarketProductImageUrl and uploadToS3SignedUrl endpoints (failure)', () => {
        const fakeError = new Error('Fake Error');

        testSaga(createMarketProductImageUrlRequest, fakeImageUploadData)
          .next()
          .call(createMarketProductImageUrl, { extension: fakeImageUploadData.extension })
          .next(createMarketProductImageUrlMock.successData)
          .call(uploadToS3SignedUrl, {
            signedUrl: signedUrlMock,
            data: fakeImageUploadData.loadedImage,
          })
          .throw(fakeError)
          .put(Creators.createMarketProductImageUrlFailure({
            key: fakeImageUploadData.key,
            error: fakeError,
          }))
          .next()
          .put(ToastCreators.error({ error: fakeError }));
      });
    });
  });

  describe('All Prices Sagas', () => {
    describe('saga #getMarketProductAllPriceRequest', () => {
      const fakeRequestData = {
        id: '123456',
        warehouseId: undefined,
      };
      const fakeResponseData = mockedMarketProductAllPrice;

      it('should call the getMarketProductAllPriceRequest (success)', () => {
        testSaga(getMarketProductAllPriceRequest, fakeRequestData)
          .next()
          .call(getMarketProductAllPrice, { ...fakeRequestData })
          .next(getMarketProductAllPriceHandler.successData)
          .put(
            Creators.getMarketProductAllPriceSuccess({ data: fakeResponseData }),
          )
          .next()
          .isDone();
      });
    });
    describe('saga #watchGetMarketProductAllPriceRequest', () => {
      it('should call the watchGetMarketProductAllPriceRequest', () => {
        testSaga(watchGetMarketProductAllPriceRequest)
          .next()
          .takeLatest(
            Types.GET_MARKET_PRODUCT_ALL_PRICE_REQUEST,
            getMarketProductAllPriceRequest,
          )
          .next()
          .isDone();
      });
    });
  });
  describe('Updating Prices Sagas', () => {
    describe('saga #updateMarketProductPricingRequest', () => {
      const fakeRequestData = {
        id: 15240,
        body: {
          listPrice: 11,
          wholesaleVat: 9,
          ecoContributionPrice: 0.75,
        },
      };
      const fakeResponseData = mockedUpdatingMarketProductPrice;

      it('should call the #updateMarketProductPricingRequest (success)', () => {
        testSaga(updateMarketProductPricingRequest, fakeRequestData)
          .next()
          .call(updateMarketProductPricing, { ...fakeRequestData })
          .next(updateMarketProductPricingHandler.successData)
          .put(
            Creators.getMarketProductAllPriceRequest({ id: fakeResponseData[0].id, warehouseId: undefined }),
          )
          .next()
          .put(
            Creators.updateMarketProductPricingSuccess({ data: fakeResponseData }),
          )
          .next()
          .put(ToastCreators.success())
          .next()
          .isDone();
      });
    });
    describe('saga #watchUpdateMarketProductPricingRequest', () => {
      it('should call the watchGetMarketProductAllPriceRequest', () => {
        testSaga(watchUpdateMarketProductPricingRequest)
          .next()
          .takeLatest(
            Types.UPDATE_MARKET_PRODUCT_PRICING_REQUEST,
            updateMarketProductPricingRequest,
          )
          .next()
          .isDone();
      });
    });
  });
});
