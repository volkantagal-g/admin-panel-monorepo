/* eslint-disable */
import { testSaga } from 'redux-saga-test-plan';
import { describe, it } from '@jest/globals';

import { Creators } from '../../actions';
import { Creators as ToastCreators } from '@app/redux/actions/toast';
import { createBrand } from '@app/api/brand';
import { createBrandRequest } from '../../saga';

describe('#createBrandRequest', () => {
  const fakeRequestData = { body: { name: 'BrandName' } };
  const fakeResponseData = { body: { name: 'BrandName' } };

  it('should call the createBrandRequest (success)', () => {
    testSaga(createBrandRequest, fakeRequestData)
      .next()
      .call(createBrand, fakeRequestData)
      .next(fakeResponseData)
      .put(ToastCreators.success())
      .next()
      .put(Creators.createBrandSuccess({ data: fakeResponseData }))
      .next()
      .isDone();
  });

  it('should call the createBrandRequest (failure)', () => {
    const fakeError = new Error('Error occurred during brand creation');
    testSaga(createBrandRequest, fakeRequestData)
      .next()
      .call(createBrand, fakeRequestData)
      .next(fakeResponseData)
      .throw(fakeError)
      .put(Creators.createBrandFailure({ error: fakeError }))
      .next()
      .put(ToastCreators.error({ error: fakeError }))
      .next()
      .isDone();
  });
});
