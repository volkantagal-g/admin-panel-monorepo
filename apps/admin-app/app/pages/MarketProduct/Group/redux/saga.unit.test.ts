import { testSaga } from 'redux-saga-test-plan';

import { Creators } from './actions';
import { getRankingScenarioNamesRequest } from './saga';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { getRankingScenarioNames } from '@shared/api/marketRanking';
import { mockedRankingScenarioNames } from '@shared/api/marketRanking/index.mock.data';

describe('Market Product Group Common Saga', () => {
  describe('saga #getRankingScenarioNamesRequest', () => {
    it('should call the getRankingScenarioNamesRequest (success)', () => {
      testSaga(getRankingScenarioNamesRequest)
        .next()
        .call(getRankingScenarioNames)
        .next(mockedRankingScenarioNames)
        .put(
          Creators.getRankingScenarioNamesSuccess({ data: mockedRankingScenarioNames }),
        )
        .next()
        .isDone();
    });

    it('should call the getRankingScenarioNamesRequest (fail)', () => {
      const fakeError = new Error('500 Internal Server Error');

      testSaga(getRankingScenarioNamesRequest)
        .next()
        .call(getRankingScenarioNames)
        .next(mockedRankingScenarioNames)
        .throw(fakeError)
        .put(Creators.getRankingScenarioNamesFailure({ error: fakeError }))
        .next()
        .put(ToastCreators.error({ error: fakeError }))
        .next()
        .isDone();
    });
  });
});
