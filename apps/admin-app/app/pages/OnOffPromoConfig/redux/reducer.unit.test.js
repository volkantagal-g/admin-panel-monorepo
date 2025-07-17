import reducer, { INITIAL_STATE } from '@app/pages/OnOffPromoConfig/redux/reducer';
import { Types } from '@app/pages/OnOffPromoConfig/redux/actions';

describe('OnOff', () => {
  it('should equal to initial state (without args)', () => {
    expect(reducer()).toEqual(INITIAL_STATE);
  });

  describe('reducer GET_ON_OFF_RESULT_REQUEST', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.GET_ON_OFF_RESULT_REQUEST });
      const expectedState = { isPending: true };
      expect(receivedState.isPending).toEqual(expectedState.isPending);
    });
  });

  describe('reducer GET_ON_OFF_RESULT_FAILURE', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.GET_ON_OFF_RESULT_FAILURE });
      const expectedState = { isPending: false };
      expect(receivedState.isPending).toEqual(expectedState.isPending);
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
