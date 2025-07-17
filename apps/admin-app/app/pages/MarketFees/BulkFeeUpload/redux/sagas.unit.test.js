import { testSaga } from 'redux-saga-test-plan';

import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { bulkFeeUpdate } from '@shared/api/fee';
import { basketAmountBulkUploadRequest, marketFeesBulkUploadRequest, watchBasketAmountBulkUploadRequest, watchmarketFeesBulkUploadRequest } from './sagas';
import { Types, Creators } from './actions';
import { bulkUpdateBasketAmounts } from '@shared/api/basketConfig';

describe('Bulk Upload', () => {
  describe('saga #marketFeesBulkUploadRequest', () => {
    const fees = [{
      warehouseId: '559831e0b1dc700c006a71b0',
      domainType: 1,
      deliveryFee: {
        deliveryFeeSource: 'LayeredDeliveryFee',
        layeredDeliveryFee: {
          regular: [{ min: 120, fee: 90 }],
          peak: [{ min: 200, fee: 20 }],
        },
      },
    }];
    const response = { success: true };

    it('should upload fees successfully', () => {
      testSaga(marketFeesBulkUploadRequest, { fees })
        .next()
        .call(bulkFeeUpdate, fees)
        .next(response)
        .put(ToastCreators.success())
        .next()
        .put(Creators.marketFeesBulkUploadSuccess({ data: { success: true } }))
        .next()
        .isDone();
    });
    it('should throw an error when occurred', () => {
      const fakeError = new Error('cannot fetch details at this time');
      testSaga(marketFeesBulkUploadRequest, { fees })
        .next()
        .call(bulkFeeUpdate, fees)
        .next(response)
        .throw(fakeError)
        .put(ToastCreators.error({ message: fakeError }))
        .next()
        .put(Creators.marketFeesBulkUploadFailure({ error: fakeError }))
        .next()
        .isDone();
    });
  });

  describe('saga #basketAmountBulkUploadRequest', () => {
    const basketAmounts = [{
      warehouseId: '559831e0b1dc700c006a71b0',
      domainType: 1,
      minDiscountedAmount: 10,
      maxDiscountedAmount: 40,
    }];
    const response = { success: true };
    it('should upload basketAmounts successfully', () => {
      testSaga(basketAmountBulkUploadRequest, { basketAmounts })
        .next()
        .call(bulkUpdateBasketAmounts, basketAmounts)
        .next(response)
        .put(ToastCreators.success())
        .next()
        .put(Creators.basketAmountBulkUploadSuccess({ data: { success: true } }))
        .next()
        .isDone();
    });
    it('should throw an error when occurred', () => {
      const fakeError = new Error('cannot fetch details at this time');
      testSaga(basketAmountBulkUploadRequest, { basketAmounts })
        .next()
        .call(bulkUpdateBasketAmounts, basketAmounts)
        .next(response)
        .throw(fakeError)
        .put(ToastCreators.error({ message: fakeError }))
        .next()
        .put(Creators.basketAmountBulkUploadFailure({ error: fakeError }))
        .next()
        .isDone();
    });
  });

  describe('saga #watchmarketFeesBulkUploadRequest', () => {
    it('should call the watchmarketFeesBulkUploadRequest', () => {
      testSaga(watchmarketFeesBulkUploadRequest)
        .next()
        .takeLatest(
          Types.MARKET_FEES_BULK_UPLOAD_REQUEST,
          marketFeesBulkUploadRequest,
        )
        .next()
        .isDone();
    });
  });

  describe('saga #watchBasketAmountBulkUploadRequest', () => {
    it('should call the watchBasketAmountBulkUploadRequest', () => {
      testSaga(watchBasketAmountBulkUploadRequest)
        .next()
        .takeLatest(
          Types.BASKET_AMOUNT_BULK_UPLOAD_REQUEST,
          basketAmountBulkUploadRequest,
        )
        .next()
        .isDone();
    });
  });
});
