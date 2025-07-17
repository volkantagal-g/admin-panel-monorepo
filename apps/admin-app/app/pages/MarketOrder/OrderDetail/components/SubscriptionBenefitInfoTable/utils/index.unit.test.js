import { createSubscriptionTableData } from '.';
import { mockedMarketOrderDetail } from '@shared/api/marketOrder/index.mock.data';

describe('Subscription benefit info util', () => {
  const subscriptionBenefitInfo = {
    isSubscriber: true,
    subscriptionId: '63a053482d850769f0966735',
    deliveryFee: 2.99,
    promo: [
      {
        type: 2,
        amount: 19.9,
        promoId: '63b406a8556176f37387dddd',
      },
    ],
  };
  describe('#createSubscriptionTableData', () => {
    it('should return formatted products', () => {
      const subscriptionInfo = createSubscriptionTableData(subscriptionBenefitInfo, mockedMarketOrderDetail.promo.applied);
      expect(subscriptionInfo[0]).toHaveProperty('name');
    });
  });
});
