import { Creators, Types } from '@shared/containers/Marketing/Select/NotifSoundTypeSelect/redux/actions';

describe('Notif Sound Type Select Container', () => {
  describe('action-creator #getnNotifSoundTypesRequest', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.getNotifSoundTypesRequest();
      const expectedAction = { type: Types.GET_NOTIF_SOUND_TYPES_REQUEST };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #getNotifSoundTypesSuccess', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.getNotifSoundTypesSuccess();
      const expectedAction = { type: Types.GET_NOTIF_SOUND_TYPES_SUCCESS, data: [] };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #getNotifSoundTypesFailure', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.getNotifSoundTypesFailure();
      const expectedAction = { type: Types.GET_NOTIF_SOUND_TYPES_FAILURE, error: null };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #destroyPage', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.destroyContainer();
      const expectedAction = { type: Types.DESTROY_CONTAINER };
      expect(receivedAction).toEqual(expectedAction);
    });

    it('should ignore any args', () => {
      const receivedAction = Creators.destroyContainer({ wrongArg: "I'am not a arg. of this func" });
      const expectedAction = { type: Types.DESTROY_CONTAINER };
      expect(receivedAction).toEqual(expectedAction);
    });
  });
});
