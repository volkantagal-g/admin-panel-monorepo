import { testSaga } from 'redux-saga-test-plan';

import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import {
  notificationDetailsRequest,
  notificationUpdateRequest,
  watchNotificationDetailsRequest,
  watchNotificationUpdateRequest,
} from '@app/pages/CourierCommunication/NotificationList/Detail/redux/saga';
import {
  Creators,
  Types,
} from '@app/pages/CourierCommunication/NotificationList/Detail/redux/actions';
import {
  getNotificationById,
  updateNotification,
} from '@shared/api/CourierCommunication';

describe('CourierCommunication/NotificationList/Detail', () => {
  const notification = {
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
  };
  describe('saga #notificationDetailsRequest', () => {
    const param = { id: '123123' };
    const requestBody = { id: '123123' };

    it('should call the getNotificationById (success)', () => {
      testSaga(notificationDetailsRequest, param)
        .next()
        .call(getNotificationById, requestBody)
        .next(notification)
        .put(Creators.getNotificationByIdSuccess({ data: notification }))
        .next()
        .isDone();
    });

    it('should call the getNotificationById (failure)', () => {
      const fakeError = new Error('404 Not Found');
      testSaga(notificationDetailsRequest, param)
        .next()
        .call(getNotificationById, requestBody)
        .next(notification)
        .throw(fakeError)
        .put(Creators.getNotificationByIdFailure({ error: fakeError }))
        .next()
        .put(ToastCreators.error({ error: fakeError }))
        .next()
        .isDone();
    });
  });

  describe('saga #notificationUpdateRequest', () => {
    const requestBody = {
      _id: 'notification id',
      courierIds: ['courier1', 'courier2'],
      name: 'notification name',
      channel: { application: true, push: false },
      priority: 100,
      notification: {
        title: {
          en: 'en title',
          tr: 'tr title',
        },
        message: {
          en: 'en message',
          tr: 'tr message',
        },
      },
      scheduledAt: 'schedule date',
      category: '67922329b77eb8c5e3ec14db',
    };

    it('should call the updateNotification (success)', () => {
      testSaga(notificationUpdateRequest, requestBody)
        .next()
        .call(updateNotification, requestBody)
        .next(notification)
        .put(Creators.notificationUpdateSuccess({ data: notification }))
        .next()
        .put(ToastCreators.success())
        .next()
        .isDone();
    });

    it('should call the updateNotification (failure)', () => {
      const fakeError = new Error('404 Not Found');
      testSaga(notificationUpdateRequest, requestBody)
        .next()
        .call(updateNotification, requestBody)
        .next(notification)
        .throw(fakeError)
        .put(Creators.notificationUpdateFailure({ error: fakeError }))
        .next()
        .put(ToastCreators.error({ error: fakeError }))
        .next()
        .isDone();
    });
  });

  describe('saga #watchNotificationDeatilsRequest', () => {
    it('should call the watchNotificationDetailsRequest', () => {
      testSaga(watchNotificationDetailsRequest)
        .next()
        .takeLatest(Types.GET_NOTIFICATION_BY_ID_REQUEST, notificationDetailsRequest)
        .next()
        .isDone();
    });
  });

  describe('saga #watchNotificationUpdateRequest', () => {
    it('should call the watchNotificationUpdateRequest', () => {
      testSaga(watchNotificationUpdateRequest)
        .next()
        .takeLatest(Types.NOTIFICATION_UPDATE_REQUEST, notificationUpdateRequest)
        .next()
        .isDone();
    });
  });
});
