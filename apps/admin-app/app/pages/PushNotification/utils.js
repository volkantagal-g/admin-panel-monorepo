import { get, toString } from 'lodash';

import { getLangKey } from '@shared/i18n';
import {
  GETIR_10_DOMAIN_TYPE,
  GETIR_MARKET_DOMAIN_TYPE,
  GETIR_VOYAGER_DOMAIN_TYPE,
  GETIR_GORILLAS_DOMAIN_TYPE,
} from '@shared/shared/constants';
import {
  NOTIFICATION_PROCESS_STATUS,
  CONTROLLER,
} from '@app/pages/PushNotification/constants';

export const getRestaurantOptions = restaurants => {
  return restaurants.map(restaurant => ({
    value: restaurant._id,
    label: restaurant?.name,
  }));
};

export const getMarketProductOptions = (products, filterCb) => {
  return products.map(item => {
    const option = {
      value: item._id,
      label: `${get(item.name, getLangKey(), '')} | ${get(item, '_id', '')}`,
    };
    if (filterCb) {
      filterCb(item, option);
    }
    return option;
  });
};

export const convertMarketProductOptions = products => {
  return products?.map(item => ({
    value: item?._id,
    label: `${item?.name[getLangKey()]} | ${item?._id}`,
  }));
};

export const convertPhoneLanguageOptions = countryLanguages => {
  return countryLanguages?.map(item => ({
    value: toString(item.toLowerCase()),
    label: item,
  }));
};

export const isUserInfoModalAvailable = notificationDetail => {
  const processStatuses = [NOTIFICATION_PROCESS_STATUS.CANCEL, NOTIFICATION_PROCESS_STATUS.FAIL];
  return !!(!processStatuses.includes(notificationDetail?.processStatus) && notificationDetail?.template);
};

export const convertNotificationDomainTypes = (values = {}, activeDomainsFromConfig) => {
  const types = Object.entries(values).map(([value, label]) => {
    if (!activeDomainsFromConfig) {
      return {
        value: parseInt(value, 10),
        label: label[getLangKey()] || label,
      };
    }
    if (activeDomainsFromConfig && activeDomainsFromConfig.includes(parseInt(value, 10))) {
      return {
        value: parseInt(value, 10),
        label: label[getLangKey()] || label,
      };
    }
    return null;
  }).filter(value => value !== null);
  return types;
};

export const isActiveServiceAppropriateForController = domainType => {
  const appropriateDomainTypes = [GETIR_10_DOMAIN_TYPE, GETIR_MARKET_DOMAIN_TYPE, GETIR_VOYAGER_DOMAIN_TYPE, GETIR_GORILLAS_DOMAIN_TYPE];
  if (domainType) {
    return appropriateDomainTypes.includes(domainType);
  }
  return false;
};

export const convertControllerOptions = (options, domainType) => {
  return Object.entries(options).map(([value, label]) => {
    let canOptionBeEnabled = true;
    if (parseInt(value, 10) === CONTROLLER.STOCK_LEVEL_CONTROLLER || parseInt(value, 10) === CONTROLLER.AGGRESSION_LEVEL_CONTROLLER) {
      canOptionBeEnabled = isActiveServiceAppropriateForController(domainType);
    }
    if (canOptionBeEnabled) {
      return {
        value: parseInt(value, 10),
        label: label[getLangKey()] || label,
      };
    }
    return null;
  });
};
