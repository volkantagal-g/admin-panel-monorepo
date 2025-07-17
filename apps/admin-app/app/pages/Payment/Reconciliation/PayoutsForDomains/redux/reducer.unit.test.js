import reducer, { INITIAL_STATE } from './reducer';
import { Types } from './actions';
import { mockedFoodReport } from '@shared/api/payoutsForDomains/index.mock.data';

describe('PayoutsForDomains', () => {
  it('should equal to initial state (without args)', () => {
    expect(reducer()).toEqual(INITIAL_STATE);
  });
  describe('reducer SUBMIT_FILTERS', () => {
    it('receivedState should equal to expectedState (without args)', () => {
      const receivedState = reducer({}, { type: Types.SUBMIT_FILTERS });
      const expectedState = { payoutsFilters: {} };
      expect(receivedState).toEqual(expectedState);
    });
  });
  describe('reducer HANDLE_DOMAIN_TAB', () => {
    it('receivedState should equal to expectedState (without args)', () => {
      const receivedState = reducer({}, { type: Types.HANDLE_DOMAIN_TAB });
      const expectedState = { domainTab: {} };
      expect(receivedState).toEqual(expectedState);
    });
  });
  describe('reducer GET_PAYOUT_REPORTS', () => {
    describe('#GET_PAYOUT_REPORTS_REQUEST', () => {
      it('receivedState should equal to expectedState (without args)', () => {
        const receivedState = reducer({}, { type: Types.GET_PAYOUT_REPORTS_REQUEST });
        const expectedState = {
          payoutReports: {
            isPending: true,
            data: [],
            error: null,
          },
        };
        expect(receivedState).toEqual(expectedState);
      });
      it('receivedState should equal to expectedState', () => {
        const receivedState = reducer({}, { type: Types.GET_PAYOUT_REPORTS_SUCCESS, data: mockedFoodReport });
        const expectedState = {
          payoutReports: {
            isPending: false,
            data: mockedFoodReport,
            error: null,
          },
        };
        expect(receivedState).toEqual(expectedState);
      });
    });
    describe('#GET_PAYOUT_REPORTS_FAILURE', () => {
      it('receivedState should equal to expectedState', () => {
        const receivedState = reducer({}, { type: Types.GET_PAYOUT_REPORTS_FAILURE, error: new Error('404 Not Found') });
        const expectedState = {
          payoutReports: {
            isPending: false,
            error: new Error('404 Not Found'),
          },
        };
        expect(receivedState).toEqual(expectedState);
      });
    });
  });
});
