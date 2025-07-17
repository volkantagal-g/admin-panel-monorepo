import _ from 'lodash';

import { numberFormat } from '@shared/utils/localization';

export const formatOrderCountByBasketAmountData = ({ data, country }) => {
  const basketAmountCounts = {
    distribution: [],
    totalBasketCount: 0,
  };

  if(_.isEmpty(data)) return basketAmountCounts;

  const { alpha2: countryCode } = country?.code;
  const STEP = { GB: 10, TR: 50 };
  const MAX_BASKET = { GB: 50, TR: 500 };
  const step = STEP[countryCode] || 10;
  const maxBasketAmount = MAX_BASKET[countryCode] || 50;

  const basketAmountDistribution = {};

  for (let i = 0; i < maxBasketAmount; i += step) {
    basketAmountDistribution[i] = {
      key: `${i}-${i + step}`,
      basketCount: 0,
    };
  }

  basketAmountDistribution[maxBasketAmount] = {
    key: `${maxBasketAmount}+`,
    basketCount: 0,
  };

  _.forEach(data, domainBasketAmountCounts => {
    _.forEach(domainBasketAmountCounts, ({ min_basket_amount: minBasketAmount, order_count: orderCount }) => {
      const baseAmount = minBasketAmount - (minBasketAmount % step);
      if (baseAmount >= maxBasketAmount) {
        basketAmountDistribution[maxBasketAmount].basketCount += orderCount;
      }
      else {
        basketAmountDistribution[baseAmount].basketCount += orderCount;
      }
      basketAmountCounts.totalBasketCount += orderCount;
    });
  });

  _.forEach(basketAmountDistribution, v => {
    basketAmountCounts.distribution.push({
      key: v.key,
      value: v.basketCount,
      percentage: numberFormat({ maxDecimal: 0 }).format((v.basketCount / basketAmountCounts.totalBasketCount) * 100),
    });
  });

  return basketAmountCounts;
};
