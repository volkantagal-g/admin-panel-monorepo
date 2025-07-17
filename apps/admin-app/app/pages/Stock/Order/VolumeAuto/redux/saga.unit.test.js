import { testSaga } from 'redux-saga-test-plan';

import {
  getSuppliersRequest,
  getAutoStockOrderRequest,
  watchSuppliersRequest,
  watchAutoStockOrderRequest,
} from '@app/pages/Stock/Order/VolumeAuto/redux/saga';
import { Creators, Types } from '@app/pages/Stock/Order/VolumeAuto/redux/actions';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { getAutoStockOrder, getSuppliers } from '@shared/api/stock';

describe('Suppliers/List', () => {
  describe('saga #getSuppliersRequest', () => {
    const fakeResponseData = [{ _id: '123', name: 'Supplier Name' }];

    it('should call the getSuppliersRequest (success)', () => {
      testSaga(getSuppliersRequest)
        .next()
        .call(getSuppliers)
        .next(fakeResponseData)
        .put(Creators.getSuppliersSuccess({ data: fakeResponseData }))
        .next()
        .isDone();
    });

    it('should call the getSuppliersRequest (failure)', () => {
      const fakeError = new Error('404 Not Found');
      testSaga(getSuppliersRequest)
        .next()
        .call(getSuppliers)
        .next(fakeResponseData)
        .throw(fakeError)
        .put(Creators.getSuppliersFailure({ error: fakeError }))
        .next()
        .put(ToastCreators.error({ error: fakeError }))
        .next()
        .isDone();
    });
  });

  describe('saga #watchGetSuppliersRequest', () => {
    it('should call the watchGetSuppliersRequest', () => {
      testSaga(watchSuppliersRequest)
        .next()
        .takeLatest(Types.GET_SUPPLIERS_REQUEST, getSuppliersRequest)
        .next()
        .isDone();
    });
  });
});

describe('AutoStockOrders', () => {
  describe('saga #getAutoStockOrderRequest', () => {
    const fakeRequestData = {
      maxColiBool: false,
      maxColiCount: 5,
      maxStockDay: 10,
      serviceType: 2,
    };
    const fakeResponseData = { success: 'Report will be sent via email after prepared...' };

    it('should call the getAutoStockOrderRequest (success)', () => {
      testSaga(getAutoStockOrderRequest, { data: fakeRequestData })
        .next()
        .call(getAutoStockOrder, { data: fakeRequestData })
        .next(fakeResponseData)
        .put(Creators.getAutoStockOrderSuccess({ data: fakeResponseData }))
        .next()
        .put(ToastCreators.success({ message: fakeResponseData.success }))
        .next()
        .isDone();
    });

    it('should call the getAutoStockOrderRequest (failure)', () => {
      const fakeError = new Error('404 Not Found');
      testSaga(getAutoStockOrderRequest, { data: fakeRequestData })
        .next()
        .call(getAutoStockOrder, { data: fakeRequestData })
        .next(fakeResponseData)
        .throw(fakeError)
        .put(Creators.getAutoStockOrderFailure({ error: fakeError }))
        .next()
        .put(ToastCreators.error({ error: fakeError }))
        .next()
        .isDone();
    });
  });

  describe('saga #watchAutoStockOrderRequest', () => {
    it('should call the watchAutoStockOrderRequest', () => {
      testSaga(watchAutoStockOrderRequest)
        .next()
        .takeLatest(Types.GET_AUTO_STOCK_ORDER_REQUEST, getAutoStockOrderRequest)
        .next()
        .isDone();
    });
  });
});
