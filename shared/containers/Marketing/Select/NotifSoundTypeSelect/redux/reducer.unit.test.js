import reducer, { INITIAL_STATE } from '@shared/containers/Marketing/Select/NotifSoundTypeSelect/redux/reducer';
import { Types } from '@shared/containers/Marketing/Select/NotifSoundTypeSelect/redux/actions';

describe('NotifSoundTypeSelect | Container', () => {
  it('should equal to initial state (without args)', () => {
    expect(reducer()).toEqual(INITIAL_STATE);
  });

  describe('reducer GET_NOTIF_SOUND_TYPES_REQUEST', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.GET_NOTIF_SOUND_TYPES_REQUEST });
      const expectedState = { notifSoundType: { isPending: true } };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer DESTROY_CONTAINER', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.DESTROY_CONTAINER });
      const expectedState = { ...INITIAL_STATE };
      expect(receivedState).toEqual(expectedState);
    });
  });
});
