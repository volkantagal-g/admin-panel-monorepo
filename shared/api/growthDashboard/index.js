import axios from '@shared/axios/common';

const GETIR_MARKET_GROWTH_DASHBOARD_BASE_URL = '/getirMarket/growthDashboard';

export const getRawDataByDateAndTypeWithinDateRangesForGrowthDashboard = async ({ filters }) => {
  const response = await axios({
    method: 'POST',
    url: `${GETIR_MARKET_GROWTH_DASHBOARD_BASE_URL}/getPermittedRawDataByDateAndTypeForGrowthDashboard`,
    data: { filters },
  });
  return response.data;
};

export const getPermittedOrderCountsData = async ({ filters }) => {
  const response = await axios({
    method: 'POST',
    url: `${GETIR_MARKET_GROWTH_DASHBOARD_BASE_URL}/getPermittedOrderCountsData`,
    data: { filters },
  });
  return response.data;
};

export const getPermittedMissedCountsData = async ({ filters }) => {
  const response = await axios({
    method: 'POST',
    url: `${GETIR_MARKET_GROWTH_DASHBOARD_BASE_URL}/getPermittedMissedCountsData`,
    data: { filters },
  });
  return response.data;
};

export const getPermittedNetRevenuesData = async ({ filters }) => {
  const response = await axios({
    method: 'POST',
    url: `${GETIR_MARKET_GROWTH_DASHBOARD_BASE_URL}/getPermittedNetRevenuesDataWithinDateRanges`,
    data: { filters },
  });
  return response.data;
};
