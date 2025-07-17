import { mockedMarketOrderDetail } from '@shared/api/marketOrder/index.mock.data';
import { MARKET_ORDER_STATUS } from '@shared/shared/constants';
import { getDateFieldByStatus, isOrderActive } from './utils';

describe('Order Details util functions', () => {
  describe('#getDateFieldByStatus', () => {
    const now = new Date();
    it('should contain checkout date if order status  = VERIFYING', () => {
      const order = getDateFieldByStatus(
        {
          ...mockedMarketOrderDetail,
          status: MARKET_ORDER_STATUS.VERIFYING,
        },
        now,
      );
      expect(order).toHaveProperty('checkout');
      expect(order.checkout.date).toEqual(now);
    });
    it('should contain verify date if order status  = PREPARING', () => {
      const order = getDateFieldByStatus(
        {
          ...mockedMarketOrderDetail,
          status: MARKET_ORDER_STATUS.PREPARING,
        },
        now,
      );
      expect(order).toHaveProperty('verify');
      expect(order.verify.date).toEqual(now);
    });
    it('should contain prepare date if order status  = PREPARED', () => {
      const order = getDateFieldByStatus(
        {
          ...mockedMarketOrderDetail,
          status: MARKET_ORDER_STATUS.PREPARED,
        },
        now,
      );
      expect(order).toHaveProperty('prepare');
      expect(order.prepare.date).toEqual(now);
    });
    it('should contain onway date if order status  = ONWAY', () => {
      const order = getDateFieldByStatus(
        {
          ...mockedMarketOrderDetail,
          status: MARKET_ORDER_STATUS.ONWAY,
        },
        now,
      );
      expect(order).toHaveProperty('onway');
      expect(order.onway.date).toEqual(now);
    });
    it('should contain handover date if order status  = HANDOVER', () => {
      const order = getDateFieldByStatus(
        {
          ...mockedMarketOrderDetail,
          status: MARKET_ORDER_STATUS.HANDOVER,
        },
        now,
      );
      expect(order).toHaveProperty('handover');
      expect(order.handover.date).toEqual(now);
    });
  });
  describe('#isOrderActive', () => {
    it('should return true if the status is between browsing and reached ', () => {
      const isActive = isOrderActive(400);
      expect(isActive).toBeTruthy();
    });
    it('should return false if the status is between browsing and reached ', () => {
      const isActive = isOrderActive(200);
      expect(isActive).toBeFalsy();
    });
  });
});
