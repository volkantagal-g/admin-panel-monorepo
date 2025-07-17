import * as Yup from 'yup';

import { t } from '@shared/i18n';
import {
  CLIENT_FEEDBACK_SOURCE_TYPE_WAREHOUSE,
  COUNTRY_CODES,
  DISCOUNT_AMOUNT_DURATION,
  FEEDBACK_STATUSES,
  FEEDBACK_TYPES,
} from '@shared/shared/constants';
import { getLangDataOfItem } from '@shared/utils/multiLanguage';
import { currency } from '@shared/utils/common';

import { getDiscountTitleFromAmount } from '@app/pages/MarketOrder/OrderDetail/components/AgentActions/formHelper';
import { getUser } from '@shared/redux/selectors/auth';
import { MISSING_PRODUCT_ID, MISSING_WRONG_PRODUCT_ID } from '@app/pages/MarketOrder/OrderDetail/constants';

export const validationSchema = () => {
  return Yup.object().shape({
    note: Yup.string().required(t('missingProductOrdersPage:FEEDBACK.NOTE')),
    validDayAmount: Yup.number(),
    discountAmount: Yup.number().min(0),
  });
};

export const missingProductStatusMap = {
  hasDiscount: 200,
  isProductsRefund: 300,
  isCancelled: 400,
  unableToReachToCustomer: 300,
};

export const calculateDiscountAmount = (marketOrder = {}) => {
  const { basketAmount, missingProductAmount, selectedCountryId } = marketOrder;
  const selectedCountryCode = COUNTRY_CODES?.[selectedCountryId];
  let discountAmount = 0;
  if (selectedCountryCode?.toUpperCase() === 'TR') {
    discountAmount = Math.ceil(missingProductAmount);
    const roundToMultiplier = 5;
    discountAmount +=
      (roundToMultiplier - (discountAmount % roundToMultiplier)) %
      roundToMultiplier;
  }
  else if (missingProductAmount >= 0 && missingProductAmount <= 5) {
    discountAmount = 5;
  }
  else if (missingProductAmount <= 10) {
    discountAmount = 10;
  }
  else if (missingProductAmount > 10) {
    discountAmount = Math.min(15, Math.ceil(basketAmount / 5));
  }
  return discountAmount;
};

export const fillDiscountParams = values => ({
  countryCode: values.countryCode,
  country: values.selectedCountryId,
  title: values.title,
  hasDiscount: values.hasDiscount,
  discountAmount: values.discountAmount,
  deliveryFee: {
    doNotCharge: values.doNotChargeDeliveryFee,
    amount: values.deliveryFeeAmount || 0,
  },
  validDayAmount: values.validDayAmount,
  doNotApplyMinimumBasketSize: values.doNotApplyMinimumBasketSize,
  isBalanceEnabled: values.isBalanceEnabled,
  createdBy: getUser()?._id,
});

export const getInitialValues = order => {
  const discountAmount = Math.ceil(order?.missingProductAmount ?? 0);
  return {
    mainReason: MISSING_WRONG_PRODUCT_ID,
    feedback: MISSING_PRODUCT_ID,
    note: t('missingProductOrdersPage:FEEDBACK.DEFAULT_NOTE'),
    missingProductStatus: '',
    discountAmount,
    validDayAmount: DISCOUNT_AMOUNT_DURATION,
    isBalanceEnabled: true,
    type: FEEDBACK_TYPES.MARKET_ORDER,
    status: FEEDBACK_STATUSES.RESOLVED,
    refundDeliveryFee: false,
    refundBagFee: false,
    doNotChargeDeliveryFee: false,
    sendNotif: false,
    title: getLangDataOfItem(
      getDiscountTitleFromAmount({
        amount: discountAmount,
        orderCurrency: currency(),
      }),
    ),
    doNotApplyMinimumBasketSize: true,
    selectedCountryId: order?.selectedCountryId,
    warehouse: order?.warehouse?._id,
  };
};

export const getFeedbackPayload = (order, values) => {
  return {
    type: FEEDBACK_TYPES.MARKET_ORDER,
    status: FEEDBACK_STATUSES.RESOLVED,
    source: CLIENT_FEEDBACK_SOURCE_TYPE_WAREHOUSE,
    feedback: values.feedback,
    mainReason: values.mainReason,
    order: order?._id,
    domainType: order?.domainType,
    warehouse: order?.warehouse?._id,
    client: order?.client?._id,
    note: values.note,
    isBagFeeRefunded: values.refundBagFee,
    isDeliveryFeeRefunded: values.refundDeliveryFee,
    isProductsRefund: values.isProductsRefund,
    products: values?.products?.map(product => ({
      product: product?.product,
      count: product?.orderCount || product?.count,
    })),
    hasDiscount: values.hasDiscount,
  };
};

export const getBasketProductsMap = basketProducts => {
  return basketProducts?.reduce((productMap, { product, ...rest }) => {
    return {
      ...productMap,
      [product]: { product, ...rest },
    };
  }, {});
};

export const populateMissingProductsWithBasketInfo = (
  products = [],
  basketProductsMap = {},
  bundleProducts = [],
) => {
  const bundleProductsMap = getBasketProductsMap(bundleProducts);
  products?.forEach(product => {
    const orderProduct = basketProductsMap?.[product?.product];
    if (orderProduct) {
      Object.assign(product, {
        orderCount: orderProduct?.count,
        bundle: orderProduct?.bundle,
        weightInfo: orderProduct?.weightInfo,
        basketTotalAmount: orderProduct?.totalAmount,
      });
    }
  });
  const allProducts = products.map(product => {
    if (product?.bundle?.bundle) {
      return bundleProductsMap[product?.bundle?.bundle];
    }
    return product;
  });
  return [...new Set(allProducts.map(product => product))];
};
