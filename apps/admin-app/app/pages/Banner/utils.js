import { toString } from 'lodash';

import { PROCESS_STATUS } from '@app/pages/Banner/constants';

export const convertPhoneLanguageOptions = countryLanguages => {
  return countryLanguages?.map(item => ({
    value: toString(item.toLowerCase()),
    label: item,
  }));
};

export const convertPlatformOptions = options => Object.entries(options).map(([, value]) => ({ value, label: value }));

export const getPageHeaderTagColor = status => {
  switch (status) {
    case PROCESS_STATUS.CREATED:
    case PROCESS_STATUS.READY:
      return 'cyan';
    case PROCESS_STATUS.PRE_PROCESS:
    case PROCESS_STATUS.IN_PROCESS:
      return 'green';
    case PROCESS_STATUS.CANCEL:
    case PROCESS_STATUS.FAIL:
      return 'red';
    case PROCESS_STATUS.FINISHED:
      return 'green';
    default:
      return null;
  }
};

export const v1Mapper = v2payload => {
  const v1Payload = {
    id: v2payload.id,
    status: v2payload.status,
    promoTarget: 4,
    type: 1,
    domainTypes: [v2payload.targetDomain],
    clientSegments: v2payload.clientSegments,
    clientExSegments: v2payload?.clientExcludedSegments,
    deviceTypes: v2payload.deviceTypes,
    priority: v2payload.priority,
    phoneLanguages: v2payload.phoneLanguages,
    isBannerEnabled: true,
    validFrom: v2payload.startDate,
    validUntil: v2payload.endDate,

  };

  v1Payload.banner = {
    action: v2payload.action,
    priority: v2payload.priority,
    isServiceHomePageBanner: true,
  };

  v2payload?.phoneLanguages?.forEach(lang => {
    v1Payload.description = {
      ...v1Payload.description,
      en: v2payload.customTag,
      [lang]: v2payload.customTag,
    };

    v1Payload.title = {
      ...v1Payload.description,
      en: v2payload.customTag,
      [lang]: v2payload.customTag,
    };

    v1Payload.accessibilityLabel = {
      ...v1Payload.description,
      en: v2payload.customTag,
      [lang]: v2payload.customTag,
    };

    v1Payload.banner = {
      ...v1Payload.banner,
      title: {
        ...v1Payload.banner.title,
        [lang]: v2payload.title,
      },
      description: {
        ...v1Payload.banner.description,
        [lang]: v2payload.description,
      },
      picUrl: {
        ...v1Payload.banner.picUrl,
        [lang]: v2payload.contents[lang].picUrl,
      },

    };
  });

  if (v2payload?.controls?.cityAndWarehouseControl) {
    if (v2payload?.controls?.cityAndWarehouseControl?.targetCities) {
      v1Payload.cities = v2payload?.controls?.cityAndWarehouseControl?.targetCities;
    }

    if (v2payload?.controls?.cityAndWarehouseControl?.targetWarehouses) {
      v1Payload.warehouses = v2payload?.controls?.cityAndWarehouseControl?.targetWarehouses;
    }
  }

  return v1Payload;
};
