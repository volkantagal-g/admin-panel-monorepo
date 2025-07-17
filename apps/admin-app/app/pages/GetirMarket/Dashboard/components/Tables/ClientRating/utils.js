import _ from 'lodash';

import { numberFormat } from '@shared/utils/localization';

export const formatClientRatingData = ({ data, selectedDomainType }) => {
  const clientRatingsMap = {
    1: { orderCount: 0, percentage: 0 },
    2: { orderCount: 0, percentage: 0 },
    3: { orderCount: 0, percentage: 0 },
    4: { orderCount: 0, percentage: 0 },
    5: { orderCount: 0, percentage: 0 },
  };
  const clientRatings = {
    rates: [],
    rate: {
      orderCount: 0,
      sum: 0,
      average: 0,
    },
  };

  const dataByDomainType = data[selectedDomainType];

  if (_.isEmpty(data) || !dataByDomainType) {
    return clientRatings;
  }

  // Calculate totals first
  dataByDomainType?.forEach(({ rate, order_count: orderCount }) => {
    if (rate) {
      clientRatings.rate.orderCount += orderCount;
      clientRatings.rate.sum += rate * orderCount;
    }
  });

  dataByDomainType?.forEach(({ rate, order_count: orderCount }) => {
    if (clientRatingsMap[rate]) {
      clientRatingsMap[rate].orderCount = orderCount;
      clientRatingsMap[rate].percentage = numberFormat({ minDecimal: 0, maxDecimal: 0 })
        .format((orderCount / clientRatings.rate.orderCount) * 100);
    }
  });

  _.forEach(clientRatingsMap, (v, k) => {
    clientRatings.rates.push({
      rate: k,
      orderCount: v.orderCount,
      percentage: v.percentage,
    });
  });

  const { orderCount, sum } = clientRatings.rate;

  if (orderCount) {
    clientRatings.rate.average = numberFormat({ minDecimal: 2, maxDecimal: 2 }).format((sum / orderCount));
    clientRatings.rates.sort((a, b) => a.rate - b.rate);
    clientRatings.rates.push({
      rate: clientRatings.rate.average,
      key: 'total',
    });
  }

  return clientRatings;
};
