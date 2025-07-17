import { Creators, Types } from '@app/pages/CourierCommunication/NotificationList/Detail/redux/actions';

describe('CourierCommunication/NotificationList/Detail', () => {
  describe('action-creator #getNotificationByIdRequest', () => {
    it('receivedAction shuld equal to expectedAction (without args)', () => {
      const receivedAction = Creators.getNotificationByIdRequest({});
      const expectedAction = { type: Types.GET_NOTIFICATION_BY_ID_REQUEST, id: '' };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #getNotificationByIdSuccess', () => {
    it('receivedAction shuld equal to expectedAction (without args)', () => {
      const receivedAction = Creators.getNotificationByIdSuccess({});
      const expectedAction = { type: Types.GET_NOTIFICATION_BY_ID_SUCCESS, data: undefined };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #getNotificationByIdFailure', () => {
    it('receivedAction shuld equal to expectedAction (without args)', () => {
      const receivedAction = Creators.getNotificationByIdFailure({});
      const expectedAction = { type: Types.GET_NOTIFICATION_BY_ID_FAILURE, error: null };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #notificationUpdateRequest', () => {
    it('receivedAction shuld equal to expectedAction (without args)', () => {
      const receivedAction = Creators.notificationUpdateRequest({});
      const expectedAction = {
        type: Types.NOTIFICATION_UPDATE_REQUEST,
        _id: '',
        courierIds: [],
        name: '',
        priority: '',
        notification: {},
        channel: {},
        category: '',
      };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #notificationUpdateSuccess', () => {
    it('receivedAction shuld equal to expectedAction (without args)', () => {
      const receivedAction = Creators.notificationUpdateSuccess({});
      const expectedAction = { type: Types.NOTIFICATION_UPDATE_SUCCESS, data: undefined };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #notificationUpdateFailure', () => {
    it('receivedAction shuld equal to expectedAction (without args)', () => {
      const receivedAction = Creators.notificationUpdateFailure({});
      const expectedAction = { type: Types.NOTIFICATION_UPDATE_FAILURE, error: null };
      expect(receivedAction).toEqual(expectedAction);
    });
  });
});
