import reducer, { INITIAL_STATE } from './reducer';
import { Types } from './actions';

describe('reducer GET_PERSON_DETAIL', () => {
  it('should equal to initial state (without args)', () => {
    expect(reducer()).toEqual(INITIAL_STATE);
  });

  describe('#GET_PERSON_DETAIL_REQUEST', () => {
    it('receivedState should equal to expectedState (without args)', () => {
      const receivedState = reducer({}, { type: Types.GET_PERSON_DETAIL_REQUEST });
      const expectedState = { personDetail: { isPending: true } };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('#GET_PERSON_DETAIL_SUCCESS', () => {
    it('receivedState should equal to expectedState (without args)', () => {
      const receivedState = reducer({ personDetail: {} }, { type: Types.GET_PERSON_DETAIL_SUCCESS, data: {} });
      const expectedState = { personDetail: { data: {}, isPending: false } };
      expect(receivedState).toEqual(expectedState);
    });
  });
});

describe('reducer GET_PERSON_NOTES', () => {
  it('should equal to initial state (without args)', () => {
    expect(reducer()).toEqual(INITIAL_STATE);
  });

  describe('#GET_PERSON_NOTES_REQUEST', () => {
    it('receivedState should equal to expectedState (without args)', () => {
      const receivedState = reducer({}, { type: Types.GET_PERSON_NOTES_REQUEST });
      const expectedState = { personNotes: { isPending: true } };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('#GET_PERSON_NOTES_SUCCESS', () => {
    it('receivedState should equal to expectedState (without args)', () => {
      const receivedState = reducer({ personNotes: [] }, { type: Types.GET_PERSON_NOTES_SUCCESS, data: [] });
      const expectedState = { personNotes: { data: [], isPending: false } };
      expect(receivedState).toEqual(expectedState);
    });
  });
});

describe('reducer UPDATE_PERSON_DETAIL', () => {
  it('should equal to initial state (without args)', () => {
    expect(reducer()).toEqual(INITIAL_STATE);
  });

  describe('#UPDATE_PERSON_DETAIL_REQUEST', () => {
    it('receivedState should equal to expectedState (without args)', () => {
      const receivedState = reducer({}, { type: Types.UPDATE_PERSON_DETAIL_REQUEST });
      const expectedState = { updatePerson: { isPending: true, isSuccess: false } };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('#UPDATE_PERSON_DETAIL_SUCCESS', () => {
    it('receivedState should equal to expectedState (without args)', () => {
      const receivedState = reducer({}, { type: Types.UPDATE_PERSON_DETAIL_SUCCESS });
      const expectedState = { updatePerson: { isPending: false, isSuccess: true } };
      expect(receivedState).toEqual(expectedState);
    });
  });
});

describe('reducer UPDATE_PERSON_DETAIL', () => {
  it('should equal to initial state (without args)', () => {
    expect(reducer()).toEqual(INITIAL_STATE);
  });

  describe('#UPDATE_PERSON_DETAIL_REQUEST', () => {
    it('receivedState should equal to expectedState (without args)', () => {
      const receivedState = reducer({}, { type: Types.UPDATE_PERSON_DETAIL_REQUEST });
      const expectedState = { updatePerson: { isPending: true, isSuccess: false } };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('#UPDATE_PERSON_DETAIL_SUCCESS', () => {
    it('receivedState should equal to expectedState (without args)', () => {
      const receivedState = reducer({}, { type: Types.UPDATE_PERSON_DETAIL_SUCCESS });
      const expectedState = { updatePerson: { isPending: false, isSuccess: true } };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('#UPDATE_PERSON_DETAIL_FAILURE', () => {
    it('receivedState should equal to expectedState (without args)', () => {
      const receivedState = reducer({}, { type: Types.UPDATE_PERSON_DETAIL_FAILURE });
      const expectedState = { updatePerson: { isPending: false } };
      expect(receivedState).toEqual(expectedState);
    });
  });
});
