import reducer, { INITIAL_STATE } from '@app/pages/CourierLoyalty/List/redux/reducer';

import { Types } from '@app/pages/CourierLoyalty/List/redux/actions';

describe('CourierCommunication/NotificationList/Detail', () => {
  it('should equal to initial state without args', () => {
    expect(reducer()).toEqual(INITIAL_STATE);
  });

  describe('reducer GET_COURIER_LOYALTY_REQUEST', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer(
        {},
        { type: Types.GET_COURIER_LOYALTY_REQUEST },
      );

      const expectedState = { courierLoyalty: { isPending: true, data: [] } };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer GET_COURIER_LOYALTY_SUCCESS', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer(
        {},
        {
          type: Types.GET_COURIER_LOYALTY_SUCCESS,
          data: {
            data: [
              {
                courierId: '5ce4ff5a02e11a000124d7ac',
                courierName: 'Cihan Bas',
                warehouse: [
                  '6059b3a7252472aba0790005',
                ],
                city: '6059b3a7252472aba0790004',
                level: 18,
                performanceScore: 53.61166666666667,
                rank: 1,
                xp: 24895,
                safetyScore: 14,
                rating: 3,
                tip: 123,
                estimatedBonus: 100,
                totalOrderCount: 18,
                handoverDuration: 229,
                problematicOrderCount: 2,
                levelGroup: 'ROOKIE',
                performanceGroup: 'STANDARD',
              },
            ],
            totalCouriers: 1,
          },
        },
      );
      const expectedState = {
        courierLoyalty: {
          isPending: false,
          data: {
            data: [
              {
                courierId: '5ce4ff5a02e11a000124d7ac',
                courierName: 'Cihan Bas',
                warehouse: [
                  '6059b3a7252472aba0790005',
                ],
                city: '6059b3a7252472aba0790004',
                level: 18,
                performanceScore: 53.61166666666667,
                rank: 1,
                xp: 24895,
                safetyScore: 14,
                rating: 3,
                tip: 123,
                estimatedBonus: 100,
                totalOrderCount: 18,
                handoverDuration: 229,
                problematicOrderCount: 2,
                levelGroup: 'ROOKIE',
                performanceGroup: 'STANDARD',
              },
            ],
            totalCouriers: 1,
          },
        },
      };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer GET_NOTIFICATION_BY_ID_FAILURE', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.GET_COURIER_LOYALTY_FAILURE });
      const expectedState = { courierLoyalty: { isPending: false } };
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
