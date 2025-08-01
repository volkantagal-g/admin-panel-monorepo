import { MARKET_ORDER_STATUS } from '@shared/shared/constants';
import Config from '@shared/config/env';

export const isOrderActive = orderStatus => {
  return (
    orderStatus > MARKET_ORDER_STATUS.BROWSING &&
    orderStatus <= MARKET_ORDER_STATUS.DELIVERED
  );
};

export const getDateFieldByStatus = (order, now = new Date()) => {
  const orderDetail = { ...order };
  const { status, verify } = orderDetail;
  const verifyDate = verify?.date || verify?.[0]?.date || now;

  const updateDateField = field => {
    Object.assign(orderDetail, {
      ...orderDetail,
      [field]: {
        ...orderDetail?.[field],
        date: orderDetail?.[field]?.date || now,
      },
    });
  };

  const statusFieldMap = {
    [MARKET_ORDER_STATUS.VERIFYING]: 'checkout',
    [MARKET_ORDER_STATUS.PREPARING]: 'verify',
    [MARKET_ORDER_STATUS.PREPARED]: 'prepare',
    [MARKET_ORDER_STATUS.HANDOVER]: 'handover',
    [MARKET_ORDER_STATUS.ONWAY]: 'onway',
    [MARKET_ORDER_STATUS.REACHED]: 'reach',
    [MARKET_ORDER_STATUS.DELIVERED]: 'deliver',
    [MARKET_ORDER_STATUS.RATED]: 'rate',
    [MARKET_ORDER_STATUS.ABORTED]: 'abort',
    [MARKET_ORDER_STATUS.CANCELED_ADMIN]: 'cancel',
    [MARKET_ORDER_STATUS.CANCELED_CLIENT]: 'cancel',
    [MARKET_ORDER_STATUS.CANCELED_COURIER]: 'cancel',
    [MARKET_ORDER_STATUS.CANCELED_STAFF]: 'cancel',
    [MARKET_ORDER_STATUS.CANCELED_SYSTEM]: 'cancel',
  };

  const field = statusFieldMap[status];

  if (field) {
    if (field === 'verify') {
      orderDetail.verify = { ...orderDetail.verify, date: verifyDate };
    }
    else {
      updateDateField(field);
    }
  }

  return orderDetail;
};

export const getIntervalFromLayers = ({ intervalLayers, value }) => {
  const configWithoutMaxValue = intervalLayers.find(val => !val.max);

  const floatValue = parseFloat(value, 10);
  const sortedConfig = intervalLayers.sort((a, b) => a.max - b.max);

  for (let i = 0; i < sortedConfig.length; i += 1) {
    const configValue = sortedConfig[i];

    if (configValue.max && (floatValue <= configValue.max)) {
      return configValue.interval;
    }
  }

  return configWithoutMaxValue ? configWithoutMaxValue.interval : value;
};

export const calculateIntervalDeliveryDuration = ({ duration, durationConfig }) => {
  const roundedDuration = (
    Object.entries(durationConfig.INTERVAL_DISPLAY.LOOKUP)
      .find(([min, max]) => min < duration && duration <= max)
  );

  return (
    roundedDuration
      ? `${roundedDuration[0]}-${roundedDuration[1]}`
      : durationConfig.INTERVAL_DISPLAY.OUTLIER
  );
};

export const calculateDisplayDurationForVoyagerCeta = ({ estimatedTimeOfArrival, durationConfig }) => {
  const duration = Math.ceil(estimatedTimeOfArrival / 60);
  if (duration > durationConfig.THRESHOLD_FOR_DISPLAY_MINUTE) {
    let maxInterval = '0-0';
    Object.entries(durationConfig.INTERVAL_DISPLAY.LOOKUP)
      .forEach(([min, max]) => {
        const lastMax = maxInterval.split('-')[1];
        if (min >= lastMax) {
          maxInterval = `${lastMax}-${max}`;
        }
      });
    return {
      displayDuration: maxInterval,
      interval: {
        lower: maxInterval.split('-')[0],
        upper: maxInterval.split('-')[1],
      },
    };
  }
  if (durationConfig.INTERVAL_DISPLAY.ENABLE) {
    const displayDuration = calculateIntervalDeliveryDuration({ duration, durationConfig });
    return {
      displayDuration,
      interval: {
        lower: displayDuration.split('-')[0],
        upper: displayDuration.split('-')[1],
      },
    };
  }
  return duration.toFixed(0);
};

export const getObjectMapFromArr = (objectArr, key = 'id') => objectArr?.reduce((objMap, obj) => ({ ...objMap, [obj?.[key]]: obj }), {});

export const handleSalesforceNotification = ({ message, action, status, ...rest }) => {
  Config.SALESFORCE_DASHBOARD_URLS.forEach(origin => {
    window?.parent?.postMessage(JSON.stringify({ message, action, status, time: new Date().toLocaleString(), ...rest }), origin);
  });
};
