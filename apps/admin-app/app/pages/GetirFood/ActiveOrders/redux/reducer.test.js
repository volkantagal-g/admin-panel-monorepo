import reducer, { INITIAL_STATE } from './reducer';
import { Types } from './actions';

describe('ActiveOrders - reducer', () => {
  it('should equal to initial state (without args)', () => {
    expect(reducer()).toEqual(INITIAL_STATE);
  });

  it('reducer - GET_ACTIVES_REQUEST', () => {
    const receivedState = reducer({}, { type: Types.GET_ACTIVES_REQUEST });
    const expectedState = {
      activeOrders: {
        data: {
          data: [],
          totalFoodOrderCount: null,
        },
        isPending: true,
        error: null,
      },
    };
    expect(receivedState).toEqual(expectedState);
  });

  it('reducer - GET_ACTIVES_SUCCESS', () => {
    const receivedState = reducer({}, {
      type: Types.GET_ACTIVES_SUCCESS,
      data: {
        data: [{ id: '630759bfe17d7a4aac738a59', status: '300' }],
        totalFoodOrderCount: 1,
      },
    });
    const expectedState = {
      activeOrders: {
        isPending: false,
        data: {
          data: [{ id: '630759bfe17d7a4aac738a59', status: '300' }],
          totalFoodOrderCount: 1,
        },
        error: null,
      },
    };
    expect(receivedState).toEqual(expectedState);
  });

  it('should equal to initial state when destroyed', () => {
    const receivedState = reducer({}, { type: Types.DESTROY_PAGE });
    expect(receivedState).toEqual(INITIAL_STATE);
  });
});
