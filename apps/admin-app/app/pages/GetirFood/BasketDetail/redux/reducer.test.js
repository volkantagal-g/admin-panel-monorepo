/* eslint-disable */
import { describe, it, expect } from '@jest/globals';

import reducer, { INITIAL_STATE } from './reducer';
import { Types } from './actions';

describe('BasketDetail - reducer', () => {
  it('should equal to initial state (without args)', () => {
    expect(reducer()).toEqual(INITIAL_STATE);
  });

  it('reducer - GET_ORDER_DETAIL_REQUEST', () => {
    const receivedState = reducer({}, { type: Types.GET_ORDER_DETAIL_REQUEST });
    const expectedState = {
      orderDetail: {
        isPending: true,
        data: {},
        error: null,
      },
    };
    expect(receivedState).toEqual(expectedState);
  });

  it('reducer - GET_ORDER_DETAIL_SUCCESS', () => {
    const receivedState = reducer({}, { type: Types.GET_ORDER_DETAIL_SUCCESS, data: { id: '630759bfe17d7a4aac738a59', status: '300' } });
    const expectedState = {
      orderDetail: {
        isPending: false,
        data: { id: '630759bfe17d7a4aac738a59', status: '300' },
        error: null,
      },
    };
    expect(receivedState).toEqual(expectedState);
  });

  it('reducer - GET_ORDER_DETAIL_FAILURE', () => {
    const receivedState = reducer({}, { type: Types.GET_ORDER_DETAIL_FAILURE, error: { message: 'failed', status: 400 } });
    const expectedState = {
      orderDetail: {
        isPending: false,
        data: {},
        error: { message: 'failed', status: 400 },
      },
    };
    expect(receivedState).toEqual(expectedState);
  });

  it('reducer - GET_USER_BY_ID_REQUEST', () => {
    const receivedState = reducer({}, { type: Types.GET_USER_BY_ID_REQUEST });
    const expectedState = {
      getUserById: {
        isPending: true,
        data: {},
        error: null,
      },
    };
    expect(receivedState).toEqual(expectedState);
  });

  it('reducer - GET_USER_BY_ID_SUCCESS', () => {
    const receivedState = reducer({}, { type: Types.GET_USER_BY_ID_SUCCESS, data: { id: '630759bfe17d7a4aac738a59', name: 'Test User' } });
    const expectedState = {
      getUserById: {
        isPending: false,
        data: { id: '630759bfe17d7a4aac738a59', name: 'Test User' },
        error: null,
      },
    };
    expect(receivedState).toEqual(expectedState);
  });

  it('reducer - GET_USER_BY_ID_FAILURE', () => {
    const receivedState = reducer({}, { type: Types.GET_USER_BY_ID_FAILURE, error: { message: 'failed', status: 400 } });
    const expectedState = {
      getUserById: {
        isPending: false,
        data: {},
        error: { message: 'failed', status: 400 }
      },
    };
    expect(receivedState).toEqual(expectedState);
  });

  it('should equal to initial state when destroyed', () => {
    const receivedState = reducer({}, { type: Types.DESTROY_PAGE });
    expect(receivedState).toEqual(INITIAL_STATE);
  });
});
