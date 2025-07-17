import reducer, { INITIAL_STATE } from '@app/pages/CourierCommunication/NotificationList/Detail/redux/reducer';
import { Types } from '@app/pages/CourierCommunication/NotificationList/Detail/redux/actions';

describe('CourierCommunication/NotificationList/Detail', () => {
  it('should equal to initial state without args', () => {
    expect(reducer()).toEqual(INITIAL_STATE);
  });

  describe('reducer GET_NOTIFICATION_BY_ID_REQUEST', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer(undefined, { type: Types.GET_NOTIFICATION_BY_ID_REQUEST });

      const expectedState = {
        notification: {
          isPending: true,
          data: undefined,
        },
        categories: [],
        isPendingCategories: false,
      };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer GET_NOTIFICATION_BY_ID_SUCCESS', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer(
        {},
        {
          type: Types.GET_NOTIFICATION_BY_ID_SUCCESS,
          data: {
            _id: '63b2bdb62f2dd6a5096e5db1',
            author: '6391ec8841a0168e336fc68c',
            name: 'selcuk-test-2',
            country: '55999ad00000010000000000',
            courierIds: [
              '602bbf7f64d8a2e29f4542c8',
              '702bbf7f64d8a2e29f4542c8',
              '802bbf7f64d8a2e29f4542c8',
            ],
            segmentId: null,
            notification: {
              title: {
                tr: 'test-1',
                en: 'test-1',
                nl: 'N/A',
                de: 'N/A',
                fr: 'N/A',
                it: 'N/A',
                es: 'N/A',
                pt: 'N/A',
                'en-US': 'N/A',
              },
              message: {
                tr: 'test1',
                en: 'test1',
                nl: 'N/A',
                de: 'N/A',
                fr: 'N/A',
                it: 'N/A',
                es: 'N/A',
                pt: 'N/A',
                'en-US': 'N/A',
              },
            },
            status: 300,
            channel: {
              push: true,
              application: true,
            },
            priority: 100,
            scheduledAt: '2023-01-02T10:48:48.000Z',
            createdAt: '2023-01-02T11:19:18.960Z',
            updatedAt: '2023-01-02T11:20:11.174Z',
          },
        },
      );
      const expectedState = {
        notification: {
          isPending: false,
          data: {
            _id: '63b2bdb62f2dd6a5096e5db1',
            author: '6391ec8841a0168e336fc68c',
            name: 'selcuk-test-2',
            country: '55999ad00000010000000000',
            courierIds: [
              '602bbf7f64d8a2e29f4542c8',
              '702bbf7f64d8a2e29f4542c8',
              '802bbf7f64d8a2e29f4542c8',
            ],
            segmentId: null,
            notification: {
              title: {
                tr: 'test-1',
                en: 'test-1',
                nl: 'N/A',
                de: 'N/A',
                fr: 'N/A',
                it: 'N/A',
                es: 'N/A',
                pt: 'N/A',
                'en-US': 'N/A',
              },
              message: {
                tr: 'test1',
                en: 'test1',
                nl: 'N/A',
                de: 'N/A',
                fr: 'N/A',
                it: 'N/A',
                es: 'N/A',
                pt: 'N/A',
                'en-US': 'N/A',
              },
            },
            status: 300,
            channel: {
              push: true,
              application: true,
            },
            priority: 100,
            scheduledAt: '2023-01-02T10:48:48.000Z',
            createdAt: '2023-01-02T11:19:18.960Z',
            updatedAt: '2023-01-02T11:20:11.174Z',
          },
        },
      };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer GET_NOTIFICATION_BY_ID_FAILURE', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.GET_NOTIFICATION_BY_ID_FAILURE });
      const expectedState = { notification: { isPending: false } };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer NOTIFICATION_UPDATE_REQUEST', () => {
    it('receivedState, should equal to expectedState', () => {
      const receivedState = reducer(
        {},
        { type: Types.NOTIFICATION_UPDATE_REQUEST },
      );
      const expectedState = { notification: { isPending: true } };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer NOTIFICATION_UPDATE_SUCCESS', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer(
        {},
        {
          type: Types.NOTIFICATION_UPDATE_SUCCESS,
          data: {
            _id: 'notificationId',
            author: 'authorId',
            name: 'notification name',
            country: 'country',
            courierIds: [
              'courierId1',
              'courierId2',
              'courierId3',
            ],
            segmentId: null,
            notification: {
              title: {
                tr: 'test-1',
                en: 'test-1',
                nl: 'N/A',
                de: 'N/A',
                fr: 'N/A',
                it: 'N/A',
                es: 'N/A',
                pt: 'N/A',
                'en-US': 'N/A',
              },
              message: {
                tr: 'test1',
                en: 'test1',
                nl: 'N/A',
                de: 'N/A',
                fr: 'N/A',
                it: 'N/A',
                es: 'N/A',
                pt: 'N/A',
                'en-US': 'N/A',
              },
            },
            status: 300,
            channel: {
              push: true,
              application: true,
            },
            priority: 100,
            scheduledAt: '2023-01-02T10:48:48.000Z',
            createdAt: '2023-01-02T11:19:18.960Z',
            updatedAt: '2023-01-02T11:20:11.174Z',
          },
        },
      );
      const expectedState = {
        notification: {
          isPending: false,
          data: {
            _id: 'notificationId',
            author: 'authorId',
            name: 'notification name',
            country: 'country',
            courierIds: [
              'courierId1',
              'courierId2',
              'courierId3',
            ],
            segmentId: null,
            notification: {
              title: {
                tr: 'test-1',
                en: 'test-1',
                nl: 'N/A',
                de: 'N/A',
                fr: 'N/A',
                it: 'N/A',
                es: 'N/A',
                pt: 'N/A',
                'en-US': 'N/A',
              },
              message: {
                tr: 'test1',
                en: 'test1',
                nl: 'N/A',
                de: 'N/A',
                fr: 'N/A',
                it: 'N/A',
                es: 'N/A',
                pt: 'N/A',
                'en-US': 'N/A',
              },
            },
            status: 300,
            channel: {
              push: true,
              application: true,
            },
            priority: 100,
            scheduledAt: '2023-01-02T10:48:48.000Z',
            createdAt: '2023-01-02T11:19:18.960Z',
            updatedAt: '2023-01-02T11:20:11.174Z',
          },
        },
      };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer NOTIFICATION_UPDATE_FAILURE', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.NOTIFICATION_UPDATE_FAILURE });
      const expectedState = { notification: { isPending: false } };
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
