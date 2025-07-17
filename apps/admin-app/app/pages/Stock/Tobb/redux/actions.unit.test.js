import { Creators, Types } from '@app/pages/Stock/Tobb/redux/actions';

const requestData = { ids: ['3940482658'], isRetryFailedRequests: false };

describe('Stock/Tobb', () => {
  describe('action-creator GET_TOBB_GIB_REQUEST ', () => {
    describe('#getTobbGibRequestRequest', () => {
      it('receivedAction should be equal to expectedAction (without args)', () => {
        const receivedAction = Creators.getTobbGibRequestRequest();
        const expectedAction = { type: Types.GET_TOBB_GIB_REQUEST_REQUEST, ids: [], isRetryFailedRequests: null };
        expect(receivedAction).toEqual(expectedAction);
      });

      it('receivedAction should be equal to expectedAction (with args)', () => {
        const receivedAction = Creators.getTobbGibRequestRequest({ ...requestData });
        const expectedAction = { type: Types.GET_TOBB_GIB_REQUEST_REQUEST, ...requestData };
        expect(receivedAction).toEqual(expectedAction);
      });

      it('should ignore extra args', () => {
        const receivedAction = Creators.getTobbGibRequestRequest({ ...requestData, wrongArg: '1' });
        const expectedAction = { type: Types.GET_TOBB_GIB_REQUEST_REQUEST, ...requestData };
        expect(receivedAction).toEqual(expectedAction);
      });
    });

    describe('#getTobbGibRequestSuccess', () => {
      it('receivedAction should be equal to expectedAction (without args)', () => {
        const receivedAction = Creators.getTobbGibRequestSuccess();
        const expectedAction = { type: Types.GET_TOBB_GIB_REQUEST_SUCCESS, data: [], failedRequests: [], invalidRequests: [] };
        expect(receivedAction).toEqual(expectedAction);
      });

      it('should ignore any args', () => {
        const receivedAction = Creators.getTobbGibRequestSuccess({ wrongArg: '1' });
        const expectedAction = { type: Types.GET_TOBB_GIB_REQUEST_SUCCESS, data: [], failedRequests: [], invalidRequests: [] };
        expect(receivedAction).toEqual(expectedAction);
      });
    });

    describe('#getTobbGibRequestFailure', () => {
      it('receivedAction should be equal to expectedAction (without args)', () => {
        const receivedAction = Creators.getTobbGibRequestFailure();
        const expectedAction = { type: Types.GET_TOBB_GIB_REQUEST_FAILURE, error: null, data: [], failedRequests: [], invalidRequests: [] };
        expect(receivedAction).toEqual(expectedAction);
      });

      it('receivedAction should be equal to expectedAction (with args)', () => {
        const receivedAction = Creators.getTobbGibRequestFailure({ error: new Error('404 Not Found'), data: [], failedRequests: [], invalidRequests: [] });
        const expectedAction = {
          type: Types.GET_TOBB_GIB_REQUEST_FAILURE,
          error: new Error('404 Not Found'),
          data: [],
          failedRequests: [],
          invalidRequests: [],
        };
        expect(receivedAction).toEqual(expectedAction);
      });

      it('should ignore extra args', () => {
        const receivedAction = Creators.getTobbGibRequestFailure({
          error: new Error('404 Not Found'),
          data: [],
          failedRequests: [],
          invalidRequests: [],
          wrongArg: '1',
        });
        const expectedAction = {
          type: Types.GET_TOBB_GIB_REQUEST_FAILURE,
          error: new Error('404 Not Found'),
          data: [],
          failedRequests: [],
          invalidRequests: [],
        };
        expect(receivedAction).toEqual(expectedAction);
      });
    });
  });

  describe('action-creator EXPORT_TOBB_GIB_REQUEST_SUCCESS_REQUESTS ', () => {
    describe('#exportTobbGibRequestSuccessRequestsRequest', () => {
      it('receivedAction should be equal to expectedAction', () => {
        const receivedAction = Creators.exportTobbGibRequestSuccessRequestsRequest();
        const expectedAction = { type: Types.EXPORT_TOBB_GIB_REQUEST_SUCCESS_REQUESTS_REQUEST, data: {} };
        expect(receivedAction).toEqual(expectedAction);
      });

      it('should ignore extra args', () => {
        const receivedAction = Creators.exportTobbGibRequestSuccessRequestsRequest({ data: {}, wrongArg: '1' });
        const expectedAction = { type: Types.EXPORT_TOBB_GIB_REQUEST_SUCCESS_REQUESTS_REQUEST, data: {} };
        expect(receivedAction).toEqual(expectedAction);
      });
    });

    describe('#exportTobbGibRequestSuccessRequestsSuccess', () => {
      it('receivedAction should be equal to expectedAction (without args)', () => {
        const receivedAction = Creators.exportTobbGibRequestSuccessRequestsSuccess();
        const expectedAction = { type: Types.EXPORT_TOBB_GIB_REQUEST_SUCCESS_REQUESTS_SUCCESS };
        expect(receivedAction).toEqual(expectedAction);
      });

      it('should ignore any args', () => {
        const receivedAction = Creators.exportTobbGibRequestSuccessRequestsSuccess({ wrongArg: '1' });
        const expectedAction = { type: Types.EXPORT_TOBB_GIB_REQUEST_SUCCESS_REQUESTS_SUCCESS };
        expect(receivedAction).toEqual(expectedAction);
      });
    });

    describe('#exportTobbGibRequestSuccessRequestsFailure', () => {
      it('receivedAction should be equal to expectedAction (without args)', () => {
        const receivedAction = Creators.exportTobbGibRequestSuccessRequestsFailure();
        const expectedAction = { type: Types.EXPORT_TOBB_GIB_REQUEST_SUCCESS_REQUESTS_FAILURE, error: null };
        expect(receivedAction).toEqual(expectedAction);
      });

      it('receivedAction should be equal to expectedAction (with args)', () => {
        const receivedAction = Creators.exportTobbGibRequestSuccessRequestsFailure({ error: new Error('404 Not Found') });
        const expectedAction = { type: Types.EXPORT_TOBB_GIB_REQUEST_SUCCESS_REQUESTS_FAILURE, error: new Error('404 Not Found') };
        expect(receivedAction).toEqual(expectedAction);
      });

      it('should ignore extra args', () => {
        const receivedAction = Creators.exportTobbGibRequestSuccessRequestsFailure({ error: new Error('404 Not Found'), wrongArg: '1' });
        const expectedAction = { type: Types.EXPORT_TOBB_GIB_REQUEST_SUCCESS_REQUESTS_FAILURE, error: new Error('404 Not Found') };
        expect(receivedAction).toEqual(expectedAction);
      });
    });
  });

  describe('action-creator EXPORT_TOBB_GIB_REQUEST_INVALID_REQUESTS ', () => {
    describe('#exportTobbGibRequestInvalidRequestsRequest', () => {
      it('receivedAction should be equal to expectedAction', () => {
        const receivedAction = Creators.exportTobbGibRequestInvalidRequestsRequest();
        const expectedAction = { type: Types.EXPORT_TOBB_GIB_REQUEST_INVALID_REQUESTS_REQUEST, data: {} };
        expect(receivedAction).toEqual(expectedAction);
      });

      it('should ignore extra args', () => {
        const receivedAction = Creators.exportTobbGibRequestInvalidRequestsRequest({ data: {}, wrongArg: '1' });
        const expectedAction = { type: Types.EXPORT_TOBB_GIB_REQUEST_INVALID_REQUESTS_REQUEST, data: {} };
        expect(receivedAction).toEqual(expectedAction);
      });
    });

    describe('#exportTobbGibRequestInvalidRequestsSuccess', () => {
      it('receivedAction should be equal to expectedAction (without args)', () => {
        const receivedAction = Creators.exportTobbGibRequestInvalidRequestsSuccess();
        const expectedAction = { type: Types.EXPORT_TOBB_GIB_REQUEST_INVALID_REQUESTS_SUCCESS };
        expect(receivedAction).toEqual(expectedAction);
      });

      it('should ignore any args', () => {
        const receivedAction = Creators.exportTobbGibRequestInvalidRequestsSuccess({ wrongArg: '1' });
        const expectedAction = { type: Types.EXPORT_TOBB_GIB_REQUEST_INVALID_REQUESTS_SUCCESS };
        expect(receivedAction).toEqual(expectedAction);
      });
    });

    describe('#exportTobbGibRequestInvalidRequestsFailure', () => {
      it('receivedAction should be equal to expectedAction (without args)', () => {
        const receivedAction = Creators.exportTobbGibRequestInvalidRequestsFailure();
        const expectedAction = { type: Types.EXPORT_TOBB_GIB_REQUEST_INVALID_REQUESTS_FAILURE, error: null };
        expect(receivedAction).toEqual(expectedAction);
      });

      it('receivedAction should be equal to expectedAction (with args)', () => {
        const receivedAction = Creators.exportTobbGibRequestInvalidRequestsFailure({ error: new Error('404 Not Found') });
        const expectedAction = { type: Types.EXPORT_TOBB_GIB_REQUEST_INVALID_REQUESTS_FAILURE, error: new Error('404 Not Found') };
        expect(receivedAction).toEqual(expectedAction);
      });

      it('should ignore extra args', () => {
        const receivedAction = Creators.exportTobbGibRequestInvalidRequestsFailure({ error: new Error('404 Not Found'), wrongArg: '1' });
        const expectedAction = { type: Types.EXPORT_TOBB_GIB_REQUEST_INVALID_REQUESTS_FAILURE, error: new Error('404 Not Found') };
        expect(receivedAction).toEqual(expectedAction);
      });
    });
  });

  describe('action-creator EXPORT_TOBB_GIB_REQUEST_FAILED_REQUESTS ', () => {
    describe('#exportTobbGibRequestFailedRequestsRequest', () => {
      it('receivedAction should be equal to expectedAction', () => {
        const receivedAction = Creators.exportTobbGibRequestFailedRequestsRequest();
        const expectedAction = { type: Types.EXPORT_TOBB_GIB_REQUEST_FAILED_REQUESTS_REQUEST, data: {} };
        expect(receivedAction).toEqual(expectedAction);
      });

      it('should ignore extra args', () => {
        const receivedAction = Creators.exportTobbGibRequestFailedRequestsRequest({ data: {}, wrongArg: '1' });
        const expectedAction = { type: Types.EXPORT_TOBB_GIB_REQUEST_FAILED_REQUESTS_REQUEST, data: {} };
        expect(receivedAction).toEqual(expectedAction);
      });
    });

    describe('#exportTobbGibRequestFailedRequestsSuccess', () => {
      it('receivedAction should be equal to expectedAction (without args)', () => {
        const receivedAction = Creators.exportTobbGibRequestFailedRequestsSuccess();
        const expectedAction = { type: Types.EXPORT_TOBB_GIB_REQUEST_FAILED_REQUESTS_SUCCESS };
        expect(receivedAction).toEqual(expectedAction);
      });

      it('should ignore any args', () => {
        const receivedAction = Creators.exportTobbGibRequestFailedRequestsSuccess({ wrongArg: '1' });
        const expectedAction = { type: Types.EXPORT_TOBB_GIB_REQUEST_FAILED_REQUESTS_SUCCESS };
        expect(receivedAction).toEqual(expectedAction);
      });
    });

    describe('#exportTobbGibRequestFailedRequestsFailure', () => {
      it('receivedAction should be equal to expectedAction (without args)', () => {
        const receivedAction = Creators.exportTobbGibRequestFailedRequestsFailure();
        const expectedAction = { type: Types.EXPORT_TOBB_GIB_REQUEST_FAILED_REQUESTS_FAILURE, error: null };
        expect(receivedAction).toEqual(expectedAction);
      });

      it('receivedAction should be equal to expectedAction (with args)', () => {
        const receivedAction = Creators.exportTobbGibRequestFailedRequestsFailure({ error: new Error('404 Not Found') });
        const expectedAction = { type: Types.EXPORT_TOBB_GIB_REQUEST_FAILED_REQUESTS_FAILURE, error: new Error('404 Not Found') };
        expect(receivedAction).toEqual(expectedAction);
      });

      it('should ignore extra args', () => {
        const receivedAction = Creators.exportTobbGibRequestFailedRequestsFailure({ error: new Error('404 Not Found'), wrongArg: '1' });
        const expectedAction = { type: Types.EXPORT_TOBB_GIB_REQUEST_FAILED_REQUESTS_FAILURE, error: new Error('404 Not Found') };
        expect(receivedAction).toEqual(expectedAction);
      });
    });
  });

  describe('action-creator TOBB_GIB_REQUEST_PROCESSED_REQUESTS ', () => {
    describe('#setTobbGibRequestProcessedRequests', () => {
      it('receivedAction should be equal to expectedAction (without args)', () => {
        const receivedAction = Creators.setTobbGibRequestProcessedRequests();
        const expectedAction = { type: Types.SET_TOBB_GIB_REQUEST_PROCESSED_REQUESTS, processedRequests: [] };
        expect(receivedAction).toEqual(expectedAction);
      });

      it('receivedAction should be equal to expectedAction (with args)', () => {
        const receivedAction = Creators.setTobbGibRequestProcessedRequests({ processedRequests: ['3940482658'] });
        const expectedAction = { type: Types.SET_TOBB_GIB_REQUEST_PROCESSED_REQUESTS, processedRequests: ['3940482658'] };
        expect(receivedAction).toEqual(expectedAction);
      });

      it('should ignore extra args', () => {
        const receivedAction = Creators.setTobbGibRequestProcessedRequests({ processedRequests: ['3940482658'], wrongArg: '1' });
        const expectedAction = { type: Types.SET_TOBB_GIB_REQUEST_PROCESSED_REQUESTS, processedRequests: ['3940482658'] };
        expect(receivedAction).toEqual(expectedAction);
      });
    });

    describe('#resetTobbGibRequestProcessedRequests', () => {
      it('receivedAction should be equal to expectedAction (without args)', () => {
        const receivedAction = Creators.resetTobbGibRequestProcessedRequests();
        const expectedAction = { type: Types.RESET_TOBB_GIB_REQUEST_PROCESSED_REQUESTS, processedRequests: [] };
        expect(receivedAction).toEqual(expectedAction);
      });

      it('receivedAction should be equal to expectedAction (with args)', () => {
        const receivedAction = Creators.resetTobbGibRequestProcessedRequests({ processedRequests: ['3940482658'] });
        const expectedAction = { type: Types.RESET_TOBB_GIB_REQUEST_PROCESSED_REQUESTS, processedRequests: ['3940482658'] };
        expect(receivedAction).toEqual(expectedAction);
      });

      it('should ignore extra args', () => {
        const receivedAction = Creators.resetTobbGibRequestProcessedRequests({ processedRequests: ['3940482658'], wrongArg: '1' });
        const expectedAction = { type: Types.RESET_TOBB_GIB_REQUEST_PROCESSED_REQUESTS, processedRequests: ['3940482658'] };
        expect(receivedAction).toEqual(expectedAction);
      });
    });
  });
});
