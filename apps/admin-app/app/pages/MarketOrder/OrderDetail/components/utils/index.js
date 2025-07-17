import { isProd } from '@shared/config/env';
import { getLangKey } from '@shared/i18n';
import {
  DEV_FRAUND_REASON_ID,
  FEEDBACK_TYPES,
  PROD_FRAUND_REASON_ID,
} from '@shared/shared/constants';
import {
  clientFeedbackTypes,
  orderFeedbackTypes,
  testDriveFeedbackTypes,
} from '@shared/shared/constantValues';

export const getFeedbackStatus = (type, feedback) => {
  switch (type) {
    case type === FEEDBACK_TYPES.CLIENT:
      return clientFeedbackTypes?.[feedback]?.[getLangKey()];
    case type === FEEDBACK_TYPES.TEST_DRIVE:
      return testDriveFeedbackTypes?.[feedback]?.[getLangKey()];
    default:
      return orderFeedbackTypes?.[feedback]?.[getLangKey()];
  }
};

export const getCancelFraudOrderReasonId = () => {
  return isProd ? PROD_FRAUND_REASON_ID : DEV_FRAUND_REASON_ID;
};

export const getProductTotalAmount = ({
  totalAmount,
  totalAmountWithBasketDiscount,
  price,
  count,
  discountedTotalAmount,
}) => totalAmountWithBasketDiscount ??
  discountedTotalAmount ??
  totalAmount ??
  price * count;

export const calculateTotalRefundedAmount = ({
  bagFee,
  deliveryFee,
  serviceFee,
  partialRefundList,
  basket,
  productsMap,
}) => {
  const calculateBagFee = (bagUsage = []) => bagUsage.reduce((total, bag) => total + (bag?.totalAmount ?? 0), 0);
  const calculateProductRefunds = refundList => refundList.reduce(
    (total, product) => total +
        (productsMap[product?.productId]?.price ?? 0) * (product?.count ?? 0),
    0,
  );
  let totalRefundedAmount = calculateProductRefunds(partialRefundList);
  if (deliveryFee) {
    totalRefundedAmount += basket?.deliveryFee?.actual ?? 0;
  }
  if (serviceFee) {
    totalRefundedAmount += basket?.serviceFee?.actual ?? 0;
  }
  if (bagFee) {
    totalRefundedAmount += calculateBagFee(basket?.bagUsage?.used);
  }

  return totalRefundedAmount;
};
