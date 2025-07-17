import reducer, { INITIAL_STATE } from '@app/pages/Report/ReportTypes/List/redux/reducer';
import { Types } from '@app/pages/Report/ReportTypes/List/redux/actions';

describe('Report/ReportTypes/List', () => {
  it('should equal to initial state (without args)', () => {
    expect(reducer()).toEqual(INITIAL_STATE);
  });

  describe('reducer GET_REPORT_TYPES_REQUEST', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer(undefined, { type: Types.GET_REPORT_TYPES_REQUEST });
      const expectedState = {
        reportTypes: {
          isPending: true,
          data: {
            reportTypes: [],
            totalCount: 0,
          },
          error: null,
        },
        allReportTags: {
          data: [],
          isPending: false,
          error: null,
        },
      };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer GET_REPORT_TYPES_REQUEST', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer(INITIAL_STATE, { type: Types.GET_REPORT_TYPES_REQUEST });
      const expectedState = {
        reportTypes: {
          isPending: true,
          data: {
            reportTypes: [],
            totalCount: 0,
          },
          error: null,
        },
        allReportTags: {
          data: [],
          isPending: false,
          error: null,
        },
      };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer GET_REPORT_TYPES_SUCCESS', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer(undefined, { type: Types.GET_REPORT_TYPES_SUCCESS, data: { reportTypes: [], totalCount: 0 } });
      const expectedState = {
        reportTypes: {
          isPending: false,
          data: {
            reportTypes: [],
            totalCount: 0,
          },
          error: null,
        },
        allReportTags: {
          data: [],
          isPending: false,
          error: null,
        },
      };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer GET_REPORT_TYPES_SUCCESS', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer(INITIAL_STATE, { type: Types.GET_REPORT_TYPES_SUCCESS, data: { reportTypes: [], totalCount: 0 } });
      const expectedState = {
        reportTypes: {
          isPending: false,
          data: {
            reportTypes: [],
            totalCount: 0,
          },
          error: null,
        },
        allReportTags: {
          data: [],
          isPending: false,
          error: null,
        },
      };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer GET_REPORT_TYPES_FAILURE', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer(undefined, { type: Types.GET_REPORT_TYPES_FAILURE, error: new Error('something went wrong') });
      const expectedState = {
        reportTypes: {
          isPending: false,
          data: [],
          error: new Error('something went wrong'),
        },
        allReportTags: {
          data: [],
          isPending: false,
          error: null,
        },
      };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer GET_REPORT_TYPES_FAILURE', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer(INITIAL_STATE, { type: Types.GET_REPORT_TYPES_FAILURE, error: new Error('something went wrong') });
      const expectedState = {
        reportTypes: {
          isPending: false,
          data: [],
          error: new Error('something went wrong'),
        },
        allReportTags: {
          data: [],
          isPending: false,
          error: null,
        },
      };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer GET_ALL_REPORT_TAGS_REQUEST', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer(undefined, { type: Types.GET_ALL_REPORT_TAGS_REQUEST });
      const expectedState = {
        reportTypes: {
          isPending: false,
          data: {
            reportTypes: [],
            totalCount: 0,
          },
          error: null,
        },
        allReportTags: {
          data: [],
          isPending: true,
          error: null,
        },
      };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer GET_ALL_REPORT_TAGS_REQUEST', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer(INITIAL_STATE, { type: Types.GET_ALL_REPORT_TAGS_REQUEST });
      const expectedState = {
        reportTypes: {
          isPending: false,
          data: {
            reportTypes: [],
            totalCount: 0,
          },
          error: null,
        },
        allReportTags: {
          data: [],
          isPending: true,
          error: null,
        },
      };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer GET_ALL_REPORT_TAGS_SUCCESS', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer(undefined, { type: Types.GET_ALL_REPORT_TAGS_SUCCESS, data: [] });
      const expectedState = {
        reportTypes: {
          isPending: false,
          data: {
            reportTypes: [],
            totalCount: 0,
          },
          error: null,
        },
        allReportTags: {
          data: [],
          isPending: false,
          error: null,
        },
      };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer GET_ALL_REPORT_TAGS_SUCCESS', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer(INITIAL_STATE, { type: Types.GET_ALL_REPORT_TAGS_SUCCESS, data: [] });
      const expectedState = {
        reportTypes: {
          isPending: false,
          data: {
            reportTypes: [],
            totalCount: 0,
          },
          error: null,
        },
        allReportTags: {
          data: [],
          isPending: false,
          error: null,
        },
      };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer GET_ALL_REPORT_TAGS_FAILURE', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer(undefined, { type: Types.GET_ALL_REPORT_TAGS_FAILURE, error: new Error('something went wrong') });
      const expectedState = {
        reportTypes: {
          isPending: false,
          data: {
            reportTypes: [],
            totalCount: 0,
          },
          error: null,
        },
        allReportTags: {
          data: [],
          isPending: false,
          error: new Error('something went wrong'),
        },
      };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer GET_ALL_REPORT_TAGS_FAILURE', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer(INITIAL_STATE, { type: Types.GET_ALL_REPORT_TAGS_FAILURE, error: new Error('something went wrong') });
      const expectedState = {
        reportTypes: {
          isPending: false,
          data: {
            reportTypes: [],
            totalCount: 0,
          },
          error: null,
        },
        allReportTags: {
          data: [],
          isPending: false,
          error: new Error('something went wrong'),
        },
      };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer DESTROY_PAGE', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer(undefined, { type: Types.DESTROY_PAGE });
      const expectedState = { ...INITIAL_STATE };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer DESTROY_PAGE', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer(INITIAL_STATE, { type: Types.DESTROY_PAGE });
      const expectedState = { ...INITIAL_STATE };
      expect(receivedState).toEqual(expectedState);
    });
  });
});
