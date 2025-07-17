import { getLangKey } from '@shared/i18n';
import {
  MARKET_ORDER_STATUS,
  INTEGRATION_TYPE,
  PLATFORM_DEVICE_TYPES,
} from '@shared/shared/constants';
import { integrationTypes } from '@shared/shared/constantValues';
import { FILTER_STATUSES } from '../constants';

const filterStatusMap = {
  [FILTER_STATUSES.SUCCESS]: [
    MARKET_ORDER_STATUS.DELIVERED,
    MARKET_ORDER_STATUS.RATED,
  ],
  [FILTER_STATUSES.ACTIVE]: [
    MARKET_ORDER_STATUS.WAITING_FOR_PICKER,
    MARKET_ORDER_STATUS.VERIFYING,
    MARKET_ORDER_STATUS.PREPARING,
    MARKET_ORDER_STATUS.PREPARED,
    MARKET_ORDER_STATUS.HANDOVER,
    MARKET_ORDER_STATUS.ONWAY,
    MARKET_ORDER_STATUS.REACHED,
  ],
  [FILTER_STATUSES.CANCEL]: [
    MARKET_ORDER_STATUS.CANCELED_ADMIN,
    MARKET_ORDER_STATUS.CANCELED_CLIENT,
    MARKET_ORDER_STATUS.CANCELED_COURIER,
    MARKET_ORDER_STATUS.CANCELED_STAFF,
    MARKET_ORDER_STATUS.CANCELED_SYSTEM,
  ],
  [FILTER_STATUSES.SLOTTED]: [MARKET_ORDER_STATUS.RESERVED],

  [FILTER_STATUSES.OTHER]: Object.values(MARKET_ORDER_STATUS).filter(
    value => value !== MARKET_ORDER_STATUS.RESERVED && value < MARKET_ORDER_STATUS.WAITING_FOR_PICKER,
  ),
};

export const getFilterStatuses = status => filterStatusMap?.[status] ?? [];

export const getDeviceTypes = (deviceTypeOptions = []) => {
  let deviceTypes = [];
  if (deviceTypeOptions?.length > 0) {
    if (deviceTypeOptions.includes(PLATFORM_DEVICE_TYPES.MOBILE?.toString())) {
      deviceTypes = [...deviceTypes, 'Android', 'iPhone'];
    }
    if (deviceTypeOptions.includes(PLATFORM_DEVICE_TYPES.WEBSITE?.toString())) {
      deviceTypes = [...deviceTypes, 'Web'];
    }
    if (deviceTypeOptions.includes(PLATFORM_DEVICE_TYPES.JET?.toString())) {
      deviceTypes = [...deviceTypes, 'jet'];
    }
  }
  return deviceTypes;
};
export const getIntegrationType = platform => (platform === INTEGRATION_TYPE.GETIR.toString()
  ? null
  : integrationTypes?.[platform]?.[getLangKey()]?.toLowerCase());

export const getDeviceType = client => {
  const deviceType = client?.deviceType;
  const mapping = {
    Android: 'Mobil',
    iPhone: 'Mobil',
    Web: 'Web',
    jet: 'jet',
  };
  return mapping[deviceType] || 'Web';
};

export const getFormattedSelectOptions = (
  objectMap,
  langKey = getLangKey(),
) => {
  return Object.keys(objectMap).map(key => ({
    value: key,
    label: objectMap[key]?.[langKey],
  }));
};

export const getPlatforms = integrationsTypes => {
  return Array.isArray(integrationsTypes)
    ? integrationsTypes?.join(', ')
    : integrationTypes?.toString();
};
