import _ from 'lodash';

import { currency, normalizeNumber } from '@shared/utils/common';

const findTotals = (orders, fieldName) => {
  if (orders.length) {
    return orders.reduce((acc, item) => {
      return acc + _.get(item, fieldName, 0);
    }, 0);
  }

  return 0;
};

export const makeTotalsCalculator = orders => {
  const totalG10Count = findTotals(orders, 'g10OrderCount');
  const totalGWCount = findTotals(orders, 'gsuOrderCount');
  const totalVendorOrderCount = findTotals(orders, 'vendorOrderCount');
  const kuzeydenOrderCount = findTotals(orders, 'kuzeydenOrderCount');
  const totalBasket = findTotals(orders, 'basket');
  const totalCharged = findTotals(orders, 'chargedAmount');
  const totalPromoCount = orders.filter(item => item?.promoCode).length;

  let basketTotal = 0;
  let chargeTotal = 0;

  return {
    totalG10Count: Number.parseFloat(totalG10Count / orders.length || 0).toFixed(1),
    kuzeydenOrderCount: Number.parseFloat(kuzeydenOrderCount / orders.length || 0).toFixed(1),
    totalGWCount: Number.parseFloat(totalGWCount / orders.length || 0).toFixed(1),
    totalVendorOrderCount: Number.parseFloat(totalVendorOrderCount / orders.length || 0).toFixed(1),
    totalPromoCount: Number.parseFloat((totalPromoCount / orders.length) * 100 || 0).toFixed(1),
    totalBasket: () => {
      basketTotal = totalBasket / orders.length || 0;
      return _.isNumber(basketTotal) && `${normalizeNumber(basketTotal)} ${currency()}`;
    },
    totalCharged: () => {
      chargeTotal = totalCharged / orders.length || 0;
      return _.isNumber(chargeTotal) && `${normalizeNumber(chargeTotal)} ${currency()}`;
    },
  };
};
