/* eslint-disable */
import { testSaga } from 'redux-saga-test-plan';

import {
  getBrandsRequest,
  watchGetBrandsRequest,
} from '@app/pages/Brand/List/redux/saga';
import { Creators, Types } from '@app/pages/Brand/List/redux/actions';
import { Creators as ToastCreators } from '@app/redux/actions/toast';
import { getBrands } from '@app/api/brand';

describe('Brand/List', () => {
  describe('saga #getBrandsRequest', () => {
    const fakeRequestData = { limit: 1, offset: 0, name: 'Name', status: false };
    const fakeResponseData = [{ _id: '123', name: 'Name' }];

    it('should call the getBrandsRequest (success)', () => {
      testSaga(getBrandsRequest, fakeRequestData)
        .next()
        .call(getBrands, fakeRequestData)
        .next(fakeResponseData)
        .put(Creators.getBrandsSuccess({ data: fakeResponseData }))
        .next()
        .isDone();
    });

    it('should call the getBrandsRequest (failure)', () => {
      const fakeError = new Error('404 Not Found');
      testSaga(getBrandsRequest, fakeRequestData)
        .next()
        .call(getBrands, fakeRequestData)
        .next(fakeResponseData)
        .throw(fakeError)
        .put(Creators.getBrandsFailure({ error: fakeError }))
        .next()
        .put(ToastCreators.error({ error: fakeError }))
        .next()
        .isDone();
    });
  });

  describe('saga #watchGetBrandsRequest', () => {
    it('should call the watchGetBrandsRequest', () => {
      testSaga(watchGetBrandsRequest)
        .next()
        .takeLatest(Types.GET_BRANDS_REQUEST, getBrandsRequest)
        .next()
        .isDone();
    });
  });
});
