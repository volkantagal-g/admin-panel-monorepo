import moment from 'moment';

import { t } from '@shared/i18n';

const PROGRESS_BAR_ITEMS = Object.freeze([
  {
    key: 'checkoutDate',
    tooltipText: t('financeOrderDetailPage:PROGRESSBAR.MERCHANT_VERIFY'),
    color: '#5D3EBD',
  },
  {
    key: 'verifyDate',
    tooltipText: t('financeOrderDetailPage:PROGRESSBAR.MERCHANT_VERIFY'),
    color: '#5D3EBD',
  },
  {
    key: 'prepareDate',
    tooltipText: t('financeOrderDetailPage:PROGRESSBAR.PREPARE'),
    color: '#0077b6',
  },
  {
    key: 'pickingDate',
    tooltipText: t('financeOrderDetailPage:PROGRESSBAR.COURIER_VERIFY'),
    color: '#00b4d8',
  },
  {
    key: 'reachDate',
    tooltipText: t('financeOrderDetailPage:PROGRESSBAR.REACH'),
    color: '#75CBE6',
  },
  {
    key: 'deliverDate',
    tooltipText: t('financeOrderDetailPage:PROGRESSBAR.DELIVER'),
    color: '#90e0ef',
  },
]);

const calcPercentage = (value, total) => (value * 100) / total;

const normalizePercentage = value => {
  if (value < 2) {
    return 2;
  }
  return value.toFixed(2);
};

const diffInSeconds = (end, start) => moment(end).diff(moment(start), 'seconds');

const durationToText = seconds => {
  const duration = moment.duration(seconds, 'seconds');

  return [
    ...(duration.days() > 0
      ? [`${duration.days()}${t('global:TIME.ABBR.DAY')}`]
      : []),
    ...(duration.hours() > 0
      ? [`${duration.hours()}${t('global:TIME.ABBR.HOUR')}`]
      : []),
    ...(duration.minutes() > 0
      ? [`${duration.minutes()}${t('global:TIME.ABBR.MINUTE')}`]
      : []),
    `${duration.seconds()}${t('global:TIME.ABBR.SECOND')}`,
  ].join(' ');
};

export const initProgressBar = order => {
  let prevDate = new Date();
  let totalTimeInSec = 0;

  if (order.cancelDate) {
    return {
      progressBarItems: [],
      totalTime: durationToText(
        diffInSeconds(order.cancelDate, order.checkoutDate),
      ),
    };
  }

  const progressBarItems = PROGRESS_BAR_ITEMS.reduce((acc, item) => {
    const date = order[item.key] || new Date();
    const timeDiffInSec = diffInSeconds(date, prevDate);

    if (timeDiffInSec > 0) {
      totalTimeInSec += timeDiffInSec;
      acc.push({
        ...item,
        timeDiffInSec,
      });
    }

    prevDate = date;

    return acc;
  }, []).map(item => ({
    tooltipText: item.tooltipText,
    key: item.key,
    color: item.color,
    percentage: normalizePercentage(
      calcPercentage(item.timeDiffInSec, totalTimeInSec),
    ),
    text: durationToText(item.timeDiffInSec),
  }));

  return { progressBarItems, totalTime: durationToText(totalTimeInSec) };
};
