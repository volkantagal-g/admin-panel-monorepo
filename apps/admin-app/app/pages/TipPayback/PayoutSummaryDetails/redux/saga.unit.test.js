import { testSaga } from 'redux-saga-test-plan';

import { getSummaryDetails as getSummaryDetailsApi } from '@shared/api/tipPayback';
import { getSummaryDetails } from '@app/pages/TipPayback/PayoutSummaryDetails/redux/saga';
import { Creators } from '@app/pages/TipPayback/PayoutSummaryDetails/redux/actions';
import { mockedDetailsTipPaybackSummaries } from '@shared/api/tipPayback/index.mock.data';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';

describe('PayoutSummaryDetails Page', () => {
  describe('#getSummaryDetails', () => {
    const fakeRequestData = {
      id: '632b0da225ac696900a690b5',
      pageNo: 1,
      pageSize: 25,
      personName: null,
      payoutStatus: 100,
      sort: 'createdAt,desc',
      person: null,
      taxNum: null,
    };
    const fakeResponseData = mockedDetailsTipPaybackSummaries;
    it('should call the getSummaryDetails (success)', () => {
      testSaga(getSummaryDetails, fakeRequestData)
        .next()
        .call(getSummaryDetailsApi, fakeRequestData)
        .next(fakeResponseData)
        .put(Creators.getSummaryDetailsSuccess({ data: fakeResponseData }))
        .next()
        .isDone();
    });
    it('should call the getSummaryDetails (failed)', () => {
      const fakeError = new Error('404 Not Found');
      testSaga(getSummaryDetails, fakeRequestData)
        .next()
        .call(getSummaryDetailsApi, fakeRequestData)
        .next(fakeResponseData)
        .throw(fakeError)
        .put(Creators.getSummaryDetailsFailure({ error: fakeError }))
        .next()
        .put(ToastCreators.error({ error: fakeError }))
        .next()
        .isDone();
    });
  });
});
