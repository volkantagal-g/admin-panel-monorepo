import { WAREHOUSE_BASE_PEAK_HOURS, WAREHOUSE_BASE_WORKING_HOURS } from '@shared/shared/constants';

export const createRequestBody = params => {
  const payload = {
    warehouseId: params.warehouseId || undefined,
    cityId: params.cityId || undefined,
    regionId: params.regionId || undefined,
    domainType: params.domainType || undefined,
    countryId: params.countryId || undefined,
  };
  Object.keys(payload).forEach(key => (payload[key] === undefined || payload[key] === '') && delete payload[key]);
  return {
    ...payload,
    message: {
      en: '-',
      tr: '-',
    },
  };
};

export const createBasePeakHoursRequestBody = params => {
  const payload = createRequestBody(params);
  const { timezone, peakHoursType = WAREHOUSE_BASE_PEAK_HOURS } = params;
  return {
    ...payload,
    type: peakHoursType,
    hours: {
      timezone,
      availableTimes: [
        {
          startMin: 0,
          endMin: 1440,
        },
        {
          startMin: 1440,
          endMin: 2880,
        },
        {
          startMin: 2880,
          endMin: 4320,
        },
        {
          startMin: 4320,
          endMin: 5760,
        },
        {
          startMin: 5760,
          endMin: 7200,
        },
        {
          startMin: 7200,
          endMin: 8640,
        },
        {
          startMin: 8640,
          endMin: 10080,
        },
      ],
    },
    message: {
      en: 'Getir, GetirMore and GetirFood are at your service at 10.00, GetirWater is at your service at 08.00 in their operating cities.',
      tr: 'Getir, GetirBüyük ve GetirYemek 10.00’dan, GetirSu 08.00’den itibaren bulundukları şehirlerde hizmetinizde.',
    },
  };
};

export const createBaseWorkingHoursRequestBody = params => {
  const baseWorkingHours = createRequestBody(params);
  const { timezone, workingHoursType = WAREHOUSE_BASE_WORKING_HOURS } = params;

  return {
    ...baseWorkingHours,
    workingHoursType,
    hours: {
      timezone,
      availableTimes: [
        {
          startMin: 0,
          endMin: 1440,
        },
        {
          startMin: 1440,
          endMin: 2880,
        },
        {
          startMin: 2880,
          endMin: 4320,
        },
        {
          startMin: 4320,
          endMin: 5760,
        },
        {
          startMin: 5760,
          endMin: 7200,
        },
        {
          startMin: 7200,
          endMin: 8640,
        },
        {
          startMin: 8640,
          endMin: 10080,
        },
      ],
    },
    message: {
      en: 'Getir, GetirMore and GetirFood are at your service at 10.00, GetirWater is at your service at 08.00 in their operating cities.',
      tr: 'Getir, GetirBüyük ve GetirYemek 10.00’dan, GetirSu 08.00’den itibaren bulundukları şehirlerde hizmetinizde.',
    },
    adminUser: '5954bf829a16f60004b53890',
  };
};
