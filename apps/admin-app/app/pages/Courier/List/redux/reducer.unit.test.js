import reducer, { INITIAL_STATE } from '@app/pages/Courier/List/redux/reducer';
import { Types } from '@app/pages/Courier/List/redux/actions';

describe('Courier/List', () => {
  it('should equal to initial state without args', () => {
    expect(reducer()).toEqual(INITIAL_STATE);
  });
  describe('reducer GET_COURIER_LIST_REQUEST', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer(
        {},
        { type: Types.GET_COURIER_LIST_REQUEST },
      );
      const expectedState = { courierList: { isPending: true } };

      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer GET_COURIER_LIST_SUCCESS', () => {
    it('receivedState should equal to expectedState', () => {
      const mockData = [
        {
          status: 200,
          isActivated: true,
          _id: '587c9e24a1a56d0004072d82',
          name: 'Fatih Sarıca',
          gsm: '5498140045',
          isLoggedIn: false,
        },
        {
          status: 200,
          isActivated: false,
          _id: '58844a968dbd4e00043503cb',
          name: 'Şahin Kara',
          gsm: '5315700443',
          isLoggedIn: false,
        },
        {
          status: 200,
          isActivated: false,
          _id: '5894abaafcc97e0004bc99de',
          name: 'Rıdvan Kara',
          gsm: '5498060436',
          isLoggedIn: false,
        },
        {
          status: 200,
          isActivated: false,
          _id: '594e84f47731f60004cbcd6c',
          name: 'Şahin Kara',
          isLoggedIn: false,
          gsm: '5336440225',
        },
      ];
      const receivedState = reducer(
        {},
        { type: Types.GET_COURIER_LIST_SUCCESS, data: mockData, totalCount: mockData.length },
      );
      const expectedState = {
        courierList: {
          isPending: false,
          data: mockData,
          totalCount: 4,
        },
      };

      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer GET_COURIER_LIST_FAILURE', () => {
    it('receivedState should equal to expectedState', () => {
      const err = new Error('fake error');
      const receivedState = reducer(
        {},
        { type: Types.GET_COURIER_LIST_FAILURE, error: err },
      );
      const expectedState = { courierList: { isPending: false, error: err } };

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
