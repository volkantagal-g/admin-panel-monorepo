import { get, forEach, map, join, isEmpty } from 'lodash';
import moment from 'moment';

import Excel from '@shared/utils/excel';
import {
  FOOD_ORDER_STATUS,
  FOOD_ORDER_ORDER_STATUS_COLOR_MAP,
  FOOD_INSIGHT_REFUND_STATUS_MAP,
  FOOD_INSIGHT_REFUND_ERROR_CODE,
  TIMEZONE_ISTANBUL,
} from '@shared/shared/constants';
import { t, getLangKey } from '@shared/i18n';
import { formatDate } from '@shared/utils/dateHelper';
import { isNullOrEmpty } from '@shared/utils/common';

export const exportFinancialInfoToExcel = (data = {}) => {
  return new Excel({
    name: 'foodOrderFinancialInfo',
    fields: data.fields,
    data: data.content,
  }).export();
};

export const getOrderStatusColor = status => {
  if (status <= FOOD_ORDER_STATUS.BROWSING) {
    return FOOD_ORDER_ORDER_STATUS_COLOR_MAP.DEFAULT;
  }

  if (status > FOOD_ORDER_STATUS.BROWSING && status <= FOOD_ORDER_STATUS.RATED) {
    return FOOD_ORDER_ORDER_STATUS_COLOR_MAP.SUCCESS;
  }

  if (status >= FOOD_ORDER_STATUS.RATED) {
    return FOOD_ORDER_ORDER_STATUS_COLOR_MAP.DANGER;
  }

  return FOOD_ORDER_ORDER_STATUS_COLOR_MAP.DEFAULT;
};

export const getOrderStatusStyle = status => {
  if (status <= FOOD_ORDER_STATUS.BROWSING) {
    return { background: 'default', color: '#000' };
  }

  if ((status > FOOD_ORDER_STATUS.BROWSING) && (status <= FOOD_ORDER_STATUS.RATED)) {
    return { background: '#5cb85c', color: '#fff' };
  }

  if (status >= FOOD_ORDER_STATUS.RATED) {
    return { background: '#FF4D44', color: '#fff' };
  }
  return {};
};

export const getInsightRefundStatus = ({ selectedInsight, isRefundPending, isRefunded }) => {
  const refundErrorCode = get(selectedInsight, ['refund', 'error', 'code']);
  const isRefundSuccessful = get(selectedInsight, ['refund', 'isSuccess']);
  const refundErrorMessage = get(selectedInsight, ['refund', 'error', 'message'], '');

  if (refundErrorCode === FOOD_INSIGHT_REFUND_ERROR_CODE && isRefundPending) {
    return {
      insightStatusString: t('foodOrderPage:ORDER_FEEDBACKS_DETAIL_MODAL.PENDING'),
      insightStatus: FOOD_INSIGHT_REFUND_STATUS_MAP.PENDING,
    };
  }
  if ((isRefundSuccessful && isRefunded) ||
    (!isRefundSuccessful
      && refundErrorCode
      === FOOD_INSIGHT_REFUND_ERROR_CODE && isRefunded)) {
    return {
      insightStatusString: t('foodOrderPage:ORDER_FEEDBACKS_DETAIL_MODAL.SUCCESS'),
      insightStatus: FOOD_INSIGHT_REFUND_STATUS_MAP.SUCCESS,
    };
  }
  if (!isRefundSuccessful && refundErrorCode !== FOOD_INSIGHT_REFUND_ERROR_CODE) {
    return {
      insightStatusString: `${t('foodOrderPage:ORDER_FEEDBACKS_DETAIL_MODAL.FAILED')} / ${refundErrorMessage}`,
      insightStatus: FOOD_INSIGHT_REFUND_STATUS_MAP.FAIL,
    };
  }
  return {};
};

const modifieRefundAmount = ({ partialRefundItem, productMap }) => {
  if (partialRefundItem.refundAmount === 0) {
    return productMap[partialRefundItem.item].discountedPriceWithOption;
  }
  return partialRefundItem.refundAmount;
};

export const populatePartialInfoData = ({ products, partialRefunds }) => {
  const productMap = {};
  forEach(products, product => {
    productMap[product._id] = get(product, 'name');
    productMap[product._id].discountedPriceWithOption = get(product, 'discountedPriceWithOption');
  });

  const partialItem = [];
  forEach(partialRefunds, partialRefund => {
    forEach(partialRefund.partialRefundItems, partialRefundItem => {
      partialItem.push({
        name: productMap[partialRefundItem.item][getLangKey()],
        count: partialRefundItem.count,
        refundAmount: modifieRefundAmount({ partialRefundItem, productMap }),
      });
    });
  });

  const refundTotalInfo = map(partialRefunds, partialRefund => {
    return {
      total: partialRefund.partialRefundAmount,
      date: formatDate(partialRefund.partialRefundDate),
      user: partialRefund?.partialRefundBy?.user?.name,
    };
  });

  return { partialItem, refundTotalInfo };
};

export const modifiedAgreementData = ({ foodOrder }) => {
  const date = moment.utc(foodOrder.date).tz(TIMEZONE_ISTANBUL).format('DD.MM.YYYY HH:mm');
  return { ...foodOrder, date };
};

export const getPaymentMethodsStringName = (additionalPaymentInfo, paymentMethod) => {
  const paymentMethodString = get(paymentMethod, ['name', getLangKey()], '');
  if (!isNullOrEmpty(additionalPaymentInfo) && !isEmpty(additionalPaymentInfo)) {
    const additionalPaymentMethodsName = additionalPaymentInfo.map(additionalPayment => {
      const additionalPaymentMethod = get(additionalPayment, 'paymentMethod', {});
      return get(additionalPaymentMethod, ['name', getLangKey()], '');
    });
    const additionalPaymentMethodsNameString = join(additionalPaymentMethodsName, ' + ');
    return `${paymentMethodString} + ${additionalPaymentMethodsNameString}`;
  }
  return paymentMethodString;
};
