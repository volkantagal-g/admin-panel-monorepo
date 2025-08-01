/* eslint-disable */
import { testSaga } from 'redux-saga-test-plan';
import { describe, it } from '@jest/globals';

import { Creators } from '../../actions';
import { Creators as ToastCreators } from '@app/redux/actions/toast';
import { createBadge } from '@app/api/marketProductBadge';
import { createBadgeRequest } from '../../saga';

describe('#createBadgeRequest', () => {
  const fakeRequestData = { body: { name: 'BadgeName' } };
  const fakeResponseData = { body: { name: 'BadgeName' } };

  it('should call the createBadgeRequest (success)', () => {
    testSaga(createBadgeRequest, fakeRequestData)
      .next()
      .call(createBadge, fakeRequestData)
      .next(fakeResponseData)
      .put(ToastCreators.success())
      .next()
      .put(Creators.createBadgeSuccess({ data: fakeResponseData }))
      .next()
      .isDone();
  });

  it('should call the createBadgeRequest (failure)', () => {
    const fakeError = new Error('Error occurred during badge creation');
    testSaga(createBadgeRequest, fakeRequestData)
      .next()
      .call(createBadge, fakeRequestData)
      .next(fakeResponseData)
      .throw(fakeError)
      .put(Creators.createBadgeFailure({ error: fakeError }))
      .next()
      .put(ToastCreators.error({ error: fakeError }))
      .next()
      .isDone();
  });
});
