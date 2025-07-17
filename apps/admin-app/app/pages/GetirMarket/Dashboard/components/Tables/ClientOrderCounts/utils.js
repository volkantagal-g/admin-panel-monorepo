import { isEmpty as _isEmpty, sumBy as _sumBy, orderBy as _orderBy } from 'lodash';

import { numberFormat } from '@shared/utils/localization';

export const getFormattedClientOrderCounts = data => {
  if (_isEmpty(data)) return [];

  const { rankStats } = data;
  const totalCount = _sumBy(rankStats, 'orderCount');

  const formatted = rankStats.map(({ rank, orderCount }) => {
    return {
      rank,
      sortOrder: Number(rank.split('-')[0]) || Number.MAX_SAFE_INTEGER,
      count: numberFormat({ maxDecimal: 0 }).format(orderCount),
      ratio: numberFormat({ maxDecimal: 0 }).format((orderCount * 100) / totalCount || 0),
    };
  });

  // for new clients table, first order count, data comes from this endpoint, formatted here
  return { orderCounts: _orderBy(formatted, 'sortOrder') };
};
