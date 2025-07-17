import reducer, { defaultDates, INITIAL_STATE } from '@app/pages/Client/Detail/redux/reducer';

import { Types } from '@app/pages/Client/Detail/redux/actions';
import { GETIR_DOMAIN_TYPES } from '@shared/shared/constants';

describe('Client/Detail', () => {
  it('should equal to initial state (without args)', () => {
    expect(reducer()).toEqual(INITIAL_STATE);
  });

  describe('GET_CLIENT_FINANCE_ORDERS', () => {
    describe('reducer GET_CLIENT_FINANCE_ORDERS_REQUEST', () => {
      it('receivedState should equal to expectedState', () => {
        const receivedState = reducer(
          {},
          { type: Types.GET_CLIENT_FINANCE_ORDERS_REQUEST },
        );
        const expectedState = { financeOrders: { isPending: true } };
        expect(receivedState).toEqual(expectedState);
      });
    });

    describe('reducer GET_CLIENT_FINANCE_ORDERS_SUCCESS', () => {
      it('receivedState should equal to expectedState', () => {
        const receivedState = reducer(
          {},
          {
            type: Types.GET_CLIENT_FINANCE_ORDERS_SUCCESS,
            data: [
              {
                orderId: '63d3ea13a73cbe5b2daee466',
                vendorId: 1,
                vendorStatus: '300',
                checkoutDate: '2023-01-27T15:13:24.913732Z',
              },
            ],
          },
        );
        const expectedState = {
          financeOrders: {
            isPending: false,
            data: [
              {
                orderId: '63d3ea13a73cbe5b2daee466',
                vendorId: 1,
                vendorStatus: '300',
                checkoutDate: '2023-01-27T15:13:24.913732Z',
              },
            ],
          },
        };
        expect(receivedState).toEqual(expectedState);
      });
    });

    describe('reducer GET_CLIENT_FINANCE_ORDERS_FAILURE', () => {
      it('receivedState should equal to expectedState', () => {
        const receivedState = reducer(
          {},
          { type: Types.GET_CLIENT_FINANCE_ORDERS_FAILURE },
        );
        const expectedState = { financeOrders: { isPending: false } };
        expect(receivedState).toEqual(expectedState);
      });
    });
  });

  describe('reducer GET_CLIENT_GETIR_TABLE_ORDERS_REQUEST', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer(
        {},
        { type: Types.GET_CLIENT_GETIR_TABLE_ORDERS_REQUEST },
      );
      const expectedState = { getirTableOrders: { isPending: true } };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer GET_CLIENT_GETIR_TABLE_ORDERS_SUCCESS', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer(
        {},
        {
          type: Types.GET_CLIENT_GETIR_TABLE_ORDERS_SUCCESS,
          data: [
            {
              orderId: 'fd5d8592-4b34-4482-b222-4af01775d4d0',
              restaurantName: 'Quick Pizza (Güzelyurt Mah.)',
              discountCode: '467417',
              status: 'Pending',
              discountValue: 0.19,
              processDate: '2022-12-27T16:56:36Z',
            },
          ],
        },
      );
      const expectedState = {
        getirTableOrders: {
          isPending: false,
          data: [
            {
              orderId: 'fd5d8592-4b34-4482-b222-4af01775d4d0',
              restaurantName: 'Quick Pizza (Güzelyurt Mah.)',
              discountCode: '467417',
              status: 'Pending',
              discountValue: 0.19,
              processDate: '2022-12-27T16:56:36Z',
            },
          ],
        },
      };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer GET_CLIENT_GETIR_TABLE_ORDERS_FAILURE', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer(
        {},
        { type: Types.GET_CLIENT_GETIR_TABLE_ORDERS_FAILURE },
      );
      const expectedState = { getirTableOrders: { isPending: false } };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer GET_CLIENT_LOYALTY_STAMPS_REQUEST', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer(
        {},
        { type: Types.GET_CLIENT_LOYALTY_STAMPS_REQUEST },
      );
      const expectedState = { loyaltyStamps: { isPending: true } };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer GET_CLIENT_LOYALTY_STAMPS_SUCCESS', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer(
        {},
        {
          type: Types.GET_CLIENT_LOYALTY_STAMPS_SUCCESS,
          data: {
            stampCount: 5,
            stamps: [{ type: 'virtual', restaurant: null }],
          },
        },
      );
      const expectedState = {
        loyaltyStamps: {
          isPending: false,
          data: {
            stampCount: 5,
            stamps: [{ type: 'virtual', restaurant: null }],
          },
        },
      };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer GET_CLIENT_LOYALTY_STAMPS_FAILURE', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer(
        {},
        { type: Types.GET_CLIENT_LOYALTY_STAMPS_FAILURE },
      );
      const expectedState = { loyaltyStamps: { isPending: false } };
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

  describe('reducer GET_CLIENT_DISCOUNT_WARN_CONFIG_REQUEST', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.GET_CLIENT_DISCOUNT_WARN_CONFIG_REQUEST });
      const expectedState = {
        discountWarnAmounts: {
          isPending: true,
          data: null,
          error: null,
        },
      };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer GET_CLIENT_DISCOUNT_WARN_CONFIG_SUCCESS', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, {
        type: Types.GET_CLIENT_DISCOUNT_WARN_CONFIG_SUCCESS,
        data: {
          type: 'Number',
          value: 50,
          isCustomEnabled: true,
          customValue: { GB: 40 },
        },
      });
      const expectedState = {
        discountWarnAmounts: {
          isPending: false,
          data: {
            type: 'Number',
            value: 50,
            isCustomEnabled: true,
            customValue: { GB: 40 },
          },
          error: null,
        },
      };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer UPDATE_ORDERS_HISTORY_FILTERS_REQUEST', () => {
    it('receivedState should equal to expectedState', () => {
      const state = {
        ordersHistory: {
          filters: {
            city: '1234',
            domainType: GETIR_DOMAIN_TYPES.GETIR10,
            createdAtStart: defaultDates.startDate,
            createdAtEnd: defaultDates.endDate,
          },
        },
      };
      const receivedState = reducer(state, { type: Types.UPDATE_ORDERS_HISTORY_FILTERS_REQUEST });
      const expectedState = state;
      expect(receivedState).toEqual(expectedState);
    });
  });
});
