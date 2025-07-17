/* eslint-disable */
import { testSaga } from 'redux-saga-test-plan';

import {
  getBrandRequest,
  updateBrandRequest,
  activateBrandRequest,
  deactivateBrandRequest,
  watchGetBrandRequest,
  watchUpdateBrandRequest,
  watchActivateBrandRequest,
  watchDeactivateBrandRequest,
} from '@app/pages/Brand/Detail/redux/saga';
import { Creators, Types } from '@app/pages/Brand/Detail/redux/actions';
import { Creators as ToastCreators } from '@app/redux/actions/toast';
import { getBrand, updateBrand, activateBrand, deactivateBrand } from '@app/api/brand';

describe('Brand/Detail', () => {
  describe('saga #getBrandRequest', () => {
    const fakeRequestData = { id: '123' };
    const fakeResponseData = { _id: '123', name: 'Name' };

    it('should call the getBrandRequest (success)', () => {
      testSaga(getBrandRequest, fakeRequestData)
        .next()
        .call(getBrand, fakeRequestData)
        .next(fakeResponseData)
        .put(Creators.getBrandSuccess({ data: fakeResponseData }))
        .next()
        .isDone();
    });

    it('should call the getBrandRequest (failure)', () => {
      const fakeError = new Error('404 Not Found');
      testSaga(getBrandRequest, fakeRequestData)
        .next()
        .call(getBrand, fakeRequestData)
        .next(fakeResponseData)
        .throw(fakeError)
        .put(Creators.getBrandFailure({ error: fakeError }))
        .next()
        .put(ToastCreators.error({ error: fakeError }))
        .next()
        .isDone();
    });
  });

  describe('saga #updateBrandRequest', () => {
    const fakeRequestData = { id: '123', updateData: { name: 'Name' } };

    it('should call the updateBrandRequest (success)', () => {
      testSaga(updateBrandRequest, fakeRequestData)
        .next()
        .call(updateBrand, fakeRequestData)
        .next()
        .put(Creators.updateBrandSuccess())
        .next()
        .put(Creators.getBrandRequest({ id: '123' }))
        .next()
        .put(ToastCreators.success())
        .next()
        .isDone();
    });

    it('should call the updateBrandRequest (failure)', () => {
      const fakeError = new Error('404 Not Found');
      testSaga(updateBrandRequest, fakeRequestData)
        .next()
        .call(updateBrand, fakeRequestData)
        .next()
        .throw(fakeError)
        .put(Creators.updateBrandFailure({ error: fakeError }))
        .next()
        .put(ToastCreators.error({ error: fakeError }))
        .next()
        .isDone();
    });
  });

  describe('saga #activateBrandRequest', () => {
    const fakeRequestData = { id: '123' };

    it('should call the activateBrandRequest (success)', () => {
      testSaga(activateBrandRequest, fakeRequestData)
        .next()
        .call(activateBrand, fakeRequestData)
        .next()
        .put(Creators.activateBrandSuccess())
        .next()
        .put(Creators.getBrandRequest({ id: '123' }))
        .next()
        .put(ToastCreators.success())
        .next()
        .isDone();
    });

    it('should call the activateBrandRequest (failure)', () => {
      const fakeError = new Error('404 Not Found');
      testSaga(activateBrandRequest, fakeRequestData)
        .next()
        .call(activateBrand, fakeRequestData)
        .next()
        .throw(fakeError)
        .put(Creators.activateBrandFailure({ error: fakeError }))
        .next()
        .put(ToastCreators.error({ error: fakeError }))
        .next()
        .isDone();
    });
  });

  describe('saga #deactivateBrandRequest', () => {
    const fakeRequestData = { id: '123' };

    it('should call the deactivateBrandRequest (success)', () => {
      testSaga(deactivateBrandRequest, fakeRequestData)
        .next()
        .call(deactivateBrand, fakeRequestData)
        .next()
        .put(Creators.deactivateBrandSuccess())
        .next()
        .put(Creators.getBrandRequest({ id: '123' }))
        .next()
        .put(ToastCreators.success())
        .next()
        .isDone();
    });

    it('should call the deactivateBrandRequest (failure)', () => {
      const fakeError = new Error('404 Not Found');
      testSaga(deactivateBrandRequest, fakeRequestData)
        .next()
        .call(deactivateBrand, fakeRequestData)
        .next()
        .throw(fakeError)
        .put(Creators.deactivateBrandFailure({ error: fakeError }))
        .next()
        .put(ToastCreators.error({ error: fakeError }))
        .next()
        .isDone();
    });
  });

  describe('saga #watchGetBrandRequest', () => {
    it('should call the watchGetBrandRequest', () => {
      testSaga(watchGetBrandRequest)
        .next()
        .takeLatest(Types.GET_BRAND_REQUEST, getBrandRequest)
        .next()
        .isDone();
    });
  });

  describe('saga #watchUpdateBrandRequest', () => {
    it('should call the watchUpdateBrandRequest', () => {
      testSaga(watchUpdateBrandRequest)
        .next()
        .takeLatest(Types.UPDATE_BRAND_REQUEST, updateBrandRequest)
        .next()
        .isDone();
    });
  });

  describe('saga #watchActivateBrandRequest', () => {
    it('should call the watchActivateBrandRequest', () => {
      testSaga(watchActivateBrandRequest)
        .next()
        .takeLatest(Types.ACTIVATE_BRAND_REQUEST, activateBrandRequest)
        .next()
        .isDone();
    });
  });

  describe('saga #watchDeactivateBrandRequest', () => {
    it('should call the watchDeactivateBrandRequest', () => {
      testSaga(watchDeactivateBrandRequest)
        .next()
        .takeLatest(Types.DEACTIVATE_BRAND_REQUEST, deactivateBrandRequest)
        .next()
        .isDone();
    });
  });
});
