import axios from '@shared/axios/common';
import { ADMIN_PANEL_CONFIGS, MARKET_CONFIG_QUERY_TYPES } from '@shared/shared/constants';

const getirMarketDashboard = '/getirMarket/dashboard';

const getCustomConfig = reqConfig => {
  const config = { ...reqConfig, data: { ...reqConfig.data } };

  if (config?.data?.divisionCountries) {
    config.headers = { divisionCountries: config.data.divisionCountries };
    config.data = { ...config.data, divisionCountries: undefined };
  }
  return config;
};

export const getOrderCountByBasketAmount = body => axios(
  getCustomConfig({
    method: 'POST',
    url: `${getirMarketDashboard}/getOrderCountByBasketAmount`,
    data: { ...body, useNewDataAccess: true },
  }),
).then(({ data }) => data);

export const getFinancials = body => {
  return axios(
    getCustomConfig({
      method: 'POST',
      url: `${getirMarketDashboard}/getFinancials`,
      data: { ...body, useNewDataAccess: true },
    }),
  ).then(({ data }) => data);
};

export const getClientRatings = body => axios(
  getCustomConfig({
    method: 'POST',
    url: `${getirMarketDashboard}/getClientRatings`,
    data: { ...body, useNewDataAccess: true },
  }),
).then(({ data }) => data);

export const getDeviceStats = data => {
  return axios(
    getCustomConfig({
      method: 'POST',
      url: `${getirMarketDashboard}/getDeviceStats`,
      data: { ...data, useNewDataAccess: true },
    }),
  ).then(response => {
    return response.data;
  });
};

export const getProductAvailability = data => {
  return axios(
    getCustomConfig({
      method: 'POST',
      url: `${getirMarketDashboard}/getProductAvailability`,
      data,
    }),
  ).then(response => {
    return response.data;
  });
};

export const getInstantProductAvailability = data => {
  return axios(
    getCustomConfig({
      method: 'POST',
      url: `${getirMarketDashboard}/getInstantProductAvailability`,
      data,
    }),
  ).then(response => {
    return response.data;
  });
};

export const getProductSale = data => {
  return axios(
    getCustomConfig({
      method: 'POST',
      url: `${getirMarketDashboard}/getProductSale`,
      data: { ...data, useNewDataAccess: true },
    }),
  ).then(response => {
    return response.data;
  });
};

export const getOrderCardGroupDistribution = body => {
  return axios(
    getCustomConfig({
      method: 'POST',
      url: `${getirMarketDashboard}/getOrderCardGroupDistribution`,
      data: { ...body, useNewDataAccess: true },
    }),
  ).then(response => {
    return response.data;
  });
};

export const getDiscountReasons = body => {
  return axios(
    getCustomConfig({
      method: 'POST',
      url: `${getirMarketDashboard}/getDiscountReasons`,
      data: { ...body, useNewDataAccess: true },
    }),
  ).then(response => {
    return response.data;
  });
};

export const getWarehouseStats = body => {
  return axios(
    getCustomConfig({
      method: 'POST',
      url: `${getirMarketDashboard}/getWarehouseStats`,
      data: body,
    }),
  ).then(response => {
    return response.data;
  });
};
// check GetWarehouseStatsV2Type
export const getWarehouseStatsV2 = body => {
  return axios(
    getCustomConfig({
      method: 'POST',
      url: `${getirMarketDashboard}/getWarehouseStatsV2`,
      data: body,
    }),
  ).then(response => {
    return response.data;
  });
};

export const getClientOrderCounts = body => {
  return axios(
    getCustomConfig({
      method: 'POST',
      url: `${getirMarketDashboard}/getClientOrderCounts`,
      data: { ...body, useNewDataAccess: true },
    }),
  ).then(response => {
    return response.data;
  });
};

export const getOrderTimeSeries = body => {
  return axios(
    getCustomConfig({
      method: 'POST',
      url: `${getirMarketDashboard}/getOrderTimeSeries`,
      data: { ...body, useNewDataAccess: true },
    }),
  ).then(response => {
    return response.data;
  });
};

export const getOperationTimeSeries = body => {
  return axios(
    getCustomConfig({
      method: 'POST',
      url: `${getirMarketDashboard}/getOperationTimeSeries`,
      data: { ...body, useNewDataAccess: true },
    }),
  ).then(response => {
    return response.data;
  });
};

/**
 *
 * @param {*} body
 * @returns
 * ```js
 * {
 *   "orderStats": {
 *       "orderCount": Number,
 *       "onwayToReachDuration": Number,
 *       "reachToDeliverDuration": Number,
 *       "clientTotalDuration": Number,
 *       "clientTotalShownDuration": Number,
 *       "clientTotalShownDurationMin": Number,
 *       "clientTotalShownDurationMax": Number,
 *   },
 *   "isNewDataAccessUsed": Boolean
 * }
```
 */

export const getDurations = body => {
  return axios(
    getCustomConfig({
      method: 'POST',
      url: `${getirMarketDashboard}/getDurations`,
      data: { ...body, useNewDataAccess: true },
    }),
  ).then(({ data }) => data);
};

export const getClientDownloadSignupStats = body => {
  return axios(
    getCustomConfig({
      method: 'POST',
      url: `${getirMarketDashboard}/getClientDownloadSignupStats`,
      data: { ...body, useNewDataAccess: true },
    }),
  ).then(({ data }) => data);
};

export const getBiTaksiSummaryStats = body => {
  return axios(
    getCustomConfig({
      method: 'POST',
      url: `${getirMarketDashboard}/getBiTaksiSummaryStats`,
      data: body,
    }),
  ).then(response => {
    return response.data;
  });
};

export const getGetirWaterMarketplaceSummaryStats = body => {
  return axios(
    getCustomConfig({
      method: 'POST',
      url: `${getirMarketDashboard}/getGetirWaterMarketplaceSummaryStats`,
      data: body,
    }),
  ).then(response => {
    return response.data;
  });
};

export const getNPSStats = async body => {
  const { data } = await axios(
    getCustomConfig({
      method: 'POST',
      url: `${getirMarketDashboard}/getNPSStats`,
      data: body,
    }),
  );

  return data;
};

export const getNPSConfig = async () => {
  const response = await axios({
    method: 'POST',
    url: '/marketConfig/getConfigWKey',
    data: {
      key: ADMIN_PANEL_CONFIGS.NPS_CONFIG,
      type: MARKET_CONFIG_QUERY_TYPES.OBJECT,
    },
  });
  return response.data;
};
