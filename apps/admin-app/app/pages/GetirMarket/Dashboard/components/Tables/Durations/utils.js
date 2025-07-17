import _ from 'lodash';

import { numberFormat } from '@shared/utils/localization';
import { GETIR_10_DOMAIN_TYPE } from '@shared/shared/constants';

const formatNumber = number => numberFormat({ minDecimal: 1, maxDecimal: 1 }).format(number);

// NOTE: we did this here so that backend query logic stays consistent.
const DOMAIN_MAP_WITH_MIN_MAX_DATA = { [GETIR_10_DOMAIN_TYPE]: true };

export const formatDurations = ({ data, selectedDomainType }) => {
  const orderStats = {
    totalOrderCount: 0,
    totalOnWayDuration: 0,
    totalReachToDeliverDuration: 0,
    totalClientDuration: 0,
    totalClientShownDuration: 0,
    totalClientShownDurationMin: 0,
    totalClientShownDurationMax: 0,
  };

  if (!_.isEmpty(data)) {
    orderStats.totalOrderCount += data.orderCount;
    orderStats.totalOnWayDuration += data.onwayToReachDuration;
    orderStats.totalReachToDeliverDuration += data.reachToDeliverDuration;
    orderStats.totalClientDuration += data.clientTotalDuration;
    orderStats.totalClientShownDuration += data.clientTotalShownDuration;
    orderStats.totalClientShownDurationMin += data.clientTotalShownDurationMin ?? 0;
    orderStats.totalClientShownDurationMax += data.clientTotalShownDurationMax ?? 0;
  }

  return [
    {
      tooltip: 'REACH_TOOLTIP',
      title: 'REACH',
      value: formatNumber(((orderStats.totalOnWayDuration / 60) / orderStats.totalOrderCount) || 0),
    },
    {
      tooltip: 'DELIVER_TOOLTIP',
      title: 'DELIVER',
      value: formatNumber(((orderStats.totalReachToDeliverDuration / 60) / orderStats.totalOrderCount) || 0),
    },
    {
      tooltip: 'TOTAL_DURATION_TOOLTIP',
      title: 'TOTAL',
      value: formatNumber(((orderStats.totalClientDuration / 60) / orderStats.totalOrderCount) || 0),
    },
    {
      // TODO: fix after all domains have the min-max data.
      tooltip: DOMAIN_MAP_WITH_MIN_MAX_DATA[selectedDomainType] && orderStats.totalClientShownDurationMax
        ? 'CLIENT_SHOWN_DURATION_TOOLTIP'
        : 'CLIENT_SHOWN_DURATION_SHORT_TOOLTIP',
      title: 'CLIENT',
      value: formatClientCol(orderStats, selectedDomainType),
    },
  ];
};

function formatClientCol(orderStats, selectedDomainType) {
  // if the domain does not have data, then only show average client shown duration, since min and max are not available yet.
  // (TODO: fix after talking with data teams).
  if (!DOMAIN_MAP_WITH_MIN_MAX_DATA[selectedDomainType]) {
    return formatNumber(((orderStats.totalClientShownDuration / 60) / orderStats.totalOrderCount) || 0);
  }

  const minTotal = orderStats.totalClientShownDurationMin || orderStats.totalClientShownDuration;
  // if no max, show only min or average
  if (!orderStats.totalClientShownDurationMax) {
    return formatNumber(((minTotal / 60) / orderStats.totalOrderCount) || 0);
  }

  const maxTotal = orderStats.totalClientShownDurationMax;
  // "minAvg - maxAvg"
  return `${formatNumber(((minTotal / 60) / orderStats.totalOrderCount) || 0)} - ${formatNumber(((maxTotal / 60) / orderStats.totalOrderCount) || 0)}`;
}
