import { Creators, Types } from '@app/pages/Payment/Reconciliation/PayoutsForDomains/redux/actions';
import { sampleRequestForPayoutsForDomains } from '../index.mock.data';
import { mockedFoodReport } from '@shared/api/payoutsForDomains/index.mock.data';
import { INIT_FILTERS } from '../constants';

describe('PayoutsForDomains', () => {
  describe('action-creator #getPayouts', () => {
    describe('#getPayoutReportsRequest', () => {
      it('receivedAction should equal to expectedAction (without args)', () => {
        const receivedAction = Creators.getPayoutReportsRequest();
        const expectedAction = { type: Types.GET_PAYOUT_REPORTS_REQUEST, filters: null };
        expect(receivedAction).toEqual(expectedAction);
      });
      it('receivedAction should equal to expectedAction (with args)', () => {
        const receivedAction = Creators.getPayoutReportsRequest({ filters: sampleRequestForPayoutsForDomains });
        const expectedAction = { type: Types.GET_PAYOUT_REPORTS_REQUEST, filters: sampleRequestForPayoutsForDomains };
        expect(receivedAction).toEqual(expectedAction);
      });
      it('should ignore extra args', () => {
        const receivedAction = Creators.getPayoutReportsRequest({ filters: sampleRequestForPayoutsForDomains, wrongArg: '1' });
        const expectedAction = { type: Types.GET_PAYOUT_REPORTS_REQUEST, filters: sampleRequestForPayoutsForDomains };
        expect(receivedAction).toEqual(expectedAction);
      });
    });
    describe('#getPayoutReportsSuccess', () => {
      it('receivedAction should equal to expectedAction (without args)', () => {
        const receivedAction = Creators.getPayoutReportsSuccess();
        const expectedAction = { type: Types.GET_PAYOUT_REPORTS_SUCCESS, data: [] };
        expect(receivedAction).toEqual(expectedAction);
      });
      it('receivedAction should equal to expectedAction (with args)', () => {
        const receivedAction = Creators.getPayoutReportsSuccess({ data: mockedFoodReport });
        const expectedAction = { type: Types.GET_PAYOUT_REPORTS_SUCCESS, data: mockedFoodReport };
        expect(receivedAction).toEqual(expectedAction);
      });
      it('should ignore extra args', () => {
        const receivedAction = Creators.getPayoutReportsSuccess({ data: mockedFoodReport, wrongArg: '1' });
        const expectedAction = { type: Types.GET_PAYOUT_REPORTS_SUCCESS, data: mockedFoodReport };
        expect(receivedAction).toEqual(expectedAction);
      });
    });

    describe('#getPayoutReportsFailure', () => {
      it('receivedAction should equal to expectedAction (without args)', () => {
        const receivedAction = Creators.getPayoutReportsFailure();
        const expectedAction = { type: Types.GET_PAYOUT_REPORTS_FAILURE, error: null };
        expect(receivedAction).toEqual(expectedAction);
      });
      it('receivedAction should equal to expectedAction (with args)', () => {
        const receivedAction = Creators.getPayoutReportsFailure({ error: new Error('404 Not Found') });
        const expectedAction = { type: Types.GET_PAYOUT_REPORTS_FAILURE, error: new Error('404 Not Found') };
        expect(receivedAction).toEqual(expectedAction);
      });
      it('should ignore extra args', () => {
        const receivedAction = Creators.getPayoutReportsFailure({ error: new Error('404 Not Found'), wrongArg: '1' });
        const expectedAction = { type: Types.GET_PAYOUT_REPORTS_FAILURE, error: new Error('404 Not Found') };
        expect(receivedAction).toEqual(expectedAction);
      });
    });
  });
  describe('#handleDomainTab', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.handleDomainTab();
      const expectedAction = { type: Types.HANDLE_DOMAIN_TAB, domain: 'food' };
      expect(receivedAction).toEqual(expectedAction);
    });

    it('receivedAction should equal to expectedAction (with args)', () => {
      const receivedAction = Creators.handleDomainTab({ domain: 'local' });
      const expectedAction = { type: Types.HANDLE_DOMAIN_TAB, domain: 'local' };
      expect(receivedAction).toEqual(expectedAction);
    });

    it('should ignore extra args', () => {
      const receivedAction = Creators.handleDomainTab({ domain: 'local', wrongArg: "I'am not a arg. of this func" });
      const expectedAction = { type: Types.HANDLE_DOMAIN_TAB, domain: 'local' };
      expect(receivedAction).toEqual(expectedAction);
    });
  });
  describe('#submitFilters', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.submitFilters();
      const expectedAction = { type: Types.SUBMIT_FILTERS, filters: INIT_FILTERS };
      expect(receivedAction).toEqual(expectedAction);
    });

    it('receivedAction should equal to expectedAction (with args)', () => {
      const receivedAction = Creators.submitFilters({ filters: sampleRequestForPayoutsForDomains });
      const expectedAction = { type: Types.SUBMIT_FILTERS, filters: sampleRequestForPayoutsForDomains };
      expect(receivedAction).toEqual(expectedAction);
    });

    it('should ignore extra args', () => {
      const receivedAction = Creators.submitFilters({ filters: sampleRequestForPayoutsForDomains, wrongArg: "I'am not a arg. of this func" });
      const expectedAction = { type: Types.SUBMIT_FILTERS, filters: sampleRequestForPayoutsForDomains };
      expect(receivedAction).toEqual(expectedAction);
    });
  });
});
