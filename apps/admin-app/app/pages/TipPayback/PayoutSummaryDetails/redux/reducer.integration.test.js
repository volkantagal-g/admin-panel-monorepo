import { expectSaga } from 'redux-saga-test-plan';

import { getSummaryDetails } from './saga';
import { summaryDetailsRequest, summaryDetailsSuccess } from './reducer';
import { mockedDetailsTipPaybackSummaries } from '@shared/api/tipPayback/index.mock.data';

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

describe('PayoutSummaryDetails Page Reducer integration', () => {
  describe('#getSummaryDetails', () => {
    it('summaryDetailsRequest', () => {
      return expectSaga(getSummaryDetails, fakeRequestData)
        .withReducer(summaryDetailsRequest)
        .hasFinalState({
          summaryDetails: {
            isPending: true,
            data: [],
            error: null,
          },
        })
        .run();
    });
    it('summaryDetailsSuccess', () => {
      return expectSaga(getSummaryDetails, fakeRequestData)
        .withReducer(summaryDetailsSuccess)
        .hasFinalState({
          summaryDetails: {
            isPending: false,
            data: mockedDetailsTipPaybackSummaries,
            error: null,
          },
        })
        .run();
    });
  });
});

// TODO: add fail test
