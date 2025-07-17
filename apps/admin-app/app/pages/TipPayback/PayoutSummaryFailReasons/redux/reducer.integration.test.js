import { expectSaga } from 'redux-saga-test-plan';

import { getSummaryFailReasons } from './saga';
import { summaryFailReasonsRequest, summaryFailReasonsSuccess } from './reducer';
import { mockedFailedTipPaybackSummaries } from '@shared/api/tipPayback/index.mock.data';

const fakeRequestData = {
  id: '632b0da225ac696900a690b5',
  pageNo: 1,
  pageSize: 25,
  personName: '',
  sort: 'createdAt,desc',
};

describe('PayoutSummaryFailReasons Page Reducer integration', () => {
  describe('#summaryFailReasonsRequest', () => {
    it('summaryFailReasonsRequest', () => {
      return expectSaga(getSummaryFailReasons, fakeRequestData)
        .withReducer(summaryFailReasonsRequest)
        .hasFinalState({
          summaryFailReasons: {
            isPending: true,
            data: [],
            error: null,
          },
        })
        .run();
    });
    it('summaryDetailsSuccess', () => {
      return expectSaga(getSummaryFailReasons, fakeRequestData)
        .withReducer(summaryFailReasonsSuccess)
        .hasFinalState({
          summaryFailReasons: {
            isPending: false,
            data: mockedFailedTipPaybackSummaries,
            error: null,
          },
        })
        .run();
    });
  });
});

// TODO: add fail test
