import { find, get } from 'lodash';

import { DEFAULT_STATUS_TAG_COLOR, PRECISION_NUMBER_FOR_AMOUNT, REFUND_REASONS, STATUS_TAG_COLOR_MAP } from './constants';
import { currencyFormat } from '@shared/utils/localization';
import permKeys from '@shared/shared/permKey.json';

export const calculatePrecisedAmount = amount => {
  const precisedAmount = amount / PRECISION_NUMBER_FOR_AMOUNT;
  return precisedAmount;
};

export const fixCustomIdentifiersValuesByType = customIdentifiers => {
  const fixedCustomIdentifiers = customIdentifiers.map(customIdentifier => {
    const { type, value, key } = customIdentifier;
    if (type === 'number') {
      return {
        key,
        value: parseInt(value, 10),
      };
    }
    if (type === 'text') {
      return {
        key,
        value,
      };
    }
    if (type === 'textarea') {
      return {
        key,
        value: JSON.parse(value),
      };
    }
    return customIdentifier;
  });
  return fixedCustomIdentifiers;
};
export const amountCurrencyFormat = (amount, currency) => {
  const codeAlpha3 = currency?.codeAlpha3;
  return currencyFormat({ currency: codeAlpha3 }).format(amount);
};

export const getRequestedAmount = financialSummary => {
  // the totalRequestedAmount field is not exist in old data.
  // if there is no data, it should seems empty in table
  const isRequestAmountExist = financialSummary?.totalRequestedAmount !== undefined;
  const precisedRequestedAmount = calculatePrecisedAmount(get(financialSummary, 'totalRequestedAmount', 0));
  return isRequestAmountExist ? amountCurrencyFormat(precisedRequestedAmount, financialSummary.currency) : '';
};

export const checkPaymentProviderExist = (initialPaymentProviders = [], name, key) => {
  return initialPaymentProviders.findIndex(provider => provider?.name === name || provider?.key === key) > -1;
};

export const checkPaymentMethodExistInPaymentProvider = (paymentMethods, paymentMethodName, paymentMethodKey) => {
  return paymentMethods.findIndex(method => method?.name === paymentMethodName || method?.key === paymentMethodKey) > -1;
};

export const dateStringWithTimeZone = (date, timeZone = 'UTC') => {
  return date ? `${date} ${timeZone}` : '';
};

export const handleRefundReasonsTranslate = t => {
  return REFUND_REASONS.map(reason => {
    return {
      label: t(`paymentTransactionPage:${reason.label}`),
      value: reason.value,
    };
  });
};

export const getTypeTagColor = (type = '') => {
  const colorKeys = Object.keys(STATUS_TAG_COLOR_MAP);
  const foundColor = find(colorKeys, c => type.includes(c));
  return foundColor ? STATUS_TAG_COLOR_MAP[foundColor] : DEFAULT_STATUS_TAG_COLOR;
};

export const getOrderDetailUrlByMerchant = (merchantName = '') => {
  let returnUrl = '';
  if (!merchantName.includes('TIP')) { // only order merchants have detail page
    switch (true) {
      case (merchantName.includes('MARKET') || merchantName.includes('GETIR10')):
        returnUrl = '/marketOrder/detail/';
        break;
      case merchantName.includes('FOOD'):
        returnUrl = '/baskets/detail/'; // we are getting basketId instead of 'Food' orderId
        break;
      case merchantName.includes('LOCALS'):
        returnUrl = '/artisanOrder/detail/';
        break;
      case merchantName.includes('WATER'):
        returnUrl = '/getirWater/orderDetail/';
        break;
      default:
        break;
    }
  }

  return returnUrl;
};

export const getOrderDetailPagePermissionByMerchant = (merchantName = '') => {
  let permission = '';
  if (!merchantName.includes('TIP')) { // only order merchants have detail page
    switch (true) {
      case merchantName.includes('MARKET'):
        permission = permKeys.PAGE_GETIR_MARKET_ORDER_DETAIL;
        break;
      case merchantName.includes('FOOD'):
        permission = permKeys.PAGE_GETIR_FOOD_ORDER_DETAIL;
        break;
      case merchantName.includes('LOCALS'):
        permission = permKeys.PAGE_ARTISAN_ORDER_DETAIL;
        break;
      case merchantName.includes('WATER'):
        permission = permKeys.PAGE_GETIR_WATER_ORDER_DETAIL;
        break;
      default:
        break;
    }
  }
  return permission;
};
