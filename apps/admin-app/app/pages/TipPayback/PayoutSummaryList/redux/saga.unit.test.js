import { testSaga } from 'redux-saga-test-plan';

import { getSummaries as getSummariesApi } from '@shared/api/tipPayback';
import { getSummariesRequest } from '@app/pages/TipPayback/PayoutSummaryList/redux/saga';
import { Creators } from '@app/pages/TipPayback/PayoutSummaryList/redux/actions';
import { mockedTipPaybackSummaries } from '@shared/api/tipPayback/index.mock.data';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';

describe('PayoutSummaryList Page', () => {
  describe('#getSummaries', () => {
    const fakeRequestData = {
      pageNo: 1,
      pageSize: 25,
      sort: 'createdAt,desc',
      finishDate: 1663766933881,
      startDate: 1663680533881,

    };
    const fakeResponseData = mockedTipPaybackSummaries;

    it('should call the getSummariesRequest (success)', () => {
      testSaga(getSummariesRequest, fakeRequestData)
        .next()
        .call(getSummariesApi, fakeRequestData)
        .next(fakeResponseData)
        .put(Creators.getSummariesSuccess({ data: fakeResponseData }))
        .next()
        .isDone();
    });

    it('should call the getSummariesRequest (failed)', () => {
      const fakeError = new Error('404 Not Found');
      testSaga(getSummariesRequest, fakeRequestData)
        .next()
        .call(getSummariesApi, fakeRequestData)
        .next(fakeResponseData)
        .throw(fakeError)
        .put(Creators.getSummariesFailure({ error: fakeError }))
        .next()
        .put(ToastCreators.error({ error: fakeError }))
        .next()
        .isDone();
    });
  });
});
