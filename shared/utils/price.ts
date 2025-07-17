import { isNumber, isString } from 'lodash';

import { currency } from '@shared/utils/common';

export const priceFormatter = (price?: unknown, withCurrency: boolean = false): string => {
  let numericPrice: number;

  if (isNumber(price)) {
    numericPrice = price;
  }
  else if (isString(price)) {
    numericPrice = parseFloat(price);
  }
  else {
    numericPrice = 0;
  }

  if (Number.isNaN(numericPrice)) {
    numericPrice = 0;
  }
  const priceString = numericPrice.toFixed(1);

  return withCurrency ? `${priceString} ${currency()}` : priceString;
};
