import { testSaga } from 'redux-saga-test-plan';

import { getPayoutReportsRequest, handleDomainTabChange, submitFilters } from './saga';
import { INIT_FILTERS } from '../constants';
import { getFoodPayoutReportsApi } from '@shared/api/payoutsForDomains';
import { Creators } from './actions';
import { mockedFoodReport } from '@shared/api/payoutsForDomains/index.mock.data';
import { sampleRequestForPayoutsForDomains } from '../index.mock.data';
import { domainTabSelector } from './selectors';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';

describe('PayoutsForDomains', () => {
  describe('saga #getPayoutReportsRequest', () => {
    const selectedApi = getFoodPayoutReportsApi;
    const fakeResponse = { data: mockedFoodReport };
    const startTime = '2023-05-31';
    const endTime = '2023-06-01';
    const requestBody = { startTime, endTime };
    it('should call the getPayoutReportsRequest (success)', () => {
      testSaga(getPayoutReportsRequest, ({ filters: sampleRequestForPayoutsForDomains }))
        .next()
        .select(domainTabSelector.getDomain)
        .next()
        .call(selectedApi, requestBody)
        .next({ data: mockedFoodReport })
        .put(Creators.getPayoutReportsSuccess(fakeResponse))
        .next()
        .isDone();
    });
    it('should call the getPayoutReportsRequest (failure)', () => {
      const fakeError = new Error('404 Not Found');
      testSaga(getPayoutReportsRequest, ({ filters: sampleRequestForPayoutsForDomains }))
        .next()
        .select(domainTabSelector.getDomain)
        .next()
        .call(selectedApi, requestBody)
        .next({ data: mockedFoodReport })
        .throw(fakeError)
        .put(Creators.getPayoutReportsFailure({ error: fakeError }))
        .next()
        .put(ToastCreators.error({ error: fakeError }))
        .next()
        .isDone();
    });
  });

  describe('saga submitFilters', () => {
    it('should call the submitFilters', () => {
      testSaga(submitFilters, ({ filters: INIT_FILTERS }))
        .next()
        .put(Creators.getPayoutReportsRequest({ filters: INIT_FILTERS }))
        .next()
        .isDone();
    });
  });
  describe('saga handleDomainTabChange', () => {
    it('should call the handleDomainTabChange', () => {
      testSaga(handleDomainTabChange)
        .next()
        .put(Creators.getPayoutReportsSuccess({ data: {} }))
        .next()
        .isDone();
    });
  });
});
