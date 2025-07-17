import moment from 'moment';
import { get, cloneDeep, uniqueId } from 'lodash';

import { GETIR_DOMAIN_TYPES, MARKET_ORDER_STATUS } from '@shared/shared/constants';
import { t } from '@shared/i18n';
import { isNullOrEmpty } from '@shared/utils/common';

const COLOR_TYPES = Object.freeze({
  bgInfoLighter: 'bgInfoLighter',
  bgInfo: 'bgInfo',
  bgInfoDarker: 'bgInfoDarker',
  bgPrimary: 'bgPrimary',
});

export const calculateProgressBarPercent = ({ value, totalBarValue }) => `${((value * 100) / totalBarValue).toFixed(2)}%`;

function durationToText(duration) {
  const durationInMin = `${duration.minutes()}${t(
    'marketOrderPage:DURATION.MINUTE',
  )}`;
  const durationInSec = `${duration.seconds()}${t(
    'marketOrderPage:DURATION.SECOND',
  )}`;
  if (duration.days() > 0) {
    return `${duration.days()}${t(
      'marketOrderPage:DURATION.DAY',
    )} ${duration.hours()}${t(
      'marketOrderPage:DURATION.HOUR',
    )} ${durationInMin} ${durationInSec}`;
  }
  if (duration.hours() > 0) {
    return `${duration.hours()}${t(
      'marketOrderPage:DURATION.HOUR',
    )} ${durationInMin} ${durationInSec}`;
  }
  if (duration.minutes() > 0) {
    return `${duration.minutes()}${t(
      'marketOrderPage:DURATION.MINUTE',
    )} ${durationInSec}`;
  }
  return duration.seconds() + t('marketOrderPage:DURATION.SECOND');
}

const addProgressBar = (status, start, end, barColor, tooltip, bars = []) => {
  let endDate = end;
  let tempTotalTime = 0;
  let tempTotalBarValue = 0;
  const tempBars = cloneDeep(bars);
  if (!start) {
    return {};
  }
  if (!end) {
    if (status > MARKET_ORDER_STATUS.RATED) {
      return {};
    }
    endDate = new Date();
  }
  const duration = moment.duration(moment(endDate).diff(start));
  let barValue = Math.round(duration.asSeconds());
  tempTotalTime += barValue;
  barValue *= 2;
  if (barValue < 10) {
    barValue = 10;
  }
  else if (barValue > 300) {
    barValue = 300;
  }
  tempTotalBarValue += barValue;
  const barText = durationToText(duration);
  tempBars.push({ value: barValue, barColor, tooltip, text: barText });
  return { tempTotalTime, tempTotalBarValue, tempBars };
};

const processProgressBarData = (data = []) => {
  const bars = [];
  let tempTotalTime = 0;
  let tempTotalBarValue = 0;

  data.forEach(
    ({ tempBars, tempTotalTime: time, tempTotalBarValue: barValue }) => {
      bars.push(tempBars?.[0]);
      tempTotalTime += time;
      tempTotalBarValue += barValue;
    },
  );
  return { tempTotalTime, tempTotalBarValue, bars };
};

const getVoyageProgressData = (
  status,
  checkoutDate,
  prepareDate,
  handoverDate,
  onwayDate,
  reachDate,
  deliverDate,
) => {
  const progressData = [];
  const bars = [];
  progressData.push(
    addProgressBar(
      status,
      checkoutDate,
      prepareDate,
      COLOR_TYPES.bgInfoLighter,
      t('marketOrderPage:TOOLTIP.WAIT_COURIER_ASSIGN'),
      bars,
    ),
  );
  if (prepareDate) {
    progressData.push(
      addProgressBar(
        status,
        prepareDate,
        handoverDate,
        COLOR_TYPES.bgInfo,
        t('marketOrderPage:TOOLTIP.COURIER_VERIFY'),
        bars,
      ),
    );
  }
  if (handoverDate) {
    progressData.push(
      addProgressBar(
        status,
        handoverDate,
        onwayDate,
        COLOR_TYPES.bgInfoDarker,
        t('marketOrderPage:TOOLTIP.PREPARE'),
        bars,
      ),
    );
  }
  if (onwayDate) {
    progressData.push(
      addProgressBar(
        status,
        onwayDate,
        reachDate,
        COLOR_TYPES.bgPrimary,
        t('marketOrderPage:TOOLTIP.REACH'),
        bars,
      ),
    );
  }
  if (reachDate) {
    progressData.push(
      addProgressBar(
        status,
        reachDate,
        deliverDate,
        COLOR_TYPES.bgInfoLighter,
        t('marketOrderPage:TOOLTIP.DELIVER'),
        bars,
      ),
    );
  }
  return progressData;
};

const getMarketOrderProgressData = (
  {
    status,
    checkoutDate,
    pickingDate,
    verifyDate,
    prepareDate,
    handoverDate,
    onwayDate,
    reachDate,
    deliverDate,
  },
) => {
  const progressData = [];
  const bars = [];
  progressData.push(
    addProgressBar(
      status,
      checkoutDate,
      pickingDate,
      COLOR_TYPES.bgInfoLighter,
      t('marketOrderPage:TOOLTIP.WAIT_PICKER'),
      bars,
    ),
  );
  if (pickingDate) {
    progressData.push(
      addProgressBar(
        status,
        pickingDate,
        verifyDate,
        COLOR_TYPES.bgInfoLighter,
        t('marketOrderPage:TOOLTIP.PICKER_VERIFY'),
        bars,
      ),
    );
  }
  if (verifyDate) {
    progressData.push(
      addProgressBar(
        status,
        verifyDate,
        prepareDate,
        COLOR_TYPES.bgInfo,
        t('marketOrderPage:TOOLTIP.PREPARE'),
        bars,
      ),
    );
  }
  if (prepareDate) {
    progressData.push(
      addProgressBar(
        status,
        prepareDate,
        handoverDate,
        COLOR_TYPES.bgInfoDarker,
        t('marketOrderPage:TOOLTIP.COURIER_VERIFY'),
        bars,
      ),
    );
  }
  if (handoverDate) {
    progressData.push(
      addProgressBar(
        status,
        handoverDate,
        onwayDate,
        COLOR_TYPES.bgInfoDarker,
        t('marketOrderPage:TOOLTIP.COURIER_CASE_SCAN'),
        bars,
      ),
    );
  }
  if (onwayDate) {
    progressData.push(
      addProgressBar(
        status,
        onwayDate,
        reachDate,
        COLOR_TYPES.bgPrimary,
        t('marketOrderPage:TOOLTIP.REACH'),
        bars,
      ),
    );
  }
  if (reachDate) {
    progressData.push(
      addProgressBar(
        status,
        reachDate,
        deliverDate,
        COLOR_TYPES.bgInfo,
        t('marketOrderPage:TOOLTIP.DELIVER'),
        bars,
      ),
    );
  }
  return progressData;
};

export const initProgressBars = marketOrder => {
  let totalBarValue = 0;
  let totalTime = 0;
  let totalTimeText = '';
  const checkoutDate = get(marketOrder, 'checkout.date');
  const pickingDate = get(marketOrder, 'picking.date');
  const verify = get(marketOrder, 'verify');
  const prepare = get(marketOrder, 'prepare');
  const handoverDate = get(marketOrder, 'handover.date');
  const onwayDate = get(marketOrder, 'onway.date');
  const reachDate = get(marketOrder, 'reach.date');
  const deliverDate = get(marketOrder, 'deliver.date');
  const cancelDate = get(marketOrder, 'cancel.date');
  const progressData = [];
  const verifyDate = verify?.date || verify?.[0]?.date;
  const prepareDate = prepare?.date ?? prepare?.products?.[0]?.date;

  if (checkoutDate) {
    if (marketOrder.domainType === GETIR_DOMAIN_TYPES.VOYAGER) {
      progressData.push(
        ...getVoyageProgressData(
          marketOrder?.status,
          checkoutDate,
          prepareDate,
          handoverDate,
          onwayDate,
          reachDate,
          deliverDate,
        ),
      );
    }
    else {
      progressData.push(...getMarketOrderProgressData({
        status: marketOrder?.status,
        checkoutDate,
        pickingDate,
        verifyDate,
        prepareDate,
        handoverDate,
        onwayDate,
        reachDate,
        deliverDate,
      }));
    }
  }
  const progressBarData = processProgressBarData(progressData);
  let bars = cloneDeep(get(progressBarData, 'bars'));
  totalBarValue = get(progressBarData, 'tempTotalBarValue');
  totalTime = get(progressBarData, 'tempTotalTime');
  // if the order canceled recalculate total time
  if (marketOrder.status >= MARKET_ORDER_STATUS.CANCELED_ADMIN) {
    const duration = moment.duration(moment(cancelDate).diff(checkoutDate));
    totalTime = Math.round(duration.asSeconds());
  }
  totalTimeText = durationToText(moment.duration(totalTime, 'seconds'));
  if (!isNullOrEmpty(bars)) {
    bars = bars.map(barItem => {
      const barPercent = calculateProgressBarPercent({
        value: barItem?.value,
        totalBarValue: !Number.isNaN(totalBarValue) ? totalBarValue : barItem?.value,
      });
      return { ...barItem, barPercent, id: uniqueId() };
    });
  }
  return { totalTimeText, progressInfos: { bars, totalBarValue, totalTime } };
};

export const getDurationInMinutes = duration => Math.floor(duration / 60);
