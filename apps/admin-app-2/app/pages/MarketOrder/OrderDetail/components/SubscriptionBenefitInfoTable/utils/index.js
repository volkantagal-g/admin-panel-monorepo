import { t } from '@shared/i18n';

export const createSubscriptionTableData = (
  subscriptionBenefitInfo,
  orderPromo,
) => {
  const { deliveryFee, promo } = subscriptionBenefitInfo;
  let subscriptionInfoTableData = [];
  if (promo?.length > 0) {
    promo.forEach(subscriptionPromo => {
      const matchingPromo = orderPromo.find(
        promotion => promotion?.promo?.id === subscriptionPromo?.id,
      );
      subscriptionInfoTableData = [...subscriptionInfoTableData, { ...subscriptionPromo, name: matchingPromo?.promo?.promoCode }];
    });
  }
  if (deliveryFee) {
    subscriptionInfoTableData = [...subscriptionInfoTableData, { name: t('marketOrderPage:DELIVERY_FEE'), amount: deliveryFee }];
  }
  return subscriptionInfoTableData;
};
