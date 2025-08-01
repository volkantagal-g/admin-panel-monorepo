import * as Yup from 'yup';
import { groupBy, isArray } from 'lodash';

import { getUserCountries } from '@shared/redux/selectors/auth';
import { FEEDBACK_STATUSES, FEEDBACK_TYPES } from '@shared/shared/constants';
import { getLangKey } from '@shared/i18n';
import { currency as getUserCurrency } from '@shared/utils/common';
import {
  dateFeedbackReasonIds,
  DEFAULT_DISCOUNT_AMOUNT,
  DEFAULT_DISCOUNT_EXPIRY_DAYS,
  MARKET_ORDER_REFUND,
  marketOrderActions,
  marketOrderFeedbackSourceMap,
  PRODUCT_TYPES,
} from '../../constants';
import { calculateCountForProduct } from './utils/helpers';

const DiscountShape = {
  title: Yup.object().required(),
  discountAmount: Yup.number().required(),
  isBalanceEnabled: Yup.boolean().required(),
  deliveryFee: Yup.object({
    doNotCharge: Yup.boolean().default(false),
    amount: Yup.number().when('doNotCharge', {
      is: false,
      then: schema => schema.required(),
      otherwise: schema => schema.nullable(true),
    }),
  }),
  validDayAmount: Yup.number().required(),
  doNotApplyMinimumBasketSize: Yup.boolean().required(),
};

const FeedbackShape = {
  source: Yup.number().required(),
  mainReason: Yup.number().required(),
  subReason: Yup.number().required(),
  note: Yup.string().min(1).required(),
  skt: Yup.string()
    .nullable()
    .when('subReason', {
      is: value => value === Object.values(dateFeedbackReasonIds).includes(Number(value)),
      then: schema => schema.nullable(false).required(),
    }),
  isFranchiseFault: Yup.boolean().required(),
  isProductsExchanged: Yup.boolean().required(),
};

const FeedbackSchema = Yup.object().shape(FeedbackShape).required();

const DiscountSchema = Yup.object().when('hasDiscount', {
  is: true,
  then: schema => schema.shape(DiscountShape).required(),
});

const PartialRefundProductShape = {
  count: Yup.number().required(),
  productId: Yup.string().required(),
};

export const PartialRefundProductsSchema = Yup.array().of(
  Yup.object().shape(PartialRefundProductShape),
);

export const validationSchema = () => {
  return Yup.object().shape({
    domainSelectedType: Yup.number().required(),
    refundType: Yup.string().nullable().default(null),
    feedback: FeedbackSchema,
    products: Yup.array()
      .of(
        Yup.object().shape({
          count: Yup.number()
            .required()
            .when('product.type', {
              is: type => type !== PRODUCT_TYPES.WEIGHT,
              then: schema => schema.integer(),
            }),
          product: Yup.string().required(),
        }),
      )
      .when('feedback.mainReason', {
        is: 1,
        then: schema => schema.required(),
      })
      .when('feedback.mainReason', {
        is: 2,
        then: schema => schema.required(),
      }),
    partialRefundList: PartialRefundProductsSchema,
    discount: DiscountSchema,
  });
};

export const getDiscountTitleFromAmount = ({ orderCurrency, amount = 0 }) => ({
  tr: `Sana özel ${orderCurrency}${amount} indirim!`,
  en: `${orderCurrency}${amount} discount for you!`,
  fr: `${orderCurrency}${amount} réduction pour vous!`,
  de: `${orderCurrency}${amount} Rabatt für dich!`,
  nl: `${orderCurrency}${amount} korting voor jou!`,
  it: `${amount}${orderCurrency} di sconto per te!`,
  es: `${amount}${orderCurrency} de descuento para ti!`,
  pt: `${amount}${orderCurrency} de desconto para ti!`,
  'en-US': `${orderCurrency}${amount} discount for you!`,
});

export const getFormattedCountries = () => {
  const currentLang = getLangKey();

  return getUserCountries().map(country => ({
    label: `${country.flag}\t${country.name[currentLang]}`,
    value: country.code.alpha2,
  }));
};

export const getSelectedCountry = countryCode => getFormattedCountries().find(({ value }) => value === countryCode)?.label;

export const manipulateValuesBeforeSubmit = values => {
  const newValues = { ...values };
  return newValues;
};

export const getStockProductsForRefund = (
  partialRefundList,
  basketProducts,
) => {
  const basketProductsMap = basketProducts?.reduce(
    (productMap, product) => ({ ...productMap, [product?.product]: product }),
    {},
  );
  const baskProductsByParent = groupBy(basketProducts, 'bundle.bundle');
  return partialRefundList.reduce((stockProducts, refundProduct = {}) => {
    const bundleProducts = baskProductsByParent[refundProduct.productId] || [];
    const refundProductClone = { ...refundProduct };
    const { isVirtualProduct, stockProduct } = basketProductsMap[refundProduct.productId] || {};
    const {
      productId,
      count = 0,
      orderCount: ordCount = 0,
    } = refundProductClone;
    if (basketProductsMap[productId]?.weightInfo) {
      const { weightInfo, unit, type } = basketProductsMap[productId];
      Object.assign(refundProductClone, {
        count: calculateCountForProduct({ count, weightInfo, unit, type }),
        orderCount: calculateCountForProduct({
          count: ordCount,
          weightInfo,
          unit,
          type,
        }),
      });
    }
    // If there are no bundle products for this refund product, then just add
    // the refund product to the stock products.
    if (!bundleProducts.length) {
      // If the refund product is a virtual product, then send stockproductId as productId.
      if (isVirtualProduct) {
        refundProductClone.productId = stockProduct;
      }

      return [...stockProducts, refundProductClone];
    }

    const orderCount = refundProduct.orderCount || refundProduct.count;
    // Otherwise, create a new stock product for each bundle product, with
    // the count and order count calculated based on the refund product and bundle product counts.
    const stockProductsFromBundleProducts = bundleProducts.map(
      ({ count: bpCount, product: bpId }) => ({
        count: (bpCount / orderCount) * refundProduct.count,
        orderCount: bpCount,
        productId: bpId,
      }),
    );

    return [...stockProducts, ...stockProductsFromBundleProducts];
  }, []);
};

export const manipulateValuesAfterSubmit = (
  values,
  { client = {}, warehouse = {}, courier = {}, _id: orderId, basket } = {},
) => {
  const formValues = { ...values };
  const clientId = client?.client?._id;
  const warehouseId = warehouse?.warehouse?.id;
  const basketProducts = basket?.products || [];

  return {
    feedbackPayload: {
      type: FEEDBACK_TYPES.MARKET_ORDER,
      status: FEEDBACK_STATUSES.RESOLVED,
      source: formValues.feedback.source,
      feedback: formValues.feedback.subReason,
      note: formValues.feedback.note,
      mainReason: formValues.feedback.mainReason,
      skt: formValues.feedback.skt || undefined,
      isProductsExchanged: formValues.feedback.isProductsExchanged,
      isFranchiseFault: formValues.feedback.isFranchiseFault,
      products: formValues.products,
      domainType: formValues.domainSelectedType,
      isBagFeeRefunded: formValues.bagFee || false,
      isDeliveryFeeRefunded: formValues.deliveryFee || false,
      isProductsRefund: formValues.refundType === MARKET_ORDER_REFUND,
      hasDiscount: formValues.hasDiscount,
      order: orderId,
      client: clientId,
      warehouse: warehouseId,
      courier: courier?.courier?._id,
      franchise: courier?.franchise,
    },
    partialRefundPayload: {
      orderId,
      domainType: formValues.domainSelectedType,
      products: formValues.partialRefundList.map(({ count, productId }) => ({
        count,
        productId,
        isWillBeAddedToStock: false,
      })),
      refundDeliveryFee: formValues.deliveryFee || false,
      refundBagFee: formValues.bagFee || false,
      refundServiceFee: formValues.serviceFee || false,
    },
    discountPayload: {
      ...formValues.discount,
      client: clientId,
      orderId, // this is required to call orderDetails API after discount is created
    },
    stockPayload: {
      isWholeRefund: formValues.isWholeRefund,
      refundProducts: getStockProductsForRefund(
        formValues.partialRefundList,
        basketProducts,
      ).map(({ count, productId: product, orderCount }) => ({
        refundReasonType: formValues.feedback.subReason,
        initialRefundCount: count,
        orderCount: orderCount || count,
        product,
      })),
      warehouseId,
      language: getLangKey(),
    },
  };
};

export const getFeedbackInitialValues = (feedback = {}) => {
  const initialValues = {
    feedback: {
      source: feedback.source,
      subReason: feedback.feedback,
      note: feedback.note,
      mainReason: feedback.mainReason,
      skt: feedback.skt || undefined,
      isProductsExchanged: feedback.isProductsExchanged,
      isFranchiseFault: feedback.isFranchiseFault,
      products: feedback.products,
      domainSelectedType: feedback.domainType,

      hasDiscount: feedback.hasDiscount,
      interestedUser: feedback?.interestedUser?._id,
    },
    products: feedback.products,
    partialRefundList: [],
    bagFee: feedback.isBagFeeRefunded || false,
    deliveryFee: feedback.isDeliveryFeeRefunded || false,
    serviceFee: feedback.serviceFeeRefunded || false,
    wholeRefundList: [],
    refundType: feedback.isProductsRefund ? MARKET_ORDER_REFUND : null,
    hasDiscount: !!feedback.discountCode,
    discountCode: feedback.discountCode,
    discount: {},
  };

  return initialValues;
};

export const getRefundProducts = ({ productsMap, queryProducts, action }) => {
  if (isArray(queryProducts) && queryProducts.length > 0) {
    const partialRefundList = [...queryProducts].map(product => ({
      productId: product?.id,
      count: action === marketOrderActions.refund ? product?.quantity : 0,
      orderCount: productsMap?.[product?.id]?.count,
    }));
    return {
      partialRefundList,
      products: partialRefundList.map(product => ({
        count: product.count,
        product: product.productId,
      })),
    };
  }
  return {};
};

const REFUND_TYPES = {
  full: 'full',
  bagFee: 'bagFee',
  deliveryFee: 'deliveryFee',
  serviceFee: 'serviceFee',
};

const getRefundValue = (refundType, refundList) => {
  if (!refundList?.length) return false;
  if (refundList.includes(REFUND_TYPES.full)) return true;
  return refundList.includes(refundType);
};

export const getInitialValues = ({
  orderDetail: {
    domainType,
    countryCode,
    financial,
    deliveryFeeRefundStatus,
    currency,
  },
  isFeedbackDetails,
  feedback,
  productsMap,
  queryProducts,
  note,
  source,
  action,
  reason,
  subReasonsMap,
  mainReasonsMap,
  refundAmountList,
  discountFields,
}) => {
  if (isFeedbackDetails) {
    return getFeedbackInitialValues(feedback);
  }
  const deliveryFee = financial?.deliveryFee;
  const isDeliveryFeeRefunded = deliveryFeeRefundStatus?.isRefunded;
  const enableDoNotChargeDeliverFee =
    discountFields?.hasDeliveryFee ?? !(deliveryFee && !isDeliveryFeeRefunded);
  const { partialRefundList = [], products = [] } = getRefundProducts({
    productsMap,
    queryProducts,
    action,
  });
  const subReason = subReasonsMap?.[reason];
  const initialValues = {
    domainSelectedType: domainType || null,
    feedback: {
      source: marketOrderFeedbackSourceMap()?.[source?.toUpperCase()]?.id,
      mainReason: mainReasonsMap?.[subReason?.parentFeedbackReasonId]?.id,
      subReason: subReason?.id,
      note,
      skt: null,
      isFranchiseFault: false,
      isProductsExchanged: false,
    },
    products,
    partialRefundList,
    deliveryFee: getRefundValue('deliveryFee', refundAmountList),
    bagFee: getRefundValue('bagFee', refundAmountList),
    serviceFee: getRefundValue('serviceFee', refundAmountList),
    refundType: action === marketOrderActions.refund ? action : null,
    hasDiscount: action === marketOrderActions.discount || false,
    discount: {
      client: '',
      title: {
        ...getDiscountTitleFromAmount({
          amount: DEFAULT_DISCOUNT_AMOUNT,
          orderCurrency: currency?.symbol || getUserCurrency(),
        }),
      },
      createdBy: '',
      discountAmount: discountFields?.amount ?? DEFAULT_DISCOUNT_AMOUNT,
      isBalanceEnabled: false,
      countryCode,
      deliveryFee: {
        doNotCharge: enableDoNotChargeDeliverFee,
        amount: enableDoNotChargeDeliverFee
          ? null
          : discountFields?.deliveryFeeAmount ?? deliveryFee,
      },
      validDayAmount: discountFields?.expiry ?? DEFAULT_DISCOUNT_EXPIRY_DAYS,
      doNotApplyMinimumBasketSize: discountFields?.hasMinBasketSize ?? true,
      domainTypes: [domainType],
    },
    isWholeRefund: getRefundValue('full', refundAmountList),
  };
  return manipulateValuesBeforeSubmit(initialValues);
};
