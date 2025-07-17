import { DEFAULT_MAX_NOTIF_SEND_PER_MINUTE } from '@app/pages/PushNotification/List/components/GlobalRuleset/filterFormConstants';

const cleanDeliveryTime = deliveryTime => String(deliveryTime).replaceAll('-', '');

export const transformValuesForApi = values => {
  const queryParams = {};
  queryParams.country = values.country;
  const services = [];

  // add service-based settings to query params
  Object.keys(values.domainTypes)
    ?.filter(domainType => values.domainTypes[domainType])
    ?.forEach(domainType => {
      const serviceCode = domainType.split('-')[1]/* service-serviceCode */;
      const {
        startTime,
        endTime,
        maxNotifSendPerMinutes,
      } = values.domainTypes[domainType];

      services.push({
        maxNotifSendPerMinutes: maxNotifSendPerMinutes || DEFAULT_MAX_NOTIF_SEND_PER_MINUTE,
        domainType: serviceCode,
        startTime: cleanDeliveryTime(startTime),
        endTime: cleanDeliveryTime(endTime),
      });
    });

  // consolidate rules
  const {
    deliveryTime, defaultMaxNotifSendPerMinutes,
    dailyLimitPerUser, domainLimitPerUser, dayLimitPerUser,
    dailyServiceCap, dailyHardCap,
  } = values;

  queryParams.rule = {
    ...(deliveryTime?.startTime && { defaultStartTime: cleanDeliveryTime(deliveryTime.startTime) }),
    ...(deliveryTime?.endTime && { defaultEndTime: cleanDeliveryTime(deliveryTime.endTime) }),
    ...(defaultMaxNotifSendPerMinutes && { defaultMaxNotifSendPerMinutes }),
    ...(dailyLimitPerUser && { dailyLimitPerUser }),
    dailyServiceCap,
    dailyHardCap,
    ...(domainLimitPerUser && { domainLimitPerUser }),
    ...(dayLimitPerUser && { dayLimitPerUser }),
    ...(services?.[0] && { services }),
  };

  return queryParams;
};
