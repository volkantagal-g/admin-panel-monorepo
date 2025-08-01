import reducer, { INITIAL_STATE } from './reducer';
import { Types } from './actions';
import { mockedRankingScenarioNames } from '@shared/api/marketRanking/index.mock.data';

describe('Market Product Group Common Reducer', () => {
  it('should equal to initial state (without args)', () => {
    expect(reducer()).toEqual(INITIAL_STATE);
  });

  describe('reducer', () => {
    describe('#GET_RANKING_SCENARIO_NAMES_REQUEST', () => {
      it('receivedState should equal to expectedState (without args)', () => {
        const receivedState = reducer({}, { type: Types.GET_RANKING_SCENARIO_NAMES_REQUEST });
        const expectedState = {
          getRankingScenarioNamesRequest: {
            isPending: true,
            data: {},
            error: null,
          },
        };

        expect(receivedState).toEqual(expectedState);
      });
    });

    describe('#GET_RANKING_SCENARIO_NAMES_SUCCESS', () => {
      it('receivedState should equal to expectedState', () => {
        const receivedState = reducer({}, {
          type: Types.GET_RANKING_SCENARIO_NAMES_SUCCESS,
          data: mockedRankingScenarioNames,
        });
        const expectedState = {
          getRankingScenarioNamesRequest: {
            isPending: false,
            data: mockedRankingScenarioNames,
            error: null,
          },
        };

        expect(receivedState).toEqual(expectedState);
      });
    });

    describe('#GET_RANKING_SCENARIO_NAMES_FAILURE', () => {
      it('receivedState should equal to expectedState (without args)', () => {
        const fakeError = new Error('500 Internal Server Error');

        const receivedState = reducer({}, {
          type: Types.GET_RANKING_SCENARIO_NAMES_FAILURE,
          error: fakeError,
        });
        const expectedState = {
          getRankingScenarioNamesRequest: {
            isPending: false,
            error: fakeError,
            data: {},
          },
        };

        expect(receivedState).toEqual(expectedState);
      });
    });
  });
});
