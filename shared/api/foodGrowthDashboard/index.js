import axios from '@shared/axios/common';

const GETIR_FOOD_GROWTH_DASHBOARD_BASE_URL = '/getirFood/growthDashboard';

export const getMissedOrderCountsOfDeliveryTypes = async ({ filters }) => {
  const response = await axios({
    method: 'POST',
    url: `${GETIR_FOOD_GROWTH_DASHBOARD_BASE_URL}/getMissedOrderCountsOfDeliveryTypesByDomainTypeWithinDateRanges`,
    data: { filters },
  });
  return response.data;
};

export const getOrderCountsOfDeliveryTypes = async ({ filters }) => {
  const response = await axios({
    method: 'POST',
    url: `${GETIR_FOOD_GROWTH_DASHBOARD_BASE_URL}/getOrderCountsOfDeliveryTypesByDomainTypeWithinDateRanges`,
    data: { filters },
  });
  return response.data;
};

export const getNetRevenuesOfDeliveryTypes = async ({ filters }) => {
  const response = await axios({
    method: 'POST',
    url: `${GETIR_FOOD_GROWTH_DASHBOARD_BASE_URL}/getNetRevenuesOfDeliveryTypesByDomainTypeWithinDateRanges`,
    data: { filters },
  });
  return response.data;
};
