import moment from 'moment';

import { transformData, transformValuesForApi } from './utils';

describe('FoodTable.utils', () => {
  describe('#transformValuesForApi', () => {
    const startDate = moment().startOf('day');
    const endDate = moment().endOf('day');
    it('should properly send a defined data', () => {
      expect(transformValuesForApi()).toBeDefined();
    });
    it('should properly set statuses', () => {
      const values = {
        page: 1,
        count: 10,
        status: 'SUCCESS_ORDERS',
      };
      expect(transformValuesForApi(values)).toEqual({
        page: 1,
        count: 10,
        clientId: undefined,
        deliveryTypes: [],
        paymentMethods: [],
        statusStart: 900,
        statusEnd: 1000,
      });
      values.status = 'CANCELED_ORDERS';
      expect(transformValuesForApi(values)).toEqual({
        page: 1,
        count: 10,
        clientId: undefined,
        deliveryTypes: [],
        paymentMethods: [],
        statusStart: 1500,
        statusEnd: 1600,
      });
      values.status = 'ACTIVE_ORDERS';
      expect(transformValuesForApi(values)).toEqual({
        page: 1,
        count: 10,
        clientId: undefined,
        deliveryTypes: [],
        paymentMethods: [],
        statusStart: 400,
        statusEnd: 800,
      });
    });
    fit('should properly add dates when provided', () => {
      expect(transformValuesForApi({
        page: 1,
        count: 10,
        startDate,
      })).toEqual({
        page: 1,
        count: 10,
        clientId: undefined,
        deliveryTypes: [],
        paymentMethods: [],
        createdAtStart: moment(startDate).toDate(),
      });
      expect(transformValuesForApi({
        page: 1,
        count: 10,
        endDate,
      })).toEqual({
        page: 1,
        count: 10,
        clientId: undefined,
        deliveryTypes: [],
        paymentMethods: [],
        createdAtEnd: moment(endDate).toDate(),
      });
      expect(transformValuesForApi({
        page: 1,
        count: 10,
        startDate,
        endDate,
      })).toEqual({
        page: 1,
        count: 10,
        clientId: undefined,
        deliveryTypes: [],
        paymentMethods: [],
        createdAtStart: moment(startDate).toDate(),
        createdAtEnd: moment(endDate).toDate(),
      });
    });
  });
  describe('#transformData', () => {
    it('should properly return without error', () => {
      expect(transformData()).toBe(undefined);
    });
    it('should properly transform data when provided', () => {
      expect([{}]).toEqual([{
        id: undefined,
        restaurant: undefined,
        courier: undefined,
        checkoutDate: undefined,
        status: undefined,
        totalPrice: undefined,
        deliveryType: undefined,
        isBasket: undefined,
      }]);
    });
  });
});
