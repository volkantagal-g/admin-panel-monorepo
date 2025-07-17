import { isNumber, get, cloneDeep } from 'lodash';
import moment from 'moment';

import { isNullOrEmpty } from '@shared/utils/common';
import { t } from '@shared/i18n';
import { FOOD_ORDER_STATUS, GETIR_FOOD } from '@shared/shared/constants';

const COLOR_TYPES = Object.freeze({
  bgInfoLighter: 'bgInfoLighter',
  bgInfo: 'bgInfo',
  bgInfoDarker: 'bgInfoDarker',
  bgPrimary: 'bgPrimary',
});

export const priceFormatter = price => {
  const tempPrice = isNumber(price) && Number.parseFloat(price);
  return tempPrice.toFixed(2);
};

const calculateProgressBarPercent = ({ value, totalBarValue }) => {
  const barPercent = `${((value * 100) / totalBarValue).toFixed(2)}%`;
  return { barPercent };
};

export const formatEstimatedDeliveryDuration = estimatedDeliveryDuration => parseFloat(estimatedDeliveryDuration).toFixed(0);

const durationToText = duration => {
  if (duration.hours() > 0) {
    return `${duration.hours()}${t('foodOrderPage:ORDER.HOUR')} ${duration.minutes()}${t('foodOrderPage:ORDER.MINUTE')}\
     ${duration.seconds()}${t('foodOrderPage:ORDER.SECOND')}`;
  }
  if (duration.minutes() > 0) {
    return `${duration.minutes()}${t('foodOrderPage:ORDER.MINUTE')} ${duration.seconds()}${t('foodOrderPage:ORDER.SECOND')}`;
  }
  return duration.seconds() + t('foodOrderPage:ORDER.SECOND');
};

const addProgressBar = (foodOrderDetail, start, end, barColor, tooltip, bars = [], totalBarValue, totalTime) => {
  let endDate = end;
  let tempTotalTime = totalTime;
  let tempTotalBarValue = totalBarValue;
  const tempBars = cloneDeep(bars);
  if (!start) {
    return {};
  }
  if (!end) {
    if (get(foodOrderDetail, 'status') > get(FOOD_ORDER_STATUS, 'RATED')) {
      return {};
    }
    endDate = new Date();
  }
  const duration = moment.duration(moment(endDate).diff(start));
  let barValue = Math.round(duration.asSeconds());
  tempTotalTime += barValue;
  barValue *= 2;
  if (barValue < 15) {
    barValue = 15;
  }
  else if (barValue > 300) {
    barValue = 300;
  }
  tempTotalBarValue += barValue;
  const barText = durationToText(duration);
  tempBars.push({ value: barValue, barColor, tooltip, text: barText });

  return { tempTotalTime, tempTotalBarValue, tempBars };
};

export const initProgressBars = ({ foodOrderDetail }) => {
  let bars = [];
  let totalBarValue = 0;
  let totalTime = 0;
  let totalTimeText = '';
  let progressData;

  if (get(foodOrderDetail, 'checkoutDate')) {
    progressData = addProgressBar(
      foodOrderDetail,
      get(foodOrderDetail, 'checkoutDate'),
      get(foodOrderDetail, 'verifyDate'),
      COLOR_TYPES.bgInfoLighter,
      t('foodOrderPage:TOOLTIP.RESTAURANT_VERIFY'),
      bars,
      totalBarValue,
      totalTime,
    );
    bars = cloneDeep(get(progressData, 'tempBars'));
    totalBarValue = get(progressData, 'tempTotalBarValue');
    totalTime = get(progressData, 'tempTotalTime');

    if (foodOrderDetail.deliveryType === GETIR_FOOD.DELIVERY_TYPES.GETIR) {
      if (get(foodOrderDetail, 'verifyDate')) {
        progressData = addProgressBar(
          foodOrderDetail,
          get(foodOrderDetail, 'verifyDate'),
          get(foodOrderDetail, 'prepareDate'),
          COLOR_TYPES.bgInfo,
          t('foodOrderPage:TOOLTIP.PREPARE'),
          bars,
          totalBarValue,
          totalTime,
        );
        bars = cloneDeep(get(progressData, 'tempBars'));
        totalBarValue = get(progressData, 'tempTotalBarValue');
        totalTime = get(progressData, 'tempTotalTime');
      }
      if (get(foodOrderDetail, 'prepareDate')) {
        progressData = addProgressBar(
          foodOrderDetail,
          get(foodOrderDetail, 'prepareDate'),
          get(foodOrderDetail, 'courierVerifyDate'),
          COLOR_TYPES.bgInfoDarker,
          t('foodOrderPage:TOOLTIP.COURIER_VERIFY'),
          bars,
          totalBarValue,
          totalTime,
        );
        bars = cloneDeep(get(progressData, 'tempBars'));
        totalBarValue = get(progressData, 'tempTotalBarValue');
        totalTime = get(progressData, 'tempTotalTime');
      }
      if (get(foodOrderDetail, 'courierVerifyDate')) {
        progressData = addProgressBar(
          foodOrderDetail,
          get(foodOrderDetail, 'courierVerifyDate'),
          get(foodOrderDetail, 'reachDate'),
          COLOR_TYPES.bgPrimary,
          t('foodOrderPage:TOOLTIP.REACH'),
          bars,
          totalBarValue,
          totalTime,
        );
        bars = cloneDeep(get(progressData, 'tempBars'));
        totalBarValue = get(progressData, 'tempTotalBarValue');
        totalTime = get(progressData, 'tempTotalTime');
      }
      if (get(foodOrderDetail, 'reachDate')) {
        progressData = addProgressBar(
          foodOrderDetail,
          get(foodOrderDetail, 'reachDate'),
          get(foodOrderDetail, 'deliverDate'),
          COLOR_TYPES.bgInfo,
          t('foodOrderPage:TOOLTIP.DELIVER'),
          bars,
          totalBarValue,
          totalTime,
        );
        bars = cloneDeep(get(progressData, 'tempBars'));
        totalBarValue = get(progressData, 'tempTotalBarValue');
        totalTime = get(progressData, 'tempTotalTime');
      }
    }
    else if (foodOrderDetail.deliveryType === GETIR_FOOD.DELIVERY_TYPES.RESTAURANT) {
      if (get(foodOrderDetail, 'verifyDate')) {
        progressData = addProgressBar(
          foodOrderDetail,
          get(foodOrderDetail, 'verifyDate'),
          get(foodOrderDetail, 'prepareDate'),
          COLOR_TYPES.bgInfo,
          t('foodOrderPage:TOOLTIP.PREPARE'),
          bars,
          totalBarValue,
          totalTime,
        );
        bars = cloneDeep(get(progressData, 'tempBars'));
        totalBarValue = get(progressData, 'tempTotalBarValue');
        totalTime = get(progressData, 'tempTotalTime');
      }
      if (get(foodOrderDetail, 'prepareDate')) {
        progressData = addProgressBar(
          foodOrderDetail,
          get(foodOrderDetail, 'prepareDate'),
          get(foodOrderDetail, 'deliverDate'),
          COLOR_TYPES.bgInfoDarker,
          t('foodOrderPage:TOOLTIP.DELIVER'),
          bars,
          totalBarValue,
          totalTime,
        );
        bars = cloneDeep(get(progressData, 'tempBars'));
        totalBarValue = get(progressData, 'tempTotalBarValue');
        totalTime = get(progressData, 'tempTotalTime');
      }
    }
  }

  // if the order canceled recalculate total time
  if (get(foodOrderDetail, 'status') >= get(FOOD_ORDER_STATUS, 'CANCELED_ADMIN')) {
    const duration = moment.duration(moment(get(foodOrderDetail, 'cancelDate')).diff(get(foodOrderDetail, 'checkoutDate')));
    totalTime = Math.round(duration.asSeconds());
  }

  totalTimeText = durationToText(moment.duration(totalTime, 'seconds'));
  if (!isNullOrEmpty(bars)) {
    bars = bars.map(barItem => {
      const { barPercent } = calculateProgressBarPercent({ value: barItem.value, totalBarValue });
      return { ...barItem, barPercent };
    });
  }
  return { totalTimeText, progressInfos: { bars, totalBarValue, totalTime } };
};

export const estimatedDeliveryTimeFormatter = estimateDeliveryTime => moment(estimateDeliveryTime).local().format('HH:mm');
// TO DO: This util function will be removed and we will use only estimatedDeliveryTime after BE release
export const handleEstimatedDelivery = (
  estimatedDeliveryTime,
  estimatedDeliveryDuration,
  interval,
) => (estimatedDeliveryTime
  ? `${estimatedDeliveryTimeFormatter(estimatedDeliveryTime)}${
    interval
      ? ` - ${estimatedDeliveryTimeFormatter(
        moment(estimatedDeliveryTime).add(interval, 'minutes'),
      )}`
      : ''
  }`
  : `${estimatedDeliveryDuration} ${t('MINUTE_SHORT')}`);
