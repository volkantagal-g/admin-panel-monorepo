import { get } from 'lodash';

import { getLangKey } from '@shared/i18n';
import { currency } from '@shared/utils/common';
import { priceFormatter } from '../util';

export const getProductText = product => {
  const name = get(product, ['name', getLangKey()], '');
  const formattedPrice = priceFormatter(get(product, 'totalPriceWithOption', 0));
  return `${name} - (${formattedPrice} ${currency()})`;
};

export const getProductTextWithCount = product => {
  const count = get(product, 'count', 0);

  return `${count}x - ${getProductText(product)}`;
};
