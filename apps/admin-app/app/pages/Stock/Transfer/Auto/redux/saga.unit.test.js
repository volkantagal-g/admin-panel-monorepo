import { testSaga } from 'redux-saga-test-plan';

import {
  getStockTransferAutoRequest,
  getMarketProductMasterCategoriesOldRequest,
  watchStockTransferAutoRequest,
  watchGetMarketProductMasterCategoriesOldRequest,
} from '@app/pages/Stock/Transfer/Auto/redux/saga';
import { Creators, Types } from '@app/pages/Stock/Transfer/Auto/redux/actions';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { getAutoStockTransfers, getMarketProductMasterCategoriesOld } from '@shared/api/stock';

describe('StockTransferAuto', () => {
  describe('saga #getStockTransferAutoRequest', () => {
    const fakeRequestData = {
      maxColiBool: false,
      maxColiCount: 5,
      maxStockDay: 10,
      serviceType: 2,
    };
    const fakeResponseData = { success: 'Report will be sent via email after prepared...' };

    it('should call the getAutoStockOrderRequest (success)', () => {
      testSaga(getStockTransferAutoRequest, { data: fakeRequestData })
        .next()
        .call(getAutoStockTransfers, { data: fakeRequestData })
        .next(fakeResponseData)
        .put(Creators.getStockTransferAutoSuccess({ data: fakeResponseData }))
        .next()
        .put(ToastCreators.success({ message: fakeResponseData.success }))
        .next()
        .isDone();
    });

    it('should call the getStockTransferAutoRequest (failure)', () => {
      const fakeError = new Error('404 Not Found');
      testSaga(getStockTransferAutoRequest, { data: fakeRequestData })
        .next()
        .call(getAutoStockTransfers, { data: fakeRequestData })
        .next(fakeResponseData)
        .throw(fakeError)
        .put(Creators.getStockTransferAutoFailure({ error: fakeError }))
        .next()
        .put(ToastCreators.error({ error: fakeError }))
        .next()
        .isDone();
    });
  });

  describe('saga #watchStockTransferAutoRequest', () => {
    it('should call the watchStockTransferAutoRequest', () => {
      testSaga(watchStockTransferAutoRequest)
        .next()
        .takeLatest(Types.GET_STOCK_TRANSFER_AUTO_REQUEST, getStockTransferAutoRequest)
        .next()
        .isDone();
    });
  });

  describe('saga #getMarketProductMasterCategoriesOldRequest', () => {
    const fakeRequestData = {
      isSubCategory: null,
      limit: null,
      offset: null,
    };
    const fakeResponseData = [{ _id: '123', name: 'Name' }];

    it('should call the getMarketProductMasterCategoriesOldRequest (success)', () => {
      testSaga(getMarketProductMasterCategoriesOldRequest, { ...fakeRequestData })
        .next()
        .call(getMarketProductMasterCategoriesOld, { ...fakeRequestData })
        .next(fakeResponseData)
        .put(Creators.getMarketProductMasterCategoriesOldSuccess({ data: fakeResponseData }))
        .next()
        .isDone();
    });

    it('should call the getMarketProductMasterCategoriesOldRequest (failure)', () => {
      const fakeError = new Error('404 Not Found');
      testSaga(getMarketProductMasterCategoriesOldRequest, { ...fakeRequestData })
        .next()
        .call(getMarketProductMasterCategoriesOld, { ...fakeRequestData })
        .next(fakeResponseData)
        .throw(fakeError)
        .put(Creators.getMarketProductMasterCategoriesOldFailure({ error: fakeError }))
        .next()
        .put(ToastCreators.error({ error: fakeError }))
        .next()
        .isDone();
    });
  });

  describe('saga #watchGetMarketProductMasterCategoriesOldRequest', () => {
    it('should call the watchGetMarketProductMasterCategoriesOldRequest', () => {
      testSaga(watchGetMarketProductMasterCategoriesOldRequest)
        .next()
        .takeLatest(
          Types.GET_MARKET_PRODUCT_MASTER_CATEGORIES_OLD_REQUEST,
          getMarketProductMasterCategoriesOldRequest,
        )
        .next()
        .isDone();
    });
  });
});
