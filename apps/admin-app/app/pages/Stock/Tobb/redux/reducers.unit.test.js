import reducer, { INITIAL_STATE } from '@app/pages/Stock/Tobb/redux/reducers';
import { Types } from '@app/pages/Stock/Tobb/redux/actions';
import { mockedGetTobbGibRequest } from '@shared/api/tobb/index.mock.data';

describe('Stock/Tobb', () => {
  it('should equal to initial state (without args)', () => {
    expect(reducer()).toEqual(INITIAL_STATE);
  });

  describe('reducer GET_TOBB_GIB_REQUEST', () => {
    describe('REQUEST', () => {
      it('receivedState should equal to expectedState', () => {
        const receivedState = reducer({}, { type: Types.GET_TOBB_GIB_REQUEST_REQUEST });
        const expectedState = {
          ids: undefined,
          failedRequests: [],
          invalidRequests: [],
          tobbGibRequest: { data: [], isPending: true },
        };
        expect(receivedState).toEqual(expectedState);
      });
    });
    describe('SUCCESS', () => {
      it('receivedState should equal to expectedState', () => {
        const receivedState = reducer({}, { type: Types.GET_TOBB_GIB_REQUEST_SUCCESS, data: mockedGetTobbGibRequest });
        const expectedState = {
          tobbGibRequest: {
            isPending: false,
            data: mockedGetTobbGibRequest,
          },
        };
        expect(receivedState).toEqual(expectedState);
      });
    });
    describe('FAILURE', () => {
      it('receivedState should equal to expectedState', () => {
        const receivedState = reducer({}, { type: Types.GET_TOBB_GIB_REQUEST_FAILURE, error: new Error('404 Not Found') });
        const expectedState = {
          tobbGibRequest: {
            isPending: false,
            error: new Error('404 Not Found'),
          },
        };
        expect(receivedState).toEqual(expectedState);
      });
    });
  });

  describe('reducer EXPORT_TOBB_GIB_REQUEST_SUCCESS_REQUESTS', () => {
    describe('REQUEST', () => {
      it('receivedState should equal to expectedState', () => {
        const receivedState = reducer({}, { type: Types.EXPORT_TOBB_GIB_REQUEST_SUCCESS_REQUESTS_REQUEST });
        const expectedState = { exportTobbGibRequestSuccessRequests: { isPending: true } };
        expect(receivedState).toEqual(expectedState);
      });
    });
    describe('SUCCESS', () => {
      it('receivedState should equal to expectedState', () => {
        const receivedState = reducer({}, { type: Types.EXPORT_TOBB_GIB_REQUEST_SUCCESS_REQUESTS_SUCCESS, data: mockedGetTobbGibRequest });
        const expectedState = {
          exportTobbGibRequestSuccessRequests: {
            isPending: false,
            data: mockedGetTobbGibRequest,
          },
        };
        expect(receivedState).toEqual(expectedState);
      });
    });
    describe('FAILURE', () => {
      it('receivedState should equal to expectedState', () => {
        const receivedState = reducer({}, { type: Types.EXPORT_TOBB_GIB_REQUEST_SUCCESS_REQUESTS_FAILURE, error: new Error('404 Not Found') });
        const expectedState = {
          exportTobbGibRequestSuccessRequests: {
            isPending: false,
            error: new Error('404 Not Found'),
          },
        };
        expect(receivedState).toEqual(expectedState);
      });
    });
  });

  describe('reducer EXPORT_TOBB_GIB_REQUEST_INVALID_REQUESTS', () => {
    describe('REQUEST', () => {
      it('receivedState should equal to expectedState', () => {
        const receivedState = reducer({}, { type: Types.EXPORT_TOBB_GIB_REQUEST_INVALID_REQUESTS_REQUEST });
        const expectedState = { exportTobbGibRequestInvalidRequests: { isPending: true } };
        expect(receivedState).toEqual(expectedState);
      });
    });
    describe('SUCCESS', () => {
      it('receivedState should equal to expectedState', () => {
        const receivedState = reducer({}, { type: Types.EXPORT_TOBB_GIB_REQUEST_INVALID_REQUESTS_SUCCESS, data: mockedGetTobbGibRequest });
        const expectedState = {
          exportTobbGibRequestInvalidRequests: {
            isPending: false,
            data: mockedGetTobbGibRequest,
          },
        };
        expect(receivedState).toEqual(expectedState);
      });
    });
    describe('FAILURE', () => {
      it('receivedState should equal to expectedState', () => {
        const receivedState = reducer({}, { type: Types.EXPORT_TOBB_GIB_REQUEST_INVALID_REQUESTS_FAILURE, error: new Error('404 Not Found') });
        const expectedState = {
          exportTobbGibRequestInvalidRequests: {
            isPending: false,
            error: new Error('404 Not Found'),
          },
        };
        expect(receivedState).toEqual(expectedState);
      });
    });
  });

  describe('reducer EXPORT_TOBB_GIB_REQUEST_FAILED_REQUESTS', () => {
    describe('REQUEST', () => {
      it('receivedState should equal to expectedState', () => {
        const receivedState = reducer({}, { type: Types.EXPORT_TOBB_GIB_REQUEST_FAILED_REQUESTS_REQUEST });
        const expectedState = { exportTobbGibRequestFailedRequests: { isPending: true } };
        expect(receivedState).toEqual(expectedState);
      });
    });
    describe('SUCCESS', () => {
      it('receivedState should equal to expectedState', () => {
        const receivedState = reducer({}, { type: Types.EXPORT_TOBB_GIB_REQUEST_FAILED_REQUESTS_SUCCESS, data: mockedGetTobbGibRequest });
        const expectedState = {
          exportTobbGibRequestFailedRequests: {
            isPending: false,
            data: mockedGetTobbGibRequest,
          },
        };
        expect(receivedState).toEqual(expectedState);
      });
    });
    describe('FAILURE', () => {
      it('receivedState should equal to expectedState', () => {
        const receivedState = reducer({}, { type: Types.EXPORT_TOBB_GIB_REQUEST_FAILED_REQUESTS_FAILURE, error: new Error('404 Not Found') });
        const expectedState = {
          exportTobbGibRequestFailedRequests: {
            isPending: false,
            error: new Error('404 Not Found'),
          },
        };
        expect(receivedState).toEqual(expectedState);
      });
    });
  });

  describe('reducer RESET_TOBB_GIB_REQUEST_PROCESSED_REQUESTS', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.RESET_TOBB_GIB_REQUEST_PROCESSED_REQUESTS, processedRequests: [] });
      const expectedState = { processedRequests: [] };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer DESTROY_PAGE', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.DESTROY_PAGE });
      const expectedState = { ...INITIAL_STATE };
      expect(receivedState).toEqual(expectedState);
    });
  });
});
