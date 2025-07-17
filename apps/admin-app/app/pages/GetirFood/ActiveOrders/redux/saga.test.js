import { testSaga } from 'redux-saga-test-plan';

import { getActives } from '@shared/api/foodOrderActive';

import {
  refreshActives,
  getActivesRequest,
  watchActivesRequest,
} from './saga';
import { Creators, Types } from './actions';
import { filtersSelector, paymentMethodsSelector } from './selectors';
import { transformValuesForApi } from '../utils';

describe('ActiveOrders - saga', () => {
  describe('saga #getActivesRequest', () => {
    const fakeResponseData = {
      data: [
        {
          checkoutDate: '2021-11-23T18:31:30.247Z',
          cityId: '55999ad00000010001000000',
          client: {
            id: '604a0964192c35ee4e353022',
            name: 'Nazlı Güngöroğlu',
            sucOrderCount: 0,
          },
          courier: {
            id: '5dc073faf4d28e09f0377cad',
            name: 'Restoran Kuryesi',
            courierType: 2,
          },
          courierType: 2,
          deliveryAddress: { location: { coordinates: [29.0311736, 41.0786182] } },
          deliveryFee: 10,
          deliveryType: 2,
          deviceInfo: {
            deviceType: 'Web',
            manufacturer: null,
            model: null,
            sdk: null,
            buildNumber: 100,
          },
          dropOffAtDoor: true,
          estimatedDeliveryDurationOnCheckout: 16,
          isScheduled: false,
          paymentInfo: {
            paymentMethod: 1,
            cardGroup: 1,
            is3DPayment: false,
          },
          promo: {
            _id: '619cd51fca220e8927e02005',
            promoCode: 'NNN_TEKIL_TL',
          },
          restaurant: {
            _id: '5f76fd8058a78dc5bdfb5612',
            name: 'Teo Yazılım',
          },
          restaurantTotalFoodOrderCount: 116,
          status: 400,
          totalChargedAmount: 34,
          totalPrice: 60,
          _id: '619d3128f10be2706d3b6d05',
        },
      ],
      totalFoodOrderCount: 1,
    };

    const fakeFilterData = {
      pagination: {
        currentPage: 1,
        rowsPerPage: 5,
      },
      couriers: [1],
      platformValue: 'Web',
      deliveryType: '1',
      paymentTypes: [
        { id: 1, type: 20 },
        { id: 20, type: 1 }],
    };

    const fakePaymentMethodsData = [{ type: 20, id: 1 }];

    it('should call the getActivesRequest (success)', () => {
      testSaga(refreshActives)
        .next()
        .select(filtersSelector.getFilters)
        .next(fakeFilterData)
        .select(paymentMethodsSelector.getPaymentMethods)
        .next(fakePaymentMethodsData)
        .call(getActives, transformValuesForApi({ filters: fakeFilterData, paymentMethods: fakePaymentMethodsData }))
        .next(fakeResponseData)
        .put(Creators.getActivesSuccess(fakeResponseData))
        .next()
        .isDone();
    });
  });

  describe('saga #watchActivesRequest', () => {
    it('should call the watchActivesRequest', () => {
      testSaga(watchActivesRequest)
        .next()
        .takeLatest(Types.GET_ACTIVES_REQUEST, getActivesRequest)
        .next()
        .isDone();
    });
  });
});
